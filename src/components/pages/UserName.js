import React from "react";

export default function UserName(props) {
  return <p>{props.userName}</p>;
}

UserName.defaultProps = {
  userName: ""
};
