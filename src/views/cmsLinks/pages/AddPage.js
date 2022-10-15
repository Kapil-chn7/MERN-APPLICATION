import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MyCustomUploadAdapterPlugin from '../../../assets/plugins/CustomUploadPlugin'
import axios from 'axios'
import swal from 'sweetalert'
import { API } from '../../../API'
import { isAutheticated } from '../../../components/auth/authhelper'
import { useNavigate } from 'react-router-dom'
export default function AddPage() {
  const [dataObj, updateData] = useState({ title: '', updateditorData: '', file: null })
  const [choice, updatechoice] = useState('0')
  const [advisory, updateadvisory] = useState({ title: '', description: '', file: null })
  const [ourpartners, updatepartners] = useState({ title: '', description: '', file: null })
  const [whatdowedo, updatewhatdowedo] = useState('')
  const [loading, updateloading] = useState(false)
  useEffect(() => {}, [choice])
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
    let e = choice
    console.log('this is the e', e)

    if (e === '0') {
      console.log('this is the element of advisoty board', advisory)

      if (advisory.title === '' || advisory.description === '' || advisory.file === null) {
        swal({
          title: 'Input is missing',
          text: 'Please provide some input',
          icon: 'warning',
          button: 'Return',
        })
      } else {
        //send axios requ3est
        updateloading(true)
        const formdata = new FormData()
        formdata.append('title', advisory.title)
        formdata.append('description', advisory.description)
        formdata.append('file', advisory.file, 'file')

        await axios
          .post(`${API}/api/addpage/advisoryboard`, formdata, {
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
            updateloading(false)
            console.log('this is the error', err)
            swal({
              title: 'Server Error',
              text: 'Something went wrong',
              icon: 'warning',
              button: 'Return',
            })
          })
      }
    } else if (e === '1') {
      if (dataObj.title == '' || dataObj.updateditorData == '') {
        swal({
          title: 'Input is missing',
          text: 'Please provide some input',
          icon: 'warning',
          button: 'Return',
        })
      } else {
        // const { token } = isAutheticated()
        updateloading(true)
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
            updateloading(false)
            swal({
              title: 'Success',
              text: 'Content has been added',
              icon: 'success',
              button: 'Return',
            })
            navigate('/view/page')
          })
          .catch((err) => {
            updateloading(false)
            console.log('this is the error ', err)
          })
      }
    } else if (e === '2') {
      if (whatdowedo === '') {
        swal({
          title: 'Input is missing',
          text: 'Please provide some input',
          icon: 'warning',
          button: 'Return',
        })
      } else {
        //send axios requ3est
        updateloading(true)
        await axios
          .post(`${API}/api/addpage/whatdowedo`, { ckeditordata: whatdowedo })
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
            updateloading(false)
            console.log('this is the error', err)
            swal({
              title: 'Server Error',
              text: 'Something went wrong',
              icon: 'warning',
              button: 'Return',
            })
          })
      }
    } else if (e === '3') {
      console.log('this is our partners', ourpartners)
      if (ourpartners.title === '' || ourpartners.description === '' || ourpartners.file === null) {
        swal({
          title: 'Input is missing',
          text: 'Please provide some input',
          icon: 'warning',
          button: 'Return',
        })
      } else {
        //send axios requ3est
        updateloading(true)
        const formdata = new FormData()
        formdata.append('title', ourpartners.title)
        formdata.append('description', ourpartners.description)
        formdata.append('file', ourpartners.file, 'file')

        await axios
          .post(`${API}/api/addpage/ourpartners`, formdata, {
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
  }

  const chooseval = (e) => {
    updatechoice(e)
  }

  //return that component

  const returncomp = (e) => {
    switch (e) {
      case '0':
        return (
          <div className=" card w-50 row mt-3">
            <div className="card-body">
              <input
                type="file"
                className="form-control w-50"
                id="imageURL"
                name="filename"
                onChange={(e) => {
                  updateadvisory({ ...advisory, file: e.target.files[0] })
                }}
              />
              <p className="pt-1 pl-2 text-secondary">Upload profile pic*</p>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={advisory.title}
                onChange={(e) => {
                  updateadvisory({ ...advisory, title: e.target.value })
                }}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Description Here"
                value={advisory.description}
                onChange={(e) => {
                  updateadvisory({ ...advisory, description: e.target.value })
                }}
                className="form-control"
                aria-label="With textarea"
                style={{ height: '150px' }}
              ></textarea>
            </div>
          </div>
        )
      case '1':
        return (
          <div>
            <div
              className="row mt-3"
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

            <div className="row mt-3">
              <div className="App">
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    removePlugins: ['MediaEmbed'],
                  }}
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
          </div>
        )
      case '2':
        return (
          <div>
            <div className="row mt-3">
              <div className="App">
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    removePlugins: ['MediaEmbed'],
                  }}
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
                    updatewhatdowedo(data)
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
          </div>
        )
      case '3':
        return (
          <div className=" card w-50 row mt-3">
            <div className="card-body">
              <input
                type="file"
                className="form-control w-50"
                id="imageURL1"
                name="filename1"
                onChange={(e) => {
                  console.log('this is the e.target.files', e.target.files)
                  updatepartners({ ...ourpartners, file: e.target.files[0] })
                }}
              />
              <p className="pt-1 pl-2 text-secondary">Upload organization pic*</p>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={ourpartners.title}
                onChange={(e) => {
                  updatepartners({ ...ourpartners, title: e.target.value })
                }}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Description Here"
                value={ourpartners.description}
                onChange={(e) => {
                  updatepartners({ ...ourpartners, description: e.target.value })
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

  return (
    <form className="card">
      <div className="container bg-light">
        <div className="card-body">
          <div className="row  w-25">
            <div className="mt-3">
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(e) => {
                  chooseval(e.target.value)
                }}
              >
                <option value="0">Advisory Board</option>
                <option value="1">Footer</option>
                <option value="2">What do we do</option>
                <option value="3">Our Partners</option>
                {/* <option value="3"></option> */}
              </select>
            </div>
          </div>
          {loading == true ? (
            <div className="row">
              <div className=" ">
                <p className="text-center">Loading...</p>
              </div>
            </div>
          ) : (
            returncomp(choice)
          )}
          {loading == false ? (
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
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </form>
  )
}
