import React, { Component } from "react";
import API from "./API";
import EmployeeCard from "./EmployeeCard";


class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: "",
    order: ""
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    API.search(this.state.order, (empObj) => {
      console.log(empObj);
      // empObj = res.data.results;
      this.setState({ results: empObj })
    })
  };

  handleOrder = () => {
    if(this.state.order !== "123") {
    this.setState({ order: "123" },
    () => {
      API.sortJSON(this.state.results, "email", this.state.order, (orderedObj) => {
        this.setState({ results: orderedObj })
      })
    });
  }
  else {
    this.setState({ order: "321" },
    () => {
      API.sortJSON(this.state.results, "email", this.state.order, (orderedObj) => {
        this.setState({ results: orderedObj })
      })
    });
  }

  }


  render() {
    // if (!empObj) {
    //   console.log("nothing");
    //   return null
    // }
    // else {
    //   console.log("something");
    // }
    return (
      <div>
        <button onClick={this.handleOrder}>Order</button>
        {this.state.results.map((employee, id) => (
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
      </div>

    );
  }
}

export default SearchResults;