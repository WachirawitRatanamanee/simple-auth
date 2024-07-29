import user from "@/models/user";
import connectDB from "@/utils/database";
import AES from "crypto-js/aes";

export const POST = async (req) => {
  const { name, lastname, email, phoneNumber, password } = await req.json();

  const encryptedPassword = AES.encrypt(
    password,
    process.env.SECRET_KEY
  ).toString();

  try {
    await connectDB();

    const emailExists = await user.findOne({
      email,
    });
    if (emailExists)
      return new Response(
        JSON.stringify({ message: "Email is already being used." }),
        {
          status: 202,
        }
      );

    const phoneNumberExists = await user.findOne({
      phoneNumber,
    });
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
      password: encryptedPassword,
    });

    return new Response(JSON.stringify({ message: "Success!" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
