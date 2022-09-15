import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useNavigate } from 'react-router-dom'
import './ViewDevelopers.css'

import { isAutheticated } from '../../components/auth/authhelper'
import axios from 'axios'
import { API } from 'src/API'

function ViewDevelopers() {
  const { token } = isAutheticated()
  const [developers, setDevelopers] = useState([])
  const navigate = useNavigate()
  const [totalRes, setTotalRes] = useState(0)
  const [paginationVal, setpaginationVal] = useState(10)
  const [active, setActive] = useState(1)
  const [loading, setLoading] = useState(true)

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
  const setLimitval = async (e) => {
    setpaginationVal(Number(e.target.value))
    limitVal = Number(e.target.value)
  }

  const getDevelopers = async () => {
    const developers = await axios.get(`${API}/api/developer?page=${page}&limit=${limitVal}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(developers)
    setDevelopers([...developers.data.data])
    setTotalRes(developers.data.totalRecords)
    setLoading(false)
  }

  useEffect(() => {
    getDevelopers()
  }, [])
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${API}/api/developer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        getDevelopers()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div class="main-content viewDeveloper">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div
                  class="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <div style={{ fontSize: '22px' }} className="fw-bold">
                    Developers
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <h4 class="mb-0"></h4>
                  </div>

                  <div class="page-title-right">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        textTransform: 'capitalize',
                      }}
                      onClick={() => {
                        navigate('/add/developer', { replace: true })
                      }}
                    >
                      Add Developer
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row ml-0 mr-0 mb-10">
                      <div class="col-sm-12 col-md-12">
                        <div class="dataTables_length">
                          <label class="w-100">
                            Show
                            <select
                              style={{ width: '10%' }}
                              name=""
                              onChange={(e) => setLimitval(e)}
                              class="
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

                    <div class="table-responsive table-shoot mt-3">
                      <table
                        class="table table-centered table-nowrap"
                        style={{ border: '1px solid' }}
                      >
                        <thead class="thead-light" style={{ background: '#ecdddd' }}>
                          <tr>
                            <th>ID</th>
                            <th>Company Name</th>
                            <th>Company Type</th>
                            <th>Added By</th>
                            <th>Updated By</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {loading ? (
                            <div>Loading...</div>
                          ) : (
                            developers.map((el) => {
                              return (
                                <tr key={el._id}>
                                  <td>{el._id}</td>
                                  <td>{el.companyName} </td>
                                  <td>{el.companyType}</td>
                                  <td>Admin</td>
                                  <td>Admin</td>

                                  <td>
                                    <Link to={`/view/developer/${el._id}`}>
                                      <button
                                        style={{ color: 'white', margin: '0 1rem' }}
                                        type="button"
                                        class="
                                      btn btn-success btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                                      >
                                        View
                                      </button>
                                    </Link>

                                    <Link to={`/edit/developer/${el._id}`}>
                                      <button
                                        style={{ color: 'white' }}
                                        type="button"
                                        class="
                                      btn btn-success btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                                      >
                                        Edit
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
                                        class="
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

                    <div class="row mt-20">
                      <div class="col-sm-12 col-md-6 mb-20">
                        <div
                          class="dataTables_info"
                          id="datatable_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 1 to{' '}
                          {totalRes < paginationVal ? <>{totalRes}</> : <>{paginationVal}</>} of{' '}
                          {totalRes} entries
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-6">
                        <div
                          class="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          "
                        >
                          <ul class="pagination">
                            <li
                              class="
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
                                tabindex="0"
                                class="page-link"
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
                            <li class="paginate_button page-item next">
                              <a href="#" tabindex="0" class="page-link">
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

export default ViewDevelopers
