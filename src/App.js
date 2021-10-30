import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/layouts/NavBar';
import { Provider } from './components/context/Context';
import ActiveUsers from './components/users/ActiveUsers';
import AddUsers from './components/users/AddUsers';
import DisabledUsers from './components/users/DisabledUsers';
import UpdateUser from './components/users/UpdateUser';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
        <NavBar />
        <div className="container">
          <h1 className="text-center my-2">Life Fitness</h1>
          <Switch>
            <Route exact path={'/users/add'} component={AddUsers}/>
            <Route exact path={'/users/update/:id'} component={UpdateUser}/>
          </Switch>
          <div className="row mt-6 col-md-12 m-auto">
            <div className="col-md-6">
            <h4 className="text-center">Active users</h4>
              <ActiveUsers/>
            </div>
            <div className="col-md-6">
            <h4 className="text-center">Disabled users</h4>
              <DisabledUsers/>
            </div>
          </div>  
        </div> 
        </BrowserRouter>
      </Provider>     
    </div>
  )
}
export default App;
