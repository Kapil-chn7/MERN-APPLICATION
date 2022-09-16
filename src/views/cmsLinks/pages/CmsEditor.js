import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { API } from 'src/API'

export default function CmsEditor() {
  const [ckeditorData, updateditorData] = useState('')
  const [id, updateId] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const stringval = location.pathname.substring(21)
    updateId(stringval)
  }, [])
  // const updateContent=()=>{
  //     axios.patch(`${API}/api/addpage/`)
  // }
  const updateDataval = (data) => {
    updateditorData(data)
  }
  const updateData = async () => {
    console.log('inside of it')
    await axios
      .patch(`${API}/api/addpage/${id}`, { updateditorData: ckeditorData })
      .then((resp) => {
        console.log('this is the respone', resp)
        navigate('/view/page')
      })
      .catch((err) => {
        console.log('thsi is the error', err)
      })
  }

  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        data={ckeditorData}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()

          updateDataval(data)
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      />

      <div className="row mt-3">
        <div className="col-12 ">
          <button
            className="btn btn-primary"
            onClick={() => {
              updateData()
            }}
          >
            Save
          </button>
          &nbsp;
          <button className="btn btn-danger" onClick={() => updateDataval('')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
