import React from "react";

function CurrentUser({user}) {

    return (
        <>
        {user ? 
            <div className="acc-avatar">
                <img src={user.avatar} alt="Profile"/>
                <div className="h3">{`${user.username} ${user.lastname}`}</div>
                <div className="h3">{user.role.name}</div>
            </div>
        : null
        }
        </>
    );
}

export default CurrentUser;