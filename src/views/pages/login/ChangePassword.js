import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ChangePassword.css'
import HttpsIcon from '@mui/icons-material/Https'
import swal from 'sweetalert'
import { API } from '../../../API'

import { isAutheticated } from 'src/components/auth/authhelper'
const validPasswordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/)
const ChangePassword = () => {
  const { token } = isAutheticated()
  const [error, setError] = useState('')

  const [prevPass, setPrevPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confPass, setConfPass] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setError(
      validPasswordRegex.test(newPass)
        ? ''
        : 'Password Shoud Be 8 Characters Long, Atleast One Uppercase, Atleast One Lowercase, Atleast One Digit, Atleast One Special Character',
    )
  }, [newPass])

  const handleSubmit = async () => {
    setLoading(true)
    if (!prevPass || !newPass || !confPass) {
      setLoading(false)
      return swal('Error', 'All fields are required', 'error')
    }
    if (newPass !== confPass) {
      setLoading(false)
      return swal('Error', "New password and confirm passsword didn't matched", 'error')
    }
    const newData = { oldPassword: prevPass, newPassword: newPass }
    axios
      .put(`${API}/changePassword`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 'OK') {
          return swal('Success', res.data.message, 'success')
        }
      })
      .catch((err) => {
        let message = err.response.data.message
        swal({
          title: 'Unable to update password',
          text: `${message}`,
          icon: 'error',
          buttons: true,
          dangerMode: true,
        })
        setLoading(false)
      })
  }

  return (
    <div>
      <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          className="col-sm-12"
          style={{ padding: '20px', border: '2px solid #dad5d5', background: 'white' }}
        >
          <h1> Change Password</h1>
          <div style={{ display: 'flex', position: 'relative' }}>
            <div>
              <HttpsIcon className="lock-icon" />
            </div>{' '}
            <input
              onChange={(e) => setPrevPass(e.target.value)}
              required
              className="input-feild"
              placeholder="Old password"
              style={{
                marginTop: '8px',
                width: '100%',
                borderRadius: '6px',
                border: '2px solid #dad5d5',
                padding: '10px 0 10px 42px',
              }}
            ></input>
          </div>

          <div style={{ display: 'flex', position: 'relative' }}>
            <HttpsIcon className="lock-icon" />{' '}
            <input
              className="input-feild"
              onChange={(e) => setNewPass(e.target.value)}
              required
              placeholder="password"
              style={{
                marginTop: '8px',
                width: '100%',
                borderRadius: '6px',
                border: '2px solid #dad5d5',
                padding: '10px 0 10px 42px',
              }}
            ></input>
          </div>
          <div style={{ display: 'flex', position: 'relative' }}>
            <HttpsIcon className="lock-icon" />{' '}
            <input
              className="input-feild"
              onChange={(e) => setConfPass(e.target.value)}
              required
              placeholder="Confirm password"
              style={{
                marginTop: '8px',
                width: '100%',
                borderRadius: '6px',
                border: '2px solid #dad5d5',
                padding: '10px 0 10px 42px',
              }}
            ></input>
          </div>
          {/* {errorpass && <div className='text-danger'> {errorpass}</div>} */}
          <div style={{ display: 'flex', marginTop: '30px' }}>
            <button className="save" onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChangePassword
