import './App.css';
import React, { Component } from "react";
import API from "./components/API";
import EmployeeCard from "./components/EmployeeCard";
import Header from "./components/Header";

class App extends Component {
  state = {
    results: [],
    searchTerm: "",
    order: "123"
  };

  componentDidMount() {
    console.log("mount");
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

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    this.setState({
      results: this.state.results.filter(person =>
        person.name.first.includes("y"))
    });
  }

  render() {

    return (
      <div>
        <Header
        handleSubmit ={this.handleSubmit} />

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

export default App;