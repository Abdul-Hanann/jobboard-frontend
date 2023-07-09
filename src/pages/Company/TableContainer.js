import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
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

import { fetchCompany, deleteCompany } from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

import { map } from "lodash"
import { DefaultColumnFilter } from "components/Common/filters"
import { useNavigate } from "react-router-dom"

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
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
  const [companyData, setCompanyData] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCompany())
  }, [dispatch])

  const { company, isLoading, successDelete, errorDelete, error } = useSelector(
    state => state.CompanyReducer
  )

  const [uniqueCompany, setUniqueCompany] = useState(null)

  const [count, setCount] = useState(company?.totalCount)

  const [selectedShowOption, setSelectedShowOption] = useState({
    label: "Show 10",
    value: 10,
  })

  useEffect(() => {
    if (Array.isArray(company?.company)) {
      setCompanyData(company?.company)

      const uniqueCompany = new Map()

      company?.company.forEach(job => {
        uniqueCompany.set(job?.id, job?.name)
      })

      setUniqueCompany([...uniqueCompany])
    }
    if (company?.totalCount) {
      setCount(company?.totalCount)
    }
  }, [company])

  const [modal, setModal] = useState(false)

  const navigate = useNavigate()
  const handleEditClick = data => {
    navigate("/company/edit", { state: { data: data, canEdit: true } })
  }

  const onClickDelete = id => {
    dispatch(deleteCompany(id))
  }
  useEffect(() => {
    if (!isLoading && successDelete) {
      toast.success("Data deleted successfully")
      dispatch(fetchCompany())
    }
    if (!isLoading && errorDelete && error) {
      toast.error("Error occurs during deleting Data: ", error)
      dispatch(fetchCompany())
    }
  }, [isLoading, errorDelete, error])

  const handleRefresh = () => {
    dispatch(fetchCompany())
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
    const limit = e.target.value
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    setSelectedShowOption({ label: selectedLabel, value: limit })
    dispatch(fetchCompany("", limit))
    setPageDataLimit(limit)
  }

  const onChangeInPage = e => {
    const page = parseInt(e.target.value)
    const limit = selectedShowOption.value
    setPageDataLimit(limit)
    dispatch(fetchCompany("", limit, page))
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
                style={{ maxWidth: "10%", fontSize: 16 }}
              >
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
              className="btn btn-primary mdi mdi-refresh me-1"
              style={{ backgroundColor: "green" }}
              onClick={() => handleRefresh()}
            ></button>
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
              <th scope="col">Sr.</th>
              <th scope="col">Logo</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <div className="text-center my-3">
                    <i className="bx bx-loader bx-spin font-size-18 align-middle text-success me-2" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : companyData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  <i className="mdi mdi-table-off font-size-24 text-muted" />
                  <p>No data available</p>
                </td>
              </tr>
            ) : (
              map(companyData, (rowdata, index) => (
                <tr key={index}>
                  <td>
                    <h5 className="text-truncate text-center font-size-14">
                      {index + 1}
                    </h5>
                  </td>
                  <td>
                    <h5 className="text-truncate text-center font-size-14">
                      {rowdata.logoUrl ? (
                        <img
                          src={rowdata.logoUrl}
                          alt="Company Logo"
                          className="avatar-sm"
                        />
                      ) : (
                        <h5 className="text-truncate text-center font-size-14">
                          N/A
                        </h5>
                      )}
                    </h5>
                  </td>
                  <td>
                    <h5 className="text-truncate text-center font-size-14">
                      {rowdata?.name || "N/A"}
                    </h5>
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
                        <DropdownItem onClick={() => handleEditClick(rowdata)}>
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
