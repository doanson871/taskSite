import { LOCAL_STORAGE_TOKEN_NAME } from "../utils/constant";

export const UseFetchData = async (
  url: string,
  payload?: { method?: string; body?: any }
) => {
  const data = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
    },
    ...payload,
  });

  return data.json();
};
