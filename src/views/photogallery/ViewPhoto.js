import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from 'src/components/auth/authhelper'

const ViewPhoto = () => {
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

  useEffect(() => {
    getPhotoData()
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
              Edit Photo
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <h4 className="mb-0"></h4>
            </div>

            <div className="page-title-right">
              <Link to={`/photogallery/editphoto/${id}`}>
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
                  Edit Photo
                </Button>
              </Link>
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
        <div className="col-8 mx-auto card">
          <div className="card-body px-5">
            <div className="mb-3">
              <h4 className="form-label">Title : </h4>
              <h5>{data?.title}</h5>
            </div>
            <div className="mb-3">
              <h4 className="form-label">Photo : </h4>
              <img src={data?.imageURL} alt="" width="600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPhoto
