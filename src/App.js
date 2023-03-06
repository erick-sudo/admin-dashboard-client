import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Main } from './components/Main';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import TopStatusBar from './components/TopStatusBar';
import { useState, useRef, useEffect } from 'react';
import { ItemsTable, CategoryForm }from './components/ItemsTable';
import { Login, Signup } from './components/account/Account';
import { ImShield } from'react-icons/im';

function SessionExpired() {
  return (
    <div className="session-expired">
      <h1>Session Expired</h1>
      <div className='ssse'>
        <ImShield />
      </div>
    </div>
  )
}

function App() {

  const navigate = useNavigate()

  const [showNav, setShowNav] = useState(false)

  const [tasks, setTasks] = useState([])
  const [messages, setMessages] = useState([])

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  function logginUser(new_user) {
    setLoggedIn(new_user ? true : false)
    if(new_user == null) {
      navigate("/login")
    }
    setUser(new_user)
  }


  const vRef = useRef()
  const appRef = useRef()

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <div ref={appRef} className="App">
      <div className="app-container">
        { showNav ? <NavigationBar  setShowNav={setShowNav} user={user} /> : null }
        <div ref={vRef} className='visible-content'>
          {loggedIn ? <TopStatusBar user={user} logginUser={logginUser} showNav={showNav} setShowNav={setShowNav} /> : null}
          <div className='routing'>
            <Routes>
            <Route path="/" element={<Login logginUser={logginUser} />}/>
            <Route path="/home" element={<Main user={user} />} />
            <Route path="/users" element={<ItemsTable endpoint="users" />} />
            <Route path="/products" element={<ItemsTable endpoint="products" />} />
            <Route path="/customers" element={<ItemsTable endpoint="customers" />} />
            <Route path="/orders" element={<ItemsTable endpoint="orders" />} />
            <Route path="/categories" element={<ItemsTable endpoint="categories" />} />
            <Route path="/categories/:id" element={<CategoryForm />} />
            <Route path="/settings" element={<></>} />
            <Route path="/profile" element={<></>} />
            <Route path="/login" element={<Login logginUser={logginUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/expired" element={<SessionExpired />} />
          </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
