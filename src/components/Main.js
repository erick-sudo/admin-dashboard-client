import React, { useState, useEffect} from 'react'
import Sale from './Sale';
import { FaChartPie, FaChartLine, FaChartArea } from 'react-icons/fa';
import { IoBarChartSharp } from 'react-icons/io5'
import RecentSales from './RecentSales';
import Search from './Search'
import profile from "../assets/profile.svg"
import { CgGoogleTasks } from 'react-icons/cg'
import { AiFillCloseCircle } from 'react-icons/ai'
import MyCalendar from './MyCalendar';
import { MyChart } from './MyCharts';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsStarHalf } from 'react-icons/bs'
import { BiEditAlt } from'react-icons/bi'

function Message() {
    const t = new Date().toISOString().slice(0,19).split("T")
    return (
        <div className="message">
            <div className='message-icon'>
                <Avatar />
            </div>
            <div className='message-text'>
                <div className='sender'>John Doe</div>
                <div className='message-content'>Lorem ipsum dolor sit amet</div>
            </div>
            <div>
                {t.map((s,index) => <div key={index}>{s}</div>)}
            </div>
        </div>
    )
}

function Avatar() {
    return (
        <div className="avatar">
            <img src={profile} alt="Profile" />
        </div>
    )
}

function Task({task, removeTask}) {

    const [showEdit, setShowEdit] = useState(false)

    const [myTask, setMyTask] = useState(task.task)

    const [showEditBtn, setShowEditBtn] = useState(false)

    return (
        <div className="task" onClick={() => setShowEditBtn(false)} onMouseLeave={() => setShowEditBtn(false)}>
            {showEditBtn ? <div className='edit-btn' onClick={() => setShowEdit(true)} ><BiEditAlt /></div> : null}
            <div className='task-icon'>
                <CgGoogleTasks />
            </div>
            <div className='task-text' onMouseEnter={() => setShowEditBtn(true)} >
                { showEdit ?
                <input className='edit-task' value={myTask} onChange={(e) => setMyTask(e.target.value)} type="text" />
                : <div>{myTask}</div> }
            </div>
            { showEdit ? <div className='save-task' onClick={() => {
                setShowEdit(false)
                fetch(`http://localhost:9292/tasks/${task.id}}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        task: myTask
                    })
                })
            }}>Save</div>
            : <div className='remove-task' onClick={() => {
                removeTask(task)
            }}>
                <AiFillCloseCircle />
            </div>}
        </div>
    )
}


function Main({user}) {

    return (
        <div className="main">
            <div className='daily-sales-summary'>
                <Sale title="Today Sale" icon={<FaChartLine />} value={1234} />
                <Sale title="Total Sale" icon={<IoBarChartSharp />} value={1234} />
                <Sale title="Today Revenue" icon={<FaChartArea />} value={1234} />
                <Sale title="Today Revenue" icon={<FaChartPie />} value={1234} />
            </div>

            <div className='charts'>
                {/* <MyChart type="polarArea" attribute="price" title="Product Sales By Category" endpoint="products" p_label="Product Sales" />
                <MyChart type="doughnut" attribute="star_rating" p_label="Rating" title={<><AiFillStar /><AiFillStar /><BsStarHalf /><AiOutlineStar /><AiOutlineStar /> Ratings</>} endpoint="products"/>
                <MyChart type="bar" endpoint="products"/> */}
            </div>

            <RecentSales />

            <div className='related'>
                <div>
                    <div className="heading"><h2>Messages</h2><button>Show All</button></div>
                    <div>
                        {[1,2,3,4,5].map((m, i) => <Message key={i}/>)}
                    </div>
                </div>
                <div>
                    <h2>Calendar</h2>
                    <div className='calendar'>
                        <MyCalendar />
                    </div>
                </div>
                <div>
                    <Tasks user={user} />
                </div>
            </div>
        </div>
    );
}

function Tasks({user=31}) {
    user = 31
    const [tasks, setTasks] = useState([])

    const [newTask, setNewTask] = useState("")

    useEffect(() => {
        fetch(`http://localhost:9292/tasks/${user}`)
        .then(response => response.json())
        .then(tsks => {
            setTasks(tsks)
        })
    },[])

    function removeTask(task) {
        setTasks(tasks.filter(t => t.id !== task.id))
        fetch(`http://localhost:9292/tasks`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                user_id: user
            })
        })
    }

    function newTaskSet(t) {
        setNewTask(t)
    }

    return (
        <div>
            <div className="heading"><h2>To Do List</h2><button>Show All</button></div>
                <div className='newtask-head'>
                    <NewTask placeholder='New Task' newTask={newTask} setNewTask={newTaskSet} />
                    <button onClick={() => {
                        fetch(`http://localhost:9292/tasks/${user}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                task: newTask,
                                user_id: user
                            })
                        })
                        .then(response => response.json())
                        .then(tsk => {
                            setTasks([tsk, ...tasks])
                        })
                    }}>Add</button>
                </div>
                <div>
                    {tasks.reverse().map((t, i) => <Task key={i} task={t} removeTask={removeTask}/>)}
            </div>
        </div>
    )
}

function NewTask({newTask, setNewTask}) {
    return (
        <div className="search-box">
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="New Task..." />
        </div>
    )
}

export { Main, Message };