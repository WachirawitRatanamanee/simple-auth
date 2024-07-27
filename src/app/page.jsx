"use client";

import InputForm from "@/components/inputForm";

export default function Home() {
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const response = await fetch("/api/auth/4", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <main className="">
      <InputForm
        buttonName={"SignIn"}
        handleSubmit={handleLogin}
        buttonToSignup={true}
      />
    </main>
  );
}
