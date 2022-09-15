import React from 'react'
import Form from 'react-bootstrap/Form'

const CommonDivs = ({ label, data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Label style={{ fontWeight: 'bold' }}>{label}</Form.Label>
      <p>{data}</p>
    </div>
  )
}

export default CommonDivs
