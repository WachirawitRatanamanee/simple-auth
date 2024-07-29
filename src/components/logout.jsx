import { signOut } from "next-auth/react";

const Logout = () => {
  const handleLogOut = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        swal("Awesome!", "successfully Logout.", "success").then(() =>
          signOut()
        );
      }
    });
  };

  return (
    <button className="" onClick={handleLogOut}>
      Sign Out
    </button>
  );
};

export default Logout;
