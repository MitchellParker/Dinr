import React, { useState, useEffect } from 'react';
import './friends.css';
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

    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
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

    const handleChange = (event) => {
        setInput(event.target.value);
    }
    async function handleSubmit(event) {
        setMessage('');
        //check if user gave a valid nickname
        let isValidNickname = true;
        let isOneself = false;

        if (input === user){
            isValidNickname = false;
            isOneself = true;
            setMessage('Cannot add oneself');
        }
        axios.get('http://localhost:3001/fetch/?nickname=' + input)
        .then(response => {
            if (response.data.length == 0) {
                if (!isOneself) {
                setMessage('Invalid nickname');
                }
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
                        getFriendList(updatedFriendList);
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
        getUserDiningChoices();
    }, []);

    const [friendlist, getFriendList] = useState([]);

    const getFriendListroute =() => {
        axios.get("http://localhost:3001/fetch/?nickname=" + user)
        .then(response => {
            getFriendList(response.data.friendlist)
        })
        .catch(error => {
            getError(error)
        });
    }

    useEffect(() => {
        getFriendListroute();
    }, [])


    const Choices = (props) => {
        const [friend_breakfast, getfriendBreakfast] = useState('');
        const [friend_breakfastTime, getfriendBreakfastTime] = useState('');
        const [friend_lunch, getfriendLunch] = useState('');
        const [friend_lunchTime, getfriendLunchTime] = useState('');
        const [friend_dinner, getfriendDinner] = useState('');
        const [friend_dinnerTime, getfriendDinnerTime] = useState('');
        
        var begurl = `http://localhost:3001/fetch/?nickname=`;

        var url = begurl + props.friendname;

        axios.get(url)
        .then((response) => {
            getfriendBreakfast(response.data.breakfast);
            getfriendBreakfastTime(response.data.breakfastTime);
            getfriendLunch(response.data.lunch);
            getfriendLunchTime(response.data.lunchTime);
            getfriendDinner(response.data.dinner);
            getfriendDinnerTime(response.data.dinnerTime);
        })
        .catch(error => {
            getError(error)
        });
        return (
            <div>
            <div className='friends_mealPeriod_box'>
                <p>{friend_breakfast} {friend_breakfastTime}</p>
            </div>
            <div className='friends_mealPeriod_box'>
                <p>{friend_lunch} {friend_lunchTime}</p>
            </div>
            <div className='friends_mealPeriod_box'>
                <p>{friend_dinner} {friend_dinnerTime}</p>
            </div> 
            </div>
        );
    }

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
        <div className='friends_yourChoices'>
        <div className='friends_yourChoicesLabel'>Your Choices</div>
            <div className='friends_mealPeriod'>
                <h2>Breakfast</h2>
                <p>{breakfast} {breakfastTime}</p>
            </div>
            <div className='friends_mealPeriod'>
                <h2>Lunch</h2>
                <p>{lunch} {lunchTime}</p>
            </div>
            <div className='friends_mealPeriod'>
                <h2>Dinner</h2>
                <p>{dinner} {dinnerTime}</p>
            </div> 
        </div>
        <div className = "friendschoice">
        {
            friendlist.filter((friend) => {
                if (query === '') {
                    return friend
                } else if (friend.toLowerCase().includes(query.toLowerCase())) {
                    return friend
                }
            })
            .map((friend) => {
                return (
                    <div>
                    <div className= "friends_ChoicesLabel">
                    {friend}
                    </div>
                    <Choices friendname = {friend}/>
                    </div>
                );
            } 
        )}
        </div>
        </div>}
        </div>
  );
}

export default Friends;