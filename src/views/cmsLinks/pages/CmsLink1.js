// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Button from '@material-ui/core/Button'
// import { Link } from 'react-router-dom'
// import { DataGrid } from '@mui/material'
// import './RelationMa.css'
// export default function CmsLink1() {
//   let style1 = {
//     width: '150px',

//     height: 'auto',
//     color: 'white',
//   }

//   return (
//     // <>
//     //   <div className="main-content RelationMa">
//     //     <div className="page-content">
//     //       <div className="container-fluid">
//     //         <div className="row">
//     //           <div className="col-12">
//     //             <div
//     //               className="
//     //                 page-title-box
//     //                 d-flex
//     //                 align-items-center
//     //                 justify-content-between
//     //               "
//     //             >
//     //               <div style={{ fontSize: '22px' }} className="fw-bold"></div>

//     //               <div style={{ display: 'flex', gap: '1rem' }}>
//     //                 <h4 className="mb-0"></h4>
//     //               </div>

//     //               <div className="d-flex">
//     //                 <Button
//     //                   variant="contained"
//     //                   color="primary"
//     //                   style={{
//     //                     fontWeight: 'bold',
//     //                     marginBottom: '1rem',
//     //                     textTransform: 'capitalize',
//     //                   }}
//     //                   onClick={() => {
//     //                     navigate('/add/relationmanager', { replace: true })
//     //                   }}
//     //                 >
//     //                   Add Staff
//     //                 </Button>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </>
//     <div className="container bg-light">
//       <div className="container">
//         <button type="button" class="btn btn-info btn-sm float-end" style={style1}>
//           Add
//         </button>
//       </div>

//       <div className="container m-5">
//         <table className="table ">
//           <thead>
//             <tr>
//               <th scope="col">Title</th>
//               <th scope="col">Added On</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>About Us</td>
//               <td>14 sep 2001</td>
//               <td>
//                 <Link className="btn btn-primary btn-sm" to="/views/page/cmseditor">
//                   Edit
//                 </Link>
//                 &nbsp;
//                 <button className="btn btn-danger btn-sm">Delete</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

import * as React from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@material-ui/core/Button'

//import TablePagination from '@mui/material/TablePagination'
const createData = function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
]

const comp1 = () => {
  return (
    <>
      <Link className="btn btn-primary btn-sm" to="/view/page/cmseditor">
        Edit
      </Link>
      &nbsp;
      <button className="btn btn-danger btn-sm">Delete</button>
    </>
  )
}
const data = [
  { title: 'About', date: '03 Dec 2021', id: 1 },
  { title: 'Section 8', date: '13 Dec 2021', id: 2 },
  { title: 'Section 80 G', date: '03 Sep 2021', id: 3 },
  { title: 'UNGCNI', date: '03 Dec 2021', id: 4 },
  { title: 'NITI AAYOG NGO DARPAN', date: '23 Oct 2021', id: 5 },
  { title: 'Terms & Conditions', date: '03 Dec 2021', id: 6 },
  { title: 'Privacy Policy', date: '30 March 2021', id: 7 },
]

export default function AcccessibleTable() {
  return (
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

            <div className="d-flex mb-2">
              <Link className="btn btn-primary btn-sm" to="/view/addpage">
                {' '}
                Add Page
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="center">Added On</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((element) => {
                return (
                  <TableRow key={element.id}>
                    <TableCell component="th" scope="row">
                      {element.title}
                    </TableCell>
                    <TableCell align="center">{element.date}</TableCell>
                    <TableCell align="center">
                      <Link className="btn btn-primary btn-sm" to="/view/page/cmseditor">
                        Edit
                      </Link>
                      &nbsp;
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
