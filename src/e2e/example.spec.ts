import { test, expect } from "@playwright/test";
import { HttpResponse, http } from "msw";
import { setupRemoteServer } from "msw/node";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  const elemTitle = page.getByText(/sunt aut facere/);
  await expect(elemTitle).toBeVisible();
});

test.only("can be mocked", async ({ page }) => {
  const remote = setupRemoteServer(
    ...[
      http.get("https://jsonplaceholder.typicode.com/posts/1", () => {
        return HttpResponse.json({ title: "Hello", body: "World" });
      }),
    ]
  );
  await remote.listen({ port: 3030 });

  await page.goto("/", { timeout: 20000 });
  const elemTitle = page.getByText("Hello");
  await expect(elemTitle).toBeVisible();

  await remote.close();
});
