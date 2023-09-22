import React, { useState, useMemo } from 'react';
import { FaSearch, FaUserAstronaut  } from 'react-icons/fa';


export function FindMembers({ list, addMember }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useMemo(() => {
    if (!searchInput) {
      setFilteredUsers([]);
      return;
    }

    const filteredList = list.filter(user =>
      user.uid.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredUsers(filteredList);
  }, [searchInput, list]);

  return (
    <div className='findmembers-search'>
      <div className='findmembers-search-input'>
        <div className='search-icon'>
          <FaSearch />
        </div>
        <input
          className='input-findmembers'
          value={searchInput}
          type="text"
          placeholder='Find members'
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>
      {/* Render filtered users */}
      {filteredUsers.length > 0 && (
        <div className="userlist">
          {filteredUsers.map((user) => (
            <div className='filtered-container' key={user.id} id={user.id}>
              <FaUserAstronaut size={32} color='#006685'onClick={() => addMember(user.id)} // Pass user ID to addMember function
                id={user.id}/>
              <span
                className='email'
                onClick={() => addMember(user.id)} // Pass user ID to addMember function
                id={user.id}
              >
                {user.email}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
