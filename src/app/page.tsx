import { ServerComponent } from "./ServerComponent";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ServerComponent />

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
};

export default HomePage;
