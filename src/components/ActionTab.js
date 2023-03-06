import React, { useState } from "react"
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { FaSignature } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { useNavigate } from "react-router-dom"


function ActionTab({icon, label, options, moretext, logginUser, user}) {

    const [collapse, setCollapse] = useState(false)

    const navigate = useNavigate()

    return (
        <div className="tabs" onMouseLeave={() => setCollapse(false)}>
            <div className="tab-rep" onClick={() => setCollapse(!collapse) }>
                <div className="action-icons">{icon}</div>
                <span>{label}</span>
                <div className="collapse">
                    { collapse
                        ? <MdExpandLess />
                        : <MdExpandMore />
                    }
                </div>
            </div>
            { collapse ?
                <div className="tab-content">
                    { options ?
                        options
                         :
                        <div className="access_account">
                            <div onClick={() => navigate("/login")}><FiLogIn />Login</div>
                            <div onClick={() => {
                                navigate("/login")
                                logginUser(null)
                                localStorage.setItem("token", "")
                                fetch(`http://localhost:9292/logout/${user.id}`)
                            }}><FiLogOut />Logout</div>
                            <div onClick={() => navigate("/signup")}><FaSignature />Signup</div>
                            <div onClick={() => navigate("/profile")}><ImProfile />Profile</div>
                        </div>
                    }
                    { moretext ? <div className="see-more">See all {moretext}</div> : null }
                </div>
                : null
                }
        </div>
    )
}

export default ActionTab;