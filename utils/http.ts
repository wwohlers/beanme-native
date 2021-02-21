import {store} from "../store";

export interface RequestInfo {
  method: "POST" | "PATCH" | "PUT" | "GET" | "DELETE";
  uri: string;
  body?: any;
  errors: Map<number, string>;
}

export interface ApiResponse<ResponseType> {
  OK: boolean;
  data?: ResponseType;
  error?: string;
}

const BASE_URL = "test";
const commonHeaders = { "Content-Type": "application/json" }

export default async function<T>(reqInfo: RequestInfo): Promise<ApiResponse<T>> {
  const headers: any = Object.assign({}, commonHeaders);
  const storeState = store.getState();
  if (storeState.user && storeState.token) {
    headers.Authorization = `Bearer ${storeState.user._id} ${storeState.token}`;
  }
  try {
    const res = await fetch(BASE_URL + reqInfo.uri, {
      method: reqInfo.method,
      body: JSON.stringify(reqInfo.body)
    });
    if (res.status > 299) {
      throw new Error(res.status.toString());
    }
    try {
      const data = await res.json();
      return {
        OK: true,
        data
      }
    } catch (e) {
      throw new Error();
    }
  } catch (e) {
    let status;
    if (e.response) {
      status = e.response.status;
    } else if (!isNaN(Number.parseInt(e))) {
      status = Number.parseInt(e);
    } else status = 500;
    const response = reqInfo.errors.get(status) || "An unknown error occurred";
    return {
      OK: false,
      error: response
    }
  }
}
