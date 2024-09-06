import { useQuery } from "@tanstack/react-query";

import { getTodos } from "api/todo";

export function Todos() {
  const { data, isError, isLoading } = useQuery({
    queryFn: getTodos,
    queryKey: ["TODOS"],
  });

  if (isLoading) {
    return <p>loading todo list</p>;
  }

  if (isError) {
    return <p>an error occurred fetching todo list</p>;
  }

  return (
    <div>
      {Boolean(data.length) ? (
        <ol>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ol>
      ) : (
        <p>You do not have todos created yet</p>
      )}
    </div>
  );
}
