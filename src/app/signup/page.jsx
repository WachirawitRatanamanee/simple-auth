"use client";

import RegisterForm from "@/components/registerForm";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function Signup() {
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    const name = e.currentTarget.Name.value;
    const lastname = e.currentTarget.Lastname.value;
    const email = e.currentTarget.Email.value;
    const phoneNumber = e.currentTarget.PhoneNumber.value;
    const password = e.currentTarget.Password.value;

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastname, email, phoneNumber, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      swal("Success!", "Your account was created successfully.", "success");
      router.push("/");
    } else if (response.status === 202) swal("Sorry!", data.message, "error");
  };

  return (
    <main className="h-dvh bg-slate-800 flex flex-col text-3xl text-white text-center items-center justify-center">
      <RegisterForm handleSubmit={handleSignup} />
    </main>
  );
}
