import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
const AddPhoto = () => {
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
  const [ckeditorData, updateditorData] = useState('')
  const [loading, setLoading] = useState(false)
  const [limiter, setLimiter] = useState({ state: 30, titleHas: 30 })
  const updateDataval = (objval, data) => {
    updateditorData(data)
  }
  const handleChange = (e) => {
    if (e.target.id === 'state') {
      setData((prev) => ({ ...prev, state: e.target.value }))
    } else if (e.target.id === 'mapImage') {
      if (
        e.target.files[0]?.type === 'image/jpeg' ||
        e.target.files[0]?.type === 'image/png' ||
        e.target.files[0]?.type === 'image/jpg'
      ) {
        setData((prev) => ({
          ...prev,
          showMapURL: URL.createObjectURL(e.target.files[0]),
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
        setData((prev) => ({
          ...prev,
          imageURL: '',
          imageFile: '',
        }))
        e.target.value = null
      }
    } else if (e.target.id === 'longitude') {
      setData((prev) => ({ ...prev, longitude: e.target.value }))
    } else if (e.target.id === 'lattitude') {
      setData((prev) => ({ ...prev, lattitude: e.target.value }))
    } else if (e.target.id === 'filesData') {
      console.log('event multiple files', e.target.files)
      setData((prev) => ({ ...prev, filesData: [...e.target.files] }))
    }
  }

  const handleSubmit = async () => {
    // console.log('this i sht efiles', data)

    if (
      data.state === '' ||
      data.mapImage.length === 0 ||
      data.lattitude === '' ||
      data.longitude === ''
    ) {
      swal({
        title: 'Warning',
        text: 'State, MapImage, longitude or lattitude cannot be empty',
        icon: 'warning',
        button: 'Close',
        dangerMode: true,
      })
    } else {
      setLoading(true)
      const formdata = new FormData()
      formdata.append('state', data.state)
      formdata.append('mapImage', data.mapImage)
      formdata.append('longitude', data.longitude)
      formdata.append('lattitude', data.lattitude)
      formdata.append('ckeditordata', ckeditorData)

      // formdata.append('sfds', 'name')
      data.filesData.forEach((element) => {
        formdata.append('filesData[]', element)
      })

      await axios
        .post(`${API}/api/map`, formdata, {
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
                      State*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      value={data.state}
                      maxLength="30"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mapURL" className="form-label">
                      Enter longitude*
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="longitude"
                      maxLength={10}
                      value={data.longitude}
                      placeholder="do not enter degree symbol"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mapURL" className="form-label">
                      Enter Lattitude*
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      maxLength={10}
                      id="lattitude"
                      value={data.lattitude}
                      placeholder="do not enter degree symbol"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <CKEditor
                        editor={ClassicEditor}
                        data={ckeditorData}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          // console.log("Editor is ready to use!", editor);
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              'height',
                              '200px',
                              editor.editing.view.document.getRoot(),
                            )
                          })
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData()
                          console.log('this is the data, ckeditor', data)
                          updateDataval('editor', data)
                        }}
                        onBlur={(event, editor) => {
                          console.log('Blur.', editor)
                        }}
                        onFocus={(event, editor) => {
                          console.log('Focus.', editor)
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mapImage" className="form-label">
                      Upload Map Image*
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="mapImage"
                      accept="image/*"
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="pt-1 pl-2 text-secondary">Upload jpg, jpeg and png only*</p>
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
                    <img src={data.showMapURL} alt="" height="200px" />
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

export default AddPhoto
