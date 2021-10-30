import axios from 'axios'
import React, { Component } from 'react'

const Context = React.createContext()
const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_USER':
      return {
        users: [action.payload, ...state.users]
      }
    case 'UPDATE_ACTIVE_USERS_LIST':
      return {
        users: state.users.map(user => user.id === action.payload.id ? user = action.payload : user)
      }
    case 'UPDATE_USER':
      return {
        users: state.users.map(user => user.id === action.payload.id ? user = action.payload : user)
      }
    case 'DELETE_USER':
      return{
        users: state.users.filter(user => user.id !== action.payload)
      }
  }
}
export class Provider extends Component {

  state = {
    users: [],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  componentWillMount() {
    axios.get(`http://localhost:3001/users`)
      .then(res => this.setState({users: res.data}))
      .catch(err => console.error(err))
  }
  render() {
    return (
      <div>
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      </div>
    )
  }
}

export const Consumer = Context.Consumer
