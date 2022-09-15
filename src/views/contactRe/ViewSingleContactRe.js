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
import { convertDate } from '../Commonjs.js'

import Chip from '@material-ui/core/Chip'
const ViewSingleContactRe = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const [contactre, setContactRe] = useState()
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const ID = params.id
  const navigate = useNavigate()

  const getContactRequest = async () => {
    const contactre = await axios.get(
      `${API}/api/contactRequest/${ID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setContactRe(contactre.data.data)
    setLoading(false)
  }

  useEffect(() => {
    getContactRequest()
  }, [])

  const commonComponent = [
    {
      label: 'Name:',
      chip: contactre?.name,
    },

    {
      label: 'Email:',
      chip: contactre?.email,
    },

    {
      label: 'Mobile Number:',
      chip: contactre?.contactNo,
    },

    {
      label: 'Description :',
      chip: contactre?.description,
    },
    {
      label: 'Added On :',
      chip: convertDate(contactre?.createdAt)
    },
  ]

  console.log(contactre)

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
          View Contact Request
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ fontWeight: 'bold', marginRight: '1rem' }}
          onClick={() => navigate('/view/contactrequests', { replace: true })}
        >
          Back
        </Button>
      </div>

      <form className={classes.root} style={{display:"flex",justifyContent:"center"}} noValidate autoComplete="off">
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
        </section>
      </form>
    </Container>
  )
}

export default ViewSingleContactRe
