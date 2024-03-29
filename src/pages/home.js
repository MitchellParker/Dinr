import React from 'react';
import Dropdown from '../components/dropdown';
import './home.css';
import useAuth from '../useAuth';

const Home = () =>{
    const breakfastOptions = ['De Neve', 'Bruin Plate', 'Bruin Cafe', 'The Study'];
    const breakfastTimes = ['7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am'];
    const lunchOptions = ['Epicuria', 'De Neve', 'Bruin Plate', 'Bruin Cafe', 'Rende West', 'Rende East', 'The Study', 'Bruin Bowl', 'The Drey'];
    const lunchTimes = ['11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm'];
    const dinnerOptions = ['Epicuria', 'De Neve', 'Feast', 'Bruin Plate', 'Bruin Cafe', 'Rende West', 'Rende East', 'The Study', 'Bruin Bowl'];
    const dinnerTimes = ['5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm', '9:00pm'];
    const { user } = useAuth();

    return (
        <body className='home'>
            <div>
                <h2 className='home_header'>Dinr: Bruin Meal Planner</h2>
                <div className='home_mealPeriod'>
                    <p className='home_mealPeriodLabel'>Breakfast</p>
                    <Dropdown optionType="breakfast" title='Choose a dining location' options={breakfastOptions} user={user}/>
                    <Dropdown optionType="breakfastTime" title='Choose a time' options={breakfastTimes} user={user}/>
                </div>
                <div className='home_mealPeriod'>
                    <p className='home_mealPeriodLabel'>Lunch</p>
                    <Dropdown optionType="lunch" title='Choose a dining location' options={lunchOptions} user={user}/>
                    <Dropdown optionType="lunchTime" title='Choose a time' options={lunchTimes} user={user}/>
                </div>
                <div className='home_mealPeriod'>
                    <p className='home_mealPeriodLabel'>Dinner</p>
                    <Dropdown optionType="dinner" title='Choose a dining location' options={dinnerOptions} user={user}/>
                    <Dropdown optionType="dinnerTime" title='Choose a time' options={dinnerTimes} user={user}/>
                </div>
            </div>
        </body>
    );
}

export default Home;