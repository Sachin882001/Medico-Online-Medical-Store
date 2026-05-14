import React from 'react';
import '../admin/UserDetail.css';

const UserDetail = ({ users }) => {
  return (
    <div className="container mt-5">
      {/* Heading Section */}
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="display-4 text-primary font-weight-bold">All Users</h1>
      </div>

      {/* Table */}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>User ID</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {/* Construct the full name from firstName and lastName */}
                <td>{value.firstName ? `${value.firstName} ${value.lastName}` : 'N/A'}</td>
                <td>{value.email}</td>
                <td>{value.userId}</td>
                {/* Assuming the user has one role, use the first role's roleName */}
                <td>{value.roles && value.roles.length > 0 ? value.roles[0].roleName : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetail;
