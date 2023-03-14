import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
const Camera = () => {
    const location = useLocation()
    const event_idd = location.state.event_id

    let sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));

    };
    async function handleEvents() {

        var response = await axios.get("http://127.0.0.1:5000/get_name")
        var name_of = response.data.Result
        console.log(name_of)
        if (name_of == "Unknown") {
            alert("Cannot register")
        }
        else {
            sleep(500).then(() => {
                axios.post('http://localhost:8000/update', [response.data, event_idd])
            });
        }

    }
    return (
        <div>
            <img src="http://127.0.0.1:5000/video_feed"></img>
            <button onClick={handleEvents}>Register</button>

        </div>
    )
}
export default Camera