import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { isAutheticated } from '../../components/auth/authhelper'
import axios from 'axios'
import { convertDate } from '../Commonjs.js'

import './Cms.css'
import { EditCms } from './EditCms'
import { API } from '../../API'
function Cms() {
  const { token } = isAutheticated()
  const [loading, setLoading] = useState(true)
  const [mainCms, setMainCms] = useState({})
  const [cmsDate, setCmsdate] = useState({})
  const [cmsId, setCmsId] = useState({})
  const [edit, setEdit] = useState(false)
  const [activeEditField, setActiveEditField] = useState('')
  const [totalRes, setTotalRes] = useState(0)
  const [paginationVal, setpaginationVal] = useState(10)
  const [active, setActive] = useState(1)
  const [aboutus, setUboutus] = useState(1)
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
    setEdit(true)
    setpaginationVal(Number(e.target.value))
    limitVal = Number(e.target.value)
  }
  const getcms = async () => {
    const { data } = await axios.get(`${API}/api/user?page=${page}&limit=${limitVal}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('cms', data.data)

    //this is causing errors
    setMainCms(data.data.cms)
    setCmsdate(data.data.createdAt)
    setTotalRes(data.totalRecords)
    setCmsId(data.data._id)
    setLoading(false)
  }

  const onEdit = (name) => {
    setActiveEditField(name)
    setEdit(true)
  }

  useEffect(() => {
    console.log('this is cms')
    getcms()
  }, [])
  console.log('cms-main', mainCms)
  console.log('cms-date', cmsDate)
  console.log('cms-id', cmsId)

  if (Object.keys(mainCms).length == 0) return null //for object
  if (Object.keys(cmsDate).length == 0) return null //for object
  // if (Object.keys(cmsId).length == 0) return null //for object
  return (
    <>
      <div className="main-content Cms">
        <div className="page-content">
          <div className="container-fluid">
            {!edit ? (
              <div className="table-wrapper">
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
                        CMS
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <h4 className="mb-0"></h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive table-shoot mt-3">
                          <table
                            className="table table-centered table-nowrap"
                            style={{ border: '1px solid' }}
                          >
                            <thead className="thead-light" style={{ background: '#ecdddd' }}>
                              <th>Title</th>
                              <th>Updated On</th>
                              <th>Action</th>
                            </thead>

                            <tr key={mainCms._id}>
                              <td>{mainCms.aboutUs.title}</td>
                              <td>{convertDate(cmsDate)}</td>
                              <td>
                                <Link to={`/view/cms/${cmsId}`}>
                                  <button
                                    style={{ color: 'white' }}
                                    type="button"
                                    className="
                                      btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                                  >
                                    View
                                  </button>
                                </Link>

                                <button
                                  style={{
                                    color: 'white',
                                    margin: '1rem',
                                    height: '33px',
                                    width: '44px',
                                  }}
                                  type="button"
                                  className="
                                       btn btn-success btn-sm
                                     waves-effect waves-light
                                     btn-table
                                     ml-2 edit-button
                                   "
                                  onClick={() => onEdit('aboutUs')}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>

                            <tr>
                              <td>{mainCms.privacy.title}</td>
                              <td>{convertDate(cmsDate)}</td>
                              <td>
                                {' '}
                                <button
                                  style={{ color: 'white' }}
                                  type="button"
                                  className="
                                  btn btn-primary btn-sm waves-effect waves-light btn-table ml-2
                                  "
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => onEdit('privacy')}
                                  style={{
                                    color: 'white',
                                    margin: '1rem',
                                    height: '33px',
                                    width: '44px',
                                  }}
                                  type="button"
                                  className="
                                       btn btn-success btn-sm
                                     waves-effect waves-light
                                     btn-table
                                     ml-2 edit-button
                                   "
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>{mainCms.termsAndCond.title}</td>
                              <td>{convertDate(cmsDate)}</td>
                              <td>
                                {' '}
                                <Link to="#">
                                  <button
                                    style={{ color: 'white' }}
                                    type="button"
                                    className="
                                      btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                                  >
                                    View
                                  </button>
                                </Link>
                                <button
                                  onClick={() => onEdit('termsAndCond')}
                                  style={{
                                    color: 'white',
                                    margin: '1rem',
                                    height: '33px',
                                    width: '44px',
                                  }}
                                  type="button"
                                  className="
                                       btn btn-success btn-sm
                                     waves-effect waves-light
                                     btn-table
                                     ml-2 edit-button
                                   "
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EditCms eField={activeEditField} data={mainCms} setEdit={setEdit} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Cms
