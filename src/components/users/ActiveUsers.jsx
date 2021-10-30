import axios from 'axios';
import React, { Component } from 'react'
import { Consumer } from '../context/Context'
export default class ActiveUsers extends Component {

  state = {fullName:'', activity: '', expiredDate: '', isActive: false}  
  removeUser = (id, dispatch) =>{
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
          value.users.filter(user => user.isActive === true).map(user => {
            const {dispatch} = value;
            const id = user.id
            return(
            <div className="my-1">
              <div className="card">
                <div className="card-body">
                  <div>
                    <h4 className="card-title d-inline">{user.fullName}</h4>
                    <button className="btn btn-danger btn-sm pull-right" style={{float: 'right'}} onClick={this.removeUser.bind(this, id, dispatch)}>remove</button>            
                  </div>
                  <div className="my-2">
                    <p className="card-text d-inline">{user.activity}</p>
                    <span className="btn btn-info btn-sm" style={{float: 'right'}}>expired at {user.expiredDate}</span>
                  </div>
                </div>
              </div>
              <div className="d-none">                
                { 
                setInterval(() => {
                //  check user timeStamps if === timeStamps now
                  if (1635508490 ==  Math.ceil(new Date().getTime()/1000)) {
                      // get old user and save it on state
                      axios.get(`http://localhost:3001/users/${id}`)
                        .then(res => this.setState({
                          fullName: res.data.fullName,
                          activity: res.data.activity,
                          expiredDate: res.data.expiredDate,
                        }))
                      // after 500 milsec save state on oldUser and put oldUser by put method to API
                      setTimeout(() => {
                        const oldUser = this.state
                        axios.put(`http://localhost:3001/users/${id}`, oldUser)
                          .then(res => dispatch({
                            type: 'UPDATE_ACTIVE_USERS_LIST',
                            payload: res.data
                          }))
                      }, 500);
                                            
                  }                    
                }, 1000)
              } 
              </div>
            </div>
          )
        })
        )}
      </Consumer>
    )
  }
}