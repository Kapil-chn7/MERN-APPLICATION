import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'

const EditCategory = () => {
  const id = useParams()?.id
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [data, setData] = useState({
    categoryName: '',
    uniqId: 'Loading',
    timestamp: new Date(),
  })
  const [loading, setLoading] = useState(false)
  const [limiter, setLimiter] = useState({
    categoryName: 50,
    categoryNameHas: 50,
  })

  const getCategory = () => {
    if (!id) {
      navigate('/newsandevents/categories', { replace: true })
    }
    axios
      .get(`${API}/api/newsandevents/category/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData((prev) => ({
          ...prev,
          uniqId: res.data.data._id,
          categoryName: res.data.data.category_name,
          timestamp: res.data.data.createdAt,
        }))
      })
      .catch((err) => {})
  }

  useEffect(() => {
    getCategory()
  }, [])

  const handleChange = (e) => {
    if (e.target.type === 'text') {
      if (e.target.value.length === limiter[e.target.id] + 1) return
      setLimiter((prev) => ({
        ...prev,
        [e.target.id + 'Has']: prev[e.target.id] - e.target.value.length,
      }))
    }
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = () => {
    if (data.categoryName.trim() === '') {
      swal({
        title: 'Warning',
        text: 'Fill all mandatory fields',
        icon: 'error',
        button: 'Close',
        dangerMode: true,
      })
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('category_name', data.categoryName)
    axios
      .patch(`${API}/api/newsandevents/category/${id}`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/formdata',
        },
      })
      .then((res) => {
        swal({
          title: 'Added',
          text: 'Category updated successfully!',
          icon: 'success',
          button: 'Return',
        })
        setLoading(false)
        navigate('/newsandevents/categories', { replace: true })
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
              Edit Category
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
              <Link to="/newsandevents/categories">
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
                <label htmlFor="categoryName" className="form-label">
                  Category Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={data.categoryName}
                  maxLength="50"
                  onChange={(e) => handleChange(e)}
                />
                <p className="pt-1 pl-2 text-secondary">
                  Remaining words : {limiter.categoryNameHas}
                </p>
              </div>
              <div className="mb-3">
                <label>Unique ID</label>
                <input type="text" value={data.uniqId} className="form-control" disabled />
              </div>
              <div className="mb-3">
                <label>TimeStamp</label>
                <input
                  type="text"
                  value={new Date(data.timestamp)}
                  className="form-control"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategory
