import React from "react";
import "./EmployeeCard.css";

function EmployeeCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={props.firstName} src={props.image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.firstName}  {props.lastName}
          </li>
          <li>
            <strong>Gender:</strong> {props.gender}
          </li>
          <li>
            <strong>Email:</strong> {props.email}
          </li>
          <li>
            <strong>Id:</strong> {props.id}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EmployeeCard;
