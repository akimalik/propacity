import { useEffect } from "react"
import { useAxios } from "../../_utility"

const apiUrl = `${process.env.REACT_APP_API_URL}`
const getRequestUrl = `${apiUrl}photos`
type fetchDataProps = {
  userId?: number,
}

export function useApiAlbumRequest() {
  // const [requestData, setRequestData] = useState<requestsDataProps[]>([])

  const { response, isLoading, error, fetch } = useAxios({
    url: `${getRequestUrl}`
  })



  useEffect(() => {
    if (response) {

    }
  }, [response])

  return { response, isLoading, fetch }
}