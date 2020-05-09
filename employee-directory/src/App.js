import './components/style.css';
import React, { Component } from "react";
import API from "./components/API";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeList from "./components/EmployeeList";
import Header from "./components/Header";

class App extends Component {
  state = {
    people: [],
    filtered: [],
    searchTerm: "",
    order: "",
    view: "list"
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    API.search((empObj) => {
      console.log(empObj);
      this.setState({
        people: empObj,
        filtered: empObj
      })
    })
  };

  //Change order of employees by field
  handleOrder = (event) => {
    event.persist();
    const orderBy = event.target.attributes.getNamedItem("name").value;

    if (this.state.order !== "123") {
      this.setState({ order: "123" },
        () => {
          API.sortJSON(this.state.filtered, orderBy, this.state.order, (orderedObj) => {
            this.setState({ filtered: orderedObj })
          })
        });
    }
    else {
      this.setState({ order: "321" },
        () => {
          API.sortJSON(this.state.filtered, orderBy, this.state.order, (orderedObj) => {
            this.setState({ filtered: orderedObj })
          })
        });
    }
  }

  //filter employees by user search
  handleInputChange = (event) => {
    event.preventDefault();
    const newSearch = event.target.value.toLowerCase();

    this.setState({
      searchTerm: newSearch
    },
      () => {
        this.setState({
          filtered: this.state.people.filter(person => 
            person.name.first.toLowerCase().includes(this.state.searchTerm) || person.name.last.toLowerCase().includes(this.state.searchTerm) || person.dob.age.toString().includes(this.state.searchTerm) || person.email.toLowerCase().includes(this.state.searchTerm))
        });
      })
  }

  //change from list view to card view
  changeView = (event) => {
    event.preventDefault();
    const newView = event.target.attributes.getNamedItem("name").value;
    this.setState({ view: newView })
  }

  render() {
    if (this.state.view === "list") {
      return (
        <div>
          <Header
            handleInputChange={this.handleInputChange}
            value={this.state.searchTerm}
            changeView={this.changeView}
            view={this.state.view} />

          <div className=" body py-5">
            <div className="card-container container justify-content-center">
              <EmployeeList
                filtered={this.state.filtered}
                handleOrder={this.handleOrder}
              />
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.view === "card") {
      return (
        <div>
          <Header
            handleInputChange={this.handleInputChange}
            value={this.state.searchTerm}
            changeView={this.changeView} />
          <div className="container-fluid body py-5">
            <div className="card-container justify-content-center">
              {this.state.filtered.map((employee, id) => (
                <EmployeeCard
                  key={id}
                  age={employee.dob.age}
                  firstName={employee.name.first}
                  lastName={employee.name.last}
                  image={employee.picture.large}
                  gender={employee.gender}
                  email={employee.email}
                />
              ))}
            </div>
          </div>
        </div>

      );
    }
  }
}

export default App;