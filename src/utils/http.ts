import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { pendingRequestManager, PendingRequestManager } from "./pendingRequestManager";
import settings from "@/config";

const { invalidCode, noPermissionCode, noFoundCode, baseURL, requestTimeout, contentType } = settings;

const defaultConfig = {
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
};

function handleErrorCode(code: number, msg: string) {
  switch (code) {
    case invalidCode:
      console.error(msg || `后端接口${code}异常`);
      break;
    case noPermissionCode:
      console.error(msg || `后端接口${code}异常`);
      break;
    case noFoundCode:
      console.error(msg || `后端接口${code}异常`);
      break;
    default:
      console.error(msg || `后端接口${code}异常`);
      break;
  }
}

class HttpClient {
  private instance: any;
  private loadingInstance: any;
  private requestCount: number = 0;
  private subscribers: Map<string, Set<(data?: any) => void>>;
  private pendingRequestManager: PendingRequestManager;

  constructor() {
    this.instance = axios.create(defaultConfig);
    this.loadingInstance = null;
    this.subscribers = new Map();
    this.pendingRequestManager = pendingRequestManager;
    this.handleRequest = this.handleRequest.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);

    this.setupInterceptors();
  }

  private showLoading() {
    console.log("显示loading");
  }

  private hideLoading() {
    if (this.loadingInstance) {
      this.loadingInstance.close();
      this.loadingInstance = null;
    }
  }

  // 订阅方法（带泛型）
  subscribe<T = void>(eventName: string, callback: (data?: T) => void) {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, new Set());
    }
    this.subscribers.get(eventName)?.add(callback as (data?: any) => void);
  }

  // 取消订阅方法
  unsubscribe<T = void>(eventName: string, callback?: (data?: T) => void) {
    const callbacks = this.subscribers.get(eventName);
    if (callbacks) {
      if (callback) {
        callbacks.delete(callback as (data?: any) => void);
      } else {
        this.subscribers.delete(eventName);
      }
    }
  }

  // 发布/触发事件的方法（带泛型）
  publish<T = void>(eventName: string, data?: T) {
    const callbacks = this.subscribers.get(eventName);
    if (callbacks) {
      Array.from(callbacks).forEach((callback) => callback(data));
    }
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleError,
    );

    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleErrorResponse,
    );
  }

  private handleRequest(config: AxiosRequestConfig) {
    this.requestCount++;
    if(this.requestCount === 1) {
      this.showLoading();
    }

    this.pendingRequestManager.addPending(config);

    config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  }

  private handleError(error: any) {
    this.requestCount--;
    if(this.requestCount === 0) {
      this.hideLoading();
    }
    return Promise.reject(error);
  }

  private handleResponse(response: AxiosResponse) {
    this.requestCount--;
    if(this.requestCount === 0) {
      this.hideLoading();
    }
    const { data, config } = response;
    const { code, message } = data;

    // 请求结束后，移除本次请求
    this.pendingRequestManager.removePending(config);

    if(code && code !== 200) {
      handleErrorCode(code, message);
      return Promise.reject(new Error(`Unexpected response with code: ${code}`));
    }

    // 对于文件流或其他非JSON响应，返回整个响应对象
    if (config.responseType === 'blob' || config.responseType === 'stream') {
      return response;
    }

    return data;
  }

  private handleErrorResponse(error: any) {
    this.requestCount--;
    if(this.requestCount === 0) {
      this.hideLoading();
    }

    if(axios.isCancel(error)) {
      console.warn('Request canceled:', error.message);
    } else if(error.response) {
      const { status, data } = error.response;
      const { message } = data || {};
      handleErrorCode(status, message);
      console.error('Error Response:', error.response.data);
    } else {
      console.error('Error setting up the request:', error.message);
    }

    return Promise.reject(error);
  }

  public async request(config: AxiosRequestConfig) {
    const response = await this.instance.request(config);
    return response;
  }
}

export default new HttpClient();