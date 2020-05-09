import React from "react";


function Header(props) {
return (
  <nav className="navbar navbar-dark">
  <h1 className="navbar-brand">Employee Directory</h1>
  <form className="form-inline">
  <p className = "mt-3 mr-2 text-white">Change View:</p>
  <i className={props.view === "list" ? "far fa-address-card text-light mr-4 mt-2 h3" : "far fa-list-alt text-light mr-4 mt-2 h3"} name={props.view === "list" ? "card" : "list"} onClick={props.changeView}></i>

    <p className = "text-white px-3 mt-3 border-left border-info">Employee Search: </p>
    <input className="form-control mr-sm-2" id="searchBox" type="search" placeholder="Search" aria-label="Search"
     onChange={props.handleInputChange}
     value={props.value}
    />
   
  </form>
</nav>
);
}


export default Header;