import { test, expect } from "@playwright/test";
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
