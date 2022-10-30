import './LatestNews.css';
import { useState } from 'react';
import axios from 'axios';


const LatestNews = () => {
    const [ email, setEmail ] = useState("");

    const onSubscribe =  async(e) => {
        e.preventDefault();

        await axios({
            url: 'http://localhost:4000/api/subscribe',
            method: 'POST',
            data: {
                email: email
            },
            responseType: 'json'
        }).then((response) => {
            console.log(response);
            setEmail("");
        }).catch((error) => {
            console.log(error);
        })
       
    }

    return (
        <form className="latestNews" onSubmit={onSubscribe}>
            <p>GET THE</p>
            <span>LATEST RECIPIES</span> 
            <p>IN YOUR INBOX:</p>
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
            <div className="btnWrapper">
                <button type="submit">SIGN UP</button>
                <img src="./icons/arrow_right.svg" className="icon" alt="" />
            </div>
        </form>
    );
}



export default LatestNews;