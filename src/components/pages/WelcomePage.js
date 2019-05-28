import React from 'react';
import {Link} from 'react-router-dom';

const WelcomePage = ()=>{
    return (
        <div>
            <h3>Welcome to the test app for Mozio recruitment process.</h3>
            <Link to='/form'>START</Link>
        </div>
    );
}

export default WelcomePage;