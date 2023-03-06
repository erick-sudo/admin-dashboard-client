import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti"
import { RiAccountBoxFill } from "react-icons/ri"
import { SiGooglemessages } from "react-icons/si"
import { IoNotificationsSharp } from "react-icons/io5"
import ActionTab from "./ActionTab";
import Search from "./Search";
import { Message } from "./Main";

function TopStatusBar({showNav, setShowNav, user, logginUser}) {

    const [messages, setMessages] = useState(new Array(3).fill(<Message />))

    return (
        <div className="tob-status-bar">
            { showNav ? null : <div className="show-hide-nav-bar " onClick={() => setShowNav(true)}><TiThMenu /></div>}
            <Search />
            <div className="acc-state">
                <ActionTab icon={<RiAccountBoxFill />} classname="account-access" label={user ? `${user.username} ${user.lastname}` : null} action="acc-update" logginUser={logginUser} user={user}/>
                <ActionTab icon={<IoNotificationsSharp />} classname="account-access" label="Notifications" options={["","","",""]} moretext="Notifications"/>
                <ActionTab icon={<SiGooglemessages />} classname="account-access" label="Messages" options={messages} moretext="Messages"/>
            </div>
        </div>
    );
}

export default TopStatusBar;

