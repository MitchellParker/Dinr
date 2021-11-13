import React from 'react';
import './friends.css';

const Friends = () =>{
  return (
    <body className='friends'>
        <div>
            <div className='friends_searchBar'>
                <p>Search Bar</p>
            </div>
            <div className='friends_yourChoices'>
                <div className='friends_yourChoicesLabel'>Your Choices</div>
                <div className='friends_mealPeriod'>Breakfast</div>
                <div className='friends_mealPeriod'>Lunch</div>
                <div className='friends_mealPeriod'>Dinner</div>
            </div>
            <div className='friends_friendChoices'>
                <div className='friends_friendChoicesLabel'>Friend Choices</div>
                <div className='friends_mealPeriod'></div>
                <div className='friends_mealPeriod'></div>
                <div className='friends_mealPeriod'></div>
            </div>
        </div>
    </body>

  );
}

export default Friends;