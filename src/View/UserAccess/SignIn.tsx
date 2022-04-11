import { LoginRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import { useState } from "react";
import { useAuth, useWebContext } from "../../_contexts";
import { getOTP, useLoginLogout, verifyOTP } from "./userAccess.api";

const textFieldStyle: CSSProperties = {
  textAlign: 'center',
  fontSize: '1.5em',
  letterSpacing: '0.59em',
  textIndent: '0.59em'
}

const SignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpNumber, setOtpNumber] = useState('')
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const { isLoading, setIsLoading, createUser } = useAuth()
  const { notification } = useWebContext()
  const { isLoading: googleLoading, signInWithGoogle } = useLoginLogout()

  const handlePhoneSumit: () => void = () => {
    if (phoneNumber.length < 10) {
      setErrorMsg("Enter a valid Mobile number!")
      return false
    }
    const pNumber = Number(phoneNumber)
    setIsLoading(true)
    const verifyMobileNumberResponse = getOTP(pNumber)
    verifyMobileNumberResponse.then(({ data }: any) => {
      const { status, description } = data
      if (status === "Success") {
        setIsFirstStep(false)
        setErrorMsg("")
        notification("OTP send successfully", "success")
      }
      else {
        setErrorMsg(description)
      }
      setIsLoading(false)
    })
  }

  const handleOtpSubmit: () => void = () => {
    const OtpNumber = Number(otpNumber)
    const pNumber = Number(phoneNumber)
    if (OtpNumber <= 999) {
      setErrorMsg("Enter a valid OTP number!")
      return false
    }
    setIsLoading(true)
    const verifyOTPResponse = verifyOTP(pNumber, OtpNumber)
    verifyOTPResponse.then(({ data }: any) => {
      if (data?.error && data.error === 'unauthorized') {
        setErrorMsg(data.error_description)
      }
      else {
        createUser(data)
      }
      setIsLoading(false)
    })
  }

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '350px',
      mt: [7]
    }}>
      {/* <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" sx={{ backgroundColor: 'primary' }}>
              {isFirstStep ? <AccountCircleRounded /> : <PhonelinkLockRounded />}
            </Avatar>
          }
          title={isFirstStep ? "Login With Phone" : phoneNumber}
          subheader={!isFirstStep && "Please Check OTP"}
        />
        <Divider />
        <CardContent sx={{ paddingBlock: [3] }}>
          {isFirstStep ?
            <TextField fullWidth id="login-mobile-number" disabled={isLoading} label="Enter Mobile Number" variant="outlined" key={"phone number"} error={!!errorMsg} helperText={errorMsg}
              inputProps={{
                maxLength: 10,
                sx: {
                  fontSize: '1.5em',
                  letterSpacing: '0.125em'
                },
                onKeyDown: (e) => { !(/^([0-9])$/.test(e.key) || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.ctrlKey) && e.preventDefault() },
                onChange: (e: any) => setPhoneNumber(e.target.value)
              }}
            /> :
            <>
              <TextField fullWidth variant="outlined" disabled={isLoading} placeholder="XXXX" key={"otp"} error={!!errorMsg} helperText={errorMsg}
                inputProps={{
                  maxLength: 4,
                  autoComplete: "off",
                  sx: textFieldStyle,
                  onKeyDown: (e) => { !(/^([0-9])$/.test(e.key) || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.ctrlKey) && e.preventDefault() },
                  onChange: (e: any) => setOtpNumber(e.target.value)
                }}
              />
              <LoadingButton sx={{ mt: [1], display: 'block', mx: ['auto'] }}> Resend OTP </LoadingButton>
            </>
          }
        </CardContent>
        <CardActions sx={{ justifyContent: !isFirstStep ? 'space-between' : 'end', backgroundColor: '#f2f2f2', paddingInline: [2] }}>

          {!isFirstStep ?
            isLoading ?
              <LoadingButton variant="contained" loading={isLoading} size="small" color="warning" title="Download Stucture">Back<NavigateBeforeRounded /></LoadingButton>
              : <Button variant="contained" onClick={e => setIsFirstStep(true)}>
                Back<NavigateBeforeRounded />
              </Button> :
            ""
          }
          {isLoading ?
            <LoadingButton variant="contained" loading={isLoading} size="small" color="warning" title="Download Stucture"> {isFirstStep ? <>Next <NavigateNextRounded /></> : 'Finish'}</LoadingButton>
            :
            <Button variant="contained" onClick={isFirstStep ? handlePhoneSumit : handleOtpSubmit}>
              {isFirstStep ? <>Next <NavigateNextRounded /></> : 'Finish'}
            </Button>
          }
        </CardActions>
      </Card> */}

      <Box sx={{ textAlign: 'center' }}>
        <LoadingButton loading={googleLoading} onClick={() => { signInWithGoogle() }} variant="contained" color="info">
          <LoginRounded sx={{ mr: 2 }} /> Login With Google
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default SignIn
