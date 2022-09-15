import React, { useState, useEffect } from 'react'
import { API } from '../../API'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { isAutheticated } from 'src/components/auth/authhelper'
const { token } = isAutheticated

const WidgetsDropdown = () => {
  const [count, setCount] = useState({})

  // const fetchData = () => {
  //   console.log('token', token)
  //   fetch(`${API}/api/dashboardCount`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       setCount(data)
  //     })
  // }

  //function for display count of contact request and staff

  const fetchDataCount = () => {
    console.log('we are here')
    fetch(`${API}/api/dashboardCount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('this is the response valuuuu', response.body)
        return response.json()
      })
      .then((data) => {
        console.log('thsi is the data', data.data)
        let contactRequest = data.data.contactRequest1
        let staff = data.data.User1
        setCount({ ...count, contactRequest, staff })
      })
  }

  useEffect(() => {
    fetchDataCount()
  }, [])

  // if(count.length==0)return null//for array
  //if (Object.keys(count).length == 0) return null
  //for object
  return (
    <CRow>
      {/* <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={count.data.developerCount}
          title="Developers"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={count.data.investorCount}
          title="Investors"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA className="mb-4" color="warning" value={2} title="Farm lands" />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={count.data.propertyCount}
          title="Plots"
        />
      </CCol> */}

      {/* adding new functionality */}

      <CCol sm={6} lg={6}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={count.contactRequest}
          title="Contact Requests"
        />
      </CCol>
      <CCol sm={6} lg={6}>
        <CWidgetStatsA className="mb-4" color="info" value={count.staff} title="Staff" />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
