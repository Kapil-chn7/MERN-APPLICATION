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
import Chip from '@material-ui/core/Chip'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import clsx from 'clsx'
import { Button } from '@mui/material'
import { API } from 'src/API'
import { isAutheticated } from '../../components/auth/authhelper'
import { useNavigate, useParams } from 'react-router-dom'
import { useStyles } from '../CommonCss'
import AlertDialog from './AlertDialog'

const EditProperties = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const params = useParams()
  const ID = params.id
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [state, setState] = useState()

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
  const [developer, setDevelopers] = useState([])
  const [inputDeveloper, setInputDeveloper] = useState('')

  useEffect(() => {
    getProperty()
  }, [])

  const getDevelopers = async () => {
    const developers = await axios.get(`${API}/api/developer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setDevelopers([...developers.data.data])
    setLoading(false)
  }

  const getSingleDeveloper = async (id) => {
    const developer = await axios.get(`${API}/api/developer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setInputDeveloper(developer.data.data.companyName)
  }

  const getProperty = async () => {
    setLoading(true)
    try {
      const property = await axios.get(`${API}/api/property/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setState({
        ...property.data.data,
      })

      getSingleDeveloper(property.data.data.developer)

      const newPlotArr = property?.data?.data?.plot ? plotsArr() : []
      function plotsArr() {
        try {
          property?.data?.data?.plot?.map(JSON.parse)
        } catch (e) {
          return property?.data?.data?.plot
        }
        return property?.data?.data?.plot?.map(JSON.parse)
      }
      setDimentions([...newPlotArr])
      const Amenities = property.data.data.amenities ? property.data.data.amenities : []
      setAmenitiesArr([...Amenities])
      const LocationAdvantage = property.data.data.locationAdvantages
        ? property.data.data.locationAdvantages
        : []
      setLocationAdvantagesArr([...LocationAdvantage])

      getDevelopers()
    } catch (error) {
      console.log(error)
    }
  }

  function changeState(value) {
    setState({ ...state, ...value })
  }

  const updateProperty = async () => {
    const developerID = developer.filter((item) => {
      if (inputDeveloper === item.companyName) {
        return item
      }
      return
    })

    const newState = {
      // Property Details
      propertyDisplayName: state.propertyDisplayName,
      aboutProperty: state.aboutProperty,
      propertyName: state.propertyName,
      googlePin: state.googlePin,
      address: state.address,
      state: state.state,
      city: state.city,

      // Layout and Permissions

      layoutApprovalNumber: state.layoutApprovalNumber,
      RERAapprovalLetter: state.RERAapprovalLetter,
      approvalLetter: state.approvalLetter,
      RERAApproved: state.RERAApproved,
      layoutType: state.layoutType,
      RERANumber: state.RERANumber,
      layout: state.layout,

      // Layout Size and Dimentions

      extentofLand: state.extentofLand,

      // Pricing

      paymentTerms: state.paymentTerms,
      price: state.price,

      // Marketing & Promotion
      videos: state.videos,
      files: state.files,

      // amenitiesArr
      amenities: [...amenitiesArr],

      // locationadvantagesArr
      locationAdvantages: [...locationadvantagesArr],

      // plot

      plot: [...dimentions],

      // developer ID
      developer: developerID[0]._id,
    }

    console.log(newState)

    try {
      let res = await axios.patch(`${API}/api/property/${ID}?_method=PATCH`, newState, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res)
      if (res) {
        navigate('/view/properties', { replace: true })
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
              Add New Property
            </Typography>
            <div>
              <Button
                variant="contained"
                style={{ fontWeight: 'bold', marginRight: '1rem' }}
                onClick={() => updateProperty()}
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
                    defaultValue={state.propertyDisplayName}
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
                    defaultValue={state.propertyName}
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
                    defaultValue={state.aboutProperty ? state.aboutProperty : ' '}
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
                    defaultValue={state.address ? state.address : ' '}
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
                      value={state.state ? state.state : ''}
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
                      value={state.city ? state.city : ''}
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
                    defaultValue={state.googlePin}
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
                      defaultValue={state.extentofLand}
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
                    defaultValue={state.price ? state.price : ''}
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
                    defaultValue={state.paymentTerms ? state.paymentTerms : ''}
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
                    value={state.layoutType}
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
                    defaultValue={state.layoutApprovalNumber ? state.layoutApprovalNumber : ''}
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
                  {/* {state.approvalLetter && (
                    <img
                      src={approvalLetter?.url}
                      alt="approvalLetter"
                      style={{ height: '8rem', width: '8rem' }}
                    />
                  )} */}
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

                  {/* {state.layout && (
                    <img
                      src={layout?.url}
                      alt="layout"
                      style={{ height: '8rem', width: '8rem' }}
                    />
                  )} */}
                </div>
                <hr />

                <FormControl component="fieldset">
                  <Form.Label className={classes.label}>RERA Approved</Form.Label>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    style={{ display: 'flex', flexDirection: 'row' }}
                    value={state.RERAApproved ? state.RERAApproved : ''}
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
                    defaultValue={state.RERANumber ? state.RERANumber : ''}
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
                  {/* {state.RERAapprovalLetter && (
                    <img
                      src={RERAapprovalLetter?.url}
                      alt="RERAapprovalLetter"
                      style={{ height: '8rem', width: '8rem' }}
                    />
                  )} */}
                </div>
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
                    marginTop: '1.8rem',
                  }}
                  className={clsx(classes.commonclass, classes.boxShadow)}
                >
                  <Form.Label className={classes.label}>Developer</Form.Label>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.label}>Developer</InputLabel>
                    <Select
                      value={inputDeveloper ? inputDeveloper : ''}
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

                {/* <div
            style={{
              gap: '2rem',
              marginTop: '1.8rem',
            }}
            className={clsx(classes.commonclass, classes.boxShadow)}
          >
            {state?.files ||
              (state?.videos && (
                <div
                  className={clsx(classes.boxShadow)}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  {state?.files && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <Form.Label className={classes.label}>Images: </Form.Label>
                      {state?.files.map((file, index) => {
                        ;<>
                          <img
                            src={file?.url}
                            key={index}
                            alt="file"
                            style={{ height: '8rem', width: '8rem' }}
                          />
                        </>
                      })}
                    </div>
                  )}

                  {state?.videos && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <Form.Label className={classes.label}>videos: </Form.Label>
                      {state?.videos.map((file, index) => {
                        ;<>
                          <img
                            src={file?.url}
                            key={index}
                            alt="file"
                            style={{ height: '8rem', width: '8rem' }}
                          />
                        </>
                      })}
                    </div>
                  )}
                </div>
              ))}
          </div> */}
              </div>
            </section>
          </form>
        </Container>
      )}
    </>
  )
}

export default EditProperties
