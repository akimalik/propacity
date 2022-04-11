import { createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "../../_utility"

type ContextProps = {
  isLoggedIn: boolean,
  currentUser: any,
  createUser: any,
  userLogOut: any,
  accessToken: string,
  refreshToken: string,
  isLoading: boolean,
  setIsLoading: any,
  isRole: any
}

const AuthContext = createContext<Partial<ContextProps>>({})

export const useAuth = () => useContext(AuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>({})
  const [localUser, setLocalUser] = useLocalStorage<any>('user', {})
  const [accessToken, setAccessToken] = useState('')
  const [accessTokenLocal, setAccessTokenLocal] = useLocalStorage<any>('access_token', '')
  const [refreshToken, setRefreshToken] = useState('')
  const [refreshTokenLocal, setRefreshTokenLocal] = useLocalStorage<any>('refresh_token', '')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const createUser = async (data: any) => {
    const { access_token, status, refresh_token, ...rest }: any = data;
    if (status === 200) {
      setIsLoggedIn(true);
      setCurrentUser(rest); setLocalUser(rest);
      setAccessToken(access_token); setAccessTokenLocal(access_token);
      setRefreshToken(refresh_token); setRefreshTokenLocal(refresh_token)
      setIsLoading(false)
      return { status: 'success', msg: "Successfully Login" }
    }
  }

  const isRole = (roleValue: string) => {
    let isRoleExists = false
    if (currentUser?.roles) {
      isRoleExists = currentUser?.roles?.role?.toLowerCase() === roleValue.toLowerCase()
      if (!isRoleExists) {
        isRoleExists = currentUser?.roles?.otherRoles?.some((role: string) => {
          return role.toLowerCase() === roleValue.toLowerCase()
        });
      }
    }
    return isRoleExists
  }

  const userLogOut = () => {
    setIsLoggedIn(false)
    setCurrentUser({}); setLocalUser({});
    setAccessToken(''); setAccessTokenLocal('');
    setRefreshToken(''); setRefreshTokenLocal('');
  }

  const values: ContextProps = { isLoading, setIsLoading, isLoggedIn, currentUser, accessToken, refreshToken, createUser, userLogOut, isRole }

  useEffect(() => {
    const isUserExiest = (Object.keys(localUser).length !== 0);
    isUserExiest && setCurrentUser(localUser)
    setIsLoggedIn(isUserExiest)
    setAccessToken(accessTokenLocal)
    setRefreshToken(refreshTokenLocal)
  }, [])

  return (
    <AuthContext.Provider value={values} >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
