import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { API } from '../../../API'
import { isAutheticated } from '../../../components/auth/authhelper'
import { useNavigate } from 'react-router-dom'
export default function AddPage() {
  const [dataObj, updateData] = useState({ title: '', updateditorData: '', file: null })
  const navigate = useNavigate()

  let style1 = {
    width: '100%',
    paddingLeft: '40px',
    paddingRight: '15px',
  }
  // useEffect(() => {
  //   // Set editor width to 100% and height to 350px.
  //   CKEDITOR.replace('editor1', {
  //     height: ['500px'],
  //   })

  //   console.log('hi resized')
  // }, [])
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

  const changefun = (e) => {
    console.log('this is the fun', e.target.files[0])

    updateData({ ...dataObj, file: e.target.files[0] })
  }
  const sendToserver = async () => {
    if (dataObj.title == '' || dataObj.updateditorData == '') {
      alert('Please provide some input')
    } else {
      console.log('Sending to server', dataObj)
      // const { token } = isAutheticated()
      console.log('this is dataObj', dataObj)

      const formdata = new FormData()
      formdata.append('title', dataObj.title)
      formdata.append('editordata', dataObj.updateditorData)
      formdata.append('file', dataObj.file)
      console.log(
        'thsi si the file ',
        formdata.get('file'),
        formdata.get('title'),
        formdata.get('editordata'),
      )

      await axios
        .post(`${API}/api/addpage`, formdata, {
          headers: {
            'Content-Type': 'multipart/formdata',
          },
        })
        .then((resp) => {
          console.log('this is the resp', resp)
          navigate('/view/page')
        })
        .catch((err) => {
          console.log('this is the error ', err)
        })
    }
  }

  return (
    <form className="card">
      <div className="container bg-light">
        <div className="card-body">
          <div
            className="row "
            // style={style1}
          >
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

          <div className="row ">
            <div className="App">
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                  editor.editing.view.change((writer) => {
                    writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                  })
                }}
                data={dataObj.updateditorData}
                // onReady={(editor) => {
                //   // You can store the "editor" and use when it is needed.
                //   // console.log('Editor is ready to use!', editor)
                // }}
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
                  if (
                    ckeditorData.title != '' ||
                    ckeditorData.file != null ||
                    ckeditorData.ckeditorData != ''
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
      </div>
    </form>
  )
}
