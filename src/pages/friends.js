import React, { Component } from 'react';
import './friends.css';
import Data from "../tempmockdata/mock-data.json"
import {useState} from "react";


const Friends = () =>{
    const [query, setQuery] = useState("")
  return (
        <div className = "friends">
        <input placeholder="Search for Friends!" onChange={event => setQuery(event.target.value)} />
        <div className='friends_yourChoices'>
                <div className='friends_yourChoicesLabel'>Your Choices</div>
                <div className='friends_mealPeriod'>Breakfast</div>
                <div className='friends_mealPeriod'>Lunch</div>
                <div className='friends_mealPeriod'>Dinner</div>
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