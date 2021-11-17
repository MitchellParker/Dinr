import React, { Component } from 'react';
import './dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false,
    }
    
    this.showMenu = this.showMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          {this.props.title}
        </button>
        
        {
          this.state.showMenu
            ? (
              <div className="dropdown_menu">
                  {this.props.options.map((option) => 
                    <button className="dropdown_button"> {option} </button>
                  )}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default Dropdown;