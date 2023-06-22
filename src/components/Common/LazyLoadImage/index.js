import React, { useState } from "react"
import placeholder from "../../../assets/images/user-placeholder.png"
const LazyLoadImage = props => {
  const {
    src,
    alt,
    flexCenter,
    avatarBackgroundColor,
    avatarTextColor,
    borderColor,
    isInstant,
    width,
    height,
  } = props
  let { name, firstName, lastName, wrapperClassName } = props
  const [isLoaded, setisLoaded] = useState(false)
  name = name ? name.charAt(0).toUpperCase() : ""
  firstName = firstName ? firstName.charAt(0).toUpperCase() : ""
  lastName = lastName ? lastName.charAt(0).toUpperCase() : ""
  if (flexCenter) {
    wrapperClassName =
      "d-flex align-items-center justify-content-center " + wrapperClassName
  } else if (isInstant) {
    wrapperClassName =
      "align-items-center m-auto justify-content-center " + wrapperClassName
  }

  return (
    <div
      className={wrapperClassName}
      style={{
        border: "1px solid " + borderColor,
        borderRadius: "50%",
      }}
    >
      {src ? (
        <>
          <img
            style={
              !isLoaded
                ? { display: "none" }
                : {
                    backgroundColor: avatarBackgroundColor,
                    color: avatarTextColor,
                    height,
                    width,
                  }
            }
            src={src}
            className="avatar-title rounded-circle"
            alt={alt}
            onLoad={() => {
              setisLoaded(true)
            }}
          />

          {!isLoaded && (
            <span
              className="avatar-title rounded-circle"
              style={{
                backgroundColor: avatarBackgroundColor,
                color: avatarTextColor,
                height,
                width,
              }}
            >
              {firstName}
              {lastName}
              {name}
            </span>
          )}
        </>
      ) : (
        <span
          className="avatar-title rounded-circle"
          style={{
            backgroundColor: avatarBackgroundColor,
            color: avatarTextColor,
            height,
            width,
          }}
        >
          {firstName}
          {lastName}
          {name}
        </span>
      )}
    </div>
  )
}

LazyLoadImage.defaultProps = {
  src: placeholder,
  alt: "",
  name: "",
  firstName: "",
  lastName: "",
  wrapperClassName: "smallAvatar",
  flexCenter: true,
  avatarBackgroundColor: "",
  avatarTextColor: "",
  borderColor: "gray",
}

export default LazyLoadImage
