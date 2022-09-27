import React, { useState, useEffect } from 'react'
import { API } from '../../API'

export default function NewsandEvents() {
  //creating state for the event
  const [newsevents, updatenewsevents] = useState({ title: '', content: '', file: {} })
  return (
    <div className="card">
      <div className="card-header">
        <h5>News and Events</h5>
      </div>
      <div className="card-body">
        <div className="card-title">Please enter news and Events</div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Title
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Provide title of the news and events"
            aria-label="Username"
            maxLength="150"
            value={newsevents.title}
            name="title"
            onChange={(e) => {
              updatenewsevents({ ...newsevents, title: e.target.value })
            }}
            aria-describedby="basic-addon1"
          />
          <div
            className="input-group mt-3 "
            style={{ height: '100px', backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
          >
            <span className="input-group-text ">Add Content</span>
            <textarea
              className="form-control"
              aria-label="With textarea "
              maxLength="800"
              value={newsevents.content}
              name="content"
              onChange={(e) => {
                updatenewsevents({ ...newsevents, content: e.target.value })
              }}
            ></textarea>
          </div>
        </div>

        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile02"
            value={newsevents.file}
            name="file"
            onChange={(e) => {
              //   console.log('this is the file', e.target.files[0])
              updatenewsevents({ ...newsevents, file: e.target.files[0] })
            }}
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary">Add</button>
          &nbsp;
          <button className="btn btn-danger">Cancel</button>
        </div>
      </div>
    </div>
  )
}
