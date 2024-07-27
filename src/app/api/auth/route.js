export const GET = () => {
  return new Response(JSON.stringify({ message: "hi get" }), { status: 200 });
};

export const POST = (req, res) => {
  return new Response(JSON.stringify({ message: "hi post" }), { status: 200 });
};
