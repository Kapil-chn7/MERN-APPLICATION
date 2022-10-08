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
import { API } from '../../../API'
import { isAutheticated } from '../../../components/auth/authhelper'

export default function AcccessibleTable() {
  const [tabledata, updatetabledata] = useState([])
  const { token } = isAutheticated()
  const [loading, disableLoading] = useState(false)

  //this function gets the table data from database
  async function getTabledata() {
    disableLoading(true)
    axios
      .get(`${API}/api/addpage`)
      .then((resp) => {
        console.log('this is the response', resp.data.data)
        updatetabledata(resp.data.data)
        disableLoading(false)
      })
      .catch((err) => {
        console.log('thsi is the error ', err)
        disableLoading(true)
      })
  }

  //this will delte the page on click
  const deleteFunction = async (id) => {
    if (window.confirm('Are you sure want to delete?')) {
      try {
        const res = await axios.delete(`${API}/api/addpage/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res) {
          // getcontactRe()
          console.log('this is the resp', res)
          getTabledata()
          // updatetabledata([])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  //this function converts createdAt string in ist
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
  const updateContentFunction = () => {}

  useEffect(() => {
    //this call is to get all the page content in the table data state

    getTabledata()
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

            <div className="d-flex mb-2">
              <Link className="btn btn-primary btn-sm" to="/view/addpage">
                {' '}
                Add Page
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Added On</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow align="center">
                  <TableCell>Loading...</TableCell>
                </TableRow>
              ) : (
                tabledata.map((element) => {
                  return (
                    <TableRow key={element._id}>
                      <TableCell align="left">
                        {/* <Link to={`/view/page/${element.title}`} state={{ id: element._id }}>
                          {' '}
                          {element.title}
                        </Link> */}

                        {/* comment this is want to see href of links title */}
                        {element.title}
                      </TableCell>
                      <TableCell align="left">{getDatetime(element)}</TableCell>
                      <TableCell align="left">
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`/view/page/cmseditor/${element._id}`}
                        >
                          Edit
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteFunction(element._id)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
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
