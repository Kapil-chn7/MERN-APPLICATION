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
  const [media, chooseMedia] = useState('image')
  const navigate = useNavigate()
  const [data, setData] = useState({
    id: '',
    title: '',
    image: '',
    description: '',
    filesData: [],
  })
  const [dataval, updatedataval] = useState({
    imageURL: {},
    filesDataupdate: [],
    boolupdate: false,
  })
  const [toggle, updatetoggle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [limiter, setLimiter] = useState({ title: 50, titleHas: 50 })
  const deleteElement = async (obj) => {
    const obj1 = { id: id, obj }
    console.log('this is the obj', obj1)

    await axios
      .delete(`${API}/api/photogallery/deleteElement`, { data: obj1 })
      .then((resp) => {
        updatetoggle(!toggle)
        // updatedataval([...arrval])
      })
      .catch((err) => {
        console.log('this is the error', err)
        swal({
          title: 'Something went wrong',
          text: '500',
          icon: 'error',
          button: 'Close',
          dangerMode: true,
        })
      })
  }
  const getPhotoData = () => {
    setData({ ...data, id: id })
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
        console.log('this si the data ', res.data.data.filesData)
        setData((prev) => ({
          ...prev,
          title: res.data.data.title,
          filesData: [...res.data.data.filesData],
          description: res.data.data.description,
          image: res.data.data.image,
        }))
        setLimiter((prev) => ({ ...prev, titleHas: prev.title - res.data.data.title.length }))
      })
  }

  useEffect(() => {
    getPhotoData()
  }, [toggle])

  const handleChange = (e) => {
    if (e.target.id === 'title') {
      if (e.target.value.length === limiter.title + 1) return
      setLimiter((prev) => ({ ...prev, titleHas: prev.title - e.target.value.length }))
      setData((prev) => ({ ...prev, title: e.target.value }))
    } else if (e.target.id === 'textarea80words') {
      setData((prev) => ({ ...prev, description: e.target.value }))
    } else if (e.target.id === 'imageURL') {
      console.log('this is the file ', e.target.files[0])
      updatedataval((prev) => ({ ...prev, imageURL: e.target.files[0], boolupdate: true }))
    } else if (e.target.id === 'filesData') {
      updatedataval((prev) => ({ ...prev, filesDataupdate: [...e.target.files] }))
    }
  }

  const handleSubmit = async () => {
    if (data.title === '') {
      swal({
        title: 'Warning',
        text: 'Title is required',
        icon: 'error',
        button: 'Close',
        dangerMode: true,
      })
    } else {
      setLoading(true)
      const formdata = new FormData()
      formdata.append('id', data.id)
      formdata.append('title', data.title)

      formdata.append('description', data.description)

      if (dataval.boolupdate) {
        console.log('this is the dataval image pppppp ppppp ppppp', dataval.imageURL)
        formdata.append('image', dataval.imageURL)
      }

      // formdata.append('sfds', 'name')
      dataval.filesDataupdate.forEach((element) => {
        formdata.append('filesData[]', element)
      })

      await axios
        .patch(`${API}/api/photogallery/${id}`, formdata, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/formdata',
          },
        })
        .then((resp) => {
          updatetoggle(!toggle)
          swal({
            title: 'success',
            text: 'Successfully added the map',
            icon: 'success',
            button: 'return',
            dangerMode: false,
          })
          setLoading(false)
        })
        .catch((err) => {
          swal({
            title: '500',
            text: 'Server Error',
            icon: 'Warning',
            button: 'Close',
            dangerMode: true,
          })
          setLoading(false)
        })
    }
  }
  return (
    // <div className="container">
    //   <div className="row">
    //     <div className="col-12">
    //       <div
    //         className="
    //                 page-title-box
    //                 d-flex
    //                 align-items-center
    //                 justify-content-between
    //               "
    //       >
    //         <div style={{ fontSize: '22px' }} className="fw-bold">
    //           Edit Photo
    //         </div>
    //         <div style={{ display: 'flex', gap: '1rem' }}>
    //           <h4 className="mb-0"></h4>
    //         </div>

    //         <div className="page-title-right">
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             style={{
    //               fontWeight: 'bold',
    //               marginBottom: '1rem',
    //               textTransform: 'capitalize',
    //               marginRight: '5px',
    //             }}
    //             onClick={() => handleSubmit()}
    //             disabled={loading}
    //           >
    //             {loading ? 'Loading' : 'Update'}
    //           </Button>
    //           <Link to="/photogallery">
    //             <Button
    //               variant="contained"
    //               color="secondary"
    //               style={{
    //                 fontWeight: 'bold',
    //                 marginBottom: '1rem',
    //                 textTransform: 'capitalize',
    //               }}
    //             >
    //               Back
    //             </Button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="col-8 mx-auto">
    //       <div className="card h-100">
    //         <div className="card-body px-5">
    //           <div className="mb-3">
    //             <label htmlFor="title" className="form-label">
    //               Title*
    //             </label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="title"
    //               value={data.title}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <p className="pt-1 pl-2 text-secondary">Remaining words : {limiter.titleHas}</p>
    //           </div>
    //           <div className="mb-3">
    //             <label htmlFor="imageURL" className="form-label">
    //               Upload Image
    //             </label>
    //             <input
    //               type="file"
    //               className="form-control"
    //               id="imageURL"
    //               accept="image/*"
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <p className="pt-1 pl-2 text-secondary">Upload jpg, jpeg and png only*</p>
    //           </div>
    //           <div className="mb-3" style={{ height: '200px' }}>
    //             <img src={data.imageURL} alt="" height="200px" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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

              <div className="mb-3">
                <label htmlFor="imageURL" className="form-label">
                  Update New Image*
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
                <h3>Previous Image</h3>
                <img src={data.image} alt="" height="200px" />
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
              <div className="row">
                <div className="row mt-2">
                  <h4 className="form-label">Previous Video and Images : </h4>
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    onChange={(e) => {
                      chooseMedia(e.target.value)
                    }}
                  >
                    <option value="image">Images</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="row mt-2">
                  {
                    // console.log('this is the elment xxxxxxxxxxx', dataval.filesData)

                    // dataval.filesData.map((e) => {
                    //   console.log('this is the e', e)
                    // })

                    data.filesData.map((e, i) => {
                      // console.log('thsi is the e', e, i)
                      const objectval = Object.keys(e)
                      // console.log('this is the objectval', objectval[0])
                      if (objectval[0] === 'image' && media === 'image') {
                        return (
                          <div className="row mt-5 " key={e._id}>
                            <div className="col-12">
                              <div className="row">
                                <div className="col-8 ">
                                  <img src={e['image']} alt="" height="300" />
                                </div>
                                <div className="col-2"></div>
                                <div className="col-2">
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                      deleteElement({ image: e['image'] })
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      } else if (objectval[0] === 'video' && media === 'video') {
                        return (
                          <div className="row mt-5" key={e._id}>
                            {' '}
                            <div className="col-12">
                              <div className="row bg-success">
                                <div className="col-8 ">
                                  <video src={e['video']} width="300" height="300" controls></video>
                                </div>
                                <div className="col-2"></div>
                              </div>
                              <div className="row">
                                <div className="col-2">
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                      deleteElement({ video: e['video'] })
                                    }}
                                  >
                                    Delete
                                  </button>{' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPhoto
