"use client";

import InputForm from "@/components/inputForm";
import Logout from "@/components/logout";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import swal from "sweetalert";

export default function Home() {
  const session = useSession();

  const handleLogin = async (e, usernameType) => {
    e.preventDefault();

    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    const response = await signIn("credentials", {
      redirect: false,
      username,
      password,
      usernameType,
    });

    if (response.error) {
      swal(
        "Please try again",
        "Invalid username or password. Please try again.",
        "error"
      );
    } else {
      swal("Awesome!", "successfully Login.", "success");
    }
  };

  return (
    <main className="">
      {session.status === "authenticated" ? (
        <div>
          {session.data.user.name}
          {session.data.user.tel}
          {session.data.user.email}
          <Logout />
        </div>
      ) : session.status === "unauthenticated" ? (
        <InputForm
          buttonName={"Log In"}
          handleSubmit={handleLogin}
          buttonToSignup={true}
        />
      ) : (
        <div>loading...</div>
      )}
    </main>
  );
}
