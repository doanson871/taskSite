import { LOCAL_STORAGE_TOKEN_NAME } from "../utils/constant";

export const UseFetchData = async (
  url: string,
  payload?: { method?: string }
) => {
  const data = await fetch(url, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
    },
    method: payload?.method || "GET",
  });

  return data.json();
};
