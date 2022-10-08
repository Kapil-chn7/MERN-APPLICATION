import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@material-ui/core/Button'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { API } from '../../API'
// import { isAutheticated } from '../../../components/auth/authhelper'

export default function getinvolved() {
  const [choice, updatechoice] = useState('1')
  const [tbdata, updatedata] = useState([])
  const [loading, disableloading] = useState(false)
  const [toggle, toggleit] = useState(false)
  const returnaddress = () => {
    let value =
      choice === '1'
        ? 'Donor'
        : choice === '2'
        ? 'NGO'
        : choice === '3'
        ? 'Volunteer'
        : 'Government_Agency'
    return `/view/getinvolved/${value}`
  }

  useEffect(() => {
    disableloading(true)
    axios
      .get(`${API}/api/getinvolved/${choice}`)
      .then((res) => {
        disableloading(false)

        const filterarr = res.data.data.map((ele) => {
          delete ele.updatedAt
          delete ele.__v
          delete ele._id
          console.log('this is the element', ele)
          ele.createdAt = new Date(ele.createdAt).toLocaleString('en-GB', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })
          return ele
        })
        console.log('tis is the elementxx', filterarr)
        updatedata([...filterarr])
      })
      .catch((err) => {
        disableloading(true)
        console.warn('this is the error', err)
      })
  }, [toggle])
  const returnTable = () => {
    if (choice == '1') {
      return (
        <TableContainer component={Paper}>
          {/* <div className="row">Donor</div> */}
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <h5>First Name</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Last Name</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Phone number</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Email</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Amount</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>View</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tbdata.map((element) => {
                return (
                  <TableRow key={element._id}>
                    <TableCell align="left">{element.firstName}</TableCell>
                    <TableCell align="left">{element.lastName}</TableCell>
                    <TableCell align="left">{element.phoneNumber}</TableCell>
                    <TableCell align="left">{element.email}</TableCell>
                    <TableCell align="left"> &#8377;{element.amount}</TableCell>
                    <TableCell align="left">
                      <Link to={returnaddress()} state={{ data: Object.values(element) }}>
                        <VisibilityIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )
    } else if (choice == '2') {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <h5>NGO</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Email</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Phone Number</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Sector</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>State</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Comment</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>View</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tbdata.map((element) => {
                return (
                  <TableRow key={element._id}>
                    <TableCell align="left">{element.ngoName}</TableCell>
                    <TableCell align="left">{element.email}</TableCell>
                    <TableCell align="left">{element.phoneNumber}</TableCell>
                    <TableCell align="left">{element.sector}</TableCell>
                    <TableCell align="left">{element.stateordistrict}</TableCell>
                    <TableCell align="left">{element.message}</TableCell>
                    <TableCell align="left">
                      <Link to={returnaddress()} state={{ data: Object.values(element) }}>
                        <VisibilityIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )
    } else if (choice == '3') {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <h5>First Name</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Last Name</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Phone number</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Email</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Location</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Health</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>View</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tbdata.map((element) => {
                return (
                  <TableRow key={element._id}>
                    <TableCell align="left">{element.firstName}</TableCell>
                    <TableCell align="left">{element.lastName}</TableCell>
                    <TableCell align="left">{element.phoneNumber}</TableCell>
                    <TableCell align="left">{element.email}</TableCell>
                    <TableCell align="left">{element.location}</TableCell>
                    <TableCell align="left">{element.health}</TableCell>{' '}
                    <TableCell align="left">
                      <Link to={returnaddress()} state={{ data: Object.values(element) }}>
                        <VisibilityIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )
    } else {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <h5>Department</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Phone Number</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>State</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>Email</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>URL</h5>
                </TableCell>
                <TableCell align="left">
                  <h5>View</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tbdata.map((element) => {
                return (
                  <TableRow key={element._id}>
                    <TableCell align="left">{element.department}</TableCell>
                    <TableCell align="left">{element.phoneNumber}</TableCell>
                    <TableCell align="left">{element.stateorministry}</TableCell>
                    <TableCell align="left">{element.email}</TableCell>
                    <TableCell align="left">
                      <a href={element.url} style={{ textDecoration: 'none' }}>
                        Link
                      </a>
                    </TableCell>{' '}
                    <TableCell align="left">
                      <Link to={returnaddress()} state={{ data: Object.values(element) }}>
                        <VisibilityIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
  }
  return (
    <div className="container">
      <div className="row mb-3">
        <select
          className="form-select w-25"
          aria-label="Default select example"
          onChange={(e) => {
            updatechoice(e.target.value)
            console.log('this is a updatechoice ', choice)
            toggleit(!toggle)
          }}
        >
          <option value="1">Donor</option>
          <option value="2">NGO</option>
          <option value="3">Volunteer</option>
          <option value="4">Government Agency</option>
        </select>
      </div>

      <div className="row">
        {loading ? (
          <tr>
            <td className="text-center" colSpan="6">
              Loading...
            </td>
          </tr>
        ) : (
          returnTable()
        )}
      </div>
    </div>
  )
}
