import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useNavigate } from 'react-router-dom'
import './ContactRequest.css'
import { API } from 'src/API'
import axios from 'axios'
import { isAutheticated } from '../../components/auth/authhelper'
import { convertDate } from '../Commonjs.js'
function ContactRequest() {
  const { token } = isAutheticated()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [contactre, setContactRe] = useState({})
  const [totalRes, setTotalRes] = useState(0)
  const [paginationVal, setpaginationVal] = useState(10)
  const [active, setActive] = useState(1)

  const pageNumbers = []
  let page = 1
  let limitVal = 10
  for (let i = 1; i <= Math.ceil(totalRes / paginationVal); i++) {
    pageNumbers.push(i)
  }
  const getPageContent = async (e) => {
    setActive(Number(e.target.value))
    page = e.target.value * 1
  }
  const setLimitval = (e) => {
    setpaginationVal(Number(e.target.value))
    limitVal = Number(e.target.value)
  }
  const getcontactRe = async () => {
    const contactre = await axios.get(`${API}/api/contactRequest?page=${page}&limit=${limitVal}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('contactre', contactre)
    setContactRe(contactre.data.data)
    setTotalRes(contactre.data.totalRecords)

    setLoading(false)
  }
  const handleDelete = async (id) => {
    console.log(id)

    if (window.confirm('Are you sure want to delete?')) {
      try {
        const res = await axios.delete(`${API}/api/contactRequest/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res) {
          getcontactRe()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    getcontactRe()
  }, [])
  console.log('social link', contactre)

  return (
    <>
      <div className="main-content contactRequest">
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
                    Contact Request
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <h4 className="mb-0"></h4>
                  </div>

                  <div className="page-title-right">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        textTransform: 'capitalize',
                      }}
                      onClick={() => {
                        navigate('/add/conRequest', { replace: true })
                      }}
                    >
                      Add Request
                    </Button>
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
                              onChange={(e) => setLimitval(e)}
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

                    <div className="table-responsive table-shoot mt-3">
                      <table
                        className="table table-centered table-nowrap"
                        style={{ border: '1px solid' }}
                      >
                        <thead className="thead-light" style={{ background: '#ecdddd' }}>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Added On</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {loading ? (
                            <div>Loading...</div>
                          ) : (
                            contactre.map((el) => {
                              return (
                                <tr key={el._id}>
                                  <td>{el._id}</td>
                                  <td>{el.name} </td>
                                  <td>{convertDate(el.createdAt)}</td>

                                  <td>
                                    <Link to={`/view/contactRequest/${el._id}`}>
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
                                          handleDelete(el._id)
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              )
                            })
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
                          Showing 1 to{' '}
                          {totalRes < paginationVal ? <>{totalRes}</> : <>{paginationVal}</>} of{' '}
                          {totalRes} entries
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-6">
                        <div
                          className="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          "
                        >
                          <ul className="pagination">
                            <li
                              className="
                                paginate_button
                                page-item
                                previous
                                disabled
                              "
                            >
                              <a
                                href="#"
                                aria-controls="datatable"
                                data-dt-idx="0"
                                tabIndex="0"
                                className="page-link"
                              >
                                Previous
                              </a>
                            </li>

                            {pageNumbers.map((page, index) => {
                              return (
                                <li
                                  className={`paginate_button page-item ${
                                    active === page ? 'active' : ''
                                  }`}
                                  key={index}
                                >
                                  <button
                                    key={index}
                                    value={page}
                                    id={page}
                                    aria-controls="datatable"
                                    data-dt-idx="1"
                                    tabIndex="0"
                                    className="page-link "
                                    onClick={(e) => getPageContent(e)}
                                  >
                                    {page}
                                  </button>
                                </li>
                              )
                            })}
                            <li className="paginate_button page-item next">
                              <a href="#" tabIndex="0" className="page-link">
                                Next
                              </a>
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
    </>
  )
}

export default ContactRequest
