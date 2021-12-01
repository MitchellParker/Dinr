import React, { Component } from 'react';
import './dropdown.css';

class DropdownButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: props.option,
      optionType: props.optionType
    };

    this.handleClick = this.sendOption.bind(this);
  }
  // function called to update server side data for dining options
  sendOption(event) {
    fetch('/updatechoices/:id', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: this.props.user,
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
                    <DropdownButton option={option} optionType={this.props.optionType} user={this.props.user}/>
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