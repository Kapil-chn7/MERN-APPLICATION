import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'
import { useLocation } from 'react-router-dom'
import { element } from 'prop-types'
const Viewmap = () => {
  const id = useParams()?.id
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [data, setData] = useState({ filesData: [] })
  const [media, chooseMedia] = useState('image')
  const [loading, setLoading] = useState(false)

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
      })
  }

  const location = useLocation()

  useEffect(() => {
    // getPhotoData()

    axios
      .get(`${API}/api/map/getone`, { params: { _id: location.state.data._id } })
      .then((resp) => {
        setData({ ...resp.data })
      })
      .catch((err) => {})
  }, [])
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
              View Photo
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <h4 className="mb-0"></h4>
            </div>

            <div className="page-title-right">
              <Link to={'/view/maps/editmap'} state={{ data: data }}>
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
                  Edit Map
                </Button>
              </Link>
              <Link to="/view/maps/">
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
        <div className="col-8 mx-auto card">
          <div className="card-body px-5">
            <div className="mb-3">
              <h4 className="form-label">Title : </h4>
              <h5>{data?.state}</h5>
            </div>
            <div className="mb-3">
              <span>
                <h4 className="form-label">Longitude & Latitude : </h4>
                {data.longitude}&#176;N &nbsp;{data.lattitude}&#176;E
              </span>
            </div>
            <div className="mb-3">
              <h4 className="form-label">Map Image : </h4>
              <img src={data?.mapImage} alt="" width="400" height="400" />
            </div>
            <div className="mb-3 col">
              <div className="row m-2">
                <h4 className="form-label">Gallery Medias : </h4>
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
              {
                //console.log('thsi si the element data ', data.filesData)

                data.filesData.map((e, i) => {
                  console.log('thsi is the e', e, i)
                  const objectval = Object.keys(e)
                  console.log('this is the objectval', objectval[0])

                  if (objectval[0] === 'image' && media === 'image') {
                    return (
                      <div className="row mt-3">
                        <img src={e['image']} alt="" width="600" height="300" />
                      </div>
                    )
                  } else if (objectval[0] === 'video' && media === 'video') {
                    return (
                      <div className="row mt-3">
                        {' '}
                        <video src={e['video']} width="600" height="300" controls></video>
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
  )
}

export default Viewmap
