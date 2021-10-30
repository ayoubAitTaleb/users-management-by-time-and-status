import axios from 'axios';
import React, { Component } from 'react'
import { Consumer } from '../context/Context'
import { Link } from 'react-router-dom';
export default class DisabledUsers extends Component {

  state = {fullName:'', activity: '', expiredDate: '', isActive: false}  

  removeUser = (id, dispatch) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(res => dispatch({
        type: 'DELETE_USER',
        payload: id
      }))
  }
  render() {
    return (
      <Consumer>
        {value => (
          value.users.filter(user => user.isActive === false).map(user => {
            const {dispatch} = value;
            const id = user.id
            return(              
            <div key={user.id} className="my-1">
              <div className="card">
                <div className="card-body">
                  <div>
                    <h4 className="card-title d-inline">{user.fullName}</h4>
                    <button className="btn btn-danger btn-sm pull-right" style={{float: 'right', marginLeft: '5px'}} onClick={this.removeUser.bind(this, id, dispatch)}>remove</button>
                    <Link to={`/users/update/${user.id}`} className="btn btn-success btn-sm pull-right" style={{float: 'right'}}>Update</Link>         
                  </div>
                  <div className="my-2">
                    <p className="card-text d-inline">{user.activity}</p>
                    {/* <span className="btn btn-success btn-sm" style={{float: 'right'}}>{Math.ceil((user.expiredDate - new Date().getTime()) / 86400000)} days</span> */}
                    <span className="btn btn-warning btn-sm" style={{float: 'right'}}>expired at {user.expiredDate}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        )}
      </Consumer>
    )
  }
}