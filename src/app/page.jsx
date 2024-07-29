"use client";

import LoginForm from "@/components/loginForm";
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
    <main className="h-dvh bg-slate-800 flex flex-col text-2xl text-white text-center items-center justify-center">
      {session.status === "authenticated" ? (
        <div className="max-sm:text-sm max-lg:text-base">
          <div>name: {session.data.user.name}</div>
          <br />
          <div>lastname: {session.data.user.lastname}</div>
          <br />
          <div>
            email: <br />
            {session.data.user.email}
          </div>
          <br />
          <div>
            phone number: <br />
            {session.data.user.phoneNumber}
          </div>
          <br />
          <Logout />
        </div>
      ) : session.status === "unauthenticated" ? (
        <LoginForm handleSubmit={handleLogin} />
      ) : (
        <div>loading...</div>
      )}
    </main>
  );
}
