import user from "@/models/user";
import connectDB from "@/utils/database";

export const POST = async (req, res) => {
  const { username, password, usernameType } = await req.json();
  // AES-encrypted password

  try {
    await connectDB();

    const userExists = await user.findOne({
      [usernameType]: username,
    });
    if (userExists)
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 202,
      });

    await user.create({
      [usernameType]: username,
      password,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "Success!" }), { status: 200 });
};
