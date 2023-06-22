import React from "react";
import { Spinner, Button } from "reactstrap";
import PropTypes from "prop-types";

const LoadingButton = props => {
  const {
    id,
    buttonText,
    load,
    buttonColor,
    buttonSize,
    htmlType,
    spinnerSize,
    onClick,
    className,
    style,
    key,
    iconClassName,
    textClassName,
    disabled,
    iconLeftAlign,
  } = props;
  return (
    <>
      {load ? (
        <Button
          key={key}
          id={id}
          disabled
          type={htmlType}
          size={buttonSize}
          color={buttonColor}
          onClick={onClick}
          className={className}
          style={style}>
          <div>
            <span className={textClassName + " mx-2"}>
              <Spinner size={spinnerSize} />
            </span>
          </div>
        </Button>
      ) : (
        <Button
          disabled={disabled}
          key={key}
          id={id}
          type={htmlType}
          color={buttonColor}
          size={buttonSize}
          onClick={onClick}
          className={className}
          style={style}>
          {iconLeftAlign ? (
            <div className="d-flex justify-content-center align-items-center">
              {iconClassName ? (
                <i className={iconClassName + " mx-2"}></i>
              ) : null}
              <span className={textClassName}>{buttonText}</span>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <span className={textClassName}>{buttonText}</span>
              {iconClassName ? (
                <i className={iconClassName + " mx-2"}></i>
              ) : null}
            </div>
          )}
        </Button>
      )}
    </>
  );
};

LoadingButton.prototype = {
  spinnerSize: PropTypes.oneOf(["xs", "sm", "lg", "xl"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
  key: PropTypes.string,
  iconClassName: PropTypes.string,
  textClassName: PropTypes.string,
  buttonText: PropTypes.string,
  load: PropTypes.bool,
  buttonColor: PropTypes.string,
  buttonSize: PropTypes.string,
  htmlType: PropTypes.string,
  disabled: PropTypes.bool,
  iconLeftAlign: PropTypes.bool,
};

LoadingButton.defaultProps = {
  id: "",
  spinnerSize: "sm",
  onClick: null,
  className: "",
  style: {},
  key: null,
  iconClassName: "",
  disabled: false,
  textClassName: "",
  htmlType: "button",
};

export default LoadingButton;
