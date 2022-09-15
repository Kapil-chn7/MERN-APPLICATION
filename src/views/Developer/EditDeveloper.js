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

const EditDeveloper = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const params = useParams()
  const ID = params.id
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const [state, setState] = useState()

  useEffect(() => {
    getDeveloper()
  }, [])

  const getDeveloper = async () => {
    setLoading(true)
    try {
      const developer = await axios.get(`${API}/api/developer/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setState({
        ...developer.data.data,
      })

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  function changeState(value) {
    setState({ ...state, ...value })
  }

  const updateDeveloper = async () => {
    console.log(state)

    try {
      let res = await axios.patch(`${API}/api/developer/ ${ID}`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res)
      if (res) {
        navigate('/view/developers', { replace: true })
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
              Edit Developer
            </Typography>
            <div>
              <Button
                variant="contained"
                style={{ fontWeight: 'bold', marginRight: '1rem' }}
                onClick={() => updateDeveloper()}
              >
                Save
              </Button>

              <Button
                variant="contained"
                style={{ fontWeight: 'bold', background: 'red', color: 'white' }}
                onClick={() => {
                  navigate('/view/developers', { replace: true })
                }}
              >
                Cancel
              </Button>
            </div>
          </div>

          <form className={classes.root} noValidate autoComplete="off">
            <section className={clsx(classes.sectionOne)}>
              <div className={clsx(classes.boxShadow)}>
                <Form.Label className={classes.label}>Register Company</Form.Label>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>
                    Company Name <span className={classes.mandatory}> *</span> :{' '}
                  </Form.Label>
                  <TextField
                    variant="outlined"
                    defaultValue={state?.companyName}
                    onChange={(event) => {
                      changeState({ companyName: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Address:</Form.Label>
                  <TextField
                    variant="outlined"
                    defaultValue={state?.address}
                    onChange={(event) => {
                      changeState({ address: event.target.value })
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '1rem',
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

                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.label}>
                      Company Type <span className={classes.mandatory}> *</span> :
                    </InputLabel>
                    <Select
                      defaultValue={state?.companyType}
                      onChange={(event) => {
                        changeState({ companyType: event.target.value })
                      }}
                    >
                      <MenuItem value="">
                        <em>Company Type</em>
                      </MenuItem>
                      <MenuItem value="Developer">Developer</MenuItem>
                      <MenuItem value="Vendor">Vendor</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Website:</Form.Label>
                  <TextField
                    defaultValue={state?.website}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ website: event.target.value })
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  gap: '2rem',
                }}
                className={clsx(classes.commonclass, classes.boxShadow)}
              >
                <Form.Label className={classes.label}>Company Microsite:</Form.Label>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>About</Form.Label>
                  <TextField
                    multiline
                    defaultValue={state?.about}
                    minRows={4}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ about: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Statistics:</Form.Label>
                  <TextField
                    variant="outlined"
                    defaultValue={state?.statistics}
                    onChange={(event) => {
                      changeState({ statistics: event.target.value })
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  gap: '2rem',
                }}
                className={clsx(classes.commonclass, classes.boxShadow)}
              >
                <Form.Label className={classes.label}>User Creation :</Form.Label>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}> Account Owner:</Form.Label>
                  <TextField
                    defaultValue={state?.accountOwner}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ accountOwner: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>
                    First Name <span className={classes.mandatory}> *</span> :
                  </Form.Label>
                  <TextField
                    defaultValue={state?.firstName}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ firstName: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>
                    Last Name <span className={classes.mandatory}> *</span> :
                  </Form.Label>
                  <TextField
                    defaultValue={state?.lastName}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ lastName: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>
                    Job Title <span className={classes.mandatory}> *</span> :
                  </Form.Label>
                  <TextField
                    defaultValue={state?.jobTitle}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ jobTitle: event.target.value })
                    }}
                  />
                </div>
              </div>
            </section>

            {/* section second  */}

            <section className={clsx(classes.sectionTwo)}>
              <div className={clsx(classes.boxShadow)}>
                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>
                    Contact Email <span className={classes.mandatory}> *</span> :
                  </Form.Label>
                  <input
                    defaultValue={state?.contactEmail}
                    type="email"
                    style={{ height: '4rem', borderRadius: '5px' }}
                    onChange={(event) => {
                      changeState({ contactEmail: event.target.value })
                    }}
                  />
                </div>
                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Contact No :</Form.Label>
                  <input
                    defaultValue={state?.contactNo}
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    style={{ height: '4rem', borderRadius: '5px' }}
                    onChange={(event) => {
                      changeState({ contactNo: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>
                    Mobile no <span className={classes.mandatory}> *</span> :
                  </Form.Label>
                  <input
                    defaultValue={state?.mobile}
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    style={{ height: '4rem', borderRadius: '5px' }}
                    onChange={(event) => {
                      changeState({ mobile: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Facebook Link:</Form.Label>
                  <TextField
                    defaultValue={state?.facebook}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ facebook: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Youtube Channel Link:</Form.Label>
                  <TextField
                    defaultValue={state?.youtubeChannel}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ youtubeChannel: event.target.value })
                    }}
                  />
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Whatsapp Number:</Form.Label>
                  <input
                    type="tel"
                    defaultValue={state?.whatsApp}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    style={{ height: '4rem', borderRadius: '5px' }}
                    onChange={(event) => {
                      changeState({ whatsApp: event.target.value })
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  gap: '3.3rem',
                  marginTop: '0.5rem',
                }}
                className={clsx(classes.commonclass, classes.boxShadow)}
              >
                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Awards:</Form.Label>
                  <TextField
                    defaultValue={state?.awards}
                    variant="outlined"
                    onChange={(event) => {
                      changeState({ awards: event.target.value })
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.label}>Location:</InputLabel>
                    <Select
                      defaultValue={state?.location}
                      onChange={(event) => {
                        changeState({ location: event.target.value })
                      }}
                    >
                      <MenuItem value="">
                        <em>Location</em>
                      </MenuItem>
                      <MenuItem value="Location-1">Location-1</MenuItem>
                      <MenuItem value="Location-2">Location-2</MenuItem>
                      <MenuItem value="Location-3">Location-3</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <Form.Label className={classes.label}>Banner:</Form.Label>
                  <input
                    multiple
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={(e) => {
                      changeState({ files: [...e.target.files] })
                    }}
                  />

                  {state?.files?.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '0.5rem',
                        flexWrap:'wrap'
                      }}
                    >
                      {state?.files?.length > 0 &&
                        state?.files?.length.map((file, index) => {
                          return (
                            <img
                              src={file.url}
                              alt="Banner"
                              key={index}
                              style={{ height: '8rem', width: '8rem' }}
                            />
                          )
                        })}
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  gap: '3.3rem',
                  marginTop: '0.5rem',
                }}
                className={clsx(classes.commonclass, classes.boxShadow)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.label}>
                      Role <span className={classes.mandatory}> *</span> :
                    </InputLabel>
                    <Select
                     defaultValue={state?.userRole}
                      onChange={(event) => {
                        changeState({ userRole: event.target.value })
                      }}
                    >
                      <MenuItem value="">
                        <em>Role</em>
                      </MenuItem>
                      <MenuItem value="Owner">Owner</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>
                    Email <span className={classes.mandatory}> *</span> :
                  </Form.Label>
                  <input
                  defaultValue={state?.userEmail}
                    type="email"
                    style={{ height: '4rem', borderRadius: '5px' }}
                    onChange={(event) => {
                      changeState({ userEmail: event.target.value })
                    }}
                  />
                </div>
                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>
                    Mobile No <span className={classes.mandatory}> *</span> :
                  </Form.Label>
                  <input
                     defaultValue={state?.userMobile}
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    style={{ height: '4rem', borderRadius: '5px' }}
                    onChange={(event) => {
                      changeState({ userMobile: event.target.value })
                    }}
                  />
                </div>
              </div>
            </section>
          </form>
        </Container>
      )}
    </>
  )
}

export default EditDeveloper
