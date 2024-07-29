import user from "@/models/user";
import connectDB from "@/utils/database";

export const POST = async (req) => {
  const { name, lastname, email, phoneNumber, password } = await req.json();
  // AES-encrypted password and stored in the database

  try {
    await connectDB();

    const emailExists = await user.findOne({
      email,
    });

    const phoneNumberExists = await user.findOne({
      phoneNumber,
    });

    if (emailExists)
      return new Response(
        JSON.stringify({ message: "Email is already being used." }),
        {
          status: 202,
        }
      );
    if (phoneNumberExists)
      return new Response(
        JSON.stringify({ message: "Phone number is already being used." }),
        {
          status: 202,
        }
      );

    await user.create({
      name,
      lastname,
      email,
      phoneNumber,
      password,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "Success!" }), { status: 200 });
};
