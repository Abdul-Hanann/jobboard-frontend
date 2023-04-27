import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Table,
  Row,
  Col,
  Input,
  PaginationItem,
  PaginationLink,
  Pagination,
  Form,
  FormGroup,
  Label,
} from "reactstrap"
import ActionButton from "components/ActionButton"

const TableContainer = ({ data }) => {
  const [showEntries, setshowEntries] = useState(10)
  const [paginationItems, setpaginationItems] = useState(1)
  const [selectedPaginationItem, setselectedPaginationItem] = useState(1)
  const [currentTableData, setcurrentTableData] = useState([])
  const count = data?.length
  const [value, setValue] = useState("")

  useEffect(() => {
    if (data) {
      setpaginationItems(Math.ceil(data?.length / showEntries))
    }
  }, [data, showEntries])

  useEffect(() => {
    if (data) {
      let rows = selectedPaginationItem * showEntries
      let selectedRowsStart = rows - showEntries
      let selectedRowsEnd = rows - 1
      if (selectedRowsEnd > data?.length - 1) {
        selectedRowsEnd = data?.length
      }
      setcurrentTableData(data.slice(selectedRowsStart, selectedRowsEnd + 1))
    }
  }, [data, paginationItems, selectedPaginationItem, showEntries])

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
                // style={{
                //   width: "14%",
                //   minWidth: "200px",
                // }}
                className="text-center"
              >
                Name{" "}
              </th>
              <th
                // style={{
                //   width: "14%",
                //   minWidth: "200px",
                // }}
                className="text-center"
              >
                Tasks{" "}
              </th>
              <th
                // style={{
                //   width: "10%",
                //   minWidth: "100px",
                // }}
                className="text-center"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log(currentTableData, data)}
            {currentTableData && currentTableData.length !== 0 ? (
              currentTableData.map(jobWbs => (
                <tr key={jobWbs.id}>
                  <td className="text-center">{jobWbs.name}</td>
                  <td
                    className="text-center"
                    style={{ maxWidth: "200px", textOverflow: "ellipsis" }}
                  >
                    {jobWbs.tasks.join(", ")}
                  </td>
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
              ))
            ) : (
              <tr>
                <td></td>
                <td className="text-center">No records</td>
                <td></td>
              </tr>
            )}
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
                  setpaginationItems(Math.ceil(data?.length / e.target.value))
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
