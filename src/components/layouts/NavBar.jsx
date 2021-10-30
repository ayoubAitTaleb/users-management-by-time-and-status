import React from 'react'
import { Link } from 'react-router-dom'
export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>Life Fitness</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarID"
                aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarID">
                <div className="navbar-nav">
                  <Link className="nav-link active" aria-current="page" to={'/users/add'}>Add User</Link>
                </div>
            </div>
        </div>
      </nav>
    </div>
  )
}
