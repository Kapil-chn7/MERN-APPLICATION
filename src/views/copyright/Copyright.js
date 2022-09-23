import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../API'
export default function () {
  const [currentValue, updateValue] = useState('')
  const [presentornot, updatepresentornot] = useState(true)
  const [id, updateId] = useState('')

  //changeCopy right

  useEffect(() => {
    axios
      .get(`${API}/api/copyright`)
      .then((res) => {
        if (res.data.data.length == 0) {
          updatepresentornot(false)
        } else {
          console.log('This is the useEffect ', res.data.data[0]._id)
          updateId(res.data.data[0]._id)
          updateValue(res.data.data[0].copyright)
        }
      })
      .catch((err) => {
        console.log('This is the catch', err)
      })
  }, [])

  //changing state

  const changevalue = (e) => {
    updateValue(e)
  }
  //submitting the copyright
  const submit = () => {
    console.log('thsi si the value of the submit ', currentValue)

    if (!presentornot) {
      axios
        .post(`${API}/api/copyright`, { data: currentValue })
        .then((resp) => {
          console.log('this is the resposne', resp)
        })
        .catch((err) => {
          console.log('This is the error', err)
        })
    } else {
      axios
        .patch(`${API}/api/copyright`, { id: id, data: currentValue })
        .then((resp) => {
          console.log('this is the resposne', resp)
        })
        .catch((err) => {
          console.log('This is the error', err)
        })
    }
  }

  //cancel the copyright state

  const clear = () => {
    updateValue('')
    console.log('Clear clicked')
  }
  return (
    <div className="card">
      <div className="card-body">
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
    </div>
  )
}
