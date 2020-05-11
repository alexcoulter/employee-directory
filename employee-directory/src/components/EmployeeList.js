import React from "react";
import "./style.css";

function EmployeeList(props) {
  return (
    <div className="table-responsive-sm">
      <table className="table table-striped table-light table-bordered table-hover">
        <thead className = "thead-secondary">
          <tr>
            <th scope="col"><button className = "btn btn-info p2 px-4" name="first"  onClick={props.handleOrder}>First Name</button></th>
            <th scope="col"><button className = "btn btn-info p2 px-4 rounded" name="last"  onClick={props.handleOrder}>Last Name</button></th>
            <th scope="col"><button className = "btn btn-info p2 px-4" name="age"  onClick={props.handleOrder}>Age</button></th>
            <th scope="col"><button className = "btn btn-info p2 px-4" name="email"  onClick={props.handleOrder}>Email</button></th>
          </tr>
        </thead>
        <tbody>
        {props.filtered.map((employee, id) => (
              <tr key={id}>
              <td>{employee.name.first}</td>
              <td>{employee.name.last}</td>
              <td>{employee.dob.age}</td>
                <td><a href={`mailto: ${employee.email}`}>{employee.email}</a></td>
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
