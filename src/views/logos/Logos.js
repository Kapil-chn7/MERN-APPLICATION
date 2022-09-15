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
import swal from 'sweetalert'

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
import './Logos.css'
import axios from 'axios'
import { API } from '../../API'
const Address = () => {
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  )
  const validMobileRegex = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)
  const [address, setAddress] = useState({})
  const [file, setFile] = useState()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    emailError: '',
    companyError: '',
    cityError: '',
    countryError: '',
    stateError: '',
    pincodeError: '',
    mobileError: '',
    addressError: '',
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

      case 'companyName':
        setErrors((errors) => ({
          ...errors,
          companyError: value ? '' : 'Please enter company name',
        }))
        break
      case 'city':
        setErrors((errors) => ({
          ...errors,
          cityError: value ? '' : 'Please enter city',
        }))
        break
      case 'state':
        setErrors((errors) => ({
          ...errors,
          stateError: value ? '' : 'Please enter state',
        }))
        break
      case 'address':
        setErrors((errors) => ({
          ...errors,
          addressError: value ? '' : 'Please enter Address',
        }))
        break
      case 'pincode':
        setErrors((errors) => ({
          ...errors,
          pincodeError: value ? '' : 'Please enter Pincode',
        }))
        break
      case 'pincode':
        setErrors((errors) => ({
          ...errors,
          pincodeError: value ? '' : 'Please enter Pincode',
        }))
        break
      case 'country':
        setErrors((errors) => ({
          ...errors,
          countryError: value ? '' : 'Please enter country',
        }))
        break
      case 'contactNo':
        setErrors((errors) => ({
          ...errors,
          mobileError: validMobileRegex.test(value) ? '' : 'Please enter valid mobile number!',
        }))
        break

      default:
        break
    }

    setAddress({ ...address, [name]: value })
  }
  const getUserAddress = (e) => {
    const { token } = JSON.parse(localStorage.getItem('auth'))
    axios
      .get(`${API}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setLoading(false)
        //don't know functionality of this
        // setAddress(data.data.address)
      })
  }
  const handalSubmit = (e) => {
    if (
      !address.email ||
      !address.country ||
      !address.city ||
      !address.contactNo ||
      !address.state ||
      !address.address ||
      !address.pincode ||
      !address.companyName
    ) {
      return swal('Error!', 'All fields are required', errors)
    }

    console.log('hadelsubmit called', address)
    const { token } = JSON.parse(localStorage.getItem('auth'))
    console.log('token', token)
    axios
      .put(
        `${API}/api/user`,
        { address: address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(({ data }) => {
        alert('Address Updated successfully')
        console.log('data', data.data)
      })
  }
  useEffect(() => {
    getUserAddress()
  }, [])
  // console.log('users', address)
  // if (Object.keys(address).length == 0) return null //for object
  // console.log('address', address)

  const handleChangeFile = (e) => {
    console.log(e.target.files)
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <>
      <div style={{ color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>Logos</div>
      <div className="row sub-heading-wrapper" style={{ width: '50%' }}>
        <div className="heading-social">Logos</div>
        <div className="col-md-6">
          <div className="d-flex mt-3">
            Update logo for Website header <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            // onChange={handleChange}
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            // value={address.companyName}
            type="file"
            required
            onChange={handleChangeFile}
            // name="companyName"
          ></input>
          <img style={{ width: '100px', height: '100px' }} src={file} />
          {/* <p className="text-center py-2 text-danger">{errors.companyError}</p> */}
          <div className="d-flex mt-3">
            Update logo for website footer <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            // onChange={handleChange}
            // value={address.address}
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="file"
            // name="address"
            onChange={handleChangeFile}
          ></input>
          <img style={{ width: '100px', height: '100px' }} src={file} />
          {/* <p className="text-center py-2 text-danger">{errors.addressError}</p> */}
          <div className="d-flex mt-3">
            Update logo for Admin application <div style={{ color: 'red' }}> *</div>
          </div>{' '}
          <input
            // onChange={handleChange}
            // value={address.city}
            className="mt-2"
            style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
            type="file"
            // name="city"
            onChange={handleChangeFile}
          ></input>
          <img style={{ width: '100px', height: '100px' }} src={file} />
          {/* <p className="text-center py-2 text-danger">{errors.cityError}</p> */}
          <div className="d-flex mt-3">
            <button
              // onClick={(e) => handalSubmit(e)}
              style={{ color: 'white' }}
              className="btn btn-warning"
            >
              Save
            </button>
            <button style={{ marginLeft: '15px' }}>cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Address
