import { Container, Typography } from '@material-ui/core'
import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import clsx from 'clsx'
import FormControl from '@material-ui/core/FormControl'
import axios from 'axios'
import { API } from 'src/API'
import { isAutheticated } from '../../components/auth/authhelper'
import { useNavigate, useParams } from 'react-router-dom'
import { useStyles } from '../CommonCss'
import CommonDivs from '../CommonDivs'
import Chip from '@material-ui/core/Chip'

const ViewSingleDeveloper = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const [developer, setDeveloper] = useState()
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const ID = params.id
  const navigate = useNavigate()

  const getDeveloper = async () => {
    const developer = await axios.get(`${API}/api/developer/${ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setDeveloper(developer.data.data)
    setLoading(false)
  }

  useEffect(() => {
    getDeveloper()
  }, [])

  const commonComponent = [
    {
      label: 'Contact Email:',
      chip: developer?.contactEmail,
    },

    {
      label: 'Contact No:',
      chip: developer?.contactNo,
    },

    {
      label: 'Contact No:',
      chip: developer?.mobile,
    },

    {
      label: 'Facebook :',
      chip: developer?.facebook,
    },

    {
      label: 'Youtube Channel:',
      chip: developer?.youtubeChannel,
    },

    {
      label: 'whatsApp:',
      chip: developer?.whatsApp,
    },
  ]

  const commonComponentTwo = [
    {
      label: 'Role:',
      chip: developer?.userRole,
    },

    {
      label: 'Email:',
      chip: developer?.userEmail,
    },

    {
      label: 'Mobile :',
      chip: developer?.userMobile,
    },
  ]

  console.log(developer)

  if (loading) {
    ;<>Loading...</>
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
          View Developer
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ fontWeight: 'bold', marginRight: '1rem' }}
          onClick={() => navigate('/view/developers', { replace: true })}
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
            <CommonDivs label="Company Name:" data={developer?.companyName} />
            {developer?.address && <CommonDivs label="Address:" data={developer?.address} />}

            {developer?.address && <CommonDivs label="Address:" data={developer?.address} />}

            {developer?.state && <CommonDivs label="State:" data={developer?.state} />}

            {developer?.city && <CommonDivs label="City:" data={developer?.city} />}

            <CommonDivs label="Company Type:" data={developer?.companyType} />

            {developer?.website && (
              <FormControl component="fieldset">
                <Form.Label style={{ fontWeight: 'bold' }}>Website</Form.Label>
                <Chip
                  label={developer?.website}
                  color="primary"
                  style={{ margin: '0 2rem', fontWeight: 'bold' }}
                />
              </FormControl>
            )}
          </div>

          {(developer?.about || developer?.statistics) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
              className={classes.boxShadow}
            >
              {developer?.about && <CommonDivs label="About:" data={developer?.about} />}
              {developer?.statistics && (
                <CommonDivs label="Statistics:" data={developer?.statistics} />
              )}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
            className={classes.boxShadow}
          >
            <CommonDivs label="Account Owner:" data={developer?.accountOwner} />
            <CommonDivs label="First Name:" data={developer?.firstName} />
            <CommonDivs label="Last Name:" data={developer?.lastName} />
            <CommonDivs label="Job Title:" data={developer?.jobTitle} />
          </div>
        </section>

        {/* section second  */}

        <section className={clsx(classes.sectionTwo)}>
          <div
            className={clsx(classes.boxShadow)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {commonComponent.map((component, index) => {
              const lenth = component?.chip?.length
              return (
                <>
                  {lenth > 2 && (
                    <FormControl component="fieldset" key={index}>
                      <Form.Label style={{ fontWeight: 'bold' }}>{component.label}</Form.Label>
                      <Chip
                        label={component.chip}
                        color="primary"
                        style={{ margin: '0 2rem', fontWeight: 'bold' }}
                      />
                    </FormControl>
                  )}
                </>
              )
            })}
          </div>

          {(developer?.awards || developer?.location || developer?.files?.length > 0) && (
            <div
              className={clsx(classes.boxShadow)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {developer?.awards && <CommonDivs label="Awards:" data={developer?.awards} />}
              {developer?.location && <CommonDivs label="Location:" data={developer?.location} />}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                  flexWrap:'wrap'
                }}
              >
                {developer?.files?.length > 0 &&
                  developer?.files?.length?.map((file, index) => {
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
            </div>
          )}

          <div
            className={clsx(classes.boxShadow)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginTop: '0.8rem',
            }}
          >
            {commonComponentTwo.map((component, index) => {
              const lenth = component?.chip?.length
              return (
                <>
                  {lenth > 2 && (
                    <FormControl component="fieldset" key={index}>
                      <Form.Label style={{ fontWeight: 'bold' }}>{component.label}</Form.Label>
                      <Chip
                        label={component.chip}
                        color="primary"
                        style={{ margin: '0 2rem', fontWeight: 'bold' }}
                      />
                    </FormControl>
                  )}
                </>
              )
            })}
          </div>
        </section>
      </form>
    </Container>
  )
}

export default ViewSingleDeveloper
