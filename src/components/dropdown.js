import React, { Component } from 'react';
import axios from 'axios';
import './dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false,
      selectedOption: '',
    }
    
    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  handleClick(option) {
    this.setState({
      showMenu: !this.state.showMenu,
      selectedOption: "You've selected " + option
    });
    axios.put('/updatechoices/:nickname',
    {
      nickname: this.props.user,
      [this.props.optionType]: option
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          {this.props.title}
        </button>
        <p className="dropdown_selectedOption">{this.state.selectedOption}</p>
        {
          this.state.showMenu && (
            <div className="dropdown_menu">
                {this.props.options.map((option) => 
                  <button onClick={() => this.handleClick(option)} className="dropdown_button">
                    {option}
                  </button>
                )}
            </div>
          )
        }
      </div>
    );
  }
}

export default Dropdown;