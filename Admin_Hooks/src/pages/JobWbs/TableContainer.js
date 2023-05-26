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

import toast from "toastr"
import "toastr/build/toastr.min.css"

import { fetchJobWbs, deleteJobWbs as onDeleteJobWbs } from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

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
  const [showEntries, setshowEntries] = useState(10)
  const [paginationItems, setpaginationItems] = useState(1)
  const [selectedPaginationItem, setselectedPaginationItem] = useState(1)
  const [currentTableData, setcurrentTableData] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filterOption, setFilterOption] = useState("")

  const count = data.length
  const [value, setValue] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchJobWbs())
  }, [dispatch])

  const { jobWbs, isLoading, successDelete, errorDelete, error } = useSelector(
    state => state.JobWbsReducer
  )

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
    navigate("/jobWbs/edit", { state: { data: data, canEdit: true } })
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

  const handleViewClick = jobWbs => {
    navigate("/jobWbs/view", { state: { data: jobWbs } })
  }
  const onClickDelete = id => {
    dispatch(onDeleteJobWbs(id))
  }
  useEffect(() => {
    if (!isLoading && !successDelete && !errorDelete && error) {
      toast.error("Error occurs during ferching Data")
    }
    if (!isLoading && successDelete) {
      toast.success("Data deleted successfully")
      dispatch(fetchJobWbs())
    }
    if (!isLoading && errorDelete && error) {
      toast.error("Error occurs during deleting Data: ", error)
      dispatch(fetchJobWbs())
    }
  }, [isLoading, errorDelete, error])

  const handleRefresh = () => {
    setSearchInput("")
    setFilterOption("")
    setDataField(jobsList)
  }

  return (
    <Fragment>
      <div className="d-flex mb-2">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control me-2"
          placeholder="Search"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>
      <div
      // className="table-responsive react-table"
      >
        <Table className="project-list-table table-nowrap align-middle table-borderless">
          <thead>
            <tr
              style={{
                fontSize: 14,
                backgroundColor: "#003768",
                color: "white",
                textAlign: "center",
              }}
            >
              {/* <th scope="col" style={{ width: "100px" }}>
                Id
              </th> */}
              <th scope="col">Name</th>
              <th scope="col">Tasks</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobWbs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  <i className="mdi mdi-table-off font-size-24 text-muted" />
                  <p>No data available</p>
                </td>
              </tr>
            ) : (
              map(jobWbs, (rowdata, index) => (
                <tr key={index}>
                  {/* <td>
                    <h5 className="text-truncate text-center font-size-14">
                      {rowdata?.id}
                    </h5>
                  </td> */}
                  <td>
                    <h5 className="text-truncate text-center font-size-14">
                      {rowdata?.name}
                    </h5>
                  </td>
                  <td
                  // style={{
                  //   textOverflow: "ellipsis",
                  //   whiteSpace: " nowrap",
                  //   maxWidth: "600px",
                  //   overflow: "hidden",
                  // }}
                  >
                    {rowdata?.tasks?.join(", ")}
                    {/* {rowdata.tasks.join(", ")} */}
                    {/* {JSON.parse(rowdata?.tasks)?.blocks[0].text} */}
                  </td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="card-drop d-flex justify-content-center align-items-center"
                        tag="a"
                      >
                        <i className="mdi mdi-dots-horizontal font-size-18" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem onClick={() => handleViewClick(rowdata)}>
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
                          onClick={() => onClickDelete(rowdata?.id)}
                        >
                          <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))
            )}
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
