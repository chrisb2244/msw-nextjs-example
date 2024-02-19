import { test, expect } from "@playwright/test";
import { test as clientTest } from "./playwright-msw-fixture";
import { HttpResponse, http } from "msw";
import { setupRemoteServer } from "msw/node";

const remote = setupRemoteServer();

test.beforeAll(async () => {
  await remote.listen({ port: 3030 });
});
test.afterEach(() => {
  remote.resetHandlers();
});
test.afterAll(async () => {
  await remote.close();
});

test("has title", async ({ page }) => {
  await page.goto("/", { timeout: 10000 });

  // Expect a title "to contain" a substring.
  const elemTitle = page.getByText(/sunt aut facere/);
  await expect(elemTitle).toBeVisible();
});

test("can be mocked", async ({ context }) => {
  remote.use(
    http.get("https://jsonplaceholder.typicode.com/posts/1", () => {
      return HttpResponse.json({ title: "Hello", body: "World" });
    })
  );

  const page = await context.newPage();
  await page.goto("/", { timeout: 10000 });

  const elemTitle = page.getByText("Hello");
  await expect(elemTitle).toBeVisible();
});

const mswHandler = http.get(
  "https://jsonplaceholder.typicode.com/comments",
  () => {
    return HttpResponse.json([{ body: "Hello Client!" }]);
  }
);

test("client-side fetches can be mocked", async ({ page }) => {
  page.route("https://jsonplaceholder.typicode.com/comments", (route) => {
    return route.fulfill({
      status: 200,
      body: JSON.stringify([{ body: "Hello Client from Playwright!" }]),
    });
  });

  await page.goto("/", { timeout: 5000 });

  const elem = page.getByText("Hello Client from Playwright!");
  await expect(elem).toBeVisible();
});

clientTest(
  "client-side fetches can be mocked with MSW handlers",
  async ({ page, worker }) => {
    worker.use(mswHandler);
    await page.goto("/");
    const elem = page.getByText("Hello Client!");
    await expect(elem).toBeVisible();
  }
);
