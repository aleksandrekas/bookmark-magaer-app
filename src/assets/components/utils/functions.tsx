
export default async function request(route:string,options: RequestInit = {}){
  const token = localStorage.getItem("token")
  const response = await fetch(`https://bookmark-manager-backend-7r1a.onrender.com/${route}`,{
    ...options,
    headers:{
      ...options.headers,
      authorization:`Bearer ${token}`
    },
    credentials:"include",
  });
  
  
  
  
  return response
}