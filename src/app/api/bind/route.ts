export async function GET(): Promise<Response> {
  const token = process.env.BIND_TOKEN;
  if (!token) {
    return new Response("BIND_TOKEN not configured", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return new Response(token, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
