import React, { useState, useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import toast from "toastr"
import "toastr/build/toastr.min.css"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  FormFeedback,
  Label,
  Button,
  Form,
  Modal,
} from "reactstrap"

import {
  addNewCompany as onAddNewCompany,
  updateCompany as onUpdateCompany,
} from "store/actions"

import * as Yup from "yup"
import { useFormik } from "formik"
// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import placeHolderImage from "../../../assets/images/user-placeholder.png"
import LazyLoadImage from "components/Common/LazyLoadImage"
import Dropzone from "react-dropzone"
import ImageCropper from "components/Common/Image Cropper/ImageCropper"

const CreateCompany = () => {
  const { state } = useLocation()
  const [data, setData] = useState(null)
  const [isEdit, setIsEdit] = useState(null)
  const [selectedFiles, setselectedFiles] = useState([])
  const [imageModalVisible, setimageModalVisible] = useState(false)
  const [profileImageURL, setprofileImageURL] = useState(placeHolderImage)
  const [newImageBlob, setnewImageBlob] = useState(null)
  const [id, setId] = useState(null)
  const [name, setName] = useState("")
  const [logo, setLogo] = useState(null)
  const [indexNum, setIndexNum] = useState(0)
  const inpRow = []
  const [inputFields, setinputFields] = useState(inpRow)

  console.log("isEdit:", isEdit)
  useEffect(() => {
    if (state && state.data) {
      setData(state.data)
    }
    if (state && state.canEdit) {
      setIsEdit(state.canEdit)
    }
  }, [state])

  // Function to convert data URI to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1])
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mimeString })
  }

  useEffect(() => {
    if (data) {
      setId(data.id)
      setName(data.name)
      setLogo(data.logoUrl)
      // setprofileImageURL(data.logoUrl)
      setinputFields(data?.tasks)
      if (data.logoUrl) {
        const blob = dataURItoBlob(data.logoUrl)
        setnewImageBlob(blob)
        const file = new File([blob], "logo.png", { type: "image/png" })
        // setLogoFile(file)
        let url = URL.createObjectURL(blob)
        setprofileImageURL(url)
      }
    }
  }, [data])

  const { isLoading, successAdd, successUpdate, errorUpdate, errorAdd } =
    useSelector(state => state.JobWbsReducer)
  useEffect(() => {
    if (!isEdit && !isLoading && successAdd) {
      toast.success("Data Added successfully")
      navigate("/company")
    }
    if (!isEdit && !isLoading && errorAdd) {
      toast.error("Error occurs during adding data")
    }
    if (isEdit && !isLoading && successUpdate) {
      toast.success("Data updated successfully")
      navigate("/company")
    }
    if (isEdit && !isLoading && errorUpdate) {
      toast.error("Error occurs during updating data")
    }
  }, [isEdit, isLoading, successAdd, successUpdate, errorAdd])

  function handleAddFields() {
    // setIndexNum(indexNum + 1)
    const fields = [...inputFields]
    if (indexNum > 0 && !fields[indexNum]) {
      document.getElementById("taskError").style.display = "block"
      document.getElementById("addButton").disabled = true
    } else {
      document.getElementById("taskError").style.display = "none"
      document.getElementById("addButton").disabled = false
      const item1 = []
      setinputFields([...inputFields, item1])
    }
  }
  function handleInputChange(e, index) {
    // setIndexNum(index + 1)
    const { value } = e.target
    if (value !== "") {
      const fields = [...inputFields]
      fields[index] = value
      setinputFields(fields)
      document.getElementById("taskTextError" + index).style.display = "none"
    }
  }

  function handleRemoveFields(idx) {
    const fields = [...inputFields]
    fields.splice(idx, 1)
    setinputFields(fields)
  }

  document.title = isEdit
    ? "Edit Site Admin | SAIT Job Board"
    : "Create Site Admin  | SAIT Job Board"

  const navigate = useNavigate()
  const dispatch = useDispatch()
  function handleBackClick() {
    navigate("/company")
  }

  function handleClearClick() {
    // setEditorState("")
    // setinputFields([])
    setnewImageBlob(null)
    setName("")
  }
  const handleNameChange = e => {
    let value = e.target.value
    setName(e.target.value)
    if (value !== "") {
      document.getElementById("nameError").style.display = "none"
    }
  }
  const validateForm = () => {
    let valid = true
    if (name === "") {
      document.getElementById("nameError").style.display = "block"
      valid = false
    } else {
      document.getElementById("nameError").style.display = "none"
    }
    return valid
  }
  const handleSubmit = () => {
    if (validateForm()) {
      let reader = new FileReader()
      reader.onloadend = function () {
        // let base64Data = reader.result.split(",")[1] // Extract base64 data from reader result
        let base64Data = reader.result
        console.log("base64Data:", base64Data)
        let data = {
          logoUrl: base64Data,
          name: name,
        }
        let input = { id: id, data: data }

        if (isEdit) {
          console.log("edit")
          dispatch(onUpdateCompany(input))
        } else {
          console.log("create")
          console.log("create:", data)
          dispatch(onAddNewCompany(data))
        }
      }
      console.log("newImageBlob:", newImageBlob)
      reader.readAsDataURL(newImageBlob)
    } else {
      console.log("Check fields")
    }
  }

  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     const imageFile = new File([newImageBlob], "image.png", {
  //       type: "image/png",
  //     })
  //     console.log("iageblob:", newImageBlob)
  //     let data = new FormData()
  //     data.append("logo", newImageBlob, "logo.jpg")
  //     data.append("name", name)
  //     let input = { id: id, data: data }
  //     if (isEdit) {
  //       console.log("edit")
  //       // dispatch(onUpdateCompany(input))
  //     } else {
  //       console.log("create")
  //       console.log("create:", data)
  //       // dispatch(onAddNewCompany(data))
  //     }
  //   } else {
  //     console.log("Check fields")
  //   }
  // }

  // const toggleModal = () => {
  //   setimageModalVisible(!imageModalVisible)
  // }

  const toggleModal = () => {
    if (imageModalVisible) {
      setimageModalVisible(false)
    } else {
      setimageModalVisible(true)
    }
  }

  const handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
    toggleModal()
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Jobs Wbs" breadcrumbItem="Create job wbs" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row className="mb-2">
                    <Col>
                      <CardTitle className="mb-4">
                        {isEdit ? "Edit Wbs" : "Create Wbs"}
                      </CardTitle>
                    </Col>
                    <Col
                      className="mx-1 d-flex justify-content-end"
                      style={{ padding: 0, margin: 0 }}
                    >
                      <button
                        // type="submit"
                        className="btn btn-dark w-xl d-flex justify-content-center align-items-center"
                        onClick={handleBackClick}
                      >
                        Back
                      </button>
                      <button
                        // type="submit"
                        className="btn btn-danger w-xl ms-4 d-flex justify-content-center align-items-center"
                        onClick={handleClearClick}
                      >
                        Clear
                      </button>
                    </Col>
                  </Row>

                  <Form>
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        {/* <Row> */}
                        {/* <Col className="col-12"> */}
                        <FormGroup className="mb-4" row>
                          <Label
                            htmlFor="name"
                            className="col-form-label col-lg-2 mb-3"
                          >
                            Logo
                          </Label>
                          <Col lg="10">
                            <div>
                              <div className="d-flex flex-row">
                                <div
                                  style={{ height: "160px", width: "160px" }}
                                >
                                  <LazyLoadImage
                                    firstName={name}
                                    alt={name}
                                    src={profileImageURL}
                                    wrapperClassName=" mediumAvatar"
                                  />
                                </div>
                              </div>
                              <div className="align-left">
                                <Dropzone
                                  acceptedFiles="image/*"
                                  accept="image/*"
                                  onDrop={acceptedFiles => {
                                    if (acceptedFiles.length === 0) {
                                      toast.error(
                                        "Only image files will be selected"
                                      )

                                      // displayInAppError(
                                      //   props.t("upload.onlyImageAllowedError")
                                      // )
                                    } else if (
                                      acceptedFiles[0].size > 5000000
                                    ) {
                                      toast.error(
                                        "Image size should be less than 5 Mbs"
                                      )
                                      // displayInAppError(
                                      //   props.t("upload.imageSizeError")
                                      // )
                                    } else {
                                      handleAcceptedFiles(acceptedFiles)
                                    }
                                    handleAcceptedFiles(acceptedFiles)
                                  }}
                                  color="light"
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <span>
                                      <span
                                        className="dz-message needsclick mt-2"
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <Button
                                          type="button"
                                          color="light"
                                          className="btn btn-primary btn-md rounded-pill waves-effect waves-light mb-4"
                                          style={{
                                            marginTop: "-25px",
                                            marginLeft: "5px",
                                          }}
                                        >
                                          <i className="bx bx-upload align-middle"></i>
                                        </Button>
                                      </span>
                                    </span>
                                  )}
                                </Dropzone>
                              </div>
                              <Modal
                                size="xl"
                                centered
                                isOpen={imageModalVisible}
                                toggle={() => {
                                  toggleModal()
                                }}
                              >
                                <div className="modal-header">
                                  Upload
                                  <button
                                    type="button"
                                    onClick={() => {
                                      toggleModal()
                                    }}
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div>
                                  <ImageCropper
                                    onImageReady={imageBlob => {
                                      let fileImage = imageBlob
                                      setnewImageBlob(fileImage)
                                      let url = URL.createObjectURL(fileImage)
                                      setprofileImageURL(url)
                                      setimageModalVisible(false)
                                    }}
                                    imageSrc={selectedFiles[0]}
                                    closeImageUploader={() => {
                                      setimageModalVisible(false)
                                    }}
                                  />
                                </div>
                              </Modal>
                            </div>

                            {/* <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"nameError"}
                            >
                              Please Enter Your Wbs Name
                            </div> */}
                          </Col>

                          <Label
                            htmlFor="name"
                            className="col-form-label col-lg-2"
                          >
                            Name
                          </Label>
                          <Col lg="10">
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Enter Name..."
                              // validate={{
                              //   required: { value: true },
                              // }}
                              onChange={e => {
                                handleNameChange(e)
                              }}
                              // onChange={e => {
                              //   setName(e.target.value)
                              // }}
                              value={name}
                            />
                            <div
                              style={{
                                color: "red",
                                display: "none",
                              }}
                              id={"nameError"}
                            >
                              Please Enter Your Company Name
                            </div>
                          </Col>
                        </FormGroup>
                      </div>
                    </div>
                    <Row style={{ padding: 0, margin: 0 }}>
                      <Col className="mx-1">
                        <div className="text-end">
                          <Button
                            // type="submit"
                            onClick={handleSubmit}
                            className="btn btn-success save-user w-25"
                          >
                            {!!isEdit ? "Update" : "Create"}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CreateCompany
