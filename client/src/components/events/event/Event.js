import React, {useState, useEffect} from "react";
import {useHistory } from "react-router-dom";

import "./Event.css";
import eventServices from "../../../services/event-services";
import isLoggedIn from "../../../utils/auth";

const Event = ({event, isAdmin, isLiked, isRegistered, isLoggedIn}) => {
    const [likeState, setLikeState] = useState(isLiked);
    const [registerState, setRegisterState] = useState(isRegistered);
    const [events, setEvents] = useState([]);
    // const event1 = eventServices.details(event);
    

    useEffect(() => {
        console.log(isRegistered + " " + typeof(event1) + event + "  " + event.name);
        if (isLoggedIn) {
            eventServices.get().then(ev => {
                setEvents(ev);
            })
        } else {
            eventServices.get(3).then(ev => {
                setEvents(ev);
            })
        }
    });
    const history = useHistory();

    const handleEdit = (e) => {
        const id = e.currentTarget.id;
        history.push('/edit/' + id);
    }

    const handleDelete = (e) => {
        const id = e.currentTarget.id;
        eventServices.delete(id).then(() => {
            history.push('/');
        }).catch(err => console.log(err));
    }

    const hitLike = (e) => {
        const id = e.currentTarget.id;
        eventServices.like(id).then(() => {
            history.push('/');
            setLikeState(true);
        }).catch(err => console.log(err));
    }

    const registerUser = (e) => {
        const id = e.currentTarget.id;
        eventServices.registeruser(id).then(() => {
            history.push('/');
            setRegisterState(true);
        }).catch(err => console.log(err));
    }

    const unregisterUser = (e) => {
        const id = e.currentTarget.id;
        eventServices.unregisteruser(id).then(() => {
            history.push('/');
            setRegisterState(false);
        }).catch(err => console.log(err));
    }


    const hitDislike = (e) => {
        const id = e.currentTarget.id;
        eventServices.dislike(id).then(() => {
            history.push('/');
            setLikeState(false);
        }).catch(err => console.log(err));
    }

    const showDetails = (e) => {
        console.log({event});
        const id = e.currentTarget.id;
        eventServices.details(id).then(() => {
            history.push('/details/' + id);
        }).catch(err => console.log(err));
    }

    return (
        <div className="Event" key={event._id}>
            {
                isLoggedIn ?
                    <img src={event.imageURL} alt="alt" className="details" onClick={showDetails} id={event._id}/> :
                    <img src={event.imageURL} alt="alt" className="details" onClick={showDetails} id={event._id}/>
            }
            <p className="name">{event.name}</p>
            <p className="description">{event.description}</p>
            { event.admin ?
                <div className="creator">
                    <span>Creator: </span>
                    {event.admin.firstName + ' ' + event.admin.lastName}
                </div> : null
            }
                {!isAdmin ?
                    <div>
                        {event.admin ?
                <div className="likes">
                {likeState ?
                    <i className="far fa-thumbs-up blue" id={event._id} onClick={hitDislike}></i> :
                    <i className="far fa-thumbs-up" id={event._id} onClick={hitLike}></i>
                }
                <span> {event.likes.length + (event.likes.length === 1 ? " Like" : " Likes")}</span>
                </div> : null }
                {/* <span> {event.registeredUsers.length} </span> */}
                {/* {event} */}
                {registerState ? 
                    <button className="links" id={event._id} onClick={unregisterUser}>UnRegister </button> :
                    <button className="links" id={event._id} onClick={registerUser}>Register </button>}
                    </div>
                :
                <div className="buttons">
                <button className="links" id={event._id} onClick={handleEdit}>Edit</button>
                <button className="links" id={event._id} onClick={handleDelete}>Delete</button>
                </div>}
        </div>
    )
}

export default Event;