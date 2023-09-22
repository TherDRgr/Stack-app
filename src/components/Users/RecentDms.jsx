import { useState, useEffect } from 'react'
import { getRecentDms } from '../../api/api-users'
import { NavLink, useParams } from 'react-router-dom'
import { FaUserAstronaut } from 'react-icons/fa'

const RecentDms = () => {
  const [recentDms, setRecentDms] = useState([])
  const params = useParams()

  useEffect(() => {
    getRecentDms()
      .then((data) => setRecentDms(data.data.data))
      .catch((err) => console.log('Fetch Interacted Users Error: ', err))
  }, [])

  const userIds = recentDms.map((user) => user.id)

  const filteredUsers = recentDms.filter(({ id }, index) => {
    return !userIds.includes(id, index + 1)
  })

  const renderUsersList = filteredUsers
    ? filteredUsers.map((user, index) => {
        const { email, id } = user
        return (
          <li
            className={params.id === user.id ? 'nav-select' : null}
            key={index}
          >
            <FaUserAstronaut/>
            <div className="online-status-on"></div>
            <NavLink to={`/${params.uid}/messages/${id}`} key={index}>
              <span>{email}</span>
            </NavLink>
          </li>
        )
      })
    : null

  return <ul className="direct-messages">{renderUsersList}</ul>
}
export default RecentDms
