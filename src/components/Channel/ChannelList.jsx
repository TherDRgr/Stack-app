import React from 'react'
import { AiOutlineNumber} from 'react-icons/ai'

function ChannelList({ name, index }) {

  return (
    <li key={index} title={name}>
      <AiOutlineNumber />
      <span>{name}</span>
    </li>
  )
}

export default ChannelList
