import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../_contexts";

type props = {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  contentType?: 'application/x-www-form-urlencoded' | 'application/json',
  initFetch?: boolean,
  dataType?: 'form-data' | 'row' | 'json',
  headers?: any
}

const useAxios = (
  {
    url,
    method = 'get',
    initFetch = false,
    dataType = 'form-data',
    contentType = 'application/json',
    headers
  }: props
) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, userLogOut } = useAuth()
  const headerSetting = headers ? headers : {
    'Authorization': `bearer ${accessToken}`,
    'Content-Type': contentType,
  }

  const fetchData = (data: any | null, params: any) => {
    setIsLoading(true)
    axios({
      method: method,
      url: url,
      data: data,
      params: params,
      headers: headerSetting
    }).then(res => {
      setResponse(res.data);
      setError(undefined);
    }).catch(({ response: { status, data } }) => {
      if (data?.error === `invalid_token`) {
        userLogOut()
      }
      setResponse(undefined)
      setError(data);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const fetch = ({ data, params }: { data?: object, params?: Object } = {}) => {
    if (dataType === 'row' || dataType === 'json') {
      fetchData(data, params)
    }
    if (dataType === 'form-data') {
      const formData = new FormData()
      if (data && Object.keys(data).length !== 0) {
        const items = Object.entries(data)
        items.forEach(([key, value]) => {
          let formValue: string | Blob = (typeof (value) === 'object') ? JSON.stringify(value) : `${value}`
          if (value instanceof Blob) {
            formValue = value
          }
          formData.append(`${key}`, formValue)
        })
      }
      fetchData(formData, params)
    }
  }

  useEffect(() => {
    initFetch && fetchData(null, null);
  }, [url]);
  return { response, isLoading, error, fetch };
};

export default useAxios;
