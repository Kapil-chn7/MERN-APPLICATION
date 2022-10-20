import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { API } from '../../../API'
export default function EditorDelete() {
  const location = useLocation()
  const [dataval, updatedataval] = useState({})
  const [loading, updateloading] = useState(false)
  console.log('this is the location ', location.state)
  const choice = location.state.choice

  useEffect(() => {
    console.log('this si the location.state.data ', location.state)
    updatedataval({ ...location.state.data })
    console.log('this is the state data ', location.state)
  }, [])

  const choosedComp = () => {
    if (choice === '3') {
      return (
        <div className="row">
          <div className=" card w-50 row mt-3">
            <div className="card-body">
              <input
                type="file"
                className="form-control w-50"
                id="imageURL1"
                name="filename1"
                onChange={(e) => {
                  //   console.log('this is the e.target.files', e.target.files)
                  updatedataval({ ...dataval, file: e.target.files[0] })
                }}
              />

              <p className="pt-1 pl-2 text-secondary">Upload organization pic*</p>
              <div className="row">
                <a href={dataval.url}>View Previous Image</a>
              </div>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={dataval.title}
                onChange={(e) => {
                  updatedataval({ ...dataval, title: e.target.value })
                }}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Description Here"
                value={dataval.description}
                onChange={(e) => {
                  updatedataval({ ...dataval, description: e.target.value })
                }}
                className="form-control"
                aria-label="With textarea"
                style={{ height: '150px' }}
              ></textarea>
            </div>
          </div>
        </div>
      )
    } else if (choice == '1') {
      return (
        <div className=" card w-50 row mt-3">
          <div className="card-body">
            <input
              type="file"
              className="form-control w-50"
              id="imageURL"
              name="filename"
              onChange={(e) => {
                updatedataval({ ...dataval, file: e.target.files[0] })
              }}
            />
            <p className="pt-1 pl-2 text-secondary">Upload profile pic*</p>
            <div className="row">
              <a href={dataval.url}>View Previous Image</a>
            </div>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Title
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={dataval.title}
              onChange={(e) => {
                updatedataval({ ...dataval, title: e.target.value })
              }}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group">
            <textarea
              placeholder="Description Here"
              value={dataval.description}
              onChange={(e) => {
                updatedataval({ ...dataval, description: e.target.value })
              }}
              className="form-control"
              aria-label="With textarea"
              style={{ height: '150px' }}
            ></textarea>
          </div>
        </div>
      )
    }
  }

  const sendToserver = async () => {
    if (location.state.choice === '3') {
      //send axios requ3est
      updateloading(true)
      const formdata = new FormData()
      formdata.append('title', dataval.title)
      formdata.append('description', dataval.description)

      formdata.append('id', dataval._id)

      if (dataval.file != undefined) {
        formdata.append('file', dataval.file, 'file')
      }

      await axios
        .patch(`${API}/api/addpage/ourpartners/update`, formdata, {
          headers: {
            'Content-Type': 'multipart/formdata',
          },
        })
        .then((resp) => {
          updateloading(false)
          swal({
            title: 'Success',
            text: 'Content has been added',
            icon: 'success',
            button: 'Return',
          })
        })
        .catch((err) => {
          console.log('this is the error', err)
          updateloading(false)
          swal({
            title: 'Server Error',
            text: 'Something went wrong',
            icon: 'warning',
            button: 'Return',
          })
        })
    } else if (location.state.choice === '1') {
      //send axios requ3est
      updateloading(true)
      const formdata = new FormData()
      formdata.append('title', dataval.title)
      formdata.append('description', dataval.description)

      formdata.append('id', dataval._id)

      if (dataval.file != undefined) {
        formdata.append('file', dataval.file, 'file')
      }

      await axios
        .patch(`${API}/api/addpage/advisoryboard/update`, formdata, {
          headers: {
            'Content-Type': 'multipart/formdata',
          },
        })
        .then((resp) => {
          updateloading(false)
          swal({
            title: 'Success',
            text: 'Content has been added',
            icon: 'success',
            button: 'Return',
          })
        })
        .catch((err) => {
          console.log('this is the error', err)
          updateloading(false)
          swal({
            title: 'Server Error',
            text: 'Something went wrong',
            icon: 'warning',
            button: 'Return',
          })
        })
    }
  }
  return (
    <div className="row">
      {choosedComp()}
      <div className="row m-4">
        <div className="col-4">
          <button className="btn btn-success" onClick={sendToserver} type="button">
            Save
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger "
            onClick={() => {
              if (window.confirm('Do you really want to clear the changes?')) {
                window.location.reload(true)
              }
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
