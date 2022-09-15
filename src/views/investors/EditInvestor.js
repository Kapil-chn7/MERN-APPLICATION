import { Container, Typography } from '@material-ui/core'
import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from '../../components/auth/authhelper'
import { useStyles } from '../CommonCss'
import { useNavigate, useParams } from 'react-router-dom'



const EditInvestor = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const params = useParams()
  const ID = params.id
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [state, setState] = useState()

  useEffect(() => {
    getInvestor()
  }, [])

  const getInvestor = async () => {
    setLoading(true)
    try {
      const investor = await axios.get(`${API}/api/investor/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setState({
        ...investor.data.data,
      })

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  function changeState(value) {
    setState({ ...state, ...value })
  }

  const updateInvestor = async () => {

console.log(state)

    try {
      let res = await axios.patch(`${API}/api/investor/${ID}`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
              Update Investor
            </Typography>
            <div>
              <Button
                variant="contained"
                style={{ fontWeight: 'bold', marginRight: '1rem' }}
                onClick={() => updateInvestor()}
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
                  defaultValue={state?.name}
                  onChange={(event) => {
                    changeState({ name: event.target.value })
                  }}
                />
              </div>

              <div className={classes.commonclass}>
                <Form.Label className={classes.label}>Email</Form.Label>
                <input
                  type="email"
                  defaultValue={state?.email}
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
                  defaultValue={state?.mobileNo}
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
                  defaultValue={state?.address}
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
                    defaultValue={state?.state}
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
                          defaultValue={state?.city}
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
      )}
    </>
  )
}

export default EditInvestor
