import React, { useState, useEffect } from 'react';
import './friends.css';
import Data from "../tempmockdata/mock-data.json";
import useAuth from '../useAuth';
import axios from 'axios';

const Friends = () => {
    const [query, setQuery] = useState("");
    const [error, getError] = useState(null);
    const [breakfast, getBreakfast] = useState('');
    const [breakfastTime, getBreakfastTime] = useState('');
    const [lunch, getLunch] = useState('');
    const [lunchTime, getLunchTime] = useState('');
    const [dinner, getDinner] = useState('');
    const [dinnerTime, getDinnerTime] = useState('');
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    const getUserData = () => {
        axios.get('http://localhost:3001/fetch/?nickname=' + user)
        .then((response) => {
            getBreakfast(response.data.breakfast);
            getBreakfastTime(response.data.breakfastTime);
            getLunch(response.data.lunch);
            getLunchTime(response.data.lunchTime);
            getDinner(response.data.dinner);
            getDinnerTime(response.data.dinnerTime);
        })
        .catch(error => getError(error));
    }
    const handleChange = (event) => {
        setInput(event.target.value);
    }
    async function handleSubmit(event) {
        setMessage('');
        //check if user gave a valid nickname
        let isValidNickname = true;
        axios.get('http://localhost:3001/fetch/?nickname=' + input)
        .then(response => {
            if (response.data.length == 0) {
                setMessage('Invalid nickname');
                isValidNickname = false;
            }
        })
        .then(() => {
            if (isValidNickname) {
                //get user's current friendlist
                let friends = [];
                axios.get('http://localhost:3001/fetchfriends/?nickname=' + user)
                .then((response) => {
                    friends = response.data;
                })
                .then(() => {
                    //check if friend is already in friendlist
                    let alreadyInList = false;
                    for (let i = 0; i < friends.length; i++) {
                        if (friends[i] == input) {
                            alreadyInList = true;
                            setMessage('Friend is already in your list');
                            break;
                        }
                    }
                    if (!alreadyInList) {
                        //update user's friendlist with new added friend
                        const updatedFriendList = friends.concat(input);
                        axios.put('http://localhost:3001/updatefriends/:nickname',
                        {
                            nickname: user,
                            friendlist: updatedFriendList
                        });
                        setMessage('Added ' + input + ' to you friend list');
                    }
                })
                .catch(error => {
                    getError(error);
                });
            }
        })
        .catch(error => {
            getError(error);
        })
        //clear search box
        setInput('');
        event.preventDefault();
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
            {error ? <h1>{error}</h1> : 
            <div className = "friends">
                <input placeholder="Search for Friends!" onChange={event => setQuery(event.target.value)} />
                <form onSubmit={handleSubmit}>
                    <input placeholder="Add a Friend by Nickname" value={input} onChange={handleChange} />
                    <input type="submit" value="Add" />
                    <p>{message}</p>
                </form>
                {/* <AddFriendBar user={user} friends={friendList}/> */}
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
                            <div>Friend: {post.friend}</div>
                            <div className = "box">{post.breakfast}</div>
                            <div className = "box">{post.lunch}</div>
                            <div className = "box">{post.dinner}</div>
                        </div>
                    );
                })}
                </div>
            </div>}
        </div>
    );
}

export default Friends;