import { Container, Typography } from '@material-ui/core'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from '../../components/auth/authhelper'
import { useNavigate } from 'react-router-dom'
import { useStyles } from '../CommonCss'

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
)


const AddInvestors = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const navigate = useNavigate()

  const [state, setState] = useState({
    name: '',
    email: '',
    mobileNo: '',
    address: '',
    state: '',
    city: '',
    image: '',
  })

  function changeState(value) {
    setState({ ...state, ...value })
  }

  const handleInvestor = async () => {
  

    const imagArr = [state.image]

    try {
      const formdata = new FormData()
      formdata.append('name', state.name)
      formdata.append('email', state.email)
      formdata.append('mobileNo', state.mobileNo)
      formdata.append('city', state.city)
      formdata.append('state', state.state)
      formdata.append('address', state.address)
      formdata.append('image', imagArr)

      // Iterate over all selected files
      Array.from(imagArr).forEach((file) => {
        formdata.append('image', file)
      })

      let res = await axios.post(`${API}/api/investor`, formdata, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/formdata',
        },
      })
      console.log(res)
      if (res) {
        navigate('/view/Investors', { replace: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxWidth="lg">
      <div
        style={{
          display: 'flex',
          flexDirection: ' row',
          justifyContent: 'space-between',
          margin: '2rem 0',
        }}
      >
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Add New Investor
        </Typography>
        <div>
          <Button
            variant="contained"
            style={{ fontWeight: 'bold', marginRight: '1rem' }}
            onClick={() => handleInvestor()}
          >
            Save
          </Button>

          <Button
            variant="contained"
            style={{ fontWeight: 'bold', background: 'red', color: 'white' }}
            onClick={() => {
              navigate('/view/Investors', { replace: true })
            }}
          >
            Cancel
          </Button>
        </div>
      </div>

      <form className={classes.root} noValidate autoComplete="off">
        <section className={clsx(classes.sectionOne, classes.boxShadow)}>
          <div className={classes.commonclass}>
            <Form.Label className={classes.label}>Name</Form.Label>
            <TextField
              variant="outlined"
              onChange={(event) => {
                changeState({ name: event.target.value })
              }}
            />
          </div>

          <div className={classes.commonclass}>
            <Form.Label className={classes.label}>Email</Form.Label>
            <input
              type="email"
              style={{ height: '4rem', borderRadius: '5px' }}
              onChange={(event) => {
                changeState({ email: event.target.value })
              }}
            />
          </div>

          <div className={classes.commonclass}>
            <Form.Label className={classes.label}>Mobile No</Form.Label>
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              style={{ height: '4rem', borderRadius: '5px' }}
              onChange={(event) => {
                changeState({ mobileNo: event.target.value })
              }}
            />
          </div>

          <div className={classes.commonclass}>
            <Form.Label className={classes.label}>Address</Form.Label>
            <TextField
              variant="outlined"
              onChange={(event) => {
                changeState({ address: event.target.value })
              }}
            />
          </div>
        </section>

        {/* section second  */}

        <section className={clsx(classes.sectionTwo, classes.boxShadow)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3rem',
            }}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel className={classes.label}>State</InputLabel>
              <Select
                value={state.state}
                onChange={(event) => {
                  changeState({ state: event.target.value })
                }}
              >
                <MenuItem value="">
                  <em>State</em>
                </MenuItem>
                <MenuItem value="state1">Sate-1</MenuItem>
                <MenuItem value="state2">Sate-2</MenuItem>
                <MenuItem value="state3">Sate-3</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel className={classes.label}>City</InputLabel>
              <Select
                value={state.city}
                onChange={(event) => {
                  changeState({ city: event.target.value })
                }}
              >
                <MenuItem value="">
                  <em>City</em>
                </MenuItem>
                <MenuItem value="City-1">City-1</MenuItem>
                <MenuItem value="City-2">City-2</MenuItem>
                <MenuItem value="City-3">City-3</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <Form.Label className={classes.label}>Image:</Form.Label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={(event) => {
                changeState({ image: event.target.files[0] })
              }}
            />
          </div>
        </section>
      </form>
    </Container>
  )
}

export default AddInvestors
