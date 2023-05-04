import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table"
import {
  Table,
  Row,
  Col,
  Button,
  Input,
  CardBody,
  PaginationItem,
  PaginationLink,
  Pagination,
  Form,
  FormGroup,
  Label,
} from "reactstrap"
import { Filter, DefaultColumnFilter } from "./filters"
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"
import ActionButton from "components/ActionButton"

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={e => {
                  setValue(e.target.value)
                  onChange(e.target.value)
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && <JobListGlobalFilter />}
    </React.Fragment>
  )
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  )
  const [showEntries, setshowEntries] = useState(10)
  const [paginationItems, setpaginationItems] = useState(1)
  const [selectedPaginationItem, setselectedPaginationItem] = useState(1)
  const [currentTableData, setcurrentTableData] = useState([])
  const count = data.length
  const [value, setValue] = useState("")
  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }
  useEffect(() => {
    if (data) {
      setpaginationItems(Math.ceil(data.length / showEntries))
    }
  }, [data, showEntries])

  useEffect(() => {
    if (data) {
      let rows = selectedPaginationItem * showEntries
      let selectedRowsStart = rows - showEntries
      let selectedRowsEnd = rows - 1
      if (selectedRowsEnd > data.length - 1) {
        selectedRowsEnd = data.length
      }
      setcurrentTableData(data.slice(selectedRowsStart, selectedRowsEnd + 1))
    }
  }, [data, paginationItems, selectedPaginationItem, showEntries])

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }
  const handleSearch = e => {
    setValue(e.target.value)
    // if (e.target.value === "") {
    //   setshowEntries(25)
    // }
    let currentList = data.filter(jobWbs => {
      return e.target.value === ""
        ? true
        : jobWbs.projectName
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
    })

    setcurrentTableData(currentList)
  }
  return (
    <Fragment>
      <Row className="mb-2">
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={handleSearch}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Row>
      <div className="table-responsive react-table">
        <Table className="project-list-table table-centered">
          <thead>
            <tr>
              <th
                style={{
                  width: "14%",
                  minWidth: "200px",
                }}
                className="text-center"
              >
                Name{" "}
              </th>
              <th
                style={{
                  width: "14%",
                  minWidth: "200px",
                }}
                className="text-center"
              >
                Tasks{" "}
              </th>
              <th
                style={{
                  width: "10%",
                  minWidth: "100px",
                }}
                className="text-center"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTableData &&
              currentTableData.map(jobWbs => (
                <tr key={jobWbs.id}>
                  <td className="text-center">{jobWbs.projectName}</td>
                  <td className="text-center">{jobWbs.requestDate}</td>
                  <td className="d-flex flex-row justify-content-center">
                    <ActionButton
                      color="secondary"
                      className="d-flex justify-content-center align-items-center me-1"
                      style={{ height: "20px", width: "20px" }}
                      onClick={() => {}}
                      icon={
                        <i
                          className="mdi mdi-eye-outline"
                          style={{ fontSize: "12px" }}
                        />
                      }
                    />
                    <ActionButton
                      color="success"
                      className="d-flex justify-content-center align-items-center me-1"
                      style={{ height: "20px", width: "20px" }}
                      onClick={() => {}}
                      icon={
                        <i
                          className="mdi mdi-pencil"
                          style={{ fontSize: "12px" }}
                        />
                      }
                    />
                    <ActionButton
                      color="danger"
                      className="d-flex justify-content-center align-items-center me-1"
                      style={{ height: "20px", width: "20px" }}
                      onClick={() => {}}
                      icon={
                        <i
                          className="mdi mdi-delete"
                          style={{ fontSize: "12px" }}
                        />
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <Row>
        <Col sm="6" xs="12">
          <Form>
            <FormGroup className="d-flex flex-row align-items-center">
              <Label className="mb-0">Number of records</Label>
              <Input
                style={{ maxWidth: "100px" }}
                id="showNoOfRecords"
                className="form-control mx-2"
                type="select"
                label={"Number of records"}
                value={showEntries}
                onChange={e => {
                  setshowEntries(e.target.value)
                  setpaginationItems(Math.ceil(data.length / e.target.value))
                  setselectedPaginationItem(1)
                }}
              >
                <option key={0} value={10}>
                  10
                </option>
                <option key={1} value={25}>
                  25
                </option>
                <option key={2} value={50}>
                  50
                </option>
              </Input>
            </FormGroup>
          </Form>
        </Col>
        <Col
          sm="6"
          xs="12"
          className="d-flex justify-content-end align-items-end"
        >
          <Pagination
            size="md"
            className="pagination pagination-rounded justify-content-end mb-2"
          >
            <PaginationItem disabled={selectedPaginationItem === 1}>
              <PaginationLink
                onClick={() => {
                  setselectedPaginationItem(selectedPaginationItem - 1)
                }}
                previous
              />
            </PaginationItem>
            {[...Array(paginationItems)].map((page, i) => {
              if (
                i + 1 >= selectedPaginationItem - 1 &&
                i + 1 <= selectedPaginationItem + 1
              ) {
                return (
                  <PaginationItem
                    active={i + 1 === selectedPaginationItem}
                    key={i}
                  >
                    <PaginationLink
                      onClick={() => {
                        setselectedPaginationItem(i + 1)
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
              return null
            })}
            <PaginationItem
              disabled={selectedPaginationItem === paginationItems}
            >
              <PaginationLink
                onClick={() => {
                  setselectedPaginationItem(selectedPaginationItem + 1)
                }}
                next
              />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </Fragment>
  )
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default TableContainer

// import React, { Fragment } from "react"
// import PropTypes from "prop-types"
// import {
//   useTable,
//   useGlobalFilter,
//   useAsyncDebounce,
//   useSortBy,
//   useFilters,
//   useExpanded,
//   usePagination,
// } from "react-table"
// import { Table, Row, Col, Button, Input, CardBody } from "reactstrap"
// import { Filter, DefaultColumnFilter } from "./filters"
// import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"

// // Define a default UI for filtering
// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
//   isJobListGlobalFilter,
// }) {
//   const count = preGlobalFilteredRows.length
//   const [value, setValue] = React.useState(globalFilter)
//   const onChange = useAsyncDebounce(value => {
//     setGlobalFilter(value || undefined)
//   }, 200)

//   return (
//     <React.Fragment>
//       <Col md={4}>
//         <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
//           <div className="position-relative">
//             <label htmlFor="search-bar-0" className="search-label">
//               <span id="search-bar-0-label" className="sr-only">
//                 Search this table
//               </span>
//               <input
//                 onChange={e => {
//                   setValue(e.target.value)
//                   onChange(e.target.value)
//                 }}
//                 id="search-bar-0"
//                 type="text"
//                 className="form-control"
//                 placeholder={`${count} records...`}
//                 value={value || ""}
//               />
//             </label>
//             <i className="bx bx-search-alt search-icon"></i>
//           </div>
//         </div>
//       </Col>
//       {isJobListGlobalFilter && <JobListGlobalFilter />}
//     </React.Fragment>
//   )
// }

// const TableContainer = ({
//   columns,
//   data,
//   isGlobalFilter,
//   isJobListGlobalFilter,
//   // isAddOptions,
//   // isAddUserList,
//   // handleOrderClicks,
//   // handleUserClick,
//   // handleCustomerClick,
//   // isAddCustList,
//   customPageSize,
//   className,
//   customPageSizeOptions,
// }) => {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       defaultColumn: { Filter: DefaultColumnFilter },
//       initialState: {
//         pageIndex: 0,
//         pageSize: customPageSize,
//         sortBy: [
//           {
//             desc: true,
//           },
//         ],
//       },
//     },
//     useGlobalFilter,
//     useFilters,
//     useSortBy,
//     useExpanded,
//     usePagination
//   )
//   console.log("getTableBodyProps:", data)

//   const generateSortingIndicator = column => {
//     return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
//   }

//   const onChangeInSelect = event => {
//     setPageSize(Number(event.target.value))
//   }

//   const onChangeInInput = event => {
//     const page = event.target.value ? Number(event.target.value) - 1 : 0
//     gotoPage(page)
//   }
//   return (
//     <Fragment>
//       <Row className="mb-2">
//         <Col md={customPageSizeOptions ? 2 : 1}>
//           <select
//             className="form-select"
//             value={pageSize}
//             onChange={onChangeInSelect}
//           >
//             {[10, 20, 30, 40, 50].map(pageSize => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </Col>
//         {isGlobalFilter && (
//           <GlobalFilter
//             preGlobalFilteredRows={preGlobalFilteredRows}
//             globalFilter={state.globalFilter}
//             setGlobalFilter={setGlobalFilter}
//             isJobListGlobalFilter={isJobListGlobalFilter}
//           />
//         )}
//         {/* {isAddOptions && (
//           <Col sm="7">
//             <div className="text-sm-end">
//               <Button
//                 type="button"
//                 color="success"
//                 className="btn-rounded  mb-2 me-2"
//                 onClick={handleOrderClicks}
//               >
//                 <i className="mdi mdi-plus me-1" />
//                 Add New Order
//               </Button>
//             </div>
//           </Col>
//         )}
//         {isAddUserList && (
//           <Col sm="7">
//             <div className="text-sm-end">
//               <Button
//                 type="button"
//                 color="primary"
//                 className="btn mb-2 me-2"
//                 onClick={handleUserClick}
//               >
//                 <i className="mdi mdi-plus-circle-outline me-1" />
//                 Create New User
//               </Button>
//             </div>
//           </Col>
//         )}
//         {isAddCustList && (
//           <Col sm="7">
//             <div className="text-sm-end">
//               <Button
//                 type="button"
//                 color="success"
//                 className="btn-rounded mb-2 me-2"
//                 onClick={handleCustomerClick}
//               >
//                 <i className="mdi mdi-plus me-1" />
//                 New Customers
//               </Button>
//             </div>
//           </Col>
//         )} */}
//       </Row>

//       <div className="table-responsive react-table">
//         <Table bordered hover {...getTableProps()} className={className}>
//           <thead className="table-light table-nowrap">
//             {headerGroups.map(headerGroup => (
//               <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                   <th key={column.id}>
//                     <div className="mb-2" {...column.getSortByToggleProps()}>
//                       {column.render("Header")}
//                       {generateSortingIndicator(column)}
//                     </div>
//                     <Filter column={column} />
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody {...getTableBodyProps()}>
//             {console.log("page", page)}
//             {page.map(row => {
//               console.log("Row:", row)
//               prepareRow(row)
//               return (
//                 <Fragment key={row.getRowProps().key}>
//                   <tr>
//                     {row.cells.map(cell => {
//                       // console.log("cell: ", cell)
//                       return (
//                         <td key={cell.id} {...cell.getCellProps()}>
//                           {cell.render("Cell")}
//                         </td>
//                       )
//                     })}
//                   </tr>
//                 </Fragment>
//               )
//             })}
//           </tbody>
//         </Table>
//       </div>

//       <Row className="justify-content-md-end justify-content-center align-items-center">
//         <Col className="col-md-auto">
//           <div className="d-flex gap-1">
//             <Button
//               color="primary"
//               onClick={() => gotoPage(0)}
//               disabled={!canPreviousPage}
//             >
//               {"<<"}
//             </Button>
//             <Button
//               color="primary"
//               onClick={previousPage}
//               disabled={!canPreviousPage}
//             >
//               {"<"}
//             </Button>
//           </div>
//         </Col>
//         <Col className="col-md-auto d-none d-md-block">
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>
//         </Col>
//         <Col className="col-md-auto">
//           <Input
//             type="number"
//             min={1}
//             style={{ width: 70 }}
//             max={pageOptions.length}
//             defaultValue={pageIndex + 1}
//             onChange={onChangeInInput}
//           />
//         </Col>

//         <Col className="col-md-auto">
//           <div className="d-flex gap-1">
//             <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
//               {">"}
//             </Button>
//             <Button
//               color="primary"
//               onClick={() => gotoPage(pageCount - 1)}
//               disabled={!canNextPage}
//             >
//               {">>"}
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </Fragment>
//   )
// }

// TableContainer.propTypes = {
//   preGlobalFilteredRows: PropTypes.any,
// }

// export default TableContainer
