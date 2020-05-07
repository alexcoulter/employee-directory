import React from "react";


function Header(props) {
return (
  <nav className="navbar navbar-dark bg-dark">
  <h1 className="navbar-brand">Employee Directory</h1>
  <form className="form-inline">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={props.handleSubmit}>Search</button>
  </form>
</nav>
);
}


export default Header;