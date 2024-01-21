export const dynamic = true;

const HomePage = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(
    (response) => response.json()
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {data && (
          <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
          </div>
        )}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
};

export default HomePage;
