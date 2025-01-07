import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import { isFunction } from "lodash";
import qs from "qs";

function getPendingUrl(config: AxiosRequestConfig) {
  return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");
}

export class PendingRequestManager {
  private static instance: PendingRequestManager;
  private pendingMap = new Map<string, CancelTokenSource>();
  private constructor() {}

  public static getInstance(): PendingRequestManager {
    if(!PendingRequestManager.instance) {
      PendingRequestManager.instance = new PendingRequestManager();
    }
    return PendingRequestManager.instance;
  }

  /**
   * @description: 添加请求到待处理队列中
   * @param {Object} config - Axios 请求配置
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);  // 先移除相同请求

    const url = getPendingUrl(config);
    const source = axios.CancelToken.source();
    if(!this.pendingMap.has(url)) {
      this.pendingMap.set(url, source);
      config.cancelToken = source.token;
    }
  }

  /**
   * @description: 移除请求
   * @param {Object} config - Axios 请求配置
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if(this.pendingMap.has(url)) {
      const cancel = this.pendingMap.get(url)?.cancel;
      if(isFunction(cancel)) {
        try {
          cancel("Operation canceled due to new request.");
        } catch (error) {
          console.error("Failed to cancel the request:", error);
        }
      }
      this.pendingMap.delete(url);
    }
  }

  /**
   * @description: 清空所有挂起的请求
   */
  removeAllPending() {
    this.pendingMap.forEach((source) => {
      if(isFunction(source.cancel)) {
        try {
          source.cancel("All operations were canceled.");
        } catch(error) {  
          console.error("Failed to cancen some requests:", error);
        }
      }
    });
    this.pendingMap.clear();
  }

  /**
   * @description: 重置
   */
  reset() {
    this.removeAllPending();
    this.pendingMap = new Map<string, CancelTokenSource>();
  }
}

export const pendingRequestManager = PendingRequestManager.getInstance();