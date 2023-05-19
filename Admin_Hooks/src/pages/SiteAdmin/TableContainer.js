import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import toast from "toastr"
import "toastr/build/toastr.min.css"
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

import { deleteSite as onDeleteSite, fetchSites } from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

import Select from "react-select"
import makeAnimated from "react-select/animated"

import { isEmpty, map } from "lodash"
// import { Filter, DefaultColumnFilter } from "./filters"
import { Filter, DefaultColumnFilter } from "components/Common/filters"
// import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"
import JobListGlobalFilter from "components/Common/GlobalSearchFilter"
import { useNavigate } from "react-router-dom"

const AnimatedMulti = props => {
  const { options, value, setValue } = props
  const animatedComponents = makeAnimated()

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      onChange={val => setValue(val)}
      value={value}
      options={options}
    />
  )
}

const TableContainer = ({
  columns,
  data,
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

  const [sitesList, setSitesList] = useState([])
  const [dataField, setDataField] = useState([])
  const [site, setSite] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSites())
  }, [])
  const { sites, isLoading, success, success_delete, error } = useSelector(state => state.SitesReducer)

  useEffect(() => {
    setSitesList(sites)
  }, [sites])

  const onClickDelete = siteId => {
    dispatch(onDeleteSite(siteId))
  }
  useEffect(() => {
    if (!isLoading && success_delete) {
      toast.success("Data deleted successfully")
      dispatch(fetchSites())
    }
  }, [isLoading, success_delete])

  const [modal, setModal] = useState(false)

  // const [filteredStartDate, setFilteredStartDate] = useState("")
  // const [filteredEndDate, setFilteredEndDate] = useState("")
  const [filteredCity, setFilteredCity] = useState("")
  // const [filteredZipcode, setFilteredZipcode] = useState("")
  const [filteredSiteId, setFilteredSiteId] = useState("")
  const [filteredBuilding, setFilteredBuilding] = useState("")

  const SiteId = [
    { value: "SK2540", label: "SK2540" },
    { value: "SK2541", label: "SK2541" },
    { value: "SK2542", label: "SK2542" },
  ]
  const Building = [
    { value: "Building1", label: "Building 1" },
    { value: "Building2", label: "Building 2" },
    { value: "Building3", label: "Building 3" },
    { value: "Building4", label: "Building 4" },
  ]
  const City = [
    { value: "California", label: "California" },
    { value: "NewYork", label: "NewYork" },
    { value: "Sydney", label: "Sydney" },
  ]

  const toggle = () => {
    if (modal) {
      setModal(false)
      setDataField(null)
    } else {
      setModal(true)
      setDataField(dataField)
    }
  }

  // const handleSearch = (searchInput, filterOption) => {
  //   const filteredData = dataField.filter(rowdata => {
  //     if (filterOption === "siteId") {
  //       return rowdata.siteId.toLowerCase().includes(searchInput.toLowerCase())
  //     } else if (filterOption === "building") {
  //       return rowdata.building
  //         .toLowerCase()
  //         .includes(searchInput.toLowerCase())
  //     } else if (filterOption === "state") {
  //       return rowdata.state.toLowerCase().includes(searchInput.toLowerCase())
  //     } else if (filterOption === "city") {
  //       return rowdata.city.toLowerCase().includes(searchInput.toLowerCase())
  //     } else if (filterOption === "timeZone") {
  //       return rowdata.timeZone
  //         .toLowerCase()
  //         .includes(searchInput.toLowerCase())
  //     } else {
  //       return (
  //         rowdata.siteId.toLowerCase().includes(searchInput.toLowerCase()) ||
  //         rowdata.building.toLowerCase().includes(searchInput.toLowerCase()) ||
  //         rowdata.state.toLowerCase().includes(searchInput.toLowerCase()) ||
  //         rowdata.city.toLowerCase().includes(searchInput.toLowerCase()) ||
  //         rowdata.zipCode.toLowerCase().includes(searchInput.toLowerCase()) ||
  //         rowdata.timeZone.toLowerCase().includes(searchInput.toLowerCase())
  //       )
  //     }
  //   })
  //   console.log("filteredData:", filteredData)
  //   setDataField(filteredData)
  // }

  const handleClick = () => {
    toggle()
  }
  // const clearAllFilters = () => {
  //   setFilteredJobNoOfDays("")
  //   setFilteredStartDate("")
  //   setFilteredJobSiteId("")
  //   setFilteredJobName("")
  // }

  const handleRefresh = () => {
    setSearchInput("")
    setFilterOption("")
    setDataField(Data)
  }

  // const [showEntries, setshowEntries] = useState(10)
  // const [paginationItems, setpaginationItems] = useState(1)
  // const [selectedPaginationItem, setselectedPaginationItem] = useState(1)
  // const [currentTableData, setcurrentTableData] = useState([])
  // const count = sites.length
  // const [value, setValue] = useState("")
  // useEffect(() => {
  //   if (sites) {
  //     setpaginationItems(Math.ceil(sites.length / showEntries))
  //   }
  // }, [sites, showEntries])

  // useEffect(() => {
  //   if (sites) {
  //     let rows = selectedPaginationItem * showEntries
  //     let selectedRowsStart = rows - showEntries
  //     let selectedRowsEnd = rows - 1
  //     if (selectedRowsEnd > sites.length - 1) {
  //       selectedRowsEnd = sites.length
  //     }
  //     setcurrentTableData(sites.slice(selectedRowsStart, selectedRowsEnd + 1))
  //   }
  // }, [sites, paginationItems, selectedPaginationItem, showEntries])
  const navigate = useNavigate()
  const handleEditClick = site => {
    navigate("/siteadmin/edit", {
      state: { sites: site, canEdit: true },
    })
  }

  // const generateSortingIndicator = column => {
  //   return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  // }

  // const onChangeInSelect = event => {
  //   setPageSize(Number(event.target.value))
  // }

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }

  // const handleSearch = e => {
  //   setValue(e.target.value)
  //   // if (e.target.value === "") {
  //   //   setshowEntries(25)
  //   // }
  //   let currentList = sites.filter(jobWbs => {
  //     return e.target.value === ""
  //       ? true
  //       : jobWbs.projectName
  //           .toLowerCase()
  //           .includes(e.target.value.toLowerCase())
  //   })

  //   setcurrentTableData(currentList)
  // }
  return (
    <Fragment>
      <Modal isOpen={modal} toggle={toggle} className="overflow-visible">
        <ModalHeader toggle={toggle} tag="h4">
          {/* {!!isEdit ? "Edit Job" : "Add Job"} */}
          Filter
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <Col lg="12">
                <div id="external-events" className="mt-2">
                  <p className="text-muted mt-3">Filter by Site Id </p>

                  <AnimatedMulti
                    options={SiteId}
                    value={filteredSiteId}
                    setValue={setFilteredSiteId}
                  />
                  <p className="text-muted mt-3">Filter by Building </p>

                  <AnimatedMulti
                    options={Building}
                    value={filteredBuilding}
                    setValue={setFilteredBuilding}
                  />
                  <p className="text-muted mt-3">Filter by City</p>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="color"
                    placeholder="Select distance..."
                    value={filteredCity}
                    onChange={value => setFilteredCity(value)}
                    options={City}
                  />
                </div>
              </Col>
              <Col>
                <div className="text-end mt-2">
                  <button
                    // type="submit"
                    className="btn btn-success save-user"
                  >
                    Filter
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <Row className="mb-0">
        <div className="d-flex d-flex justify-content-end mt-2">
          {/* <input
            id="search"
            name="search"
            type="text"
            className="form-control me-2"
            placeholder="Search"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <select
            id="filter"
            name="filter"
            className="form-select"
            value={filterOption}
            onChange={e => setFilterOption(e.target.value)}
          >
            <option value="">Filter</option>
            <option value="siteId">Site Id</option>
            <option value="building">Building</option>
            <option value="state">State</option>
            <option value="city">City</option>
            // <option value="zipCode">Zip Code</option>
            <option value="timeZone">Time Zone</option>
          </select> */}
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
              }}
            >
              <th scope="col" style={{ width: "100px" }}>
                Site Id
              </th>
              <th scope="col">Building</th>
              <th scope="col">Address Line 1</th>
              <th scope="col">Address Line 2</th>
              <th scope="col">City</th>
              <th scope="col">JobWBS</th>
              <th scope="col">Company</th>
              <th scope="col">State</th>
              <th scope="col">Zip Code</th>
              <th scope="col">Time Zone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {map(sitesList, (rowdata, index) => (
              <tr key={index}>
                {/* {console.log(rowdata)} */}
                <td>
                  {/* <h5 className="text-truncate font-size-14"> */}
                  {/* <Link
                              to={`/projects-overview/${project.id}`}
                              className="text-dark"
                            > */}
                  {/* <img src={img} alt="" className="avatar-sm" /> */}
                  {rowdata?.siteId}
                  {/* </Link> */}
                  {/* </h5> */}
                </td>
                <td>{rowdata?.building}</td>
                <td>
                  {rowdata?.addressLine1}
                </td>
                <td>
                  {rowdata?.addressLine2}
                </td>
                <td>
                  {rowdata?.city}
                </td>
                <td>
                  {rowdata?.jobWbs?.name}
                </td>
                <td>
                  {rowdata?.company?.name}
                </td>
                <td>
                  {rowdata?.state}
                </td>
                <td>
                  {rowdata?.zipcode}
                </td>
                <td>
                  {rowdata?.timezone}
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
                      {/* <DropdownItem onClick={() => handleViewClick()}>
                        <i className="mdi mdi-view-dashboard font-size-16 text-success me-1" />{" "}
                        View
                      </DropdownItem> */}
                      <DropdownItem onClick={() => handleEditClick(rowdata.id)}>
                        <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        // href="#"
                        onClick={() => onClickDelete(rowdata.id)}
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
              style={{ backgroundColor: "green" }}
              // style={{ backgroundColor: "#003768" }}
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              style={{ backgroundColor: "green" }}
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
            <Button
              color="primary"
              style={{ backgroundColor: "green" }}
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            <Button
              color="primary"
              style={{ backgroundColor: "green" }}
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
