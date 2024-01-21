import { http, HttpResponse, passthrough } from "msw";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/posts/1", () => {
    return HttpResponse.json({
      title: "Mocked title",
      body: "Mocked body",
    });
  }),
  http.all("*", ({ request }) => {
    console.log(`Hitting MSW default handler for ${request.url}`);
    return passthrough();
  }),
];
