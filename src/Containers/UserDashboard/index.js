import React from 'react';
import './UserDashboard.scss';

function UserDashboard () {
    return(
        <div id="user-dashboard">
            <div className="container">
                <div className="album-header">
                    <span className="header-title">Recently Played</span>
                    <button className="btn-wrap">View All</button>
                </div>
            </div>
        </div>
    )
};

export default UserDashboard;