import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { FaUserAstronaut } from 'react-icons/fa'

const MessagesHeader = ({ messageGroupName }) => {
  return (
    <div className="messages-container-header">
      <FaUserAstronaut/>
      <button className="messages-receiver-button">
        {messageGroupName}
        <FiChevronDown />
      </button>
    </div>
  )
}

export default MessagesHeader
