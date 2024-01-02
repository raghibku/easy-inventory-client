import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Easy Inventory</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {/* <li><a>Link</a></li>
                    <li>
                        <details>
                            <summary>
                                Parent
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li> */}
                    <li> <NavLink to = '/'>Home</NavLink> </li>
                    <li> <NavLink to = '/addItem'>Add Items</NavLink> </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar