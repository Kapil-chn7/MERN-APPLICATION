import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../API'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@material-ui/core/Button'
import './newslettersuscriber.css'
import { isAutheticated } from 'src/components/auth/authhelper'
// import { isAutheticated } from '../../../components/auth/authhelper'

// export default function Newslettersus() {
//   const [emaildata, updateEmails] = useState([])
//   useEffect(() => {
//     axios

//       .get(`${API}/api/usersignup`)
//       .then((resp) => {
//         console.log('this is the response', resp)
//         updateEmails([...resp.data])
//       })
//       .catch((err) => {
//         console.log('thsi si the error500', err)
//       })
//   }, [])
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-12">
//           <div
//             className="
//           page-title-box
//           d-flex
//           align-items-center
//           justify-content-between
//         "
//           >
//             <div style={{ display: 'flex', gap: '1rem' }}>
//               <h4 className="mb-0"></h4>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row m-2">
//         <h3>Email Suscribers</h3>
//       </div>
//       <div className="row">
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="caption table">
//             {/* <caption>A basic table example with a caption</caption> */}
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left">S.No</TableCell>
//                 <TableCell align="left">Date and Time of Subscription</TableCell>
//                 <TableCell align="left">Email</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {emaildata.map((element, index) => {
//                 return (
//                   <TableRow key={index}>
//                     <TableCell align="left">{index}</TableCell>
//                     <TableCell align="left">
//                       {new Date(element.createdAt).toLocaleString('en-GB', {
//                         weekday: 'short',
//                         month: 'short',
//                         day: 'numeric',
//                         year: 'numeric',
//                         hour: 'numeric',
//                         minute: 'numeric',
//                         hour12: true,
//                       })}
//                     </TableCell>
//                     <TableCell align="left">{element.email}</TableCell>
//                   </TableRow>
//                 )
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>

//     </div>
//   )
// }

import ReactPaginate from 'react-paginate'

const itemsPerPage = 30

const Newslettersus = () => {
  const { token } = isAutheticated()
  const [emaildata, updateEmails] = useState([])
  useEffect(() => {
    axios

      .get(`${API}/api/usersignup_website`, {
        headers: { 'Access-Control-Allow-Origin': '*', Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        updateEmails([...resp.data])
      })
      .catch((err) => {
        console.log('thsi si the error500', err)
      })
  }, [])

  const [currentPage, setCurrentPage] = useState(0)

  const indexOfLastItem = currentPage * itemsPerPage + itemsPerPage
  const indexOfFirstItem = currentPage * itemsPerPage
  const currentItems = emaildata.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageClick = ({ selected }) => setCurrentPage(selected)

  return (
    <div>
      {/* <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}

      <div className="container">
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
              <div style={{ display: 'flex', gap: '1rem' }}>
                <h4 className="mb-0"></h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-2">
          <h3>Email Suscribers</h3>
        </div>
        <div className="row">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              {/* <caption>A basic table example with a caption</caption> */}
              <TableHead>
                <TableRow>
                  <TableCell align="left">S.No</TableCell>
                  <TableCell align="left">Date and Time of Subscription</TableCell>
                  <TableCell align="left">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((element, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="left">{index}</TableCell>
                      <TableCell align="left">
                        {new Date(element.createdAt).toLocaleString('en-GB', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell align="left">{element.email}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {/* <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      /> */}
      <div className="row mt-5">
        <div className="col-12">
          <center>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(emaildata.length / itemsPerPage)}
              onPageChange={handlePageClick}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName={'paginationBttns'}
              previousLinkClassName={'previousBttn'}
              nextLinkClassName={'nextBttn'}
              disabledClassName={'paginationDisabled'}
              subContainerClassName={'pages pagination'}
              activeClassName={'paginationActive'}
            />
          </center>
        </div>
      </div>
    </div>
  )
}

export default Newslettersus
