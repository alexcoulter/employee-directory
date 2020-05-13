import './components/style.css';
import React, { Component } from "react";
import API from "./utils/API";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeList from "./components/EmployeeList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import $ from 'jquery'; 

class App extends Component {
  state = {
    employees: [],
    filtered: [],
    searchTerm: "",
    order: "",
    view: "list"
  };

  //gets employee info array from Api and set the state of 'employees' and 'filtered' to this array
  componentDidMount() {
    this.getEmployees();
  }
  getEmployees = () => {
    API.search((empObj) => {
      this.setState({
        employees: empObj,
        filtered: empObj
      })
    })
  };

  //Changes body padding based on navbar height
  componentDidUpdate() {
    $(window).resize(function() {
    $("#list-container").css("padding-top", $("#nav").height());
    $("#list-container").css("padding-top", "+=5%");
    $("#card-container").css("padding-top", $("#nav").height());
    $("#card-container").css("padding-top", "+=5%");
    $(".main").css("padding-bottom", "-=50px");
  }).resize();
  }

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
          filtered: this.state.employees.filter(person => 
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
    //renders page in 'List View'
    if (this.state.view === "list") {
      return (
        <div id = "wrapper">
          <Header
            handleInputChange={this.handleInputChange}
            value={this.state.searchTerm}
            changeView={this.changeView}
            view={this.state.view} />

          <div className="main">
            <div id="list-container" className="list-container container justify-content-center">
              <EmployeeList
                filtered={this.state.filtered}
                handleOrder={this.handleOrder}
              />
            </div>
            <div className="push"></div>
          </div>
          <Footer />
        </div>
      );
    }
     //renders page in 'Card View'
    else if (this.state.view === "card") {
      return (
        <div id="wrapper">
          <Header
            handleInputChange={this.handleInputChange}
            value={this.state.searchTerm}
            changeView={this.changeView} />
          <div className="main">
            <div id="card-container" className="card-container justify-content-center">
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
            <div className="push"></div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default App;