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
    const [input, setInput] = useState(''); //add friend bar search text
    const [message, setMessage] = useState(''); //diagnostic message for add friend bar
    const { user } = useAuth();

    //get dining choices of current user
    const getUserDiningChoices = () => {
        axios.get("/fetch/?nickname=" + user)
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

    //handler function for when user types into add friend bar
    const handleChange = (event) => {
        setInput(event.target.value);
    }
    //handler function for when user presses add button
    async function handleSubmit(event) {
        setMessage('');
        //check if user gave a valid nickname
        let isValidNickname = true;
        axios.get('/fetch/?nickname=' + input)
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
                axios.get('/fetchfriends/?nickname=' + user)
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
                        axios.put('/updatefriends/:nickname',
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
        getUserDiningChoices();
        getFriendListroute();
    }, []);

    const [friendlist, getFriendList] = useState([]);
    const getFriendListroute =() => {
        axios.get("/fetch/?nickname=" + user)
        .then(response => {
            getFriendList(response.data.friendlist)
        })
        .catch(error => {
            getError(error)
        });
    }

    //component to display a friend's dining
    const Choices = (props) => {
        const [friend_breakfast, getfriendBreakfast] = useState('');
        const [friend_breakfastTime, getfriendBreakfastTime] = useState('');
        const [friend_lunch, getfriendLunch] = useState('');
        const [friend_lunchTime, getfriendLunchTime] = useState('');
        const [friend_dinner, getfriendDinner] = useState('');
        const [friend_dinnerTime, getfriendDinnerTime] = useState('');
        
        var begurl = `/fetch/?nickname=`;

        var url = begurl + props.dude;

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
                    <input className = "friends_searchBar" placeholder="Search for Friends!" onChange={event => setQuery(event.target.value)} />
                    <form className = "friends_add" onSubmit={handleSubmit}>
                                <input placeholder="Add a Friend by Nickname" value={input} onChange={handleChange} />
                                <input type="submit" value="Add" />
                                <p>{message}</p>
                            </form>
                    <div className='friends_yourChoices'>
                        <p className='friends_yourChoicesLabel'>Your Choices</p>
                        <div className='friends_mealPeriod'>
                            <h3>Breakfast</h3>
                            <p>{breakfast} {breakfastTime}</p>
                        </div>
                        <div className='friends_mealPeriod'>
                            <h3>Lunch</h3>
                            <p>{lunch} {lunchTime}</p>
                        </div>
                        <div className='friends_mealPeriod'>
                            <h3>Dinner</h3>
                            <p>{dinner} {dinnerTime}</p>
                        </div> 
                    </div>
                    <div className = "friends_friendschoice">
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
                                    <p className= "friends_ChoicesLabel">
                                        {friend}
                                    </p>
                                    <Choices dude = {friend}/>
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