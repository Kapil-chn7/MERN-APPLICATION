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
import { API } from '../../API'
import { useLocation } from 'react-router-dom'
export default function Viewdonations() {
  const [tabledata, updateTable] = useState([])
  const location = useLocation()
  useEffect(() => {
    console.log('Location', location.state.data)
    const obj = location.state.data
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

    const newarr = []
    console.log('this is the type of push ', typeof newarr)
    newarr.push(obj.firstname + ' ' + obj.lastname)
    newarr.push('₹' + obj.damount)
    newarr.push('₹' + obj.damount)
    newarr.push(date)
    newarr.push(hoursIST + ':' + minutesIST)
    newarr.push(obj.email)
    newarr.push(obj.phonenumber)
    newarr.push(obj.country)
    newarr.push(obj.comment)
    updateTable(newarr)
  }, [])
  //   const tabledata = [
  //     'Kapil',
  //     '20k',
  //     '30k',
  //     '12 sep 2022 9:40 AM',
  //     'abc@gmail.com',
  //     '+9178xxxxxx',
  //     'New Delhi',
  //     'India',
  //     'Comment',

  //   ]

  const entryvalues = [
    'Name',
    'Amount',
    'Donation',
    'Date',
    'Time',
    'Email address',
    'Phone Number',
    // 'Address',
    'Country',
    'Comment',
    // 'IP Address',
    // 'Unique ID',
    // 'GateWay ID',
  ]
  return (
    <div className="row">
      <TableContainer component={Paper}>
        <div className="card">
          <div className="card-header">View Donation</div>
          <div className="card-body">
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              {/* <caption>A basic table example with a caption</caption> */}

              <TableBody>
                {tabledata.map((element, index) => {
                  return (
                    <TableRow key={element.id}>
                      <TableCell align="left">
                        <h5>{entryvalues[index]}</h5>
                      </TableCell>
                      <TableCell align="left">{element}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </TableContainer>
    </div>
  )
}
