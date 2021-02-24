import React, { Component } from 'react'
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            
            <label className="text-danger">  Your address: <b>{this.props.account}</b></label>
             
            
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
