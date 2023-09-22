import React from 'react'
import { FaUserAstronaut } from 'react-icons/fa'

const Message = ({ sender, time, body }) => {
  return (
    <div className="message-container">
      <div className="avatar">
      <FaUserAstronaut size={32} color='#006685'/>
      </div>
      <div className="message-details-container">
        <div className="message-headers">
          <p className="message-details-sender">{sender}</p>
          <p className="message-details-time">{time}</p>
        </div>
        <pre className="message-details-body">{body}</pre>
      </div>
    </div>
  )
}

export default Message
