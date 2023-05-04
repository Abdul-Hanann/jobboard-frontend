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
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap"

import { isEmpty, map } from "lodash"
// import { Filter, DefaultColumnFilter } from "./filters"
import { Filter, DefaultColumnFilter } from "components/Common/filters"
// import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"
import JobListGlobalFilter from "components/Common/GlobalSearchFilter"
import { useNavigate } from "react-router-dom"

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
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
  // isAddOptions,
  // isAddUserList,
  // handleOrderClicks,
  // handleUserClick,
  // handleCustomerClick,
  // isAddCustList,
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
  console.log("getTableBodyProps:", data)
  const [showEntries, setshowEntries] = useState(10)
  const [paginationItems, setpaginationItems] = useState(1)
  const [selectedPaginationItem, setselectedPaginationItem] = useState(1)
  const [currentTableData, setcurrentTableData] = useState([])
  const count = data.length
  const [value, setValue] = useState("")
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
  const navigate = useNavigate()
  const handleEditClick = data => {
    navigate("/siteadmin/edit", { state: { data: data, canEdit: true } })
  }

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

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
        <Col md={customPageSizeOptions ? 2 : 1}>
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
        {/* {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )} */}
      </Row>

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead
            style={{
              fontSize: 16,
              backgroundColor: "#003768",
              color: "white",
              textAlign: "center",
            }}
          >
            <tr>
              <th scope="col" style={{ width: "100px" }}>
                Site Id
              </th>
              <th scope="col">Building</th>
              <th scope="col">Address Line 1</th>
              <th scope="col">Address Line 2</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Zip Code</th>
              <th scope="col">Time Zone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody {...getTableBodyProps()}>
            {map(data, (rowdata, index) => (
              <tr key={index}>
                <td>
                  <h5 className="text-truncate font-size-14">
                    {/* <Link
                              to={`/projects-overview/${project.id}`}
                              className="text-dark"
                            > */}
                    {/* <img src={img} alt="" className="avatar-sm" /> */}
                    {rowdata.siteId}
                    {/* </Link> */}
                  </h5>
                </td>
                <td> {rowdata.building}</td>
                <td>
                  <p> {rowdata.addressLine1}</p>
                </td>
                {/* <td>
                          <p> {jobList.JobNotes}</p>
                        </td> */}
                <td>
                  <p> {rowdata.addressLine2}</p>
                </td>
                <td>
                  <p> {rowdata.city}</p>
                </td>
                <td>
                  <p> {rowdata.state}</p>
                </td>
                <td>
                  <p> {rowdata.zipCode}</p>
                </td>
                <td>
                  <p> {rowdata.timeZone}</p>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      // href="#"
                      className="card-drop"
                      tag="a"
                    >
                      <i className="mdi mdi-dots-horizontal font-size-18" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem onClick={() => handleViewClick(jobList)}>
                        <i className="mdi mdi-view-dashboard font-size-16 text-success me-1" />{" "}
                        View
                      </DropdownItem>
                      <DropdownItem
                        // href="/siteadmin/edit"
                        // to={`/siteadmin/edit/${rowdata: rowdata, isedit: true}`}
                        // onClick={() => handleEditClick(rowdata)}
                        onClick={() => handleEditClick(rowdata)}
                      >
                        <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        href="#"
                        onClick={() => onClickDelete(rowdata)}
                      >
                        <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            )).reverse()}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              // style={{ backgroundColor: "#003768" }}
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default TableContainer
