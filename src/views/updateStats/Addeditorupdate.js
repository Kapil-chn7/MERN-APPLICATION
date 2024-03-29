import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import axios from 'axios'
import { API } from '../../API'
import { isAutheticated } from 'src/components/auth/authhelper'
export default function Addeditorupdate() {
  const [loading, setLoading] = useState(false)
  const { token } = isAutheticated()
  const [data, updateData] = useState({
    fname: '',
    sname: '',
    tname: '',
    foname: '',
    fvalue: '',
    svalue: '',
    tvalue: '',
    fovalue: '',
  })

  const [stats, updateStats] = useState({
    health: { states: '', villages: '', people: '' },
    livelihood: { states: '', villages: '', people: '' },
    education: { states: '', villages: '', people: '' },
    climate: { states: '', villages: '', people: '' },
    skill: { states: '', villages: '', people: '' },
    roadsafety: { states: '', villages: '', people: '' },
    disastermanagement: { states: '', villages: '', people: '' },
    humantrafficking: { states: '', villages: '', people: '' },
  })
  const [dropdownval, updatedropdown] = useState('education')

  const updateval = () => {}
  useEffect(() => {
    axios
      .get(`${API}/api/stats`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        let obj = {}

        // Object.keys(resp.data.data).map((e) => {
        //   obj[e] = resp.data.data[e]
        // })
        updateData({ ...resp.data.data.data })
        updateStats({ ...resp.data.data.stats })
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [])

  const Submit = () => {
    let validate = false

    Object.keys(data).map((e) => {
      if (data[e] === '') {
        validate = true
      }
    })
    Object.keys(stats).map((e) => {
      if (data[e] === '') {
        validate = true
      }
    })

    if (validate) {
      swal({
        title: 'Warning',
        text: 'Please Provide All Fields',
        icon: 'warning',
        button: 'Retry',
        dangerMode: true,
      })
    } else {
      setLoading(true)
      axios
        .patch(
          `${API}/api/stats`,
          { data: data, stats: stats },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((resp) => {
          setLoading(false)
          swal({
            title: 'Updated SuccessFully',
            text: 'updated',
            icon: 'success',
            button: 'Retry',
            dangerMode: false,
          })
        })
        .catch((err) => {
          console.warn(err)
          swal({
            title: 'Server Error',
            text: 'Something went wrong',
            icon: 'error',
            buttons: 'Retry',
            dangerMode: true,
          })

          setLoading(false)
        })
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <h2>Add and UpdateStats</h2>
        </div>
        <div className="row">
          {loading == true ? (
            <div className="row mt-5">
              <center>
                <h4 style={{ color: 'blue' }}>Loading....</h4>
              </center>
            </div>
          ) : (
            <div className="row mt-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          1st
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 1st field *"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          maxLength="50"
                          value={data.fname}
                          onChange={(e) => {
                            updateData({ ...data, fname: e.target.value })
                          }}
                          required="true"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          1st value
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 1st field value *"
                          aria-label="Enter 1st field value *"
                          aria-describedby="basic-addon1"
                          maxLength="50"
                          value={data.fvalue}
                          onChange={(e) => {
                            updateData({ ...data, fvalue: e.target.value })
                          }}
                          required="true"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          2nd
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 2nd field *"
                          aria-label="Enter 2nd field *"
                          aria-describedby="basic-addon1"
                          maxLength="50"
                          value={data.sname}
                          onChange={(e) => {
                            updateData({ ...data, sname: e.target.value })
                          }}
                          required="true"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          2nd value
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 2nd field value *"
                          aria-label="Enter 2nd field value *"
                          aria-describedby="basic-addon1"
                          maxLength="50"
                          value={data.svalue}
                          onChange={(e) => {
                            updateData({ ...data, svalue: e.target.value })
                          }}
                          required="true"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          3rd
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 3rd field *"
                          aria-label="Enter 3rd field *"
                          aria-describedby="basic-addon1"
                          maxLength="50"
                          value={data.tname}
                          onChange={(e) => {
                            updateData({ ...data, tname: e.target.value })
                          }}
                          required="true"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          3rd value
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 3rd field value *"
                          aria-label="Enter 3rd field value *"
                          aria-describedby="basic-addon1"
                          maxLength="50"
                          value={data.tvalue}
                          onChange={(e) => {
                            updateData({ ...data, tvalue: e.target.value })
                          }}
                          required="true"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          4th
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 4th field *"
                          aria-label="Enter 4th field *"
                          aria-describedby="basic-addon1"
                          maxLength="50"
                          value={data.foname}
                          onChange={(e) => {
                            updateData({ ...data, foname: e.target.value })
                          }}
                          required="true"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          4th value
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 4th field value *"
                          aria-label="Enter 4th field value *"
                          aria-describedby="basic-addon1"
                          maxLength="50"
                          value={data.fovalue}
                          onChange={(e) => {
                            updateData({ ...data, fovalue: e.target.value })
                          }}
                          required="true"
                        />
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div className="row">Update State, Village, People</div>
                  <hr />
                  <select
                    class="form-select mb-4"
                    aria-label="Default select example"
                    value={dropdownval}
                    onChange={(e) => {
                      updatedropdown(e.target.value)
                    }}
                  >
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="skill">Skill</option>
                    <option value="climate">climate</option>
                    <option value="livelihood">livelihood</option>
                    <option value="disastermanagement">disastermanagement</option>
                    <option value="roadsafety">roadsafety</option>
                    <option value="humantrafficking">humantrafficking</option>
                  </select>
                  <div className="row">
                    <div className="col-lg-4">
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">
                          States
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="States"
                          aria-label="Education"
                          value={stats[dropdownval].states}
                          onChange={(e) => {
                            const updatedStats1 = { ...stats }
                            updatedStats1[dropdownval].states = e.target.value
                            updateStats(updatedStats1)
                          }}
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">
                          Villages
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Villages"
                          value={stats[dropdownval].villages}
                          onChange={(e) => {
                            const updatedStats1 = { ...stats }
                            updatedStats1[dropdownval].villages = e.target.value
                            updateStats(updatedStats1)
                          }}
                          aria-label="Education"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">
                          People
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="People"
                          value={stats[dropdownval].people}
                          onChange={(e) => {
                            const updatedStats1 = { ...stats }
                            updatedStats1[dropdownval].people = e.target.value
                            updateStats(updatedStats1)
                          }}
                          aria-label="Education"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button className="btn btn-primary" onClick={Submit}>
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
