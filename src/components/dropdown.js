import React, { Component } from 'react';
import './dropdown.css';


class DropdownButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: props.option,
      optionType: props.optionType
    };

    //this.handleClick = this.register.bind(this);
    this.handleClick = this.sendOption.bind(this);
  }

  sendOption(event) {
    fetch('/update/:id', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: "John",
        [this.state.optionType]: this.state.option 
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
                    <DropdownButton option={option} optionType={this.props.optionType}/>
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