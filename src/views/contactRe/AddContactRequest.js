import React, { useState } from 'react'
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
import { Button } from '@mui/material'
import clsx from 'clsx'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from '../../components/auth/authhelper'
import { useNavigate } from 'react-router-dom'
import { useStyles } from '../CommonCss'
import { makeStyles } from '@material-ui/core/styles'

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
)
const validMobileRegex = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)
const AddContactRequest = () => {
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: '',
    email: '',
    contactNo: '',
    description: '',
  })
  function changeState(value) {
    setState({ ...state, ...value })
  }
  const handleContactRequest = async () => {
    try {
      if (state.name.length < 2) {
        alert('Please Enter name')
      } else if (!validEmailRegex.test(state.email)) {
        alert('Email is not valid!')
      } else if (!validMobileRegex.test(state.contactNo)) {
        alert('Please enter valid mobile number!')
      } else if (state.description.length < 2) {
        alert('Please Enter descriptions')
      } else {
        let res = await axios.post(
          `${API}/api/contactRequest`,
          { ...state },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (res) {
          navigate('/view/contactrequests', { replace: true })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <div>
          <Button
            variant="contained"
            style={{ fontWeight: 'bold', marginRight: '1rem' }}
            onClick={() => handleContactRequest()}
          >
            Save
          </Button>

          <Button
            variant="contained"
            style={{ fontWeight: 'bold', background: 'red', color: 'white' }}
            onClick={() => {
              navigate('/view/contactrequests', { replace: true })
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="row mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="col-md-12" style={{ background: 'white', padding: '20px', width: '50%' }}>
          <div className="d-flex mt-3">
            Name <div style={{ color: 'red' }}> *</div>
          </div>
          <input
            onChange={(event) => {
              changeState({ name: event.target.value })
            }}
            style={{ padding: '10px', borderRadius: '10px', width: '100%' }}
          ></input>
          <div className="d-flex mt-3">
            Email <div style={{ color: 'red' }}> *</div>
          </div>
          <input
            onChange={(event) => {
              changeState({ email: event.target.value })
            }}
            style={{ padding: '10px', borderRadius: '10px', width: '100%' }}
          ></input>
          <div className="d-flex mt-3">
            Mobile Number <div style={{ color: 'red' }}> *</div>
          </div>
          <input
            onChange={(event) => {
              changeState({ contactNo: event.target.value })
            }}
            style={{ padding: '10px', borderRadius: '10px', width: '100%' }}
          ></input>
          <div className="d-flex mt-3">
            Description <div style={{ color: 'red' }}> *</div>
          </div>
          <textarea
            onChange={(event) => {
              changeState({ description: event.target.value })
            }}
            style={{ padding: '10px', borderRadius: '10px', width: '100%' }}
          ></textarea>
          {/* <div className="d-flex mt-3">
            Store Timestamp <div style={{ color: 'red' }}> *</div>
          </div> */}
          {/* <input
           
            style={{ padding: '10px', borderRadius: '10px', width: '100%' }}
            type="time"
          ></input> */}
        </div>
      </div>
    </div>
  )
}

export default AddContactRequest
