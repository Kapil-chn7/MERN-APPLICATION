import React, { useEffect, useState } from 'react'
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

export default function Donations() {
  const [tabledata, updatetdata] = useState([])
  useEffect(() => {
    axios
      .get(`${API}/api/donations`)
      .then((resp) => {
        console.log('This is the response', resp.data.data)
        updatetdata(resp.data.data)
      })
      .catch((err) => {
        console.log('this is the error', err)
      })
  }, [])
  //   const tabledata = [
  //     { id: 1, name: 'Kapil', amount: '20k', donationamount: '20k', date: '12 oct 2022' },
  //     { id: 2, name: 'Gaurav', amount: '40k', donationamount: '20k', date: '12 nov 2022' },
  //   ]

  const getDatetime = (obj) => {
    const date = new Date(obj.createdAt).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    var currentTime = new Date(obj.createdAt)
    const time = '232'
    var currentOffset = currentTime.getTimezoneOffset()

    var ISTOffset = 330 // IST offset UTC +5:30

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000)

    // ISTTime now represents the time in IST coordinates

    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()
    return <>{date + ' at ' + `${hoursIST}:${minutesIST}`}</>
  }
  return (
    <div className="row">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          {/* <caption>A basic table example with a caption</caption> */}
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Donation Amount</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata.map((element) => {
              return (
                <TableRow key={element._id}>
                  <TableCell align="left">{element.firstname}</TableCell>
                  <TableCell align="left">{'₹' + element.damount}</TableCell>
                  <TableCell align="left">{'₹' + element.damount}</TableCell>
                  <TableCell align="left">{getDatetime(element)}</TableCell>
                  <TableCell align="left">
                    <Link to="/view/donations/viewdonations" state={{ data: element }}>
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
