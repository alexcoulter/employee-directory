import React from "react";


function Header(props) {
return (
  <nav className="navbar navbar-dark bg-dark">
  <h1 className="navbar-brand">Employee Directory</h1>
  <form className="form-inline">
    <input className="form-control mr-sm-2" id="searchBox" type="search" placeholder="Search" aria-label="Search"
     onChange={props.handleInputChange}
     value={props.value}
    />
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" name="searchTerm" onClick={props.handleInputChange}>Search</button>
  </form>
</nav>
);
}


export default Header;