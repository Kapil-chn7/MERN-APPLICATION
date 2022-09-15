import React, { useState, useEffect } from 'react'
import { isAutheticated } from '../../components/auth/authhelper'
import axios from 'axios'
import { API } from 'src/API'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core'
import Form from 'react-bootstrap/Form'
import clsx from 'clsx'
import { Button } from '@mui/material'
import Chip from '@material-ui/core/Chip'
import CommonDivs from '../CommonDivs'
import { useStyles } from '../CommonCss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const ViewSingleProperty = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const [property, setProperty] = useState()
  const [loading, setLoading] = useState(true)
  const [plot, setPlot] = useState([])
  const [developer, setDeveloper] = useState('')
  const params = useParams()
  const ID = params.id
  const navigate = useNavigate()

  const getDeveloper = async (developerID) => {
    const developer = await axios.get(`${API}/api/developer/${developerID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setDeveloper(developer.data.data.companyName)
    setLoading(false)
  }

  const getProperty = async () => {
    const property = await axios.get(`${API}/api/property/${ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setProperty(property.data.data)
    const newPlotArr = property?.data?.data?.plot ? plotsArr() : []
      function plotsArr() {
        try {
          property?.data?.data?.plot?.map(JSON.parse)
        } catch (e) {
          return property?.data?.data?.plot
        }
        return property?.data?.data?.plot?.map(JSON.parse)
      }
      
    setPlot([...newPlotArr])
    const developerID = property?.data.data.developer
    getDeveloper(developerID)
  }

  useEffect(() => {
    getProperty()
  }, [])

  if (loading) {
    ;<>Loading...</>
  }
  console.log(property, 'property')

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
          View Property
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ fontWeight: 'bold', marginRight: '1rem' }}
          onClick={() => navigate('/view/properties', { replace: true })}
        >
          Back
        </Button>
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
            <CommonDivs label="Property Display Name:" data={property?.propertyDisplayName} />
            <CommonDivs label="Property Name:" data={property?.propertyName} />

            {property?.aboutProperty && (
              <CommonDivs label="Description:" data={property?.aboutProperty} />
            )}
            {property?.state && <CommonDivs label="State:" data={property?.state} />}

            {property?.city && <CommonDivs label="City:" data={property?.city} />}

            <CommonDivs label="GooglePin:" data={property?.googlePin} />
          </div>

          <div className={clsx(classes.commonclass, classes.boxShadow)}>
            <div>
              <CommonDivs label=" Extent of Land:" data={`${property?.extentofLand} Acre`} />
            </div>

            {plot?.length > 0 && (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Plot Area</TableCell>
                      <TableCell>Facing</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plot.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{`${item.PlotArea} Sq.Yards`}</TableCell>
                        <TableCell>{item.Facing}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>

          {(property?.price || property?.paymentTerms) && (
            <div
              style={{
                gap: '2rem',
                marginTop: '1rem',
              }}
              className={clsx(classes.commonclass, classes.boxShadow)}
            >
              {property?.price && <CommonDivs label="Price:" data={property?.price} />}
              {property?.paymentTerms && (
                <CommonDivs label="Payment Terms:" data={property?.paymentTerms} />
              )}
            </div>
          )}
        </section>

        {/* section second  */}

        <section className={clsx(classes.sectionTwo)}>
          <div
            className={clsx(classes.boxShadow)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <CommonDivs label="Property Type:" data={property?.layoutType} />
            {property?.layoutApprovalNumber && (
              <CommonDivs label="Layout Approval Number:" data={property?.layoutApprovalNumber} />
            )}

            {/* {property?.approvalLetter && (
              <>
                <Form.Label className={classes.label}>Upload Layout </Form.Label>
                <img
                  src={approvalLetter?.url}
                  alt="approvalLetter"
                  style={{ height: '8rem', width: '8rem' }}
                />
              </>
            )} */}

            {/* {property?.layout && (
              <>
                <Form.Label className={classes.label}> Layout </Form.Label>
                <img src={layout?.url} alt="layout" style={{ height: '8rem', width: '8rem' }} />
              </>
            )} */}

            <hr />

            {property?.RERAApproved && (
              <CommonDivs label="RERA Approved:" data={property?.RERAApproved} />
            )}

            {property?.RERANumber && (
              <CommonDivs label="RERA Number:" data={property?.RERANumber} />
            )}

            {/* {property?.RERAapprovalLetter && (
              <>
                <Form.Label className={classes.label}> RERA approval Letter </Form.Label>
                <img
                  src={RERAapprovalLetter?.url}
                  alt="RERAapprovalLetter"
                  style={{ height: '8rem', width: '8rem' }}
                />
              </>
            )} */}
          </div>

          <div
            className={clsx(classes.boxShadow)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {property?.amenities?.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <Form.Label className={classes.label}>Amenities:</Form.Label>
                {property?.amenities.map((item, index) => {
                  return <Chip key={index} label={item} color="primary" />
                })}
              </div>
            )}

            {property?.locationAdvantages?.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <Form.Label className={classes.label}>Location Advantages:</Form.Label>
                {property?.locationAdvantages.map((item, index) => {
                  return <Chip key={index} label={item} color="primary" />
                })}
              </div>
            )}
          </div>



          
          {developer.length > 2 && (
            <div
              className={clsx(classes.boxShadow)}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {developer && <CommonDivs label="Developer:" data={developer} />}
            </div>
          )}
         

          {/* <div
            style={{
              gap: '2rem',
              marginTop: '1.8rem',
            }}
            className={clsx(classes.commonclass, classes.boxShadow)}
          >
            {property?.files ||
              (property?.videos && (
                <div
                  className={clsx(classes.boxShadow)}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  {property?.files && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <Form.Label className={classes.label}>Images: </Form.Label>
                      {property?.files.map((file, index) => {
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

                  {property?.videos && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <Form.Label className={classes.label}>videos: </Form.Label>
                      {property?.videos.map((file, index) => {
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
        </section>
      </form>
    </Container>
  )
}

export default ViewSingleProperty
