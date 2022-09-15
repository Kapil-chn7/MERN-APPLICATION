import React, { useState, useEffect } from 'react'
import { isAutheticated } from '../../components/auth/authhelper'
import axios from 'axios'
import { API } from 'src/API'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core'
import Form from 'react-bootstrap/Form'
import FormControl from '@material-ui/core/FormControl'
import clsx from 'clsx'
import { Button } from '@mui/material'
import Chip from '@material-ui/core/Chip'
import CommonDivs from '../CommonDivs'
import { useStyles } from '../CommonCss'
import { convertDate } from "../Commonjs.js"


const ViewSingleInvestor = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const [investor, setInvestor] = useState()
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const ID = params.id
  const navigate = useNavigate()

  const getInvestor = async () => {
    const property = await axios.get(`${API}/api/investor/${ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setInvestor(property.data.data)
    setLoading(false)
  }

  useEffect(() => {
    getInvestor()
  }, [])

  const commonComponent = [
    {
      label: 'State:',
      chip: investor?.state,
    },

    {
      label: 'City :',
      chip: investor?.city,
    },
    {
      label: 'Status:',
      chip: investor?.status ? "Active" : "Suspend",
    },
    {
      label: 'Adden On:',
      chip: convertDate( investor?.date),
    },
  ]

  if (loading) {
    <>Loading...</>
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
          View Investor
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ fontWeight: 'bold', marginRight: '1rem' }}
          onClick={() => navigate('/view/Investors', { replace: true })}
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
            <CommonDivs label="Name:" data={investor?.name} />
            <CommonDivs label="Email:" data={investor?.email} />
            <CommonDivs label="MobileNo:" data={investor?.mobileNo} />
            <CommonDivs label="Address:" data={investor?.address} />

            <img
            src={investor?.image?.url}
            alt="image file"
          
            style={{ height: '8rem', width: '8rem' }}
          />
          </div>
        </section>

        {/* section second  */}

        <section className={clsx(classes.sectionTwo, classes.boxShadow)}>
          {commonComponent.map((component, index) => {
            return (
              <FormControl component="fieldset" key={index}>
                <Form.Label style={{ fontWeight: 'bold' }}>{component.label}</Form.Label>
                <Chip
                  label={component.chip}
                  color="primary"
                  style={{ margin: '0 2rem', fontWeight: 'bold' }}
                />
              </FormControl>
            )
          })}

        
        </section>
      </form>
    </Container>
  )
}

export default ViewSingleInvestor
