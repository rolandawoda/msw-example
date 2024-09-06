// import axios from "axios";

export async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message || response.status);
  }

  return response.json();
  //   return axios
  //     .get("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.data);
}
