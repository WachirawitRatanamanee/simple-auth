"use client";

import InputForm from "@/components/inputForm";

export default function Signup() {
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ message: "hi post" }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="">
      <InputForm
        buttonName={"SignUp"}
        handleSubmit={handleSignup}
        buttonToLogin={true}
      />
    </main>
  );
}
