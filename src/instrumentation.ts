export async function register() {
  console.log("Running the instrumentation hook");

  if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_RUNTIME === "nodejs"
  ) {
    console.log("Running in development mode, setting up MSW server");

    // Don't import handlers here - import in layout to allow HMR for handlers.
    const { setupServer } = await import("msw/node");
    const server = setupServer();
    server.listen({ remotePort: 3030 });
  } else {
    console.log("Skipping MSW setup for ", process.env.NEXT_RUNTIME);
  }
}
