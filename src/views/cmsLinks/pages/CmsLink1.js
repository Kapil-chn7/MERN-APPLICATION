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
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { isAutheticated } from '../../../components/auth/authhelper'

export default function AcccessibleTable() {
  const [tabledata, updatetabledata] = useState([])
  const { token } = isAutheticated()
  const [loading, disableLoading] = useState(false)
  const [editOnly, updateEdit] = useState(false)
  const [choice, updateChoice] = useState('0')

  //this function gets the table data from database
  async function getTabledata() {
    disableLoading(true)
    const urlval =
      choice === '0'
        ? '/footer'
        : choice === '1'
        ? '/getboardmembers'
        : choice === '2'
        ? '/whatdowedoGet'
        : choice === '3'
        ? '/ourpartnersGet'
        : '/gettestimonies'

    axios
      .get(`${API}/api/addpage` + urlval)
      .then((resp) => {
        updatetabledata(resp.data.data)

        disableLoading(false)
      })
      .catch((err) => {
        disableLoading(true)
      })
  }

  //this will delte the page on click
  const deleteFunction = async (id) => {
    if (window.confirm('Are you sure want to delete?')) {
      try {
        const urlval =
          choice === '0'
            ? '/footer'
            : choice === '1'
            ? '/advisoryboard'
            : choice === '2'
            ? '/whatdowedoGet'
            : choice === '3'
            ? '/ourpartners'
            : '/testimonies'
        const res = await axios.delete(`${API}/api/addpage${urlval}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res) {
          // getcontactRe()

          getTabledata()
          swal({
            title: 'Success',
            text: 'Content has been added',
            icon: 'success',
            button: 'Return',
          })

          // updatetabledata([])
        }
      } catch (error) {
        swal({
          title: 'Server Error',
          text: 'Something went wrong',
          icon: 'warning',
          button: 'Return',
        })
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

  const disableEditfuntion = (e) => {
    if (e === '2') {
      updateEdit(true)
    } else {
      updateEdit(false)
    }
  }
  const updateContentFunction = () => {
    if (choice === '0') {
      return (
        <div className="row">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
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
                        <TableCell align="left">{element.title}</TableCell>
                        <TableCell align="left">{getDatetime(element)}</TableCell>
                        <TableCell align="left">
                          <Link
                            className="btn btn-primary btn-sm"
                            to={`/view/page/cmseditor/${element._id}`}
                            state={{ data: element }}
                          >
                            Edit
                          </Link>
                          &nbsp;
                          {editOnly === true ? (
                            <div></div>
                          ) : (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteFunction(element._id)}
                            >
                              Delete
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
    } else if (choice === '1') {
      return (
        <div className="row">
          <div className="row">
            <p>
              <h3>Board Members</h3>
            </p>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
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
                        <TableCell align="left">{element.title}</TableCell>
                        <TableCell align="left">{getDatetime(element)}</TableCell>
                        <TableCell align="left">
                          <Link
                            className="btn btn-primary btn-sm"
                            to={`/view/page/editpage/${element._id}`}
                            state={{ data: element, choice }}
                          >
                            Edit
                          </Link>
                          &nbsp;
                          {editOnly === true ? (
                            <div></div>
                          ) : (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteFunction(element._id)}
                            >
                              Delete
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
    } else if (choice === '2') {
      return (
        <div className="row">
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={tabledata[0].ckeditordata}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.

                editor.editing.view.change((writer) => {
                  writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                })
              }}
              onChange={(event, editor) => {
                let data = editor.getData()
                updatetabledata([{ ...tabledata[0], ckeditordata: data }])

                // updateDataval('editor', data)
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </div>
          <div className="row mt-3">
            <div className="col-12 ">
              <button
                className="btn btn-primary"
                type="button"
                onClick={async () => {
                  await axios
                    .post(`${API}/api/addpage/whatdowedo`, {
                      ckeditordata: tabledata[0].ckeditordata,
                    })
                    .then((resp) => {
                      // updateloading(false)
                      swal({
                        title: 'Success',
                        text: 'Content has been added',
                        icon: 'success',
                        button: 'Return',
                      })
                    })
                    .catch((err) => {
                      // updateloading(false)

                      swal({
                        title: 'Server Error',
                        text: 'Something went wrong',
                        icon: 'warning',
                        button: 'Return',
                      })
                    })
                }}
              >
                Edit
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger "
                onClick={() => {
                  if (
                    ckeditorData.title != '' ||
                    ckeditorData.file != null ||
                    ckeditorData.updateditorData != ''
                  ) {
                    if (window.confirm('Do you really want to clear the changes?')) {
                      window.location.reload(true)
                    }
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    } else if (choice === '3') {
      return (
        <div className="row">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Company/Organisation</TableCell>
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
                        <TableCell align="left">{element.title}</TableCell>
                        <TableCell align="left">{getDatetime(element)}</TableCell>
                        <TableCell align="left">
                          <Link
                            className="btn btn-primary btn-sm"
                            to={`/view/page/editpage/${element._id}`}
                            state={{ data: element, choice }}
                          >
                            Edit
                          </Link>
                          &nbsp;
                          {editOnly === true ? (
                            <div></div>
                          ) : (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteFunction(element._id)}
                            >
                              Delete
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
    } else if (choice === '4') {
      return (
        <div className="row">
          <div className="row">
            <p>
              <h3>Testimonies</h3>
            </p>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
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
                        <TableCell align="left">{element.title}</TableCell>
                        <TableCell align="left">{getDatetime(element)}</TableCell>
                        <TableCell align="left">
                          <Link
                            className="btn btn-primary btn-sm"
                            to={`/view/page/editpage/${element._id}`}
                            state={{ data: element, choice }}
                          >
                            Edit
                          </Link>
                          &nbsp;
                          {editOnly === true ? (
                            <div></div>
                          ) : (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteFunction(element._id)}
                            >
                              Delete
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
    }
  }

  useEffect(() => {
    //this call is to get all the page content in the table data state

    getTabledata()
  }, [choice])
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

            {editOnly === true ? (
              <div></div>
            ) : (
              <div className="d-flex mb-2">
                <Link className="btn btn-primary btn-sm" to="/view/addpage">
                  {' '}
                  Add Page
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-1 mb-2 w-25">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            updateChoice(e.target.value)
            disableEditfuntion(e.target.value)
          }}
        >
          <option value="0">Footer</option>
          <option value="1">Advisory Board</option>
          <option value="2">What do we do</option>
          <option value="3">Our Partner</option>
          <option value="4">Testimonies</option>
        </select>
      </div>
      <div className="row">{updateContentFunction()}</div>

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
