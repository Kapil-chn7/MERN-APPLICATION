import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { API } from '../../../API'
export default function EditorDelete() {
  const location = useLocation()
  const [dataval, updatedataval] = useState({})
  const [loading, updateloading] = useState(false)
  const [optionval, updateOption] = useState('true')
  const [testimonies, updateTestimonies] = useState({
    id: '',
    imageFile: null,
    title: '',
    videoFile: null,
    videoIstrue: false,
    imageIstrue: true,
    description: '',
    imageUrl: '',
    videoUrl: '',
  })
  console.log('this is the location ', location.state)
  const choice = location.state.choice

  useEffect(() => {
    console.log('this si the location.state.data yyy', location.state.data)

    if (location.state.choice === '4') {
      let val = location.state.data.videoIstrue === 'true' ? 'video' : 'image'
      updateOption(val)
      updateTestimonies({
        id: location.state.data._id,
        imageUrl: location.state.data.imageFile,
        videoUrl: location.state.data.videoFile,
        title: location.state.data.title,
        videoIstrue: location.state.data.videoIstrue,
        imageIstrue: location.state.data.imageIstrue,
        description: location.state.data.description,
      })
    } else {
      updatedataval({ ...location.state.data })
      console.log('this is the state data ', location.state)
    }
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
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Linkedin Url
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={dataval.linkedinurl}
              onChange={(e) => {
                updatedataval({ ...dataval, linkedinurl: e.target.value })
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
    } else if (choice == '4') {
      return (
        <div className=" card w-50 row mt-3">
          <div className="card-body">
            <input
              type="file"
              className="form-control w-50"
              id="imageURL"
              name="filename"
              onChange={(e) => {
                // updatedataval({ ...dataval, file: e.target.files[0] })
                updateTestimonies({ ...testimonies, imageFile: e.target.files[0] })
              }}
            />
            <p className="pt-1 pl-2 text-secondary">Upload pic*</p>
            <div className="row">
              <a href={testimonies.imageUrl}>View Previous Image</a>
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
              value={testimonies.title}
              onChange={(e) => {
                // updatedataval({ ...dataval, title: e.target.value })
                updateTestimonies({ ...testimonies, title: e.target.value })
              }}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupFile01">
              Upload Video
            </label>
            <input
              type="file"
              class="form-control"
              id="inputGroupFile012"
              // value={testimonies.video}
              onChange={(e) => {
                // updatetestimonies({ ...testimonies, video: e.target.files[0] })
                // updatedataval({ ...dataval, video: e.target.files[0] })

                updateTestimonies({ ...testimonies, videoFile: e.target.files[0] })
              }}
              accept="video/mp4,video/x-m4v,video/*"
            />
          </div>
          <div className="row">
            <a href={testimonies.videoUrl}>View Previous Video</a>
          </div>
          <div className="row">
            {testimonies.imageIstrue === true ? <p>Show Image</p> : <p>Show Video</p>}
          </div>
          <div class="input-group mb-3">
            <select
              class="form-select"
              aria-label="Default select example"
              value={optionval}
              onChange={(e) => {
                // updatetestimonies({ ...testimonies, video: e.target.files[0] })
                // updatedataval({ ...dataval, video: e.target.files[0] })
                if (e.target.value === 'image') {
                  // updatedataval({ ...dataval, image: e.target.value, video: '' })

                  updateTestimonies({ ...testimonies, imageIstrue: true, videoIstrue: false })
                  updateOption('image')
                } else {
                  //updatedataval({ ...dataval, image: '', video: e.target.value })
                  updateTestimonies({ ...testimonies, videoIstrue: true, imageIstrue: false })
                  updateOption('video')
                }
              }}
            >
              <option selected value="image" name="image">
                Show Image in testimony
              </option>
              <option value="video" name="video">
                Show video in testimony
              </option>
            </select>
          </div>
          <div className="input-group mt-3">
            <textarea
              placeholder="Description Here"
              value={testimonies.description}
              onChange={(e) => {
                // updatedataval({ ...dataval, description: e.target.value })
                updateTestimonies({ ...testimonies, description: e.target.value })
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
      formdata.append('linkedinurl', dataval.linkedinurl)
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
    } else if (location.state.choice === '4') {
      //send axios requ3est
      updateloading(true)
      // const formdata = new FormData()
      // formdata.append('title', dataval.title)
      // formdata.append('description', dataval.description)

      // formdata.append('id', dataval._id)

      // if (dataval.file != undefined) {
      //   formdata.append('file', dataval.file, 'file')
      // }

      // if (dataval.image === undefined) {
      //   formdata.append('video', '')
      //   formdata.append('image', 'image')
      // } else {
      //   formdata.append('video', dataval.video)
      //   formdata.append('image', dataval.image)
      // }

      // const [testimonies, updateTestimonies] = useState({
      //   imageFile: null,
      //   title: '',
      //   videoFile: null,
      //   videoIstrue: false,
      //   imageIstrue: true,
      //   description: '',
      // })

      const formdata = new FormData()

      if (
        testimonies.imageFile === null &&
        testimonies.title === '' &&
        testimonies.description === ''
      ) {
        swal({
          title: 'Please enter all details',
          text: 'Content missing',
          icon: 'warning',
          button: 'Return',
        })
      } else {
        formdata.append('imageFile', testimonies.imageFile)
        formdata.append('title', testimonies.title)
        formdata.append('videoIstrue', testimonies.videoIstrue)
        formdata.append('imageIstrue', testimonies.imageIstrue)
        formdata.append('description', testimonies.description)
        formdata.append('imageUrl', testimonies.imageUrl)
        formdata.append('videoUrl', testimonies.videoUrl)
        formdata.append('videoFile', testimonies.videoFile)
        formdata.append('id', location.state.data._id)

        await axios
          .patch(`${API}/api/addpage/testimonies/update`, formdata, {
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
