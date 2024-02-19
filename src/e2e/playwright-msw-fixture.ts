import { test as base, expect } from "@playwright/test";
import { http } from "msw";
import { createWorkerFixture, type MockServiceWorker } from "playwright-msw";

type Test = {
  worker: MockServiceWorker;
  http: typeof http;
};

const test = base.extend<Test>({
  worker: createWorkerFixture(),
  http,
});

export { test, expect };
