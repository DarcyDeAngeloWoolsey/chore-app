import React from "react";

export default function userTestComponent(props) {
  return (
    <tr className="users">
      <td className="col-5">{props.userName}</td>
      <td className="col-5">{props.email}</td>
      <td className=" col-5">{props.password}</td>
      <td className=" col-5">${props.loggedIn}</td>
    </tr>
  );
}

userTestComponent.defaultProps = {
  userName: "",
  email: "",
  password: "",
  loggedIn: "",
  choreDate: ""
};
