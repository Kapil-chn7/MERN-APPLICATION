import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'
import { useLocation } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MyCustomUploadAdapterPlugin from '../../assets/plugins/CustomUploadPlugin'
const Editmap = () => {
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [data, setData] = useState({
    state: '',
    mapImage: [],
    showMapURL: '',
    longitude: '',
    lattitude: '',
    filesData: [],
  })
  const [dataval, updatedataval] = useState({ filesData: [] })
  const [loading, setLoading] = useState(false)
  const [limiter, setLimiter] = useState({ state: 30, titleHas: 30 })
  const location = useLocation()
  const [media, chooseMedia] = useState('image')
  const [toggle, updatetoggle] = useState(false)
  const [newdata, updatenewdata] = useState({})
  const [boolval, updatebool] = useState(false)

  const [filestuff, updatefilestuff] = useState({ mapImage: {}, filesDataupdate: [] })

  const [ckeditorData, updateditorData] = useState('')

  // const updateditorval = (objval, data) => {
  //   updateditorData(data)
  // }
  const deleteElement = async (obj) => {
    const obj1 = { id: dataval._id, obj }

    await axios
      .delete(`${API}/api/map/deleteElement`, { data: obj1 })
      .then((resp) => {
        updatetoggle(!toggle)
        // updatedataval([...arrval])
      })
      .catch((err) => {
        swal({
          title: 'Something went wrong',
          text: '500',
          icon: 'error',
          button: 'Close',
          dangerMode: true,
        })
      })
  }
  useEffect(() => {
    axios
      .get(`${API}/api/map/getone`, { params: { _id: location.state.data._id } })
      .then((resp) => {
        updatedataval({ ...resp.data })
        updateditorData(resp.data.ckeditordata)
      })
      .catch((err) => {})
  }, [toggle])

  const handleChange = (e) => {
    if (e.target.id === 'state') {
      updatedataval((prev) => ({ ...prev, state: e.target.value }))
    } else if (e.target.id === 'mapImage') {
      if (
        e.target.files[0]?.type === 'image/jpeg' ||
        e.target.files[0]?.type === 'image/png' ||
        e.target.files[0]?.type === 'image/jpg'
      ) {
        updatefilestuff((prev) => ({
          ...prev,

          mapImage: e.target.files[0],
        }))
      } else {
        swal({
          title: 'Warning',
          text: 'Upload jpg, jpeg, png only.',
          icon: 'error',
          button: 'Close',
          dangerMode: true,
        })
        updatefilestuff((prev) => ({
          ...prev,
          mapImage: {},
        }))
        e.target.value = null
      }
    } else if (e.target.id === 'longitude') {
      updatedataval((prev) => ({ ...prev, longitude: e.target.value }))
    } else if (e.target.id === 'lattitude') {
      updatedataval((prev) => ({ ...prev, lattitude: e.target.value }))
    } else if (e.target.id === 'filesData') {
      updatefilestuff((prev) => ({ ...prev, filesDataupdate: [...e.target.files] }))
    }
  }

  const handleSubmit = async () => {
    if (dataval.state === '' || dataval.mapURL === '') {
      swal({
        title: 'Warning',
        text: 'State or Googlemap url cannot be empty',
        icon: 'warning',
        button: 'Close',
        dangerMode: true,
      })
    } else {
      setLoading(true)
      const formdata = new FormData()
      formdata.append('id', dataval._id)
      formdata.append('state', dataval.state)
      formdata.append('longitude', dataval.longitude)
      formdata.append('lattitude', dataval.lattitude)
      formdata.append('ckeditordata', ckeditorData)

      if (boolval) {
        formdata.append('mapImage', filestuff.mapImage)
      }

      // formdata.append('sfds', 'name')
      filestuff.filesDataupdate.forEach((element) => {
        formdata.append('filesData[]', element)
      })

      await axios
        .patch(`${API}/api/map`, formdata, {
          headers: {
            'Content-Type': 'multipart/formdata',
          },
        })
        .then((resp) => {
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
              Add Location
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
              <Link to="/view/maps">
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
        {loading === true ? (
          <div className="row">
            <div className="col">loading....</div>
          </div>
        ) : (
          <div className="row">
            <div className="col-8 mx-auto">
              <div className="card h-100">
                <div className="card-body px-5">
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      Change State*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      value={dataval.state}
                      maxLength="30"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="longitude" className="form-label">
                      Change Google Map Url*
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="longitude"
                      value={dataval.longitude}
                      maxLength={10}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lattitude" className="form-label">
                      Change Google Map Url*
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="lattitude"
                      maxLength={10}
                      value={dataval.lattitude}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <div className="App">
                        <CKEditor
                          editor={ClassicEditor}
                          data={ckeditorData}
                          onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                              writer.setStyle(
                                'height',
                                '150px',
                                editor.editing.view.document.getRoot(),
                              )
                            })
                          }}
                          config={{
                            extraPlugins: [MyCustomUploadAdapterPlugin],
                          }}
                          onChange={(event, editor) => {
                            //let e = { target: { value: editor.getData(), id: 'description' } }

                            updateditorData(editor.getData())
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mapImage" className="form-label">
                      Change Map Image*
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="mapImage"
                      accept="image/*"
                      onChange={(e) => {
                        updatebool(true)
                        handleChange(e)
                      }}
                    />
                    <div className="mb-3" style={{ height: '200px' }}>
                      <h3 className="mt-3">Previous Image</h3>
                      <img src={dataval.mapImage} alt="" height="200px" />
                    </div>

                    <p className="pt-1 pl-2 text-secondary">Upload jpg, jpeg and png only*</p>
                  </div>
                  <div className="mb-3">
                    <div className="row mt-4">
                      <h3>Video and Images</h3>
                    </div>
                    <label htmlFor="filesData" className="form-label">
                      Upload new Files (Images & videos)*
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

                        dataval.filesData.map((e, i) => {
                          console.log('thsi is the e', e, i)
                          const objectval = Object.keys(e)
                          console.log('this is the objectval', objectval[0])

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
                                      <video
                                        src={e['video']}
                                        width="300"
                                        height="300"
                                        controls
                                      ></video>
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
        )}
      </div>
    </div>
  )
}

export default Editmap
