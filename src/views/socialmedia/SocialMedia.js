import React, { useState,useEffect } from 'react'
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
import './SocialMedia.css';
const SocialMedia = () => {
  const [socialLink, setSocialLink] = useState({})
  const [errors, setErrors] = useState({
    facebookError: '',
    tweeterError: '',
    instagramError: '',
    linkedinError: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'facebook':
        setErrors((errors) => ({
          ...errors,
          facebookError: value ? '' : 'Please enter valid facebook url',
        }))
        break
      case 'twitter':
        setErrors((errors) => ({
          ...errors,
          tweeterError: value ? '' : 'Please enter valid tweeter url',
        }))
        break
      case 'instagram':
        setErrors((errors) => ({
          ...errors,
          instagramError: value ? '' : 'Please enter valid instagram url',
        }))
        break
      case 'linkedIn':
        setErrors((errors) => ({
          ...errors,
          linkedinError: value ? '' : 'Please enter valid linkedIn url',
        }))
        break
      default:
        break
    }

    setSocialLink({ ...socialLink, [name]: value })
  }

  const getUserSocialLink =  (e) => {
    const { token } = JSON.parse(localStorage.getItem('auth'))
     axios.get('https://api-spot-it.herokuapp.com/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({data})=>{
      console.log("data",data.data.socialMediaLinks)
      setSocialLink(data.data.socialMediaLinks)

    })
  }
  const handalSubmit = (e) => {
    if (
      !socialLink.facebook ||
      !socialLink.twitter ||
      !socialLink.instagram ||
      !socialLink.linkedIn
    
    ) {
      return swal('Error!', 'All fields are required', errors)
    }
    console.log('hadelsubmit called', socialLink)
    const { token } = JSON.parse(localStorage.getItem('auth'))
    console.log('token', token)
    axios
      .put(
        'https://api-spot-it.herokuapp.com/api/user',
        { socialLink: socialLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(({ data }) => {
        alert( 'Link Added successfully' )

        console.log('data', data.data)
      })
  }
  useEffect(() => {
    getUserSocialLink()

  }, [])
console.log("social link",socialLink)
  return (
    <>
        <div style={{color:"blue",fontSize:"20px",fontWeight:"bold"}}>Social Media</div>

    <div className='row sub-heading-wrapper'>
    <div className='heading-social'>Social Media</div>

        <div className='col-md-6'>
        <div className="d-flex mt-3">
        Facebook <div style={{ color: 'red' }}> *</div>
          </div>{' '}
        <input value={socialLink.facebook}  onChange={handleChange} name="facebook" className='mt-2' style={{width:"100%",padding:"5px",borderRadius:"4px"}} type="text"></input>
        <p className="text-center py-2 text-danger">{errors.facebookError}</p>

        <div className="d-flex mt-3">
        Twitter <div style={{ color: 'red' }}> *</div>
          </div>{' '}
        <input value={socialLink.twitter}  onChange={handleChange} name="twitter" style={{width:"100%",padding:"5px",borderRadius:"4px"}} type="text"></input>
        <p className="text-center py-2 text-danger">{errors.tweeterError}</p>

        <div className="d-flex mt-3">
        Instagram <div style={{ color: 'red' }}> *</div>
          </div>{' '}
        <input value={socialLink.instagram}  onChange={handleChange} name="instagram" className='mt-2' style={{width:"100%",padding:"5px",borderRadius:"4px"}} type="text"></input>
        <p className="text-center py-2 text-danger">{errors.instagramError}</p>

        <div className="d-flex mt-3">
        Linkedin <div style={{ color: 'red' }}> *</div>
          </div>{' '}
        <input value={socialLink.linkedIn}  onChange={handleChange} name="linkedIn" className='mt-2' style={{width:"100%",padding:"5px",borderRadius:"4px"}} type="text"></input>
        <p className="text-center py-2 text-danger">{errors.linkedinError}</p>

        </div>
   
    <div className='d-flex mt-3'>
        <button   onClick={(e) => handalSubmit(e)} style={{color:"white"}} className='btn btn-warning'>Save</button>
        <button style={{marginLeft:"15px"}}>cancel</button>
    </div>
    </div>
    
    </>
  )
}

export default SocialMedia
