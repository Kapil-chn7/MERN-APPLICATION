import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { API } from '../../../API'
export default function MainCmslinkpage() {
  const [htmlrender, updateHtmlrender] = useState('')
  const location = useLocation()

  useEffect(() => {
    axios
      .get(`${API}/api/addpage/getpagedata/${location.state.id}`)
      .then((resp) => {
        console.log('this is the resp', resp.data.data.updateditorData)
        updateHtmlrender(resp.data.data.updateditorData)
        console.log('this is htmlrender ', htmlrender)
      })
      .catch((err) => {
        console.log('this is the error ', err)
      })
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: htmlrender }} />
}
