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

const BASE_URL = "https://api.billwohlers.com";
const commonHeaders = { "Content-Type": "application/json" }

export default async function<T>(reqInfo: RequestInfo, log: boolean = false): Promise<ApiResponse<T>> {
  const headers: any = Object.assign({}, commonHeaders);
  const storeState = store.getState();
  if (storeState.token) {
    headers.Authorization = `Bearer ${storeState.token}`;
  }
  try {
    if (log) console.log(reqInfo.body);
    const res = await fetch(BASE_URL + reqInfo.uri, {
      method: reqInfo.method,
      headers,
      body: JSON.stringify(reqInfo.body)
    });
    if (log) console.log(res.status);
    if (res.status > 299) {
      if (log) console.log(await res.json());
      throw new Error(res.status.toString());
    }
    try {
      let data = await res.json();
      if (log) console.log(data);
      try {
        if (typeof data === "string") data = JSON.parse(data);
      } catch (e) {
        data = null;
      }
      if (log) console.log(data);
      return {
        OK: true,
        data
      }
    } catch (e) {
      throw new Error();
    }
  } catch (e) {
    if (log) console.log(e);
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
