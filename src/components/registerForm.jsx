import Link from "next/link";
import { useState } from "react";

const RegisterForm = ({ handleSubmit }) => {
  const [error, setError] = useState({
    Name: "",
    Lastname: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
  });

  const validateEmptyInput = (e) => {
    const input = e.currentTarget.id;
    const errors = { [input]: "" };
    const inputText = e.currentTarget.value;

    if (inputText == "") {
      errors[input] = `${input} is required.`;
    }

    setError({ ...error, ...errors });
  };

  const validateEmail = (e) => {
    const errors = { Email: "" };
    const email = e.currentTarget.value;

    if (email == "") {
      errors.Email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.Email = "Please enter a valid email.";
    }

    setError({ ...error, ...errors });
  };

  const validatePhoneNumber = (e) => {
    const errors = { PhoneNumber: "" };
    const PhoneNumber = e.currentTarget.value;

    if (PhoneNumber == "") {
      errors.PhoneNumber = "Phone number is required.";
    } else if (!isValidPhoneNumber(PhoneNumber)) {
      errors.PhoneNumber = "Please enter a valid phone number.";
    }

    setError({ ...error, ...errors });
  };

  const validatePassword = (e) => {
    const errors = { Password: "" };
    const password = e.currentTarget.value;

    if (password == "") {
      errors.Password = "Password is required.";
    } else if (password.length < 4 || password.length > 60) {
      errors.Password = "Password must contain between 4 and 60 characters.";
    }

    setError({ ...error, ...errors });
  };

  const handleValidationErrors = (e) => {
    e.preventDefault();
    const errors = {};

    const name = e.currentTarget.Name.value;
    if (name == "") {
      errors.Name = "Name is required.";
    }

    const lastname = e.currentTarget.Lastname.value;
    if (lastname == "") {
      errors.Lastname = "Lastname is required.";
    }

    const email = e.currentTarget.Email.value;
    if (email == "") {
      errors.Email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.Email = "Please enter a valid email.";
    }

    const phoneNumber = e.currentTarget.PhoneNumber.value;
    if (phoneNumber == "") {
      errors.PhoneNumber = "Phone number is required.";
    } else if (!isValidPhoneNumber(phoneNumber)) {
      errors.PhoneNumber = "Please enter a valid phone number.";
    }

    const password = e.currentTarget.Password.value;
    if (password == "") {
      errors.Password = "Password is required.";
    } else if (password.length < 4 || password.length > 60) {
      errors.password = "Password must contain between 4 and 60 characters.";
    }

    setError({ ...error, ...errors });

    return Object.keys(error).length === 0 || Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
  };

  return (
    <form
      className="flex flex-col items-center w-1/3 h-auto bg-slate-950 py-[5vh] max-2xl:py-[4vh] max-sm:py-[3vh] max-2xl:w-2/5 max-sm:w-4/6 max-lg:w-3/5"
      onSubmit={(e) => {
        if (handleValidationErrors(e)) handleSubmit(e);
      }}
    >
      <div className="w-2/3 text-start flex flex-col">
        <div className="text-gray-200 pb-[3vh] max-2xl:pb-[2vh] font-semibold text-3xl max-sm:text-xl">
          Register
        </div>
        <input
          className="input"
          type="text"
          placeholder="Name"
          name="Name"
          id="Name"
          onBlur={validateEmptyInput}
        />
        {error.Name ? (
          <div className="error-text">{error.Name}</div>
        ) : (
          <div className="pb-[3vh] max-sm:pb-[2vh]"></div>
        )}
        <input
          className="input"
          type="text"
          placeholder="Lastname"
          name="Lastname"
          id="Lastname"
          onBlur={validateEmptyInput}
        />
        {error.Lastname ? (
          <div className="error-text">{error.Lastname}</div>
        ) : (
          <div className="pb-[3vh] max-sm:pb-[2vh]"></div>
        )}
        <input
          className="input"
          type="tel"
          placeholder="Phone number"
          name="PhoneNumber"
          id="PhoneNumber"
          onBlur={validatePhoneNumber}
        />
        {error.PhoneNumber ? (
          <div className="error-text">{error.PhoneNumber}</div>
        ) : (
          <div className="pb-[3vh] max-sm:pb-[2vh]"></div>
        )}
        <input
          className="input"
          type="text"
          placeholder="Email"
          name="Email"
          id="Email"
          onBlur={validateEmail}
        />
        {error.Email ? (
          <div className="error-text">{error.Email}</div>
        ) : (
          <div className="pb-[3vh] max-sm:pb-[2vh]"></div>
        )}
        <input
          className="input"
          type="password"
          placeholder="Password"
          id="Password"
          name="Password"
          onBlur={validatePassword}
        />
        {error.Password ? (
          <div className="error-text">{error.Password}</div>
        ) : (
          <div className="pb-[3vh] max-sm:pb-[2vh]"></div>
        )}
        <input className="button-submit" type="submit" value="Register" />
        <div className="text-lg max-lg:text-base max-sm:text-sm pt-[1.5vh] flex flex-col">
          <div className="text-gray-400">Have an account? &nbsp;</div>
          <Link href="/" className="border-black border-2">
            Back to Login Page.
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
