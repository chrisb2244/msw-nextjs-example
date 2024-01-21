export async function register() {
  console.log("Running the instrumentation hook");

  if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_RUNTIME === "nodejs"
  ) {
    console.log("Running in development mode, setting up MSW server");

    const { setupServer } = await import("msw/node");
    const { handlers } = await import("./app/msw-handlers");
    console.log(handlers, setupServer);

    const server = setupServer(...handlers);
    server.listen();
  } else {
    console.log("Skipping MSW setup");
  }
}
