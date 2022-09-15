import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { API } from '../../API'
export const EditCms = (props) => {
  const { eField } = props
  const [usercms, setCms] = useState(props.data)
  const [errors, setErrors] = useState({
    titleError: '',
    bodyError: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'title':
        setErrors((errors) => ({
          ...errors,
          titleError: value ? '' : 'Please enter Title',
        }))
        break
      case 'body':
        setErrors((errors) => ({
          ...errors,
          bodyError: value ? '' : 'Please enter body',
        }))
        break
      default:
        break
    }

    setCms({ ...usercms, [eField]: { ...usercms[eField], [name]: value } })
  }

  const handalSubmit = (e) => {
    if (!usercms[eField].title || !usercms[eField].body) {
      return swal('Error!', 'All fields are required', errors)
    }
    console.log('hadelsubmit called', usercms)
    const { token } = JSON.parse(localStorage.getItem('auth'))
    console.log('token', token)
    axios
      .put(
        `${API}/api/user`,
        { cms: usercms },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(({ data }) => {
        alert('Address Updated successfully')
        console.log('data', data.data)
        if (data) {
          props.setEdit(false)
        }
      })
  }
  if (Object.keys(usercms[eField]).length == 0) return null
  const { title, body } = usercms[eField]
  return (
    <div>
      <div>
        <button
          variant="contained"
          style={{ fontWeight: 'bold', marginRight: '1rem' }}
          onClick={(e) => handalSubmit(e)}
        >
          Save
        </button>
        <button
          variant="contained"
          style={{ fontWeight: 'bold', background: 'red', color: 'white' }}
          onClick={() => {
            props.setEdit(false)
          }}
        >
          Cancel
        </button>
      </div>
      <div className="row mt-5">
        <div className="col-md-12" style={{ background: 'white', padding: '20px' }}>
          <div className="d-flex mt-3">
            Title <div style={{ color: 'red' }}> *</div>
          </div>
          <input
            name="title"
            onChange={(e) => handleChange(e)}
            style={{ width: '100%', borderRadius: '10px', padding: '8px' }}
            type="text"
            value={title}
          ></input>
          <div className="d-flex mt-3">
            Body <div style={{ color: 'red' }}> *</div>
          </div>
          <textarea
            name="body"
            value={body}
            onChange={(e) => handleChange(e)}
            style={{ width: '100%', borderRadius: '10px', padding: '8px', height: '190px' }}
            type="textarea"
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default EditCms
