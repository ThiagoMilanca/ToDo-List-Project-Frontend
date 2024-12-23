import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/user/login"}>Login</NavLink></li>
            <li><NavLink to={"/user/register"}>Register</NavLink></li>
            </ul>
        </div>
    );
}