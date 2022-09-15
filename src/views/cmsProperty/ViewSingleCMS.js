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
const ViewSingleCMS = () => {
  const classes = useStyles()
  const { token } = isAutheticated()
  const [cmsstate, setCms] = useState()
  const params = useParams()
  const ID = params.id
  const navigate = useNavigate()
  const getCms = async () => {
    const cms = await axios.get(
      `${API}/api/user/${ID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setCms(cms.data.data)
  }

  useEffect(() => {
    getCms()
  }, [])

  const commonComponent = [
    {
      label: 'Title:',
      chip: cmsstate?.title,
    },

    {
      label: 'Body:',
      chip: cmsstate?.body,
    },
    {
      label: 'Updated On:',
      chip: cmsstate?.updatedAt,
    },
  ]

  console.log('cms-single',cmsstate)

  // if (loading) {
  //   ;<>Loading...</>
  // }
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
          View CMS
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ fontWeight: 'bold', marginRight: '1rem' }}
          onClick={() => navigate('/view/cms', { replace: true })}
        >
          Back
        </Button>
      </div>

      <form className={classes.root} style={{display:"flex",justifyContent:"center"}} noValidate autoComplete="off">
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

export default ViewSingleCMS
