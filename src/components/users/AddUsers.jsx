import axios from 'axios'
import React, { Component } from 'react'
import { Consumer } from '../context/Context'

export default class AddUsers extends Component {

  state = {fullName:'', activity: '', expiredDate: '', isActive: true}

  onChangeInput = (e) => {this.setState({[e.target.name]: e.target.value})}
  
  addUser = (dispatch, e) => {
    e.preventDefault()
    const {fullName, activity, expiredDate, isActive} = this.state
    const newUser = {fullName, activity, expiredDate, isActive}
    axios.post('http://localhost:3001/users', newUser)
      .then(res => dispatch({
        type: 'ADD_USER',
        payload: newUser
      }))
      .catch(err => console.error(err))
      this.setState({fullName:'', activity: '', expired_at: ''})
      this.props.history.push('/')
  }

  render() {

    const {fullName, activity, expiredDate} = this.state

  return(
  <Consumer>
      {value=>{
        const {dispatch} = value        
        return (
          <div className="col-md-6 m-auto">
            <h3 className="text-center">Add User</h3>
            <form className="form-group" onSubmit={this.addUser.bind(this, dispatch)}>
              <div>
                <label>Full Name</label>
                <input className="form-control" name="fullName" type="text"  onChange={this.onChangeInput} value={fullName} required/>
              </div>
              <div>
                <label>Activity</label>
                <select className="form-select" name="activity" value={activity} onChange={this.onChangeInput} required>
                  <option value="non">Choose...</option>
                  <option value="yuga">yuga</option>
                  <option value="kung-fu">kung-fu</option>
                  <option value="karate">karate</option>
                </select>
              </div>
              <div>
                <label>Expired Date</label>
                <input className="form-control" name="expiredDate" type="date" onChange={this.onChangeInput} value={expiredDate} required/>
              </div>
              <div className="text-center my-2">
                <button className="btn btn-sm btn-primary" type="submit">Save</button>
              </div>
            </form>
          </div>
        )
      }}     
  </Consumer>
  )
  }
}
