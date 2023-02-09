import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../API'
import { isAutheticated } from 'src/components/auth/authhelper'
import swal from 'sweetalert'
export default function () {
  const [currentValue, updateValue] = useState('')
  const [fileUrl, updateFileUrl] = useState('')
  const [loading, updateLoading] = useState(false)
  const [file, uploadFile] = useState(null)
  const token = isAutheticated().token
  //changeCopy right

  useEffect(() => {
    updateLoading(true)

    axios
      .get(`${API}/api/copyright`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        // if (res.data.data.length == 0) {
        //   updatepresentornot(false)
        // } else {
        //   console.log('This is the useEffect ', res.data.data[0]._id)
        //   updateId(res.data.data[0]._id)
        //   updateValue(res.data.data[0].copyright)
        // }
        // console.log('This si the res', res.data.data[0].copyright)
        updateValue(res.data.data[0].copyright)
        updateFileUrl(res.data.data[0].fileUrl)
        updateLoading(false)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [])

  //changing state

  const changevalue = (e) => {
    updateValue(e)
  }
  //submitting the copyright
  const submit = () => {
    updateLoading(true)
    const formData = new FormData()
    formData.append('data', currentValue)
    formData.append('file', file)

    axios
      .patch(`${API}/api/copyright`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/formdata',
        },
      })
      .then((resp) => {
        updateLoading(false)
        console.log('this is the resposne', resp)
        swal({
          title: 'Successfully Updated',
          text: 'Success',
          icon: 'success',
          button: 'Return',
        })
      })
      .catch((err) => {
        updateLoading(false)
        swal({
          title: '500',
          text: 'Server Error Something went wrong',
          icon: 'warning',
          button: 'Return',
        })
        console.log('This is the error', err)
      })
  }

  //cancel the copyright state

  const clear = () => {
    updateValue('')
    console.log('Clear clicked')
  }
  return (
    <div className="card">
      <div className="card-body">
        {loading === false ? (
          <div className="row">
            <div className="row">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  copyright
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="copyright"
                  aria-label="Username"
                  value={currentValue}
                  onChange={(e) => {
                    changevalue(e.target.value)
                  }}
                  aria-describedby="basic-addon1"
                  maxLength="150"
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <a href={fileUrl}>View Previous QR Code</a>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Upload new QR code
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    uploadFile(e.target.files[0])
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="btn btn-info" onClick={submit}>
                  Submit
                </div>
                &nbsp;
                <div className="btn btn-danger" onClick={clear}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <center>
              <h4>Loading....</h4>
            </center>
          </div>
        )}
      </div>
    </div>
  )
}
