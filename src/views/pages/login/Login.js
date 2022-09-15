import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { API } from 'src/API'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ClipLoader from 'react-spinners/ClipLoader'
import axios from 'axios'
import swal from 'sweetalert'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser } from '@coreui/icons'
const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
    forgotEmailError: false,
  })

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  )
  const validPasswordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/)
  const [email, setEmail] = useState('')
  const isValid = email !== ''
  const [touched, setTouched] = React.useState(false)
  const [loading, setLoading] = useState(false)
  const [next, setNext] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [show, setShow] = useState(false)
  const [isfValid, setisfValid] = useState(false)
  const handleClose = () => {
    setEmail('')
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const validateForm = () => {
    let valid = true
    Object.values(errors).forEach((val) => {
      if (val.length > 0) {
        valid = false
        return false
      }
    })
    Object.values(user).forEach((val) => {
      if (val.length <= 0) {
        valid = false
        return false
      }
    })
    return valid
  }

  //cheking email and password
  useEffect(() => {
    if (validateForm()) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [errors])

  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          emailError: validEmailRegex.test(value) ? '' : 'Email is not valid!',
        })

        break
      case 'password':
        setErrors((errors) => ({
          ...errors,
          passwordError: validPasswordRegex.test(value)
            ? ''
            : 'Password Shoud Be 8 Characters Long, Atleast One Uppercase, Atleast One Lowercase, Atleast One Digit, Atleast One Special Character',
        }))
        break
      default:
        break
    }

    setUser({ ...user, [name]: value })
  }
  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user.email || !user.password) {
      return swal('Error!', 'All fields are required', 'error')
    }
    setLoading(true)
    let response = await axios.post(`${API}/admin-signin`, {
      ...user,
    })
    if (response.data.status === 'ok') {
      setLoading(false)
      console.log('response signin', response)
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: user.email,
          token: response.data.token,
        }),
      )

      navigate('/dashboard')
      setTimeout(window.location.reload(), 8000)
    } else {
      setLoading(false)
      let message = response.data.message
      swal({
        title: 'Error',
        text: message,
        icon: 'error',
        buttons: true,
        dangerMode: true,
      })
    }
  }

  const forgotMail = async (e) => {
    if (errors.forgotEmailError == false) {
      setisfValid(false)
      return
    }
    let res = await axios.put(`${API}/forgotPassword`, {
      email: email,
    })
    console.log(res)
    if (res.data.status === 'success') {
      let message = res.data.message
      swal({
        title: 'Success',
        text: message,
        icon: 'success',
        buttons: true,
      }).then(() => {
        window.location.reload()
      })
    } else {
      swal('oops', res.data.message, 'error')
      handleClose()
    }
  }
  const handleEmailChange = (e) => {
    setErrors({
      ...errors,
      forgotEmailError: validEmailRegex.test(e.target.value) ? true : false,
    })
    setEmail(e.target.value)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Username"
                        name="email"
                      />
                    </CInputGroup>
                    <p className="text-center py-2 text-danger">{errors.emailError}</p>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={user.showPassword ? 'text' : 'password'}
                        value={user.password}
                        placeholder="Password"
                        onChange={handleChange}
                        name="password"
                      />
                    </CInputGroup>
                    {errors.passwordError && (
                      <p className="text-center py-2 text-danger">{errors.passwordError}</p>
                    )}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          disabled={!validForm}
                          onClick={handleSubmit}
                          color="primary"
                          className="px-4"
                        >
                          <ClipLoader color="white" loading={loading} size={20} />
                          {!loading && 'LogIn'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton onClick={() => handleShow()} color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <Modal show={show} onHide={handleClose} className="p-4">
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CForm onSubmit={(e) => forgotMail(e)} validated={isfValid} id="forgot-form" noValidate>
            <div>Please enter your email:</div>
            <CFormInput
              onBlur={() => setTouched(true)}
              onChange={handleEmailChange}
              valid={errors.forgotEmailError}
              invalid={!errors.forgotEmailError}
              type="email"
              value={email}
              style={{ marginTop: '10px', borderRadius: '7px', padding: '8px' }}
              placeholder="Email"
              required
            />
          </CForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" form="forgot-form" type="submit">
            Forgot Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Login
