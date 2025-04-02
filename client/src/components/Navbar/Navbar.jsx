import React, { useContext, useState } from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../routes/lib/notificationsStore';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const fetch= useNotificationStore((state)=>state.fetch)
  const number= useNotificationStore((state)=>state.number)

  if(currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <Link to="/" className='logo'>
          <img src="./logo.png" alt="" />
          <span>UrbanEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/list">All properties</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className='user'>
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className='profile'>
              {number>0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register" className='register1'>Sign Up</Link>
          </>
        )}
        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
