import React, { Component } from 'react';
import Paginate from './paginate';
import Users from './users';
import CreateUser from './createuser';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [{id: "testing"}],
      pageLimit: 1000,
      currentPage: 0,
      filter: 'Full Name',
      singleUser: {
        "Full Name": "",
        "Country": "",
        "id": "",
        "Date of birth": "",
        "Email": "",
        "Created at": "",
        "index": ""
      }
    };   
    this.getSearchResult = this.getSearchResult.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.refreshUserList = this.refreshUserList.bind(this);   
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);   
    this.updateUser = this.updateUser.bind(this);
    this.updateSingleUser = this.updateSingleUser.bind(this);
    this.resetSingleUser = this.resetSingleUser.bind(this);
  }


  resetSingleUser () {
    console.log('reset single user is called!!');
    this.setState({
      singleUser: {
        "Full Name": "",
        "Country": "",
        "id": "",
        "Date of birth": "",
        "Email": "",
        "Created at": "",
        "index": ""
      }
    });
  }

  updateSingleUser (user, index) {
    console.log(`id: ${user.id}`);
    console.log(`Full Name: ${user['Full Name']}`);
    console.log(`Email: ${user.Email}`);
    console.log(`Country: ${user.Country}`);
    console.log(`Date of birth: ${user["Date of birth"]}`);

    this.setState({
      singleUser: {
        ...user,
        "index": index,
      }
    });
  }


  updateUser () {

    let url = "http://localhost:3001/users/" + this.state.singleUser.id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singleUser)
    })
    .then( () => {
      const users = Object.assign( [], this.state.users );
      users[this.state.singleUser.index] = Object.assign( [], this.state.singleUser );
      this.setState( {users: users} );
    })
    .then( () => {
      this.setState({
        singleUser: {
          "Full Name": "",
          "Country": "",
          "id": "",
          "Date of birth": "",
          "Email": "",
          "Created at": "",
          "index": ""
        }
      });
    });
  }


  handleChange (event) {
    let { name, value } = event.target;
    this.setState({
      singleUser: {
        ...this.state.singleUser,
        [name]: value,
      }
    });
  }

  
  getUsers (parameter, increase) {
    let url = "http://localhost:3001/users?" + parameter;
  
    fetch(url)
    .then( resp => resp.json() )
    .then( data => {
      this.setState({
        users: data,
        currentPage: this.state.currentPage + increase
      });
    })
    .catch( () => {
      let message = (<span>Something Went Wrong.</span>)
      this.setState({
        users: message
      });
    }); 
  }

  componentDidMount () {
    this.getUsers("_start=0&_end=10", 0);
  }

  getSearchResult (e) {
    if ( e.keyCode === 13 ) {
      if ( e.target.value === "" ) {
        this.getUsers("_start=0&_end=10", 0);
      } else {
        this.getUsers(`${this.state.filter}_like=${e.target.value}`, 0);
      }
    }
  }

  updateFilter (e) {
    this.setState({
      filter: e.target.value
    });
  }

  deleteUser ( id, index ) {
    let url = "http://localhost:3001/users/" + id;
    fetch( url, { method: 'DELETE' } )
    .then( () => {
      const users = Object.assign( [], this.state.users );
      users.splice( index, 1 );
      this.setState( {users: users} );
    })
  }
  

  refreshUserList () {
    this.setState({currentPage: 0});
    this.getUsers("_start=0&_end=10", 0);
  }


  createUser () {
    fetch("http://localhost:3001/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singleUser)
    })
    .then(response => response.json())
    .then( () => {
      this.setState({
        singleUser: {
          "Full Name": "",
          "Country": "",
          "id": "",
          "Date of birth": "",
          "Email": "",
          "Created at": "",
          "index": ""
        }
      })
    })
    .catch(error => console.error("Error: ", error));

  }


  render() {
    return (
      <div className="App">


        <div className="App-Header">        
          <h2>User Directory Application</h2>
          <div>

            <a onClick={ () => this.refreshUserList()}>
              Refresh <i className="fas fa-sync-alt"></i>
            </a>

            <a
              type="button"
              data-toggle="modal"
              data-target="#createUserModal"
            >
              Create <i className="fas fa-user-plus"
                onClick={() => this.resetSingleUser}
              ></i>
            </a>

            <CreateUser 
              singleUser={this.state.singleUser}
              handleChange={this.handleChange}
              createUser={this.createUser}
              resetSingleUser={this.resetSingleUser}
            />

          </div>
        </div>
        

        <div className="search-section">

          <select id="cars" name="cars" className="filter" onChange={this.updateFilter}>
            <option value="Full Name">Name</option>
            <option value="Country">Country</option>
            <option value="Date of birth">Year of Birth</option>
          </select>

          <input type="text" 
            id="search-field" 
            name="search" 
            placeholder="Search" 
            className="search"
            onKeyDown={this.getSearchResult}>
          </input>

        </div>


        <Paginate 
          getUsers={this.getUsers} 
          currentPage={this.state.currentPage}
          pageLimit={this.state.pageLimit}
        />


        <div className="Results">
          <Users 
            users={this.state.users}
            singleUser={this.state.singleUser}
            deleteUser={this.deleteUser}
            updateUser={this.updateUser}
            handleChange={this.handleChange}
            updateSingleUser={this.updateSingleUser}
            resetSingleUser={this.resetSingleUser}
          />
        </div>


        <Paginate 
          getUsers={this.getUsers} 
          currentPage={this.state.currentPage}
          pageLimit={this.state.pageLimit}
        />

      </div>
    );
  }
}

export default App;



// Reference
// https://medium.com/weekly-webtips/use-react-with-json-server-and-create-simple-crud-app-b2bf58cd4558
// https://codesandbox.io/s/react-using-json-server-3uupl