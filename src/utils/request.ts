import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
} from 'axios'

// @ts-expect-error xxx
import { stringify } from 'qs'
import useUserState from '~/states/user-state'

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
  baseURL: 'http://127.0.0.1:8787/api',
}

function formatToken(token: string) {
  return `Bearer ${token}`
}

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** `token`过期后，暂存待执行的请求 */
  private static requests: any[] = []

  /** 防止重复刷新`token` */
  private static isRefreshing = false

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 重连原始请求 */
  private static retryOriginalRequest(config: AxiosRequestConfig) {
    return new Promise<AxiosRequestConfig>((resolve) => {
      PureHttp.requests.push((token: string) => {
        // @ts-expect-error xxx
        config.headers.Authorization = formatToken(token)
        resolve(config)
      })
    })
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config): Promise<any> => {
        const [state] = useUserState()
        /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
        const whiteList = ['/refresh_token', '/login']
        config.headers.Authorization = formatToken(state.accessToken)
        return whiteList.some(url => config.url?.endsWith(url))
          ? config
          : new Promise((resolve) => {


              resolve(config)

          })
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance
    instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        const msg = error.response?.data.msg

        if (msg) {
          return Promise.reject(msg)
        }
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      },
    )
  }

  /** 通用请求工具函数 */
  public request<T = {}>(
    method: 'post' | 'get',
    url: string,
    param?: AxiosRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
    } as AxiosRequestConfig

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response as any)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的`post`工具函数 */
  public post<T = any>(
    url: string,
    params?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('post', url, params)
  }

  /** 单独抽离的`get`工具函数 */
  public get<T = any>(
    url: string,
    params?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('get', url, params)
  }
}

export const http = new PureHttp()
