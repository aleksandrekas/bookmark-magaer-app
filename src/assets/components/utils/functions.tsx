

export default async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  retry = true
) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (response.status === 401 && retry) {
    const refresh = await fetch("http://localhost:3000/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refresh.ok) {
      localStorage.removeItem("token");
      throw new Error("refresh token expired");
    }

    const data = await refresh.json();
    localStorage.setItem("token", data.newToken);

    return fetchWithAuth(url, options, false);
  }

  if (response.status === 204) {
    return null;
  }

  const resResult = await response.json();
  return resResult;
}



