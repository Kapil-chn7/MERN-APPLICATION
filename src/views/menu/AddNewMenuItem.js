import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'

const AddNewMenuItem = () => {
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [data, setData] = useState({
    menuName: '',
    subMenuName: '',
    pageToLink: '',
    uniqId: 'Loading',
    timestamp: new Date(),
  })
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [limiter, setLimiter] = useState({
    menuName: 50,
    menuNameHas: 50,
    subMenuName: 50,
    subMenuNameHas: 50,
  })

  const getNewId = () => {
    axios
      .get(`${API}/api/menu/newid`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData((prev) => ({ ...prev, uniqId: res.data.data._id }))
      })
      .catch((err) => {})
  }

  const getPages = () => {
    axios
      .get(`${API}/api/addpage`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPages([...res.data.data])
      })
      .catch((err) => {})
  }

  useEffect(() => {
    getNewId()
    getPages()
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
    if (data.menuName.trim() === '' || data.pageToLink === '') {
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
    formData.append('_id', data.uniqId)
    formData.append('menu_name', data.menuName)
    formData.append('sub_menu_name', data.subMenuName.trim())
    formData.append('linked_page', data.pageToLink)
    axios
      .post(`${API}/api/menu`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/formdata',
        },
      })
      .then((res) => {
        swal({
          title: 'Added',
          text: 'Menu Item added successfully!',
          icon: 'success',
          button: 'Return',
        })
        setLoading(false)
        navigate('/menu', { replace: true })
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
              Add New Menu Item
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
              <Link to="/menu">
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
                <label htmlFor="menuName" className="form-label">
                  Menu Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="menuName"
                  value={data.menuName}
                  maxLength="50"
                  onChange={(e) => handleChange(e)}
                />
                <p className="pt-1 pl-2 text-secondary">Remaining words : {limiter.menuNameHas}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="subMenuName" className="form-label">
                  Sub Menu Name (optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subMenuName"
                  value={data.subMenuName}
                  maxLength="50"
                  onChange={(e) => handleChange(e)}
                />
                <p className="pt-1 pl-2 text-secondary">
                  Remaining words : {limiter.subMenuNameHas}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="pageToLink" className="form-label">
                  Page To Link*
                </label>
                <select
                  onChange={(e) => handleChange(e)}
                  value={data.pageToLink}
                  className="form-control"
                  id="pageToLink"
                >
                  <option value="">---select---</option>
                  {pages !== [] &&
                    pages.map((page, i) => (
                      <option value={page._id} key={i}>
                        {page.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label>Unique ID</label>
                <input type="text" value={data.uniqId} className="form-control" disabled />
              </div>
              <div className="mb-3">
                <label>TimeStamp</label>
                <input type="text" value={data.timestamp} className="form-control" disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewMenuItem
