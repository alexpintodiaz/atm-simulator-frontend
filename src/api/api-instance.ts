import axios from 'axios'

const baseURL = import.meta.env.VITE_ATM_API_URL

type FetchDataFuncProps = {
  endpoint: string
  method: 'GET' | 'POST' | 'DELETE' | 'PUT'
  payload?: any
  params?: any
  responseType?: 'json' | 'arraybuffer'
}

export const atmApi = axios.create({
  baseURL,
  timeout: 1000 * 80,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

export const fetchApi = <T>({
  method,
  endpoint,
  payload,
  params,
  responseType = 'json',
}: FetchDataFuncProps) => {
  return atmApi.request<T>({
    method,
    url: endpoint,
    data: payload,
    params,
    responseType,
  })
}
