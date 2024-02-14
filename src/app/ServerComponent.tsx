export const ServerComponent = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(
    (response) => response.json()
  );

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};
