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

  const [sitesList, setSitesList] = useState([])
  const [dataField, setDataField] = useState([])
  const [site, setSite] = useState(null)
  const dispatch = useDispatch()
  // const [count, setCount] = useState(jobs?.totalCount)
  useEffect(() => {
    dispatch(fetchSites())
  }, [])
  const { sites, isLoading, success, success_delete, error } = useSelector(
    state => state.SitesReducer
  )

  const [uniqueSiteIds, setUniqueSiteIds] = useState(null)
  const [uniqueBuildings, setUniqueBuildings] = useState(null)
  const [uniqueCitys, setniqueCitys] = useState(null)
  const [uniqueStates, setUniqueStates] = useState(null)
  const [uniqueZipCodes, setUniqueZipCodes] = useState(null)
  const [uniqueTimeZones, setUniqueTimeZones] = useState(null)
  const [uniqueCompany, setUniqueCompany] = useState(null)
  const [uniqueJobWbs, setUniqueJobWbs] = useState(null)
  const [page, setPage] = useState(1)

  const [selectedShowOption, setSelectedShowOption] = useState({
    label: "Show 10",
    value: 10,
  })
  const [totalPages, setTotalPages] = useState(1)

  const [pageDataLimit, setPageDataLimit] = useState(selectedShowOption?.value)

  const [count, setCount] = useState(sites?.totalCount)

  useEffect(() => {
    if (Array.isArray(sites?.sites)) {
      setSitesList(sites?.sites)

      const uniqueSiteId = new Set()
      const uniqueBuilding = new Set()
      const uniqueCity = new Set()
      const uniqueState = new Set()
      const uniqueZipCode = new Set()
      const uniqueTimeZone = new Set()
      const uniqueCompany = new Map()
      const uniqueJobWbs = new Map()

      sites?.sites.forEach(site => {
        uniqueSiteId.add(site?.siteId)
        uniqueBuilding.add(site?.building)
        uniqueCity.add(site?.city)
        uniqueState.add(site?.state)
        uniqueZipCode.add(site?.zipcode)
        uniqueTimeZone.add(site?.timezone)
        uniqueCompany.set(site?.company?.id, site?.company?.name)
        uniqueJobWbs.set(site?.jobWbs.id, site?.jobWbs.name)
      })

      setUniqueSiteIds([...uniqueSiteId])
      setUniqueBuildings([...uniqueBuilding])
      setniqueCitys([...uniqueCity])
      setUniqueStates([...uniqueState])
      setUniqueZipCodes([...uniqueZipCode])
      setUniqueTimeZones([...uniqueTimeZone])
      setUniqueCompany(Array.from(uniqueCompany.entries()))
      setUniqueJobWbs(Array.from(uniqueJobWbs.entries()))
    }
    if (sites?.totalCount) {
      setCount(sites?.totalCount)
    }
  }, [sites])

  const [modal, setModal] = useState(false)
  const [filteredSiteId, setFilteredSiteId] = useState(null)
  const [filteredBuilding, setFilteredBuilding] = useState(null)
  const [filteredCity, setFilteredCity] = useState(null)
  const [filteredJobWbs, setFilteredJobWbs] = useState(null)
  const [filteredCompany, setFilteredCompany] = useState(null)
  const [filteredState, setFilteredState] = useState(null)
  const [filteredZipCode, setFilteredZipCode] = useState(null)
  const [filteredTimeZone, setFilteredTimeZone] = useState(null)

  const onClickDelete = siteId => {
    dispatch(onDeleteSite(siteId))
  }
  useEffect(() => {
    if (!isLoading && success_delete) {
      toast.success("Data deleted successfully")
      dispatch(fetchSites())
    }
  }, [isLoading, success_delete])

  const handleRefresh = () => {
    dispatch(fetchSites())
    setPage(1)
  }

  const handleFilterClick = () => {
    console.log("getting jobs")

    const siteId = Array.isArray(filteredSiteId)
      ? filteredSiteId.map(item => item?.value)
      : []
    const building = Array.isArray(filteredBuilding)
      ? filteredBuilding?.map(item => item?.value)
      : []
    const city = Array.isArray(filteredCity)
      ? filteredCity?.map(item => item?.value)
      : []
    const state = Array.isArray(filteredState)
      ? filteredState?.map(item => item?.value)
      : []
    const zipCode = Array.isArray(filteredZipCode)
      ? filteredZipCode?.map(item => item?.value)
      : []
    const timeZone = Array.isArray(filteredTimeZone)
      ? filteredTimeZone?.map(item => item?.value)
      : []
    const JobWbs = Array.isArray(filteredJobWbs)
      ? filteredJobWbs?.map(item => item?.value)
      : []
    const company = Array.isArray(filteredCompany)
      ? filteredCompany?.map(item => item?.value)
      : []

    dispatch(
      fetchSites(
        siteId,
        building,
        city,
        state,
        zipCode,
        timeZone,
        JobWbs,
        company
      )
    )
    toggle()
  }

  // const [data, setData] = useState(jobs)
  // const [uniqueJobNoOfDays, setUniqueJobNoOfDays] = useState(null)
  // const [uniqueJobNames, setUniqueJobName] = useState(null)
  // const [uniqueJobWbs, setUniqueJobWbs] = useState(null)
  // const [uniqueJobSites, setUniqueJobSites] = useState(null)

  // console.log("uniqueJobWbs:", uniqueJobWbs)
  // console.log("uniqueJobSites:", uniqueJobSites)

  // useEffect(() => {
  //   if (Array.isArray(jobs)) {
  //     setData(jobs)

  //     const uniqueJobNoOfDays = new Set()
  //     const uniqueJobName = new Set()
  //     const uniqueJobWbsMap = new Map()
  //     const uniqueJobSitesMap = new Map()

  //     jobs.forEach(job => {
  //       uniqueJobNoOfDays.add(job?.numberOfDays)
  //       uniqueJobName.add(job?.jobName)
  //       uniqueJobWbsMap.set(job?.jobWbs.id, job?.jobWbs.name)
  //       uniqueJobSitesMap.set(job?.site.id, job?.site.siteId)
  //     })

  //     setUniqueJobNoOfDays([...uniqueJobNoOfDays])
  //     setUniqueJobName([...uniqueJobName])
  //     setUniqueJobWbs(Array.from(uniqueJobWbsMap.entries()))
  //     setUniqueJobSites(Array.from(uniqueJobSitesMap.entries()))
  //   }
  // }, [jobs])
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
    setFilteredSiteId(null)
    setFilteredBuilding(null)
    setFilteredCity(null)
    setFilteredJobWbs(null)
    setFilteredCompany(null)
    setFilteredState(null)
    setFilteredZipCode(null)
    setFilteredTimeZone(null)
    toggle()
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

  // const onChangeInInput = event => {
  //   const page = event.target.value ? Number(event.target.value) - 1 : 0
  //   gotoPage(page)
  // }

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
    dispatch(fetchSites("", "", "", "", "", "", "", "", limit))
    setPageDataLimit(limit)
  }

  const onChangeInPage = e => {
    const page = parseInt(e.target.value)
    const limit = selectedShowOption.value
    setPageDataLimit(limit)
    dispatch(fetchSites("", "", "", "", "", "", "", "", limit, page))
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
          {/* {!!isEdit ? "Edit Job" : "Add Job"} */}
          Filter
        </ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg="6">
                <div id="external-events" className="mt-2">
                  <p className="text-muted mt-3">Site Id </p>

                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueSiteIds)
                        ? uniqueSiteIds.map((uniqueSiteId, index) => ({
                            label: uniqueSiteId,
                            value: uniqueSiteId,
                          }))
                        : []
                    }
                    value={filteredSiteId}
                    setValue={setFilteredSiteId}
                  />
                  <p className="text-muted mt-3">Building </p>

                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueBuildings)
                        ? uniqueBuildings.map((uniqueBuilding, index) => ({
                            label: uniqueBuilding,
                            value: uniqueBuilding,
                          }))
                        : []
                    }
                    value={filteredBuilding}
                    setValue={setFilteredBuilding}
                  />
                  <p className="text-muted mt-3">City</p>
                  {/* <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="color"
                    placeholder="Select distance..."
                    value={filteredCity}
                    onChange={value => setFilteredCity(value)}
                    options={City}
                  /> */}
                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueCitys)
                        ? uniqueCitys.map((uniqueCity, index) => ({
                            label: uniqueCity,
                            value: uniqueCity,
                          }))
                        : []
                    }
                    value={filteredCity}
                    setValue={setFilteredCity}
                  />
                  <p className="text-muted mt-3">JobWbs </p>

                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueJobWbs)
                        ? uniqueJobWbs.map(([id, name]) => ({
                            label: name,
                            value: id,
                          }))
                        : []
                    }
                    value={filteredJobWbs}
                    setValue={setFilteredJobWbs}
                  />
                </div>
              </Col>
              <Col lg="6">
                <div id="external-events" className="mt-2">
                  <p className="text-muted mt-3">Company </p>
                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueCompany)
                        ? uniqueCompany.map(([id, name]) => ({
                            label: name,
                            value: id,
                          }))
                        : []
                    }
                    value={filteredCompany}
                    setValue={setFilteredCompany}
                  />
                  <p className="text-muted mt-3">State </p>

                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueStates)
                        ? uniqueStates.map((uniqueState, index) => ({
                            label: uniqueState,
                            value: uniqueState,
                          }))
                        : []
                    }
                    value={filteredState}
                    setValue={setFilteredState}
                  />
                  <p className="text-muted mt-3">Zip Code </p>

                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueZipCodes)
                        ? uniqueZipCodes.map((uniqueZipCode, index) => ({
                            label: uniqueZipCode,
                            value: uniqueZipCode,
                          }))
                        : []
                    }
                    value={filteredZipCode}
                    setValue={setFilteredZipCode}
                  />
                  <p className="text-muted mt-3">TimeZone </p>

                  <AnimatedMulti
                    options={
                      Array.isArray(uniqueTimeZones)
                        ? uniqueTimeZones.map((uniqueTimeZone, index) => ({
                            label: uniqueTimeZone,
                            value: uniqueTimeZone,
                          }))
                        : []
                    }
                    value={filteredTimeZone}
                    setValue={setFilteredTimeZone}
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
              <th scope="col" style={{ width: "100px" }}>
                Site Id
              </th>
              <th scope="col">Building</th>
              <th scope="col">Address Line 1</th>
              {/* <th scope="col">Address Line 2</th> */}
              <th scope="col">City</th>
              <th scope="col">JobWBS</th>
              <th scope="col">Company</th>
              <th scope="col">State</th>
              {/* <th scope="col">Zip Code</th>
              <th scope="col">Time Zone</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="10" className="text-center">
                  <div className="text-center my-3">
                    <i className="bx bx-loader bx-spin font-size-18 align-middle text-success me-2" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : sitesList.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  <i className="mdi mdi-table-off font-size-24 text-muted" />
                  <p>No data available</p>
                </td>
              </tr>
            ) : (
              map(sitesList, (rowdata, index) => (
                <tr key={index}>
                  <td>{rowdata?.siteId}</td>
                  <td>{rowdata?.building}</td>
                  <td>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {rowdata?.addressLine1}
                    </p>
                  </td>
                  {/* <td>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {rowdata?.addressLine2 || "-"}
                    </p>
                  </td> */}
                  <td>{rowdata?.city}</td>
                  <td>{rowdata?.jobWbs?.name}</td>
                  <td>{rowdata?.company?.name || "N/A"}</td>
                  <td>{rowdata?.state}</td>
                  {/* <td>{rowdata?.zipcode}</td>
                  <td>{rowdata?.timezone}</td> */}
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle className="card-drop" tag="a">
                        <i className="mdi mdi-dots-horizontal font-size-18" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem
                          onClick={() => handleEditClick(rowdata.id)}
                        >
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
              )).reverse()
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
