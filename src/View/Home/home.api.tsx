import { useAxios } from "../../_utility"

const apiUrl = `${process.env.REACT_APP_API_URL}`
const getUsersURL = `${apiUrl}users`
// const uploadCsvUrl = `${apiUrl}/api/v1/ampPages/creationRequest`


export function useGetUsers() {
  const { response, isLoading, error } = useAxios({
    url: `${getUsersURL}`,
    initFetch: true
  })

  return { response, isLoading, error }
}

