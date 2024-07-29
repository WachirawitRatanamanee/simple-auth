import Link from "next/link";
import { useState } from "react";

const LoginForm = ({ handleSubmit }) => {
  const [error, setError] = useState({ username: "", password: "" });
  let usernameType;

  const validateUsername = (e) => {
    const errors = { username: "" };
    const username = e.currentTarget.value;

    if (username == "") {
      errors.username = "Username is required.";
    } else if (!isValidEmail(username) && !isValidPhone(username)) {
      errors.username = "Please enter a valid email or phone number.";
    }

    setError({ ...error, ...errors });
  };

  const validatePassword = (e) => {
    const errors = { password: "" };
    const password = e.currentTarget.value;

    if (password == "") {
      errors.password = "Password is required.";
    } else if (password.length < 4 || password.length > 60) {
      errors.password = "Password must contain between 4 and 60 characters.";
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
      usernameType = "phoneNumber";
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
      className="flex flex-col items-center w-1/3 h-auto bg-slate-950 py-[5vh] max-2xl:py-[4vh] max-sm:py-[3vh] max-2xl:w-2/5 max-sm:w-4/6 max-lg:w-3/5"
      onSubmit={(e) => {
        if (handleValidationErrors(e)) handleSubmit(e, usernameType);
      }}
    >
      <div className="w-2/3 text-start flex flex-col">
        <div className="text-gray-200 pb-[5vh] max-2xl:pb-[2vh] font-semibold text-3xl max-sm:text-xl">
          Sign In
        </div>
        <div className="input-container">
          <input
            className="input"
            type="text"
            placeholder="Email or phone number"
            name="username"
            id="username"
            onBlur={validateUsername}
          />
          {error.username && (
            <div className="error-text-large">{error.username}</div>
          )}
        </div>
        <div className="input-container">
          <input
            className="input"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onBlur={validatePassword}
          />
          {error.password && (
            <div className="error-text-large">{error.password}</div>
          )}
        </div>
        <div className="pt-[2vh] max-sm:pt-[1.5vh]">
          <input className="button-submit" type="submit" value="Sign In" />
        </div>
        <div className="text-lg max-lg:text-base max-sm:text-sm pt-[3vh] max-sm:pt-[1.5vh] flex max-sm:flex-col">
          <div className="text-gray-400">New to Netflix? &nbsp;</div>
          <Link className="hover:text-gray-300" href="/signup">
            Sign up now.
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
