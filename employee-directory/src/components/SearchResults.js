import React, { Component } from "react";
import API from "./API";
import EmployeeCard from "./EmployeeCard";

var empObj;

class SearchResults extends Component {
  state = {
    results: []
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = query => {
    API.search()
      .then(res => {
        empObj = res.data.results;
        this.setState({ result: res.data.results })
        console.log(empObj);
      })
      .catch(err => console.log(err));
  };


  render() {
    if (!empObj) {
      return null
    }
    return (
      <wrapper>
      {this.state.result.map((employee, id) => (
        <EmployeeCard
          key={id}
          id={id}
          firstName={employee.name.first}
          lastName={employee.name.last}
          image={employee.picture.large}
          gender={employee.gender}
          email={employee.email}
        />
      ))}
        </wrapper>
    //   <div>
    // <p>Email: {empObj[0].email} </p>
    //   </div>
      
    );
  }
}

export default SearchResults;