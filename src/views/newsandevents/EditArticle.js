import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MyCustomUploadAdapterPlugin from '../../assets/plugins/CustomUploadPlugin'

const EditArticle = () => {
  const id = useParams()?.id
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    uniqId: 'Loading',
    timestamp: new Date(),
    status: 'Save as Draft',
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [limiter, setLimiter] = useState({
    title: 100,
    titleHas: 100,
  })

  const getArticle = () => {
    if (!id) {
      navigate('/newsandevents/articles', { replace: true })
    }
    axios
      .get(`${API}/api/newsandevents/article/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData((prev) => ({
          ...prev,
          uniqId: res.data.data._id,
          timestamp: res.data.data.createdAt,
          category: res.data.data.category,
          description: res.data.data.description,
          title: res.data.data.article_title,
          status: res.data.data.status,
        }))
        setLimiter((prev) => ({
          ...prev,
          titleHas: prev.title - res.data.data.article_title.length,
        }))
      })
      .catch((err) => {
        navigate('/newsandevents/articles', { replace: true })
        swal({
          title: 'Article is not available',
          icon: 'error',
          button: 'Close',
          dangerMode: true,
        })
      })
  }

  const getCategories = () => {
    axios
      .get(`${API}/api/newsandevents/category`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories([...res.data.data])
      })
      .catch((err) => {})
  }

  useEffect(() => {
    getArticle()
    getCategories()
  }, [])

  const handleChange = (e) => {
    if (e.target.id === 'title') {
      if (e.target.value.length === limiter[e.target.id] + 1) return
      setLimiter((prev) => ({
        ...prev,
        [e.target.id + 'Has']: prev[e.target.id] - e.target.value.length,
      }))
    }
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = (type = 'Saved') => {
    if (data.title.trim() === '' || data.description === '' || data.category === '') {
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
    formData.append('article_title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    if (type === 'publish') {
      formData.append('status', 'Published')
      formData.append('published_on', data.timestamp)
    }
    axios
      .patch(`${API}/api/newsandevents/article/${id}`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/formdata',
        },
      })
      .then((res) => {
        swal({
          title: 'Updated',
          text: 'Article updated successfully!',
          icon: 'success',
          button: 'Close',
        })
        setLoading(false)
        navigate('/newsandevents/articles', { replace: true })
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
              Edit Article
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
                onClick={() => handleSubmit('publish')}
                disabled={loading || data.status === 'Published'}
              >
                {loading ? 'Loading' : data.status === 'Published' ? 'Published' : 'Publish'}
              </Button>
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
                {loading
                  ? 'Loading'
                  : data.status === 'Published'
                  ? 'Save Changes'
                  : 'Save as Draft'}
              </Button>
              <Link to="/newsandevents/articles">
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
                  Article Title*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={data.title}
                  maxLength={limiter.title}
                  onChange={(e) => handleChange(e)}
                />
                <p className="pt-1 pl-2 text-secondary">Remaining words : {limiter.titleHas}</p>
              </div>
              <div className="row mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Description*
                </label>
                <div className="App">
                  <div id="editor"></div>
                  <CKEditor
                    editor={ClassicEditor}
                    data={data.description}
                    onReady={(editor) => {
                      editor.editing.view.change((writer) => {
                        writer.setStyle('height', '150px', editor.editing.view.document.getRoot())
                      })
                    }}
                    config={{
                      extraPlugins: [MyCustomUploadAdapterPlugin],
                      removePlugins: ['MediaEmbed'],
                    }}
                    onChange={(event, editor) => {
                      let e = { target: { value: editor.getData(), id: 'description' } }
                      handleChange(e)
                    }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="pageToLink" className="form-label">
                  Category*
                </label>
                <select
                  onChange={(e) => handleChange(e)}
                  value={data.category}
                  className="form-control"
                  id="category"
                >
                  <option value="">---select---</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.category_name}
                    </option>
                  ))}
                </select>
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
              <div className="mb-3">
                <label>Unique ID</label>
                <input type="text" value={data.uniqId} className="form-control" disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditArticle
