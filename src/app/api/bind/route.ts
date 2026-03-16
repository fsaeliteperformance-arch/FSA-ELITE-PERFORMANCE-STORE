const BIND_TOKEN = process.env.BIND_TOKEN ?? 'dywo2TUV7qCR7Gm8Q9ZwPp';

export async function GET(): Promise<Response> {
  return new Response(BIND_TOKEN, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
