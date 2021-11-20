import React, { Component } from 'react';
import './dropdown.css';


class DropdownButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: props.option
    };

    this.handleClick = this.sendOption.bind(this);
  }

  sendOption(event) {
    fetch('/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: "John",   
        password: "Doe",
        breakfast: "",
        lunch: "",
        dinner: "",
        breakfastTime: "",
        lunchTime: "",
        dinnerTime: "",
        friendlist: []
      })
    });
  }

  render() {
    return (
    <button
      onClick={this.handleClick}
      className="dropdown_button"> {this.state.option}
    </button>
    )
  };
}
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
                    <DropdownButton option={option} />
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