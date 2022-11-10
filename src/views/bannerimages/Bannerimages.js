import React from 'react'
import { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { API } from '../../API'
import axios from 'axios'
export default function Bannerimages() {
  const [bannervalue, updatebannerval] = useState('1')
  const [fileval, updatefile] = useState({ onoff: false, data: {} })
  const [url, updateUrl] = useState('')
  useEffect(() => {
    console.log('this is the bannervalue ', bannervalue)
    axios
      .get(`${API}/api/bannerimages`, { params: { index: bannervalue } })
      .then((resp) => {
        console.log('this is the resp', resp.data.data)
        updateUrl(resp.data.data)
      })
      .catch((err) => {
        if (err.response.status === 404) {
          updateUrl(
            'http://res.cloudinary.com/du6jcxkfx/image/upload/v1667906283/qftu82dqufbl5glk2kjr.png',
          )
        } else {
          console.warn(500)
          updateUrl('')
        }
      })
  }, [bannervalue])

  const handlesubmit = async () => {
    console.log('handle submit', fileval)

    if (fileval.onoff === false) {
      swal({
        title: 'warning',
        text: 'Please select a file',
        icon: 'warning',
        button: 'Return',
      })
    } else {
      try {
        const formdata = new FormData()
        formdata.append('index', bannervalue)
        formdata.append('file', fileval.data)

        await axios.patch(`${API}/api/bannerimages`, formdata).then((resp) => {
          swal({
            title: 'success',
            text: 'Successfully update image',
            icon: 'success',
            button: 'Return',
          })
        })
      } catch (err) {
        swal({
          title: '500',
          text: 'Server error',
          icon: 'warning',
          button: 'Return',
        })
      }
    }
  }
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="row m-2">
          <span>
            <h3>Choose banner : </h3>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                updatebannerval(e.target.value)
              }}
            >
              <option value="1">Contact Us banner</option>
              <option value="2">Gallery banner</option>
              <option value="3">Where we work banner</option>
              <option value="4">Get involved banner</option>
              <option value="5">Advisory Board banner</option>
              <option value="6">Vision banner</option>
              <option value="7">Donation banner</option>
              <option value="8">Our proud donors banner</option>
            </select>
          </span>
        </div>
        <div className="row m-2">
          <a href={url} target="blank">
            View Previous image
          </a>
        </div>
        <div className="row m-2">
          <div class="input-group mb-3">
            {/* <label class="input-group-text" for="inputGroupFile01">
              Upload
            </label> */}
            <input
              type="file"
              class="form-control"
              id="inputGroupFile01"
              onChange={(e) => {
                console.log('this is the onchange', e.target.files[0])
                updatefile({ onoff: true, data: e.target.files[0] })
              }}
            />
          </div>
        </div>

        <div className="row m-3">
          <button className="btn btn-primary col-2" type="button" onClick={handlesubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
