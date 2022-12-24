import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from 'src/components/auth/authhelper'
import axios from 'axios'
import { API } from 'src/API'
import swal from 'sweetalert'
import { element } from 'prop-types'

const Map = () => {
  const { token } = isAutheticated()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(true)
  const [galleryData, setGalleryData] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [showData, setShowData] = useState(galleryData)

  const [state, updateState] = useState([])
  const [currentState, updatecurrState] = useState('HARYANA')
  const [data, updateData] = useState({})
  const [toggle, updatetoggle] = useState(false)
  const [booldata, updatebooldata] = useState(false)
  const handleShowEntries = (e) => {
    setCurrentPage(1)
    setItemPerPage(e.target.value)
  }

  useEffect(() => {
    axios
      .get(`${API}/api/map`)
      .then((resp) => {
        try {
          const arrval = []
          let another = {}
          Object.keys(resp.data).map((e) => {
            if (e != {}) {
              arrval.push(e)
              let a = { ...another, [e]: resp.data[e] }
              another = a
              updatebooldata(true)
            }
          })
          console.log('after this')
          updateState([...arrval])
          updatecurrState(arrval[0])

          updateData({ ...another })

          setLoading(false)
        } catch (Err) {}
      })
      .catch((err) => {
        setLoading(false)
      })
  }, [toggle])

  const currdataStore = (dataval) => {
    const a = dataval.filter((e) => {
      if (e.state === state.state) {
        updateData1({ ...e })
        return false
      }
    })
  }

  // useEffect(() => {
  //   const loadData = () => {
  //     const indexOfLastPost = currentPage * itemPerPage
  //     const indexOfFirstPost = indexOfLastPost - itemPerPage
  //     setShowData(galleryData.slice(indexOfFirstPost, indexOfLastPost))
  //   }
  //   loadData()
  // }, [currentPage, itemPerPage, galleryData])

  const handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      icon: 'error',
      buttons: { Yes: { text: 'Yes', value: true }, Cancel: { text: 'Cancel', value: 'cancel' } },
    }).then((value) => {
      if (value === true) {
        // {
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
        axios
          .delete(`${API}/api/map/${id}`)
          .then((res) => {
            setSuccess((prev) => !prev)
            updatetoggle(!toggle)
          })
          .catch((err) => {
            swal({
              title: 'Warning',
              text: 'Something went wrong!',
              icon: 'error',
              button: 'Retry',
              dangerMode: true,
            })
          })
      }
    })
  }
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
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
                <div style={{ fontSize: '22px' }} className="fw-bold">
                  Maps Gallery
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <h4 className="mb-0"></h4>
                </div>

                <div className="page-title-right">
                  <Link to="/view/maps/addmaps">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        textTransform: 'capitalize',
                      }}
                    >
                      Add Location
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row ml-0 mr-0 mb-10">
                    <div className="col-sm-12 col-md-12">
                      <div className="dataTables_length">
                        <label className="w-100">
                          Show
                          <select
                            style={{ width: '10%' }}
                            name=""
                            onChange={(e) => handleShowEntries(e)}
                            className="
                                select-w
                                custom-select custom-select-sm
                                form-control form-control-sm
                              "
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          entries
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <span>
                          <div>
                            <h4>Select State:</h4>
                          </div>
                          <div>
                            {' '}
                            <select
                              className="form-select form-select-sm w-25"
                              aria-label=".form-select-sm example"
                              onChange={(e) => {
                                updatecurrState(e.target.value)
                              }}
                            >
                              {state.map((element, id) => {
                                return (
                                  <option value={element} key={id} style={{ fontSize: '25px' }}>
                                    {element}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-shoot mt-3">
                    <table
                      className="table table-centered table-nowrap"
                      style={{ border: '1px solid' }}
                    >
                      <thead className="thead-light" style={{ background: '#ecdddd' }}>
                        <tr>
                          <th className="text-center">State</th>
                          <th className="text-center">Map</th>
                          <th className="text-center">Longitude & Latitude</th>
                          <th className="text-center">Added On</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {!loading && showData.length === 0 && (
                          <tr className="text-center">
                            <td colSpan="6">
                              <h5>No Data Available</h5>
                            </td>
                          </tr>
                        )} */}
                        {loading ? (
                          <tr>
                            <td className="text-center" colSpan="6">
                              Loading...
                            </td>
                          </tr>
                        ) : booldata === false ? (
                          <div className="row">
                            <center>
                              <h3 className="bg-danger">Add content</h3>
                            </center>
                          </div>
                        ) : (
                          <>
                            {data[currentState].map((element) => {
                              console.log('this is the map', element)

                              return (
                                <tr key={element._id}>
                                  <td className="text-center">{element.state}</td>
                                  <td className="text-center">
                                    <img
                                      src={element.mapImage}
                                      // alt={slide.title}
                                      width="150"
                                      height="80"
                                    />
                                  </td>
                                  <td className="text-center">
                                    {' '}
                                    {element.longitude}&#176;N &nbsp;{element.lattitude}&#176;E
                                  </td>
                                  <td className="text-center">
                                    {new Date(element.createdAt).toLocaleString('en-GB', {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric',
                                      hour12: true,
                                    })}
                                  </td>

                                  <td className="text-center">
                                    <Link to={'/view/maps/viewmap'} state={{ data: element }}>
                                      <button
                                        style={{ color: 'white', margin: '0 1rem' }}
                                        type="button"
                                        className="
                                        btn btn-success btn-sm
                                      waves-effect waves-light
                                      btn-table
                                      ml-2
                                    "
                                      >
                                        View
                                      </button>
                                    </Link>
                                    <Link to={'/view/maps/editmap'} state={{ data: element }}>
                                      <button
                                        style={{ color: 'white', margin: '0 1rem' }}
                                        type="button"
                                        className="
                                        btn btn-primary btn-sm
                                      waves-effect waves-light
                                      btn-table
                                      ml-2
                                    "
                                      >
                                        Edit Map
                                      </button>
                                    </Link>
                                    <Link
                                      to={'#'}
                                      style={{
                                        margin: '1rem',
                                      }}
                                    >
                                      <button
                                        style={{ color: 'white' }}
                                        type="button"
                                        className="
                                      btn btn-danger btn-sm
                                      waves-effect waves-light
                                      btn-table
                                      ml-2
                                      
                                    "
                                        onClick={() => {
                                          handleDelete(element._id)
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              )
                            })}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing {currentPage * itemPerPage - itemPerPage + 1} to{' '}
                        {Math.min(currentPage * itemPerPage, galleryData.length)} of{' '}
                        {galleryData.length} entries
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="d-flex">
                        <ul className="pagination ms-auto">
                          <li
                            className={
                              currentPage === 1
                                ? 'paginate_button page-item previous disabled'
                                : 'paginate_button page-item previous'
                            }
                          >
                            <span
                              className="page-link"
                              style={{ cursor: 'pointer' }}
                              onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                              Previous
                            </span>
                          </li>

                          {!(currentPage - 1 < 1) && (
                            <li className="paginate_button page-item">
                              <span
                                className="page-link"
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => setCurrentPage((prev) => prev - 1)}
                              >
                                {currentPage - 1}
                              </span>
                            </li>
                          )}

                          <li className="paginate_button page-item active">
                            <span className="page-link" style={{ cursor: 'pointer' }}>
                              {currentPage}
                            </span>
                          </li>

                          {!(
                            (currentPage + 1) * itemPerPage - itemPerPage >
                            galleryData.length
                          ) && (
                            <li className="paginate_button page-item ">
                              <span
                                className="page-link"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setCurrentPage((prev) => prev + 1)
                                }}
                              >
                                {currentPage + 1}
                              </span>
                            </li>
                          )}

                          <li
                            className={
                              !((currentPage + 1) * itemPerPage - itemPerPage > galleryData.length)
                                ? 'paginate_button page-item next'
                                : 'paginate_button page-item next disabled'
                            }
                          >
                            <span
                              className="page-link"
                              style={{ cursor: 'pointer' }}
                              onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                              Next
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
