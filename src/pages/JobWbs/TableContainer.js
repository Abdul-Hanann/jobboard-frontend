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
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap"

import toast from "toastr"
import "toastr/build/toastr.min.css"

import Select from "react-select"
import makeAnimated from "react-select/animated"

const AnimatedMulti = props => {
  const { options, value, setValue } = props
  const animatedComponents = makeAnimated()

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
    }),
  }

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      onChange={val => setValue(val)}
      value={value}
      options={options}
      styles={customStyles}
    />
  )
}

import { fetchJobWbs, deleteJobWbs as onDeleteJobWbs } from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

import { isEmpty, map } from "lodash"
// import { Filter, DefaultColumnFilter } from "./filters"
import { Filter, DefaultColumnFilter } from "components/Common/filters"
// import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"
import JobListGlobalFilter from "components/Common/GlobalSearchFilter"
import { useNavigate } from "react-router-dom"

// // Define a default UI for filtering
// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
//   isJobListGlobalFilter,
// }) {
//   // const count = preGlobalFilteredRows.length
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
    // page,
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

  // const count = data.length
  const [value, setValue] = useState("")
  const [jobWbsList, setJobWbsList] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchJobWbs())
  }, [dispatch])

  const { jobWbs, isLoading, successDelete, errorDelete, error } = useSelector(
    state => state.JobWbsReducer
  )
  const [uniqueJobWbs, setUniqueJobWbs] = useState(null)

  const [count, setCount] = useState(jobWbs?.totalCount)

  const [selectedShowOption, setSelectedShowOption] = useState({
    label: "Show 10",
    value: 10,
  })

  useEffect(() => {
    if (Array.isArray(jobWbs?.jobWbs)) {
      setJobWbsList(jobWbs?.jobWbs)

      const uniqueJobWbs = new Map()

      jobWbs?.jobWbs.forEach(job => {
        uniqueJobWbs.set(job?.id, job?.name)
      })

      setUniqueJobWbs([...uniqueJobWbs])
    }
    if (jobWbs?.totalCount) {
      setCount(jobWbs?.totalCount)
    }
  }, [jobWbs])

  const [modal, setModal] = useState(false)
  const [filteredjobWbsName, setFilteredjobWbsName] = useState(null)

  const toggle = () => {
    if (modal) {
      setModal(false)
    } else {
      setModal(true)
    }
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
    if (!isLoading && successDelete) {
      toast.success("Data deleted successfully")
      dispatch(fetchJobWbs())
    }
    if (!isLoading && errorDelete && error) {
      toast.error("Error occurs during deleting Data: ", error)
      dispatch(fetchJobWbs())
    }
  }, [isLoading, errorDelete, error])

  const handleClick = () => {
    setFilteredjobWbsName(null)
    toggle()
  }

  const handleRefresh = () => {
    dispatch(fetchJobWbs())
  }

  const handleFilterClick = () => {
    console.log("getting jobs")

    const JobWbs = Array.isArray(filteredjobWbsName)
      ? filteredjobWbsName?.map(item => item?.value)
      : []

    dispatch(fetchJobWbs(JobWbs))
    toggle()
  }

  const [page, setPage] = useState(1)

  const [totalPages, setTotalPages] = useState(1)

  const [pageDataLimit, setPageDataLimit] = useState(selectedShowOption?.value)

  useEffect(() => {
    const Pages = Math.ceil(count / pageDataLimit)
    setTotalPages(Pages)
  }, [count, pageDataLimit])

  const ShowOptions = [
    { value: 10, label: "Show 10" },
    { value: 20, label: "Show 20" },
    { value: 30, label: "Show 30" },
    { value: 40, label: "Show 40" },
    { value: 50, label: "Show 50" },
  ]

  const handleChange = e => {
    const selectedValue = e.target.value
    const limit = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedShowOption({ label: selectedLabel, value: limit })
    dispatch(fetchJobWbs("", limit))
    setPageDataLimit(limit)
  }

  const onChangeInPage = e => {
    const page = parseInt(e.target.value)
    const limit = selectedShowOption.value
    setPageDataLimit(limit)
    dispatch(fetchJobWbs("", limit, page))
  }

  const handlePrevPage = () => {
    const updatedPage = page - 1
    setPage(updatedPage)
    onChangeInPage({ target: { value: updatedPage } })
  }

  const handleNextPage = () => {
    const updatedPage = page + 1
    setPage(updatedPage)
    onChangeInPage({ target: { value: updatedPage } })
  }

  return (
    <Fragment>
      <Modal isOpen={modal} toggle={toggle} className="overflow-visible">
        <ModalHeader toggle={toggle} tag="h4">
          Filter
        </ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg="12">
                <div id="external-events" className="mt-0">
                  <p className="text-muted mt-3">Site Id </p>

                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueJobWbs)
                        ? uniqueJobWbs.map(([id, name]) => ({
                            label: name,
                            value: name,
                          }))
                        : []
                    }
                    value={filteredjobWbsName}
                    setValue={setFilteredjobWbsName}
                  />
                </div>
              </Col>
              <Col>
                <div className="text-end mt-3">
                  <Button
                    type="button"
                    className="btn btn-success save-user"
                    onClick={handleFilterClick}
                  >
                    Search
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <Row className="mb-0">
        <div className="d-flex d-flex justify-content-end mt-2">
          <div className="mb-0 card-title flex-grow-1">
            <h3 style={{ paddingLeft: 20, marginBottom: 0 }}>
              <Input
                name="JobSiteId"
                type="select"
                className="form-select"
                placeholder="Select..."
                onChange={handleChange}
                value={selectedShowOption?.value}
                style={{ maxWidth: "20%", fontSize: 16 }}
              >
                {/* <option value="" disabled selected>
                    Select Entity...
                  </option> */}
                {ShowOptions.map((ShowOption, index) => {
                  return (
                    <option
                      key={index}
                      value={ShowOption.value}
                      selected={index === 0}
                    >
                      {ShowOption.label}
                    </option>
                  )
                })}
              </Input>
            </h3>
          </div>
          <div className="flex-shrink-0" style={{ marginRight: 20 }}>
            <button
              // className="btn btn-primary mdi mdi-filter ms-2"
              className="btn btn-primary mdi mdi-filter me-1"
              style={{ backgroundColor: "green" }}
              // onClick={() => handleSearch(searchInput, filterOption)}
              onClick={() => handleClick()}
            >
              {/* Search */}
            </button>
            <button
              // className="btn btn-primary mdi mdi-refresh ms-2"
              className="btn btn-primary mdi mdi-refresh me-1"
              style={{ backgroundColor: "green" }}
              onClick={() => handleRefresh()}
            >
              {/* Refresh */}
            </button>
          </div>
        </div>
      </Row>
      <div>
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
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  {/* <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> */}
                  <div className="text-center my-3">
                    <i className="bx bx-loader bx-spin font-size-18 align-middle text-success me-2" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : jobWbs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  <i className="mdi mdi-table-off font-size-24 text-muted" />
                  <p>No data available</p>
                </td>
              </tr>
            ) : (
              map(jobWbsList, (rowdata, index) => (
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

      <Row
        className="justify-content-md-end justify-content-center align-items-center mb-3"
        style={{ marginRight: 20 }}
      >
        <Col className="col-md-auto p-0">
          <div className="d-flex gap-1" style={{ padding: 0 }}>
            <Button
              color="primary"
              style={{ backgroundColor: "green" }}
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col
          className="col-md-auto d-none d-md-block"
          style={{ paddingRight: 0 }}
        >
          Page{" "}
          <strong>
            {page} of {totalPages}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            style={{ width: 70 }}
            defaultValue={page}
            value={page}
            onChange={onChangeInPage}
            readOnly
          />
        </Col>

        <Col className="col-md-auto p-0">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              style={{ backgroundColor: "green" }}
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              {">"}
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
