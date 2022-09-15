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
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from '../../components/auth/authhelper'
import { useNavigate } from 'react-router-dom'
import { useStyles } from '../CommonCss'

import { validEmailRegex, validMobileRegex } from '../Commonjs'

const AddDeveloper = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [state, setState] = useState({
    // 1. Register Company (Developer)
    companyName: '',
    address: '',
    state: '',
    city: '',
    contactEmail: '',
    contactNo: '',
    companyType: '',
    website: '',
    mobile: '',

    // socials
    facebook: '',
    youtubeChannel: '',
    whatsApp: '',

    // 2. Company Microsite:

    about: '',
    statistics: '',
    location: '',
    awards: '',
    files: [],

    // 3. User Creation (For Company = Developer)

    accountOwner: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    userEmail: '',
    userMobile: '',
    userRole: '',
  })

  function changeState(value) {
    setState({ ...state, ...value })
  }

  const handleInvestor = async () => {
    console.log(state)

    try {
      if (
        state.companyName.length < 2 ||
        state.companyType.length < 2 ||
        state.contactEmail.length < 2 ||
        state.mobile.length < 2 ||
        state.firstName.length < 2 ||
        state.lastName.length < 2 ||
        state.jobTitle.length < 2 ||
        state.userEmail.length < 2 ||
        state.userMobile.length < 2 ||
        state.userRole.length < 2
      ) {
        alert('Please fill required fields')
      }

      // // mandatory email Check
      // if (state?.contactEmail?.length > 2 || state?.userEmail?.length > 2) {
      //   if (!state.contactEmail.toLowerCase().match(validEmailRegex)) {
      //     alert('please enter valid email id')
      //   }
      //   if (!state.userEmail.toLowerCase().match(validEmailRegex)) {
      //     alert('please enter valid email id')
      //   }
      // }

      // // mandatory mobile  check
      // if (state?.mobile?.length > 2 || state?.userMobile?.length > 2) {
      //   if (!state.mobile.match(validMobileRegex)) {
      //     alert('please enter valid email id')
      //   }
      //   if (!state.userMobile.match(validMobileRegex)) {
      //     alert('please enter valid Mobile Number')
      //   }
      // }

      // if (state?.contactNo?.length > 2) {
      //   if (!state.contactNo.match(validMobileRegex)) {
      //     alert('please enter Contact Number')
      //   }
      // }

      // if (state?.whatsApp?.length > 2) {
      //   if (!state.whatsApp.match(validMobileRegex)) {
      //     alert('please enter Contact Number')
      //   }
      // }

      // // website domain check
      // if (state.contactEmail.length > 0 || state.userMobile.length > 0) {
      //   pattern.test(text)
      // }
      else {
        const formdata = new FormData()

        // 1. Register Company (Developer)
        formdata.append('companyName', state.companyName)
        formdata.append('address', state.address)
        formdata.append('city', state.city)
        formdata.append('state', state.state)
        formdata.append('contactEmail', state.contactEmail)
        formdata.append('contactNo', state.contactNo)
        formdata.append('website', state.website)
        formdata.append('companyType', state.companyType)
        formdata.append('mobile', state.mobile)

        // socials
        formdata.append('facebook', state.facebook)
        formdata.append('youtubeChannel', state.youtubeChannel)
        formdata.append('whatsApp', state.whatsApp)

        // 2. Company Microsite:

        formdata.append('about', state.about)
        formdata.append('statistics', state.statistics)
        formdata.append('awards', state.awards)
        formdata.append('location', state.location)
        // Iterate over all selected files
        Array.from(state.files).forEach((file) => {
          formdata.append('file', file)
        })

        // 3. User Creation (For Company = Developer)
        formdata.append('accountOwner', state.accountOwner)
        formdata.append('firstName', state.firstName)
        formdata.append('lastName', state.lastName)
        formdata.append('jobTitle', state.jobTitle)
        formdata.append('userEmail', state.userEmail)
        formdata.append('userMobile', state.userMobile)
        formdata.append('userRole', state.userRole)

        let res = await axios.post(`${API}/api/developer`, formdata, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/formdata',
          },
        })
        console.log(res)
        if (res) {
          navigate('/view/developers', { replace: true })
        }
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
          Add New Developer
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
                onChange={(event) => {
                  changeState({ companyName: event.target.value })
                }}
              />
            </div>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>Address:</Form.Label>
              <TextField
                variant="outlined"
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

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.label}>
                  Company Type <span className={classes.mandatory}> *</span> :
                </InputLabel>
                <Select
                  value={state.companyType}
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
                variant="outlined"
                onChange={(event) => {
                  changeState({ facebook: event.target.value })
                }}
              />
            </div>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>Youtube Channel Link:</Form.Label>
              <TextField
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
                  value={state.location}
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
                  value={state.userRole}
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
  )
}

export default AddDeveloper
