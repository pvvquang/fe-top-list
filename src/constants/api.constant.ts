export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
export const REFRESH_TOKEN = process.env.NEXT_PUBLIC_REFRESH_TOKEN || "";

export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const HEADER_DATA_FORM_FILE = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};
