import React from "react";

export default function ChoresList(props) {
  return (
    <tr className="balanceBook">
      <td className="chore-date col-5">{props.choreDate}</td>
      <td className="chore-type col-5">{props.choreType}</td>
      <td className="chore-banking col-5">{props.choreBanking}</td>
      <td className="chore-amount col-5">${props.choreAmount}</td>
      <td className="chore-total col-5">${props.choreTotal}</td>
    </tr>
  );
}

ChoresList.defaultProps = {
  choreDate: "",
  choreType: "",
  choreBanking: "",
  choreAmount: "",
  choreTotal: 0
};
