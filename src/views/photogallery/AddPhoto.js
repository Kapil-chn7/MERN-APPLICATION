import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'

const AddPhoto = () => {
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [data, setData] = useState({
    title: '',
    imageURL: '',
    imageFile: '',
    filesData: [],
    date: '2003-03-02',
    goals: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [limiter, setLimiter] = useState({ title: 50, titleHas: 50 })

  const handleChange = (e) => {
    if (e.target.id === 'title') {
      if (e.target.value.length === limiter.title + 1) return
      setLimiter((prev) => ({ ...prev, titleHas: prev.title - e.target.value.length }))
      setData((prev) => ({ ...prev, title: e.target.value }))
    }
    if (e.target.id === 'imageURL') {
      if (
        e.target.files[0]?.type === 'image/jpeg' ||
        e.target.files[0]?.type === 'image/png' ||
        e.target.files[0]?.type === 'image/jpg'
      ) {
        setData((prev) => ({
          ...prev,
          imageURL: URL.createObjectURL(e.target.files[0]),
          imageFile: e.target.files[0],
        }))
      } else {
        swal({
          title: 'Warning',
          text: 'Upload jpg, jpeg, png only.',
          icon: 'error',
          button: 'Close',
          dangerMode: true,
        })
        setData((prev) => ({
          ...prev,
          imageURL: '',
          imageFile: '',
        }))
        e.target.value = null
      }
    } else if (e.target.id === 'textarea80words') {
      setData({ ...data, description: e.target.value })
    } else if (e.target.id === 'filesData') {
      setData((prev) => ({ ...prev, filesData: [...e.target.files] }))
    }
  }

  const handleSubmit = () => {
    if (data.title === '' || data.imageURL.trim() === '' || data.goals === '') {
      swal({
        title: 'Warning',
        text: 'Title or image fields are missing',
        icon: 'error',
        button: 'Close',
        dangerMode: true,
      })
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('imageFile', data.imageFile)
    formData.append('goals', data.goals)
    formData.append('description', data.description)
    formData.append('date', data.date)
    data.filesData.forEach((element) => {
      formData.append('filesData[]', element)
    })
    axios
      .post(`${API}/api/photogallery`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/formdata',
        },
      })
      .then((res) => {
        swal({
          title: 'Added',
          text: 'Photo added successfully!',
          icon: 'success',
          button: 'Return',
        })
        setLoading(false)
        navigate('/photogallery', { replace: true })
      })
      .catch((err) => {
        setLoading(false)
        swal({
          title: 'Warning',
          text: 'Something went wrong!',
          icon: 'error',
          button: 'Retry',
          dangerMode: true,
        })
      })
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div
            className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
          >
            <div style={{ fontSize: '22px' }} className="fw-bold">
              Add Photo
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <h4 className="mb-0"></h4>
            </div>

            <div className="page-title-right">
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  textTransform: 'capitalize',
                  marginRight: '5px',
                }}
                onClick={() => handleSubmit()}
                disabled={loading}
              >
                {loading ? 'Loading' : 'Save'}
              </Button>
              <Link to="/photogallery">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    textTransform: 'capitalize',
                  }}
                >
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8 mx-auto">
          <div className="card h-100">
            <div className="card-body px-5">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={data.title}
                  maxLength="50"
                  onChange={(e) => handleChange(e)}
                />
                <p className="pt-1 pl-2 text-secondary">Remaining words : {limiter.titleHas}</p>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon122">
                  SGD goals
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="3 goals number like 1 12 5"
                  value={data.goals}
                  onChange={(e) => {
                    setData({ ...data, goals: e.target.value })
                  }}
                  aria-label="Username"
                  aria-describedby="basic-addon122"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imageURL" className="form-label">
                  Upload Image*
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imageURL"
                  accept="image/*"
                  onChange={(e) => handleChange(e)}
                />
                <p className="pt-1 pl-2 text-secondary">Upload jpg, jpeg and png only*</p>
              </div>
              <div className="mb-3">
                <label htmlFor="imageFile" className="form-label">
                  Event Date*
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={data.date}
                  // accept="image/*"
                  onChange={(e) => {
                    setData({ ...data, date: e.target.value })
                  }}
                />
                <p className="pt-1 pl-2 text-secondary">Please provide date of article</p>
              </div>
              <div class="mb-3">
                <div>
                  <label htmlFor="textarea80words" className="form-label">
                    Description*
                  </label>
                </div>
                <div>
                  {' '}
                  <textarea
                    class="form-control"
                    id="textarea80words"
                    aria-label="With textarea"
                    maxLength="80"
                    style={{ height: '300px' }}
                    placeholder="Maximum length of 80 words"
                    value={data.description}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="filesData" className="form-label">
                  Upload Files (Images & videos)*
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="filesData"
                  //   accept="image/*"
                  multiple={true}
                  onChange={(e) => {
                    console.log('hiiii', e.target.files)
                    handleChange(e)
                  }}
                />
                <p className="pt-1 pl-2 text-secondary">Upload jpg, jpeg and png only*</p>
              </div>

              <div className="mb-3" style={{ height: '200px' }}>
                <img src={data.imageURL} alt="" height="200px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPhoto
