"use client";

import InputForm from "@/components/inputForm";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function Signup() {
  const router = useRouter();

  const handleSignup = async (e, usernameType) => {
    e.preventDefault();

    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, usernameType }),
    });

    if (response.status === 200) {
      swal("Success!", "Your account was created successfully.", "success");
      router.push("/");
    } else if (response.status === 202)
      swal(
        "Sorry!",
        `This ${
          usernameType === "tel" ? "phone number" : "email"
        } is already being used.`,
        "error"
      );
  };

  return (
    <main className="">
      <InputForm
        buttonName={"Sign Up"}
        handleSubmit={handleSignup}
        buttonToLogin={true}
      />
    </main>
  );
}
