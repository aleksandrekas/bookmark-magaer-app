

export default async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
) {
  console.log('initial route')
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  console.log(response.status)

  if (response.status === 500) {
    return "internal server error";
  }

  const resResult = await response.json();
  return resResult;
}



