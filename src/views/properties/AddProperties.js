import { Container, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import clsx from 'clsx'
import { Button } from '@mui/material'
import Chip from '@material-ui/core/Chip'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from '../../components/auth/authhelper'
import { useNavigate } from 'react-router-dom'
import { useStyles } from '../CommonCss'
import AlertDialog from './AlertDialog'

const AddProperties = () => {
  const classes = useStyles()
  const { token } = isAutheticated()

  const navigate = useNavigate()

  // Layout Size and Dimentions
  const [plotArea, setPlotArea] = useState('')
  const [facing, setFacing] = useState('')
  const [dimentions, setDimentions] = useState([])

  // Amenities
  const [amenities, setAmenities] = useState(' ')
  const [amenitiesArr, setAmenitiesArr] = useState([])

  // Location Advantages
  const [locationadvantages, setLocationAdvantages] = useState(' ')
  const [locationadvantagesArr, setLocationAdvantagesArr] = useState([])

  //developer
  const [loading, setLoading] = useState(true)
  const [developer, setDevelopers] = useState([])
  const [inputDeveloper, setInputDeveloper] = useState('')

  const [state, setState] = useState({
    // Property Details
    propertyDisplayName: '',
    propertyName: '',
    address: '',
    googlePin: '',
    state: '',
    city: '',
    aboutProperty: '',

    // Layout and Permissions

    layoutType: '',
    layoutApprovalNumber: '',
    approvalLetter: {},
    layout: {},
    RERAApproved: '',
    RERANumber: '',
    RERAapprovalLetter: {},

    // Layout Size and Dimentions

    extentofLand: '',

    // Pricing
    price: '',
    paymentTerms: '',

    // Marketing & Promotion

    files: [],
    videos: [],
  })

  function changeState(value) {
    setState({ ...state, ...value })
  }

  const getDevelopers = async () => {
    const developers = await axios.get(`${API}/api/developer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setDevelopers([...developers.data.data])
    setLoading(false)
  }

  useEffect(() => {
    getDevelopers()
  }, [])

  const handleProperty = async () => {
    try {
      if (
        state.propertyDisplayName.length < 2 ||
        state.propertyName.length < 2 ||
        state.googlePin.length < 2 ||
        state.extentofLand.length < 2 ||
        state.developer.length < 2 ||
        state.layout.length < 2
      ) {
        alert('Please fill required fields')
      } else {
        const developerID = developer.filter((item) => {
          if (inputDeveloper === item.companyName) {
            return item
          }
          return
        })

        const formdata = new FormData()

        // Property Details
        formdata.append('propertyDisplayName', state.propertyDisplayName)
        formdata.append('aboutProperty', state.aboutProperty)
        formdata.append('propertyName', state.propertyName)
        formdata.append('googlePin', state.googlePin)
        formdata.append('address', state.address)
        formdata.append('state', state.state)
        formdata.append('city', state.city)

        // Layout and Permissions

        formdata.append('layoutApprovalNumber', state.layoutApprovalNumber)
        formdata.append('RERAapprovalLetter', state.RERAapprovalLetter)
        formdata.append('approvalLetter', state.approvalLetter)
        formdata.append('RERAApproved', state.RERAApproved)
        formdata.append('layoutType', state.layoutType)
        formdata.append('RERANumber', state.RERANumber)
        formdata.append('layout', state.layout)

        // Layout Size and Dimentions

        formdata.append('extentofLand', state.extentofLand)

        // Pricing

        formdata.append('paymentTerms', state.paymentTerms)
        formdata.append('price', state.price)

        // Marketing & Promotion
        formdata.append('videos', state.videos)
        formdata.append('files', state.files)
        // formdata.append('file', [...file])
        // Iterate over all selected files
        // Array.from(file).forEach((file) => {
        //   formdata.append('file', file)
        // })

        // amenitiesArr
        for (var i = 0; i < amenitiesArr?.length; i++) {
          formdata.append('amenities[]', amenitiesArr[i])
        }

        // locationadvantagesArr
        for (var i = 0; i < locationadvantagesArr?.length; i++) {
          formdata.append('locationAdvantages[]', locationadvantagesArr[i])
        }

        // plot
        for (var i = 0; i < dimentions?.length; i++) {
          formdata.append('plot[]', JSON.stringify(dimentions[i]))
        }

        // dimentions.forEach((item) => {
        //   formdata.append(`plot[]`, JSON.stringify(item))
        // })

        // developer ID
        formdata.append('developer', developerID[0]._id)

        let res = await axios.post(`${API}/api/property`, formdata, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/formdata',
          },
        })
        // JavaScript array of JavaScript objects
        // var objs = res.data.data.plot.map(JSON.parse)
        // console.log(objs)

        if (res) {
          navigate('/view/properties', { replace: true })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDimentions = () => {
    if (plotArea?.length > 0 && facing?.length > 0) {
      setDimentions([
        ...dimentions,
        {
          PlotArea: plotArea,
          Facing: facing,
        },
      ])
    } else {
      // alert(" please first enter values")
    }
  }

  const handleAmenities = () => {
    if (amenities?.length > 2) {
      setAmenitiesArr([...amenitiesArr, amenities])
      setAmenities(' ')
    } else {
      // alert(" please first enter values")
    }
  }

  const handleLocationadvantages = () => {
    if (locationadvantages?.length > 2) {
      setLocationAdvantagesArr([...locationadvantagesArr, locationadvantages])
      setLocationAdvantages(' ')
    } else {
      // alert(" please first enter values")
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
          Add New Property
        </Typography>
        <div>
          <Button
            variant="contained"
            style={{ fontWeight: 'bold', marginRight: '1rem' }}
            onClick={() => handleProperty()}
          >
            Save
          </Button>
          <Button
            variant="contained"
            style={{ fontWeight: 'bold', background: 'red', color: 'white' }}
            onClick={() => {
              navigate('/view/properties', { replace: true })
            }}
          >
            Cancel
          </Button>
        </div>
      </div>

      <form className={classes.root} noValidate autoComplete="off">
        <section className={classes.sectionOne}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
            className={classes.boxShadow}
          >
            <Form.Label className={classes.label} style={{ textAlign: 'center' }}>
              Property Details
            </Form.Label>
            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>
                Property Display Name <span className={classes.mandatory}> *</span>{' '}
              </Form.Label>
              <TextField
                variant="outlined"
                onChange={(event) => {
                  changeState({ propertyDisplayName: event.target.value })
                }}
              />
            </div>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>
                Property Name <span className={classes.mandatory}> *</span>{' '}
              </Form.Label>
              <TextField
                variant="outlined"
                onChange={(event) => {
                  changeState({ propertyName: event.target.value })
                }}
              />
            </div>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>Description</Form.Label>
              <TextField
                multiline
                minRows={4}
                variant="outlined"
                onChange={(event) => {
                  changeState({ aboutProperty: event.target.value })
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

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
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

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>
                Google Pin <span className={classes.mandatory}> *</span>
              </Form.Label>
              <TextField
                variant="outlined"
                onChange={(event) => {
                  changeState({ googlePin: event.target.value })
                }}
              />
            </div>
          </div>

          <div className={clsx(classes.commonclass, classes.boxShadow)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Form.Label className={classes.label}>Layout Size and Dimentions</Form.Label>

              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Form.Label className={classes.label}>
                  Extent of Land <span className={classes.mandatory}> *</span>
                </Form.Label>

                <OutlinedInput
                  startAdornment={<InputAdornment position="start">Acre.</InputAdornment>}
                  onChange={(event) => {
                    changeState({ extentofLand: event.target.value })
                  }}
                />
              </FormControl>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2rem',
                }}
              >
                <FormControl fullWidth className={classes.margin} variant="outlined">
                  <Form.Label className={classes.label}>Plot size </Form.Label>

                  <OutlinedInput
                    type="number"
                    startAdornment={<InputAdornment position="start">Sq.Yards</InputAdornment>}
                    onChange={(event) => {
                      setPlotArea(event.target.value)
                    }}
                  />
                </FormControl>

                <FormControl fullWidth className={classes.margin} variant="outlined">
                  <Form.Label className={classes.label}>Facing</Form.Label>

                  <Select
                    value={facing}
                    onChange={(event) => {
                      setFacing(event.target.value)
                    }}
                  >
                    <MenuItem value="">
                      <em>--Select--</em>
                    </MenuItem>
                    <MenuItem value="East">East</MenuItem>
                    <MenuItem value="West">West</MenuItem>
                    <MenuItem value="South">South</MenuItem>
                    <MenuItem value="North">North</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  style={{
                    background: 'green',
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: '1rem',
                  }}
                  onClick={() => {
                    handleDimentions()
                  }}
                >
                  {' '}
                  Add
                </Button>
              </div>
            </div>

            {dimentions?.length > 0 && (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Plot Area</TableCell>
                      <TableCell>Facing</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dimentions.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.PlotArea}</TableCell>
                        <TableCell>{item.Facing}</TableCell>
                        <TableCell align="right" style={{ display: 'flex', flexWrap: 'wrap' }}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              const newArr = dimentions
                              newArr.splice(index, 1)

                              setDimentions([...newArr])
                            }}
                          >
                            Delete
                          </Button>{' '}
                          &nbsp;
                          <AlertDialog
                            setDimentions={setDimentions}
                            indexNo={index}
                            dimentions={dimentions}
                            plotArea={plotArea}
                            facing={facing}
                            setPlotArea={setPlotArea}
                            setFacing={setFacing}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>

          <div
            style={{
              gap: '2rem',
              marginTop: '1rem',
            }}
            className={clsx(classes.commonclass, classes.boxShadow)}
          >
            <Form.Label className={classes.label}>Pricing</Form.Label>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>Price</Form.Label>
              <TextField
                variant="outlined"
                onChange={(event) => {
                  changeState({ price: event.target.value })
                }}
              />
            </div>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>Payment Terms</Form.Label>
              <TextField
                variant="outlined"
                onChange={(event) => {
                  changeState({ paymentTerms: event.target.value })
                }}
              />
            </div>
          </div>
        </section>

        {/* section second  */}

        <section className={clsx(classes.sectionTwo)}>
          <div
            className={clsx(classes.boxShadow)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <Form.Label className={classes.label} style={{ textAlign: 'center' }}>
              Layout and Permissions
            </Form.Label>

            <FormControl component="fieldset">
              <Form.Label className={classes.label}>
                Property Type <span className={classes.mandatory}> *</span>
              </Form.Label>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                style={{ display: 'flex', flexDirection: 'row' }}
                onChange={(event) => {
                  changeState({ layoutType: event.target.value })
                }}
              >
                <FormControlLabel value="Farm Land" control={<Radio />} label="Farm Land" />
                <FormControlLabel value="DTCP" control={<Radio />} label="DTCP" />
                <FormControlLabel value="HMDA" control={<Radio />} label="HMDA" />
              </RadioGroup>
            </FormControl>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>Layout Approval Number </Form.Label>
              <TextField
                variant="outlined"
                onChange={(event) => {
                  changeState({ layoutApprovalNumber: event.target.value })
                }}
              />
            </div>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>Upload Approval Letter </Form.Label>
              <input
                name="foo"
                type="file"
                accept="image/jpeg,image/png,application/pdf,image/x-eps"
                style={{ height: '3.2rem', border: '1px solid gray', padding: '9px' }}
                onChange={(event) => {
                  changeState({ approvalLetter: event.target.files[0] })
                }}
              />
            </div>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>Upload Layout </Form.Label>
              <input
                name="foo"
                type="file"
                accept="image/jpeg,image/png,application/pdf,image/x-eps"
                style={{ height: '3.2rem', border: '1px solid gray', padding: '9px' }}
                onChange={(event) => {
                  changeState({ layout: event.target.files[0] })
                }}
              />
            </div>
            <hr />

            <FormControl component="fieldset">
              <Form.Label className={classes.label}>RERA Approved</Form.Label>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                style={{ display: 'flex', flexDirection: 'row' }}
                onChange={(event) => {
                  changeState({ RERAApproved: event.target.value })
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}>RERA Number</Form.Label>
              <TextField
                variant="outlined"
                onChange={(event) => {
                  changeState({ RERANumber: event.target.value })
                }}
              />
            </div>

            <div className={classes.commonclass}>
              <Form.Label className={classes.label}> Upload RERA approval Letter </Form.Label>
              <input
                name="foo"
                type="file"
                accept="image/jpeg,image/png,application/pdf,image/x-eps"
                style={{ height: '3.2rem', border: '1px solid gray', padding: '9px' }}
                onChange={(event) => {
                  changeState({ RERAapprovalLetter: event.target.files[0] })
                }}
              />
            </div>
          </div>

          <div
            className={clsx(classes.boxShadow)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.8rem' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2rem',
                }}
              >
                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Amenities</Form.Label>
                  <TextField
                    value={amenities}
                    variant="outlined"
                    onChange={(event) => {
                      setAmenities(event.target.value)
                    }}
                  />
                </div>

                <Button
                  style={{
                    background: 'green',
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: '1rem',
                  }}
                  onClick={() => {
                    handleAmenities()
                  }}
                >
                  {' '}
                  Add
                </Button>
              </div>
            </div>

            {amenitiesArr?.length > 0 &&
              amenitiesArr.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    label={item}
                    color="primary"
                    variant="outlined"
                    onDelete={() => {
                      const newArr = amenitiesArr
                      newArr.splice(index, 1)

                      setAmenitiesArr([...newArr])
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  />
                )
              })}
          </div>

          <div
            className={clsx(classes.boxShadow)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2rem',
                }}
              >
                <div className={classes.commonclass}>
                  <Form.Label className={classes.label}>Location Advantages</Form.Label>
                  <TextField
                    value={locationadvantages}
                    variant="outlined"
                    onChange={(event) => {
                      setLocationAdvantages(event.target.value)
                    }}
                  />
                </div>

                <Button
                  style={{
                    background: 'green',
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: '1rem',
                  }}
                  onClick={() => {
                    handleLocationadvantages()
                  }}
                >
                  {' '}
                  Add
                </Button>
              </div>
            </div>

            {locationadvantagesArr?.length > 0 &&
              locationadvantagesArr.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    label={item}
                    color="primary"
                    variant="outlined"
                    onDelete={() => {
                      const newArr = locationadvantagesArr
                      newArr.splice(index, 1)

                      setLocationAdvantagesArr([...newArr])
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  />
                )
              })}
          </div>

          {!loading && (
            <div
              style={{
                gap: '2rem',
                marginTop: '2.5rem',
              }}
              className={clsx(classes.commonclass, classes.boxShadow)}
            >
              <Form.Label className={classes.label}>
                Developer <span className={classes.mandatory}> *</span>
              </Form.Label>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.label}>Developer</InputLabel>
                <Select
                  value={inputDeveloper}
                  onChange={(event) => {
                    setInputDeveloper(event.target.value)
                  }}
                >
                  <MenuItem value="">
                    <em>--select--</em>
                  </MenuItem>
                  {developer?.map((devepr, index) => {
                    return (
                      <MenuItem value={devepr.companyName} key={index}>
                        {devepr.companyName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
          )}

          <div
            style={{
              gap: '2rem',
              marginTop: '1.8rem',
            }}
            className={clsx(classes.commonclass, classes.boxShadow)}
          >
            <Form.Label className={classes.label}>Marketing & Promotion</Form.Label>
            <div>
              <Form.Label className={classes.label}>Images:</Form.Label>
              <input
                multiple
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={(event) => {
                  changeState({ files: [...event.target.files] })
                }}
                style={{ height: '3.2rem', border: '1px solid gray', padding: '9px' }}
              />
            </div>

            <div>
              <Form.Label className={classes.label}>Videos:</Form.Label>
              <input
                type="file"
                id="img"
                name="img"
                accept="video/*"
                multiple
                onChange={(event) => {
                  changeState({ videos: [...event.target.files] })
                }}
                style={{ height: '3.2rem', border: '1px solid gray', padding: '9px' }}
              />
            </div>
          </div>
        </section>
      </form>
    </Container>
  )
}

export default AddProperties
