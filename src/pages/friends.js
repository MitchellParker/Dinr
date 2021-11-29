import React, { useState, useEffect } from 'react';
import './friends.css';
import Data from "../tempmockdata/mock-data.json";
import useAuth from '../useAuth';
import axios from 'axios';

const Friends = () =>{
    const [query, setQuery] = useState("");
    const [error, getError] = useState(null);
    const [breakfast, getBreakfast] = useState('');
    const [breakfastTime, getBreakfastTime] = useState('');
    const [lunch, getLunch] = useState('');
    const [lunchTime, getLunchTime] = useState('');
    const [dinner, getDinner] = useState('');
    const [dinnerTime, getDinnerTime] = useState('');
    const { user } = useAuth();

    const getUserDiningChoices = () => {
        axios.get("http://localhost:3001/fetch/?nickname=" + user)
        .then((response) => {
            getBreakfast(response.data.breakfast);
            getBreakfastTime(response.data.breakfastTime);
            getLunch(response.data.lunch);
            getLunchTime(response.data.lunchTime);
            getDinner(response.data.dinner);
            getDinnerTime(response.data.dinnerTime);
        })
        .catch(error => {
            getError(error)
        });
    }

    useEffect(() => {
        getUserDiningChoices();
    })

    return (
        <div className = "friends">
        <input placeholder="Search for Friends!" onChange={event => setQuery(event.target.value)} />
        <div className='friends_yourChoices'>
        <div className='friends_yourChoicesLabel'>Your Choices</div>
            <div className='friends_mealPeriod'>
                <h2>Breakfast</h2>
                <p>{breakfast} at {breakfastTime}</p>
            </div>
            <div className='friends_mealPeriod'>
                <h2>Lunch</h2>
                <p>{lunch} at {lunchTime}</p>
            </div>
            <div className='friends_mealPeriod'>
                <h2>Dinner</h2>
                <p>{dinner} at {dinnerTime}</p>
            </div> 
        </div>
        <div className = "friendschoice">
        {
        Data.filter((post) => {
            if (query === '') {
                return post
            } else if (post.friend.toLowerCase().includes(query.toLowerCase())) {
                return post
            }
        }).map((post, index) => {
            return (
                <div className = "indfriend" key={index}>
                    <p>Friend: {post.friend}</p>
                    <p className = "box">Breakfast: {post.breakfast}</p>
                    <p className = "box">Lunch: {post.lunch}</p>
                    <p className = "box">Dinner: {post.dinner}</p>
                </div>
            );
        })}
        </div>
        </div>
  );
}

export default Friends;