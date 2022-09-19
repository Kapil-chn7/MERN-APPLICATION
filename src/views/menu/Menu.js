import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from 'src/components/auth/authhelper'
import axios from 'axios'
import { API } from 'src/API'

const Menu = () => {
  const { token } = isAutheticated()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(true)
  const [menuData, setMenuData] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [showData, setShowData] = useState(menuData)

  const handleShowEntries = (e) => {
    setCurrentPage(1)
    setItemPerPage(e.target.value)
  }

  const getMenuItems = () => {
    axios
      .get(`${API}/api/menu`, {
        headers: { 'Access-Control-Allow-Origin': '*', Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data)
        setMenuData(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    getMenuItems()
  }, [success])

  useEffect(() => {
    const loadData = () => {
      const indexOfLastPost = currentPage * itemPerPage
      const indexOfFirstPost = indexOfLastPost - itemPerPage
      setShowData(menuData.slice(indexOfFirstPost, indexOfLastPost))
    }
    loadData()
  }, [currentPage, itemPerPage, menuData])

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
                  Menu
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <h4 className="mb-0"></h4>
                </div>

                <div className="page-title-right">
                  <Link to="/menu/add">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        textTransform: 'capitalize',
                      }}
                    >
                      Add New Menu Item
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

                  <div className="table-responsive table-shoot mt-3">
                    <table
                      className="table table-centered table-nowrap"
                      style={{ border: '1px solid' }}
                    >
                      <thead className="thead-light" style={{ background: '#ecdddd' }}>
                        <tr>
                          <th className="text-center">Menu Name</th>
                          <th className="text-center">Sub Menu Name</th>
                          <th className="text-center">Linked Page</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading && showData.length === 0 && (
                          <tr className="text-center">
                            <td colSpan="6">
                              <h5>No Data Available</h5>
                            </td>
                          </tr>
                        )}
                        {loading ? (
                          <tr>
                            <td className="text-center" colSpan="6">
                              Loading...
                            </td>
                          </tr>
                        ) : (
                          showData.map((menuitem, i) => {
                            return (
                              <tr key={i}>
                                <td className="text-center">{menuitem.menu_name}</td>
                                <td className="text-center">{menuitem.sub_manu_name}</td>
                                <td className="text-center">{menuitem.linked_page}</td>

                                <td className="text-center">
                                  <Link to={`/menu/edit/${menuitem._id}`}>
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
                                      className="
                                    btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                    
                                  "
                                      onClick={() => {
                                        handleDelete(menuitem._id)
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
                        Showing {currentPage * itemPerPage - itemPerPage + 1} to{' '}
                        {Math.min(currentPage * itemPerPage, menuData.length)} of {menuData.length}{' '}
                        entries
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

                          {!((currentPage + 1) * itemPerPage - itemPerPage > menuData.length) && (
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
                              !((currentPage + 1) * itemPerPage - itemPerPage > menuData.length)
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

export default Menu
