import { useEffect, useState } from "react"
import { useWebContext } from "../../_contexts"
import { useAxios } from "../../_utility"
import { requestDetailsDataProps, requestHeadInfoProps } from "./type"

const apiUrl = `${process.env.REACT_APP_API_URL}`
const getRequestDetailUrl = `${apiUrl}/api/v1/ampPages/viewRequest`
const getRequestSubmitUrl = `${apiUrl}/api/v1/ampPages/submitRequest`
const getRequestApprovalUrl = `${apiUrl}/api/v1/ampPages/approveRequest`

export function useApiRequestDetail(id: string) {
  const [requestInfo, setRequestInfo] = useState<requestHeadInfoProps>()
  const [requestDataList, setRequestDataList] = useState<requestDetailsDataProps[]>()
  const { response, isLoading, error, fetch } = useAxios({
    url: `${getRequestDetailUrl}`,
  })

  useEffect(() => {
    if (response !== null) {
      const { result: { header, lines } } = response
      setRequestInfo(header[0])
      setRequestDataList(lines)
    }
  }, [response])

  useEffect(() => {
    fetch({
      params: {
        requestId: id
      }
    })
  }, [])

  return { requestInfo, requestDataList, isLoading, error }
}

export function useApiRequestSubmit(id: string, callback: any) {
  const { notification } = useWebContext()
  const { response, isLoading: isSendingRequest, error, fetch } = useAxios({
    url: `${getRequestSubmitUrl}`,
    method: 'post',
    dataType: 'json'
  })

  function fetchSubmitRequest() {
    fetch({
      data: {
        status: 'SUBMITTED', // APPROVED | REJECTED
        message: '',
        requestId: id
      }
    })
  }
  useEffect(() => {
    error && notification(`[Error: ${error.status}] Somthing Went Wrong!`, 'error')
  }, [error])

  useEffect(() => {
    if (response) {
      notification(`Request submitted successfully`, 'success');
      callback('SUBMITTED')
    }
  }, [response])
  return { fetchSubmitRequest, isSendingRequest }
}

export function useApiRequestApproval(id: string, callback: any) {
  const { notification } = useWebContext()
  const { response, isLoading: isApprovingRequest, error, fetch } = useAxios({
    url: `${getRequestApprovalUrl}`,
    method: 'post',
    dataType: 'json'
  })

  function fetchApprovalRequest() {
    fetch({
      data: {
        requestId: id,
        status: 'APPROVED', // APPROVED | REJECTED
        message: '',
      }
    })
  }
  useEffect(() => {
    error && notification(`[Error: ${error.status}] Somthing Went Wrong!`, 'error')
  }, [error])

  useEffect(() => {
    if (response) {
      notification(`Request Approved successfully`, 'success')
      callback('APPROVED')
    }

  }, [response])
  return { fetchApprovalRequest, isApprovingRequest }
}