import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

import {
  postFakeLogin,
  postJwtLogin,
  getSocialLogin,
  getLogout,
} from "../../../helpers/backend_helper"

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        roleValue: user.role,
        email: user.email,
        password: user.password,
      })
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        roleValue: user.role,
        email: user.email,
        password: user.password,
      })
      localStorage.setItem("authUser", JSON.stringify(response))
      // yield put(loginSuccess(response))
    }
    localStorage.setItem("userType", user.role)
    history("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

// function* logoutUser({ payload: { history } }) {
//   try {
//     localStorage.removeItem("authUser");

//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(fireBaseBackend.logout);
//       yield put(logoutUserSuccess(response));
//     }
//     console.log("history",history)
//     history("/login");
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    localStorage.removeItem("userType")

    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase")
    // {
    const response = yield call(getLogout)
    yield put(logoutUserSuccess(response))
    // }
    history("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin() {
  try {
    //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //     const fireBaseBackend = getFirebaseBackend()
    //     const response = yield call(fireBaseBackend.socialLoginUser, data, type)
    //     localStorage.setItem("authUser", JSON.stringify(response))
    //     yield put(loginSuccess(response))
    //   } else
    {
      const response = yield call(getSocialLogin)
      localStorage.setItem("authUser", JSON.stringify(response))
      // localStorage.setItem("authUserUrl", response)
      yield put(loginSuccess(response))
    }
    history("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga_v2() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga_v2
