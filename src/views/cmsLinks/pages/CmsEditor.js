import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { API } from 'src/API'

export default function CmsEditor() {
  const [ckeditorData, updateditorData] = useState({
    updateditorData: '',
    title: '',
    file: null,
  })
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
  const updateDataval = (objval, data) => {
    if (objval == 'editor') {
      updateditorData({ ...ckeditorData, updateditorData: data })
    } else {
      updateditorData({ ...ckeditorData, title: data })
    }

    console.log('this is the state of ckeditor data ', ckeditorData)
  }
  const changefun = (e) => {
    updateditorData({ ...ckeditorData, file: e.target.files[0] })
  }
  const updateData = async () => {
    const newForm = new FormData()
    newForm.append('title', ckeditorData.title)

    newForm.append('updateditorData', ckeditorData.updateditorData)
    if (ckeditorData.file != null) {
      newForm.append('file', ckeditorData.file, 'datafile')
    }

    await axios
      .patch(`${API}/api/addpage/${id}`, newForm)
      .then((resp) => {
        console.log('this is the respone', resp)
        navigate('/view/page')
      })
      .catch((err) => {
        console.log('thsi is the error', err)
      })
  }

  const cancel = () => {
    updateditorData({ title: '', file: null, updateditorData: '' })
  }

  return (
    <form className="card">
      <div className="card-body">
        <div className="row">
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Title
            </span>
            <input
              type="text"
              className="form-control"
              name="title"
              value={ckeditorData.title}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => {
                updateDataval('title', e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className="row">
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={ckeditorData.updateditorData}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
                editor.editing.view.change((writer) => {
                  writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                })
              }}
              onChange={(event, editor) => {
                const data = editor.getData()

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
        <div className="row mt-3">
          <div className="col-md-8  ">
            <input
              type="file"
              className="form-control"
              id="imageURL"
              name="filename"
              onChange={(e) => {
                changefun(e)
              }}
            />
            <p className="pt-1 pl-2 text-secondary">Upload Videos, images and pdf only*</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 ">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                updateData()
              }}
            >
              Save
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-danger "
              onClick={() => {
                if (
                  ckeditorData.title != '' ||
                  ckeditorData.file != null ||
                  ckeditorData.updateditorData != ''
                ) {
                  if (window.confirm('Do you really want to clear the changes?')) {
                    window.location.reload(true)
                  }
                }
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
