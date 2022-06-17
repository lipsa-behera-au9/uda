import React from "react";

const CreateUser = (props) => {
  return (
    <React.Fragment>
      
      <div
        className="modal fade"
        id="createUserModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title" id="exampleModalLabel">
                Create New User
              </span>
              <button type="button" className="close" data-dismiss="modal"
                onClick={props.resetSingleUser}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">

            <input
                type="text"
                className="input-box"
                placeholder="Id"
                name="id"
                value={props.singleUser.id}
                onChange={props.handleChange}
              /><br /><br />

              <input
                type="text"
                className="input-box"
                placeholder="Full Name"
                name="Full Name"
                value={props.singleUser["Full Name"]}
                onChange={props.handleChange}
              /><br /><br />
                           
              <input
                type="text"
                className="input-box"
                placeholder="Email ID"
                name="Email"
                value={props.singleUser.Email}
                onChange={props.handleChange}
              /><br /><br />

              <input
                type="text"
                className="input-box"
                placeholder="Date of birth"
                name="Date of birth"
                value={props.singleUser["Date of birth"]}
                onChange={props.handleChange}
              /><br /><br />

              <input
                type="text"
                className="input-box"
                placeholder="Country"
                name="Country"
                value={props.singleUser.Country}
                onChange={props.handleChange}
              /><br /><br />

            </div>

            <div className="modal-footer">
              <button
                type="button"
                data-dismiss="modal"
                onClick={props.handleChange}
                onClick={props.resetSingleUser}
              >
                Cancel <i className="fas fa-ban"></i>
              </button>
              <button
                type="button"
                data-dismiss="modal"
                onClick={props.createUser}
              >
                Save <i className="fas fa-save"></i>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateUser;
