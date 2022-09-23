import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../../API'
export default function Addvideopdf() {
  const [vpidata, updatevpi] = useState({})

  const submitfun = async () => {
    console.log('this is inside of the submit fun')
    const formdata1 = new FormData()
    formdata1.append('filename', vpidata)
    console.log('this is the formdata', vpidata)
    await axios
      .post(`${API}/api/upload`, formdata1)
      .then((resp) => {
        console.log('thsi si the response', resp)
      })
      .catch((err) => {
        console.log('thsi si the error', err)
      })
  }
  const changefun = (e) => {
    console.log('this is the fun', e.target.files[0])

    updatevpi(e.target.files[0])
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Upload Files</h3>
      </div>
      <div className="card-body">
        <div className="row ">
          <div className="col-md-8 mx-auto ">
            <div className="card h-100 ">
              <div className="card-body px-5">
                <div className="mb-3">
                  <label htmlFor="imageURL" className="form-label">
                    Choose file
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageURL"
                    name="filename"
                    onChange={(e) => {
                      changefun(e)
                    }}
                  />
                  <p className="pt-1 pl-2 text-secondary">Upload Videos, images and pdf only*</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={() => {
                submitfun()
              }}
            >
              Save
            </button>
            &nbsp;
            <button className="btn btn-danger">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <div className="row">
    //     <div className="col-12">
    //       <div
    //         className="
    //               page-title-box
    //               d-flex
    //               align-items-center
    //               justify-content-between

    //             "
    //       >
    //         <div style={{ fontSize: '22px' }} className="fw-bold">
    //           Upload Files
    //         </div>
    //         <div style={{ display: 'flex', gap: '1rem' }}>
    //           <h4 className="mb-0"></h4>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row ">
    //     <div className="col-md-8 mx-auto ">
    //       <div className="card h-100 ">
    //         <div className="card-body px-5">
    //           <div className="mb-3">
    //             <label htmlFor="imageURL" className="form-label">
    //               Choose file
    //             </label>
    //             <input
    //               type="file"
    //               className="form-control"
    //               id="imageURL"
    //               name="filename"
    //               onChange={(e) => {
    //                 changefun(e)
    //               }}
    //             />
    //             <p className="pt-1 pl-2 text-secondary">Upload Videos, images and pdf only*</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="row">
    //     <div className="col-12">
    //       <button
    //         className="btn btn-primary"
    //         onClick={() => {
    //           submitfun()
    //         }}
    //       >
    //         Save
    //       </button>
    //       &nbsp;
    //       <button className="btn btn-danger">Cancel</button>
    //     </div>
    //   </div>
    // </div>
  )
}
