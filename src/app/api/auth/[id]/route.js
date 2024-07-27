export const GET = () => {
  return new Response(JSON.stringify({ message: "hi get" }), { status: 200 });
};