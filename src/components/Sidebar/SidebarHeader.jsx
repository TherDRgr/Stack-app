import React from 'react'
import { TfiArrowCircleDown, TfiPlus } from 'react-icons/tfi'
import { Link, useParams } from 'react-router-dom'

const SidebarHeader = () => {
  // let navigate = useNavigate()
  let { uid } = useParams()
  return (
    <div className="sidebar-header">
      <button className="team-name-button">
        Avion Batch 29 <TfiArrowCircleDown />
      </button>

      <Link to={`${uid}/new-message`}>
        <div className="compose-button">
          <TfiPlus />
        </div>
      </Link>
    </div>
  )
}

export default SidebarHeader
