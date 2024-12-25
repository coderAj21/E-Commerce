import { authHook } from "../hooks/useAuth";

const APISERVICES = {
  auth: {
    login: createApiFunction("auth/login"),
    signin: createApiFunction("auth/signin"),
    forget_password: createApiFunction("auth/forget_password"),
    verify_otp: createApiFunction("auth/verify_otp"),
    reset_password: createApiFunction("auth/reset_password"),
  },
  user: createApiFunction("user"),
  product: createApiFunction("product"),
  order: createApiFunction("/order"),
  address: createApiFunction("create_address"),
  category: createApiFunction("category"),
  taxonomy:createApiFunction("taxonomy")
};

export const BASE_URL = "http://192.168.1.10:5051";
export const VERSION="v1"
export const apiUrl = `${BASE_URL}/api/${VERSION}/`;




const createRequestBody = (data) => {

  return JSON.stringify(data);
};

const replaceAndRemoveTrailingSlash = (url) => {
  const cleanedUrl = url.replace(/\/+/g, "/");
  const withoutTrailingSlash = cleanedUrl.replace(/\/+$/, "");
  const hasQuery = withoutTrailingSlash.includes("?");
  if (hasQuery) {
    const [base, query] = withoutTrailingSlash.split("?");
    return replaceAndRemoveTrailingSlash(base) + "?" + query;
  }
  return withoutTrailingSlash;
};

const fetchData = async (url, method, data, type) => {
  const headersInput = {
    Authorization: `Bearer ${authHook()?.token}`,
  };

  if (data && !type) {
    headersInput["Content-Type"] = "application/json";
  }

  const options = {
    method,
    headers: headersInput,
    credentials: "include",
    body: data ? createRequestBody(data) : undefined,
  };

  const response = await fetch(
    apiUrl + replaceAndRemoveTrailingSlash(url),
    options
  );

  let res = await response.json();
  return res;
};

function createApiFunction(apiUrl){
  return {
    get: (id) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, "GET");
    },
    post: (data, id = "", type = false) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, "POST", data, type);
    },
    patch: (id, data, type = false) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, "PATCH", data, type);
    },
    put: (id, data, type = false) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, "PUT", data, type);
    },
    delete: (id) => {
      const url = id ? `${apiUrl}/${id}` : apiUrl;
      return fetchData(url, "DELETE");
    },
  };
}
export default APISERVICES;
