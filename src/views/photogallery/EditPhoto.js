import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'

const EditPhoto = () => {
  const id = useParams()?.id
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [data, setData] = useState({
    title: '',
    imageURL: '',
    imageFile: '',
    imagePublicId: '',
  })
  const [loading, setLoading] = useState(false)
  const [limiter, setLimiter] = useState({ title: 50, titleHas: 50 })

  const getPhotoData = () => {
    if (!id) {
      navigate('/photogallery')
      return
    }
    axios
      .get(`${API}/api/photogallery/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData((prev) => ({
          ...prev,
          title: res.data.data.title,
          imageURL: res.data.data.image.url,
          imagePublicId: res.data.data.image.public_id,
        }))
        setLimiter((prev) => ({ ...prev, titleHas: prev.title - res.data.data.title.length }))
      })
  }

  useEffect(() => {
    getPhotoData()
  }, [])

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
    }
  }

  const handleSubmit = () => {
    if (data.title.trim() === '') {
      swal({
        title: 'Warning',
        text: 'Title is required',
        icon: 'error',
        button: 'Close',
        dangerMode: true,
      })
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.set('title', data.title)
    if (data.imageFile) {
      formData.set('imagePublicId', data.imagePublicId)
      formData.set('imageFile', data.imageFile)
    }
    axios
      .patch(`${API}/api/photogallery/${id}`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/formdata',
        },
      })
      .then((res) => {
        swal({
          title: 'Added',
          text: 'Photo updated successfully!',
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
              Edit Photo
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
                {loading ? 'Loading' : 'Update'}
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
                  onChange={(e) => handleChange(e)}
                />
                <p className="pt-1 pl-2 text-secondary">Remaining words : {limiter.titleHas}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="imageURL" className="form-label">
                  Upload Image
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

export default EditPhoto
