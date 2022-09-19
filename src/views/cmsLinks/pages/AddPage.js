import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { API } from '../../../API'
import { isAutheticated } from '../../../components/auth/authhelper'
import { useNavigate } from 'react-router-dom'
export default function AddPage() {
  const [dataObj, updateData] = useState({ title: '', updateditorData: '' })
  const navigate = useNavigate()
  //   useEffect(() => {}, [dataObj])
  const changeData = (event) => {
    let name = event.target.name

    if (name == 'title') {
      let obj = { ...dataObj, title: event.target.value }
      updateData(obj)
    }
  }
  const ckeditordataupdate = (value) => {
    let obj = { ...dataObj, updateditorData: value }
    updateData(obj)
  }
  const sendToserver = async () => {
    if (dataObj.title == '' || dataObj.updateditorData == '') {
      alert('Please provide some input')
    } else {
      console.log('Sending to server', dataObj)
      const { token } = isAutheticated()
      await axios
        .post(`${API}/api/addpage`, dataObj)
        .then((resp) => {
          console.log('this is the resp', resp)
          navigate('/view/page')
        })
        .catch((err) => {
          console.log('this is the error ', err)
        })
    }
  }

  const cancelData = () => {
    updateData({ updateditorData: '', title: '' })
  }

  return (
    <div className="container bg-light">
      <div className="row ">
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Title
          </span>
          <input
            type="text"
            className="form-control"
            name="title"
            value={dataObj.title}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => {
              changeData(e)
            }}
            required
          />
        </div>
      </div>
      <div className="row m-4">
        <div className="App">
          <CKEditor
            editor={ClassicEditor}
            data={dataObj.updateditorData}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              // console.log('Editor is ready to use!', editor)
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              ckeditordataupdate(data)
            }}
            onBlur={(event, editor) => {
              //   console.log('Blur.', editor)
            }}
            onFocus={(event, editor) => {
              //   console.log('Focus.', editor)
            }}
          />
        </div>
      </div>
      <div className="row m-4">
        <div className="col-4">
          <button className="btn btn-success" onClick={sendToserver}>
            Save
          </button>
          &nbsp;
          <button className="btn btn-danger " onClick={cancelData}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
