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
  const [choice, updatechoice] = useState([])

  useEffect(() => {
    const pathname1 = location.pathname.substring('/view/getinvolved'.length + 1)

    const choice1 =
      pathname1 === 'Donor'
        ? donor
        : pathname1 === 'Government_Agency'
        ? governAgency
        : pathname1 === 'NGO'
        ? ngo
        : volunteer

    updatechoice(choice1)
    console.log('location.', location.state.data)
    // let filteredarr = location.state.data.filter((element, index) => {
    //   console.log('this is the elemnt', element)
    //   if (index != 0) {
    //     console.log('element', element, index)
    //     return element
    //   }
    // });
    // delete location.state.data._id
    // location.state.data.createdAt = new Date(location.state.data.createdAt).toLocaleString(
    //   'en-GB',
    //   {
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric',
    //   },
    // )
    // console.log('filteredadd')
    updateTable([...location.state.data])

    //   const obj = location.state.data
    //   const date = new Date(obj.createdAt).toLocaleString('en-GB', {
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric',
    //   })
    //   var currentTime = new Date(obj.createdAt)
    //   const time = '232'
    //   var currentOffset = currentTime.getTimezoneOffset()

    //   var ISTOffset = 330 // IST offset UTC +5:30

    //   var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000)

    //   // ISTTime now represents the time in IST coordinates

    //   var hoursIST = ISTTime.getHours()
    //   var minutesIST = ISTTime.getMinutes()

    //   const newarr = []
    //   console.log('this is the type of push ', typeof newarr)
    //   newarr.push(obj.firstname + ' ' + obj.lastname)
    //   newarr.push('₹' + obj.damount)
    //   newarr.push('₹' + obj.damount)
    //   newarr.push(date)
    //   newarr.push(hoursIST + ':' + minutesIST)
    //   newarr.push(obj.email)
    //   newarr.push(obj.phonenumber)
    //   newarr.push(obj.country)
    //   newarr.push(obj.comment)
    //   updateTable(newarr)
  }, [])
  console.log('this is the choicedd', choice)
  const donor = ['First Name', 'Last Name', 'Email', 'Phone Number', 'Amount', 'Time']
  const ngo = ['NGO', 'Sector', 'Email', 'Phone Number', 'State', 'Comment', 'Time']

  const volunteer = [
    'First Name',
    'Last Name',
    'Email',
    'Phone Number',
    'Location',
    'Health',
    'Time',
  ]
  const governAgency = ['Department', 'Phone Number', 'State', 'Email', 'URL', 'Time']
  return (
    <TableContainer component={Paper}>
      <div className="card">
        <div className="card-header">
          {location.pathname.substring('/view/getinvolved'.length + 1)}{' '}
        </div>
        <div className="card-body">
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}

            <TableBody>
              {tabledata.map((element, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">
                      <h5>{choice[index]}</h5>
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
  )
}
