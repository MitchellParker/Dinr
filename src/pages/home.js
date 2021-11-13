import React from 'react';
import './home.css';

const Home = () =>{
  return (
    <body className='home'>
        <div>
            <h2 className='home_header'>Dinr: Bruin Meal Planner</h2>
            <div className='home_mealPeriod'>
                <p>Breakfast</p>
                <p className='home_dropdown'>Dropdown Menu</p>
            </div>
            <div className='home_mealPeriod'>
                <p>Lunch</p>
                <p className='home_dropdown'>Dropdown Menu</p>
            </div>
            <div className='home_mealPeriod'>
                <p>Dinner</p>
                <p className='home_dropdown'>Dropdown Menu</p>
            </div>
        </div>
    </body>
  );
}

export default Home;