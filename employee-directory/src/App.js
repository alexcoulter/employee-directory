import './App.css';
import React, { Component } from "react";
import API from "./components/API";
import EmployeeCard from "./components/EmployeeCard";
import Header from "./components/Header";

class App extends Component {
  state = {
    people: [],
    filtered: [],
    searchTerm: "",
    order: "123"
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    API.search(this.state.order, (empObj) => {
      console.log(empObj);
      this.setState({ people: empObj,
      filtered: empObj })
    })
  };

  handleOrder = () => {
    if (this.state.order !== "123") {
      this.setState({ order: "123" },
        () => {
          API.sortJSON(this.state.filtered, "email", this.state.order, (orderedObj) => {
            this.setState({ filtered: orderedObj })
          })
        });
    }
    else {
      this.setState({ order: "321" },
        () => {
          API.sortJSON(this.state.filtered, "email", this.state.order, (orderedObj) => {
            this.setState({ filtered: orderedObj })
          })
        });
    }
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const value = event.target.value;

    // Updating the input's state
    this.setState({
      searchTerm: value.toLowerCase()
    },
      () => {

        console.log(this.state.searchTerm);

        this.setState({
          filtered: this.state.people.filter(person =>
            person.name.first.toLowerCase().includes(this.state.searchTerm))
        });
      })
  }

  render() {

    return (
      <div>
        <Header
          handleInputChange={this.handleInputChange}
          value={this.state.searchTerm} />

        <button onClick={this.handleOrder}>Order</button>
       
        {this.state.filtered.map((employee, id) => (
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