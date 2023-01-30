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
    imageFile: null,
    videoIstrue: false,
    imageIstrue: true,
    videoFile: null,
    date: '',
    viewVideo: '',
    videoval: '',
    viewImage: '',
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
        // console.log(
        //   'This is the console.log value of the date',
        //   res.data.data.date.toISOString().slice(0, 10),
        // )

        setData((prev) => ({
          ...prev,
          uniqId: res.data.data._id,
          timestamp: res.data.data.createdAt,
          category: res.data.data.category,
          description: res.data.data.description,
          title: res.data.data.article_title,
          date: res.data.data.date.slice(0, 10),
          status: res.data.data.status,
          viewImage: res.data.data.image,
          viewVideo: res.data.data.videoFile,
          imageIstrue: res.data.data.imageIstrue,
          videoIstrue: res.data.data.videoIstrue,
          videoval: res.data.data.imageIstrue === true ? 'image' : 'video',
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
    formData.append('date', data.date)
    formData.append('imageIstrue', data.imageIstrue)
    formData.append('videoIstrue', data.videoIstrue)
    if (data.imageFile != null) {
      formData.append('imageFile', data.imageFile)
    }
    if (type === 'publish') {
      formData.append('status', 'Published')
      formData.append('published_on', data.timestamp)
    }
    if (data.videoFile != null) {
      formData.append('videoFile', data.videoFile)
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
              <div className="mb-3">
                <label htmlFor="imageFile" className="form-label">
                  Article Date*
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={data.date}
                  // accept="image/*"
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                />
                <p className="pt-1 pl-2 text-secondary">Please provide date of article</p>
              </div>
              <div className="mb-3">
                <label htmlFor="imageFile" className="form-label">
                  Edit thumbnail image*
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) => setData({ ...data, imageFile: e.target.files[0] })}
                />
                <p className="pt-1 pl-2 text-secondary">Only png and Jpg format</p>
              </div>
              <div className="mb-3">
                <label htmlFor="imageFile" className="form-label">
                  Previous thumbnail image*
                </label>
                <img src={data.viewImage} style={{ maxHeight: '400px', maxWidth: '400px' }} />
              </div>
              <div className="row mb-3">
                <div class="input-group mb-3">
                  <a href={data.viewVideo}>VideoPrevious Video</a>
                </div>
                <div class="input-group mb-3">
                  <label class="input-group-text" for="inputGroupFile01">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile012"
                    onChange={(e) => {
                      // updatetestimonies({ ...testimonies, videoFile: e.target.files[0] })

                      setData({ ...data, videoFile: e.target.files[0] })
                    }}
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                </div>
                <div class="input-group mb-3">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={data.videoval}
                    onChange={(e) => {
                      // updatetestimonies({ ...testimonies, video: e.target.files[0] })
                      // updatedataval({ ...dataval, video: e.target.files[0] })

                      if (e.target.value === 'image') {
                        // updatedataval({ ...dataval, image: e.target.value, video: '' })
                        // updatetestimonies({ ...testimonies, imageIstrue: true })

                        setData({
                          ...data,
                          imageIstrue: true,
                          videoIstrue: false,
                          videoval: e.target.value,
                        })
                      } else {
                        //updatedataval({ ...dataval, image: '', video: e.target.value })
                        // updatetestimonies({ ...testimonies, videoIstrue: true, imageIstrue: false })
                        setData({
                          ...data,
                          imageIstrue: false,
                          videoIstrue: true,
                          videoval: e.target.value,
                        })
                      }
                    }}
                  >
                    <option selected value="image" name="image">
                      Show Image in Article
                    </option>
                    <option value="video" name="video">
                      Show video in Article
                    </option>
                  </select>
                </div>
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
