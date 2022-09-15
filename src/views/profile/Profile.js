import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import axios from 'axios'

import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import { API } from 'src/API'

import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'

import { makeStyles } from '@material-ui/core/styles'
import swal from 'sweetalert'

import './Profile.css'
const Profile = () => {
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  )
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    ProfilePicError: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          emailError: validEmailRegex.test(value) ? '' : 'Email is not valid!',
        })
        break

      case 'name':
        setErrors((errors) => ({
          ...errors,
          nameError: value ? '' : 'Please enter user name',
        }))
        break
      case 'url':
        setErrors((errors) => ({
          ...errors,
          ProfilePicError: value ? '' : 'Please select profile',
        }))
        break
      default:
        break
    }

    setProfile({ ...profile, [name]: value })
  }
  const getUerProfile = (e) => {
    const { token } = JSON.parse(localStorage.getItem('auth'))
    axios
      .get(`${API}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log('data', data.data)
        setLoading(false)
        setProfile(data.data.picture)
      })
  }
  const handalSubmit = (e) => {
    if (!profile.email || !profile.name || !profile.url) {
      return swal('Error!', 'All fields are required', errors)
    }
    console.log('hadelsubmit called', profile)
    const { token } = JSON.parse(localStorage.getItem('auth'))
    console.log('token', token)
    axios
      .put(
        'https://api-spot-it.herokuapp.com/api/user',
        { profile: profile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(({ data }) => {
        alert('Profile Updated successfully')
        console.log('data', data.data)
      })
  }
  useEffect(() => {
    getUerProfile()
  }, [])
  console.log('profile pic details', profile)
  return (
    <>
      <div style={{ color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>Profile</div>

      <div className="row sub-heading-wrapper">
        <div className="heading-social">Profile</div>

        <div className="col-md-6">
          <div className="mt-3">Profile Photo</div>
          <input
            name="url"
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="file"
            onChange={handleChange}
          ></input>
          <p className="text-center py-2 text-danger">{errors.ProfilePicError}</p>
          <div className="d-flex mt-3">
            Name <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            name="name"
            value={profile.name}
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="text"
            onChange={handleChange}
          ></input>
          <p className="text-center py-2 text-danger">{errors.nameError}</p>
          <div className="d-flex mt-3">
            Email <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            name="email"
            value={profile.email}
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="text"
            onChange={handleChange}
          ></input>
          <p className="text-center py-2 text-danger">{errors.emailError}</p>
        </div>
        <div className="d-flex mt-3">
          <button
            onClick={(e) => handalSubmit(e)}
            style={{ color: 'white' }}
            className="btn btn-warning"
          >
            Save
          </button>
          <button style={{ marginLeft: '15px' }}>cancel</button>
        </div>
      </div>
    </>
  )
}

export default Profile
