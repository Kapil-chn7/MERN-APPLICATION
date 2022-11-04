import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import { Container } from '@material-ui/core'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'

import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'

import { makeStyles } from '@material-ui/core/styles'
import './SocialMedia.css'
import { API } from '../../API'
const SocialMedia = () => {
  const [socialLink, setSocialLink] = useState({
    facebook: '',
    youtube: '',
    twitter: '',
    whatsapp: '',
    telegram: '',
    gmail: '',
  })
  const [id, updateId] = useState('')

  const handleChange = (e) => {
    setSocialLink({ ...socialLink, [e.name]: e.value })
  }
  const handalSubmit = async () => {
    // console.log('these are the links', socialLink);
    await axios
      .patch(`${API}/api/addsocialmedia`, { data: socialLink, id: id })
      .then(() => {
        swal({
          title: 'Success',
          text: 'Successfully changed the URLs',
          icon: 'success',
          button: 'Return',
        })
      })
      .catch(() => {
        swal({
          title: 'Server Error',
          text: 'Please try again later',
          icon: 'warning',
          button: 'Return',
        })
      })
  }
  useEffect(() => {
    axios
      .get(`${API}/api/addsocialmedia`)
      .then((resp) => {
        updateId(resp.data.data[0]._id)
        console.log('this is the resp', resp.data.data[0])
        setSocialLink({ ...resp.data.data[0] })
      })
      .catch((err) => {
        updateId('6332dad285d0af0016e55b7e')
        console.log('thsi is the error ', err)
      })
  }, [])
  console.log('social link', socialLink)
  return (
    <>
      <div style={{ color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>Social Media</div>

      <div className="row sub-heading-wrapper">
        <div className="heading-social">Social Media</div>

        <div className="col-md-6">
          <div className="d-flex mt-3">
            Facebook <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            name="facebook"
            value={socialLink.facebook}
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value })
            }}
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="text"
          ></input>
          <div className="d-flex mt-3">
            Twitter <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            value={socialLink.twitter}
            name="twitter"
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value })
            }}
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="text"
          ></input>
          <div className="d-flex mt-3">
            YouTube <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            value={socialLink.youtube}
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value })
            }}
            name="youtube"
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="text"
          ></input>
          <div className="d-flex mt-3">
            Gmail <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            value={socialLink.gmail}
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value })
            }}
            name="gmail"
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="text"
          ></input>
          <div className="d-flex mt-3">
            Whatsapp <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            value={socialLink.whatsapp}
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value })
            }}
            name="whatsapp"
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="text"
          ></input>
          <div className="d-flex mt-3">
            Telegram <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            value={socialLink.telegram}
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value })
            }}
            name="telegram"
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="text"
          ></input>
        </div>

        <div className="d-flex mt-3">
          <button
            onClick={(e) => handalSubmit()}
            style={{ color: 'white' }}
            className="btn btn-warning"
          >
            Edit
          </button>
          <button
            style={{ marginLeft: '15px' }}
            onClick={() => {
              window.location.reload()
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default SocialMedia
