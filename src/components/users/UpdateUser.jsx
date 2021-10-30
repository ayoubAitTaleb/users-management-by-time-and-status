import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { Component } from 'react'
import { Consumer } from '../context/Context'

export default class UpdateUser extends Component {

  state = {fullName:'', activity: '', expiredDate: '', isActive: true}

  componentDidMount() {
    // return id from url
    const id = this.props.match.params.id
    // get user by id and update state
    axios.get(`http://localhost:3001/users/${id}`)
      .then(res => this.setState({
        fullName: res.data.fullName,
        activity: res.data.activity,
        expiredDate: res.data.expiredDate
      }))      
  }
  // you can change input value by onChangeInput method
  onChangeInput = (e) => {this.setState({[e.target.name]: e.target.value})}
  
  UpdateUser = (dispatch, e) => {
    e.preventDefault()
    const {fullName, activity, expiredDate, isActive} = this.state
    const UpdatedUser = {fullName, activity, expiredDate, isActive}
    const id = this.props.match.params.id
    axios.put(`http://localhost:3001/users/${id}`, UpdatedUser)
      .then(res => dispatch({
        type: 'UPDATE_USER',
        payload: res.data
      }))
      .catch(err => console.error(err))
      this.setState({fullName: '', activity: '', expiredDate: ''})
      this.props.history.push('/')
  }

  render() {

    const {id, fullName, activity, expiredDate} = this.state

  return(
  <Consumer>
      {value=>{
        const {dispatch} = value        
        return (
          <div className="col-md-6 m-auto">
            <h3 className="text-center">Update User</h3>
            <form className="form-group" onSubmit={this.UpdateUser.bind(this, dispatch)}>
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
                <button className="btn btn-sm btn-warning" type="submit">Update</button>
                <Link to={'/'} className="btn btn-sm btn-success" style={{marginLeft: '5px'}}>Cancel Update</Link>
              </div>
            </form>
          </div>
        )
      }}     
  </Consumer>
  )
  }
}
