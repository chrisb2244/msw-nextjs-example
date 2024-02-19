"use client";

import { useEffect, useState } from "react";

export const ClientComponent = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    console.log("fetching");
    fetch("https://jsonplaceholder.typicode.com/comments", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((json) => setData(json[0].body));
  }, []);

  return (
    <div>
      <div>{data}</div>
    </div>
  );
};
