import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../API'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@material-ui/core/Button'

// import { isAutheticated } from '../../../components/auth/authhelper'

export default function Newslettersus() {
  const [emaildata, updateEmails] = useState([])
  useEffect(() => {
    axios
      .get(`${API}/api/usersignup`)
      .then((resp) => {
        console.log('this is the response', resp)
        updateEmails([...resp.data])
      })
      .catch((err) => {
        console.log('thsi si the error', err)
      })
  }, [])
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div
            className="
          page-title-box
          d-flex
          align-items-center
          justify-content-between
        "
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <h4 className="mb-0"></h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-2">
        <h3>Email Suscribers</h3>
      </div>
      <div className="row">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Profile</TableCell>
                <TableCell align="left">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emaildata.map((element, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">{element.name}</TableCell>
                    <TableCell align="left">
                      <img src={element.picture} alt="" />
                    </TableCell>
                    <TableCell align="left">{element.email}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* <div className="row mt-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <Link to={`/view/page/hi`} state={{}}>
                    {' '}
                    {'Footer'}
                  </Link>
                </TableCell>
                <TableCell align="left" style={{ paddingLeft: '110px' }}>
                  {'2022-09-16T10:52:30.282Z'}
                </TableCell>
                <TableCell align="left" style={{ paddingRight: '60px' }}>
                  <Link className="btn btn-primary btn-sm" to={`/view/page/cmseditor/Footer`}>
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}
    </div>
  )
}
