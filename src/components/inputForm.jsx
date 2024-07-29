import Link from "next/link";
import { useState } from "react";

const InputForm = ({
  buttonName,
  handleSubmit,
  buttonToSignup = false,
  buttonToLogin = false,
}) => {
  const [error, setError] = useState({ username: "", password: "" });
  let usernameType;

  const validateUsername = (e) => {
    const errors = { username: "" };
    const username = e.currentTarget.value;

    if (username == "") {
      errors.username = "Username is required";
    } else if (!isValidEmail(username) && !isValidPhone(username)) {
      errors.username = "Username must be a email or phone number";
    }

    setError({ ...error, ...errors });
  };

  const validatePassword = (e) => {
    const errors = { password: "" };
    const password = e.currentTarget.value;

    if (password == "") {
      errors.password = "Password is required";
    }

    setError({ ...error, ...errors });
  };

  const handleValidationErrors = (e) => {
    e.preventDefault();
    const errors = {};

    const username = e.currentTarget.username.value;
    if (username == "") {
      errors.username = "Username is required";
    } else if (!isValidEmail(username) && !isValidPhone(username)) {
      errors.username = "Username must be a email or phone number";
    }

    const password = e.currentTarget.password.value;
    if (password == "") {
      errors.password = "Password is required";
    }

    setError({ ...error, ...errors });

    if (isValidEmail(username)) {
      usernameType = "email";
    } else if (isValidPhone(username)) {
      usernameType = "tel";
    }
    return Object.keys(error).length === 0 || Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
  };

  return (
    <form
      onSubmit={(e) => {
        if (handleValidationErrors(e)) handleSubmit(e, usernameType);
      }}
    >
      <input
        type="text"
        placeholder="Email or phone number"
        className="border-black border-2"
        name="username"
        id="username"
        onBlur={validateUsername}
      />
      {error.username && <span>{error.username}</span>}
      <input
        type="password"
        placeholder="Password"
        className="border-black border-2"
        id="password"
        name="password"
        onBlur={validatePassword}
      />
      {error.password && <span>{error.password}</span>}
      <input
        type="submit"
        value={buttonName}
        className="border-black border-2"
      />
      {buttonToSignup && (
        <Link href="/signup" className="border-black border-2">
          Register
        </Link>
      )}
      {buttonToLogin && (
        <Link href="/" className="border-black border-2">
          Back to Login Page
        </Link>
      )}
    </form>
  );
};

export default InputForm;
