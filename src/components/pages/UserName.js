import React from "react";

export default function UserName(props) {
  return <p>{props.username}</p>;
}

UserName.defaultProps = {
  username: ""
};
