import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

function LogoutDropdown({ handleClose }) {
  let navigate = useNavigate();

  const signout = () => {
    // Use SweetAlert2 to display a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      allowEscapeKey: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, clear session and perform logout
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
      }
    });
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="logout-avatar-dropdown">
        <ul>
          <li>Profile</li>
          <li>Preferences</li>
          <hr />
          <li onClick={signout}> 
            Sign out of Stack
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LogoutDropdown;
