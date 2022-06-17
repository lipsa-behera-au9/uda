import React from 'react';
import UpdateUser from './updateuser';

const Users = (props) => {
   
  if ( props.users.length === 0 ) {
    return (
      <span>No Matches</span>
    )
  } else {
    return props.users.map( (user, index) => {
      let date = new Date(user["Date of birth"]); 
      let dateInFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

      return (
        <div key={index} className="Result">
          <div className="Result-Text">
            <h4><i className="fas fa-hashtag"></i> {user.id} &nbsp;&nbsp; {user["Full Name"]}</h4>
            <span><i className="fas fa-envelope"></i> &nbsp;{user.Email}</span>
            <span><i className="fas fa-calendar-alt"></i> &nbsp;{dateInFormat}</span>
            <span><i className="fas fa-flag"></i> &nbsp;{user.Country}</span>        
          </div>
          <div className="Action-Buttons">

            <a
              type="button"
              data-toggle="modal"
              data-target="#updateUserModal"
              onClick={() => props.updateSingleUser(user, index)}
            >
              <span className="hide-small">Edit </span>
              <i className="fas fa-pen" onClick={() => props.updateSingleUser(user, index)}></i>
            </a>

            <UpdateUser 
              user={user}
              singleUser={props.singleUser}
              handleChange={props.handleChange}
              updateUser={props.updateUser}
              resetSingleUser={props.resetSingleUser}
            />

            &nbsp;&nbsp;
            <a
              className="btn-red" 
              onClick={ () => props.deleteUser(user.id, index)}>
              <span className="hide-small">Delete </span><i className="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      )       
    })
  }

}

export default Users;