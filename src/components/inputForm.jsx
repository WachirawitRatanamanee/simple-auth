import Link from "next/link";

const InputForm = ({
  buttonName,
  handleSubmit,
  buttonToSignup = false,
  buttonToLogin = false,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" placeholder="Email or phone number" />
      <input type="password" placeholder="Password" />
      <input type="submit" value={buttonName} />
      {buttonToSignup && <Link href="/signup"> Register </Link>}
      {buttonToLogin && <Link href="/"> Back to Login Page </Link>}
    </form>
  );
};

export default InputForm;
