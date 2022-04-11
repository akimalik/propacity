import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth, useWebContext } from "../../_contexts";
import { useAxios } from "../../_utility";
declare const gapi: any
let auth2: any = null

const apiUrl = `${process.env.REACT_APP_API_URL}`
const gClientId = `${process.env.REACT_APP_gClientId}` 

// urls
const getOtpUrl = `${apiUrl}/otp/getotp`
const userLoginUrl = `${apiUrl}/oauth/token`;

// get OTP
export const getOTP = async (number: number) => {
  try {
    const res = await axios.post(getOtpUrl, {
      mobile: number,
      App: "leadpage_CMS",
    });
    return res;
  } catch (error) {
    return error
  }
}

// verify OTP
export const verifyOTP = async (number: number, otp: number) => {
  let axiosConfig = {
    headers: {
      'Authorization': 'Basic YW5kcm9pZC1jbGllbnQ6YW5kcm9pZC1zZWNyZXQ=',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };

  try {
    const res = await axios.post(userLoginUrl, `username=${number}&password=${otp}&grant_type=otp`, axiosConfig);
    return res;
  } catch ({ response }) {
    return response;
  }
}

export function useLoginLogout() {
  const { notification } = useWebContext()
  const { createUser, userLogOut } = useAuth()
  const [ email, setEmail ] = useState<string>('')
  const [redirect_uri] = useState(window.location.origin)
  const { fetch, isLoading, response, error } = useAxios({
    url: userLoginUrl,
    method: 'post',
    headers: {
      'Authorization': 'Basic YW5kcm9pZC1jbGllbnQ6YW5kcm9pZC1zZWNyZXQ=',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  function googleInit() {
    /*Defining of callback function after loading auth2*/
    let initClient = () => {
      auth2 = gapi.auth2.init({
        client_id: gClientId,   // Mention the client_id created in google developer console
      })
    }
    gapi.load('auth2', initClient);// 2nd argument is reference to callback function
  }
  function signInWithGoogle() {
    auth2.grantOfflineAccess()
      .then((res: { code: string }) => res.code)
      .then(async (code: string) => {
        let userDetail = gapi.auth2.getAuthInstance().currentUser.get()
        const { Du: { tv } } = userDetail;
        let mailId = tv.trim()
        setEmail(mailId)
        fetch({
          data: {
            username: mailId,
            code: code,
            grant_type: 'code',
            clientId: gClientId,
            redirect_uri: redirect_uri
          }
        })
      })
      .catch((err: any) => {
        notification("Something Went Wrong", "error")
      })
  }

  useEffect(() => {
    googleInit()
  }, [])

  useEffect(() => {
    error && notification("Something Went Wrong", "error")
    if (response) {
      response.email = email;
      createUser(response)
    }
  }, [response, error])

  function logout() {
    gapi && gapi.auth2.getAuthInstance().signOut().then((res: any) => {
      notification("Logout", "success");
      userLogOut()
    }).catch((err: any) => notification("Google Logout not Working", "success"))
  }

  return { response, isLoading, signInWithGoogle, logout }
}
