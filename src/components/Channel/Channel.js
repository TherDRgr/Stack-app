import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { channelsGet, channelDetailsGet, channelAddMember } from '../../api/api-channels'
import { getAllUsers } from '../../api/api-users'
import { getUserObject } from '../Users/getUserObject'
import { FindMembers } from '../../forms/Channels/ChannelSearchBars'
import { FaUserAstronaut } from 'react-icons/fa'
import ChannelHeader from './ChannelHeader'
import Messages from '../Messages/Messages'
import Modals from '../Modals'
import Buttons from '../Buttons'
import { BsStar, BsBell, BsChevronDown, BsTelephone, BsPersonAdd} from "react-icons/bs";
import Swal from 'sweetalert2';


function Channel({ }) {
  let { channelId } = useParams();
  const [channels, setChannels] = useState()
  const [channelid, setchannelid] = useState('')
  const [channelName, setChannelName] = useState()
  const [isAddMembersModalOpen, setAddMembersModalOpen] = useState(null)
  const [isAddModalOpen, setAddModalOpen] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [currentMembers, setCurrentMembers] = useState([])
  const [memberIds, setMemberIds] = useState([])
  const [addedUsers] = useState([])

  
  // create function to identify channel name
  const getChannelName = (arr, id) => {
    let filteredArr = arr.filter(arr => arr.id === id)
    let channelname = filteredArr[0].name
    setChannelName(channelname);
  }

  // create function to get current member ids
  const getCurrMemberIds = arr => {
    let ids = arr.map(member => member.user_id)
    setMemberIds(ids);
    return ids
  }
  
  // create function to add members 
  const addMember = (member_id) => {
    let id = parseInt(channelId);
    channelAddMember({ id, member_id })
      .then(() => {
        setAddModalOpen(false);
        setAddMembersModalOpen(false);
        Swal.fire({
          icon: 'success',
          title: 'Member Added!',
          text: 'The member has been added successfully.',
        });
        window.location.reload();
      })
      .catch((error) => {
        // Handle the error appropriately, e.g., show an error message to the user
        console.error("Error adding member:", error);
      });
  }
  

  // create function to display current members upon modal open
  let members
  let currList = []

  const dispMembers = () => {
    members = memberIds;
    members.map(member => {
      let memberObj = getUserObject(member)
      memberObj.then(obj => {
        currList.push(obj);
        return currList
      })
      .then(currList => {
        if(currList.length === memberIds.length) {
          setCurrentMembers(currList);
          console.log(currList);
          console.log(currentMembers);
          return;
        }
      })
      .catch(err => console.log(err))
    })
  }
  
  // Open modal to add members and get current channel details
  const handleOpenAddMembers = () => {
    setAddMembersModalOpen(true);
    dispMembers();
  }

  // Close modal to add members
  const handleCloseAddMembers = () => {
    setAddMembersModalOpen(false)
  }

  // Open modal to search and add members
  const handleOpen = () => {
    setAddModalOpen(true);
  }

  // Close modal to search and add members
  const handleClose = () => {
    setAddModalOpen(false);
  }
  
  useEffect(() => {
    // Set user headers after login
    let userDetails = JSON.parse(sessionStorage.getItem('userLoggedInDetails'))

    const headers = {
      token: userDetails['access-token'],
      client: userDetails.client,
      expiry: userDetails.expiry,
      uid: userDetails.uid,
    }

    // set argument for channelDetailsGet function
    const arg = {
      channelId,
      headers 
    }

    // Get all channels
    channelsGet(headers)
      .then((response) => {
        let channelObj = response.data.data
        setChannels(channelObj);
        return channelObj
      })
      .then(channelObj => {
        if(channelId) {
          let id = parseInt(channelId);
          getChannelName(channelObj, id);
          setchannelid(id);
        }
      })
      .catch((err) => console.log(err))

     // get current list of channel members
    channelDetailsGet(arg)
      .then(result => {
        let members = result.data.data.channel_members
        setCurrentMembers(members);
        return members
      })
      .then(members => getCurrMemberIds(members))
      .catch((err) => console.log(err))

    // get list of all users
    getAllUsers()
    .then(response => {
      let users = response.data.data
      setAllUsers(users);
      })
    .catch((error) => error)
  }, [channelId, members])

  return (
    <div>
      <Messages
        displayHeader={
          <ChannelHeader handleOpen={handleOpenAddMembers} 
          channelName={channelName}
          membersNum={memberIds.length}/>
        }
        receiverClass="Channel"
        receiverID={channelId}
      />

       {/* Modal for channel details and add members */}
       {isAddMembersModalOpen && (
        <Modals modalTitle={`#${channelName}`} handleClose={handleCloseAddMembers} btnText='Done'>
          <div className='modal-addmembers-buttons'>
            <Buttons className='favorite' title='favorite'>
              <BsStar />
            </Buttons>
            <Buttons className='notificications' title='notifications'>
              <span><BsBell /></span>
              Get Notifications for All Messages
              <span><BsChevronDown /></span>
            </Buttons>
            <Buttons className='call' title='call'>
              <span><BsTelephone /></span>
              Start a Call
            </Buttons>
          </div>
          <div className='modal-addmembers-sections'>
            <ul>
              <li>About</li>
              <li>Members</li>
              <li>Integrations</li>
              <li>Settings</li>
            </ul>
          </div>
          <hr className='hr-addmembers'/>
          <FindMembers list={currentMembers}/>
          <div className='addmembers-btn' onClick={handleOpen}>
            <Buttons className='addmembers-btn-icon' title='addmembers-btn-icon'>
              <BsPersonAdd size={24}/>
            </Buttons>
            <div className='addmembers-btn-text'>Add People</div>
          </div>
          <div className='addmembers-currmembers-list'>
            {currentMembers && currentMembers.map(member => {
              return (
                <div className='currmembers-container' key={member.id}>
                  <FaUserAstronaut size={32} color='#006685'/>
                  <span className='email'> {member.email} </span>
                </div>
              )
            })}
          </div>
        </Modals>
      )}

      {/* Modal for search and adding members */}
      {isAddModalOpen && (
        <Modals className='modal-searchaddmember'
        modalTitle='Add people' 
        modalSubtitle={`#${channelName}`} 
        handleClose={handleClose}>
          <FindMembers list={allUsers} addMember={addMember} />
          <div className='usersToBeAdded'>
            {addedUsers && addedUsers.map(user => {
              <div className='filteredUserItems' key={user.id}>
                <FaUserAstronaut size={32} color='#006685'/>
                <span>{user.email} </span>
              </div>
            })}
          </div>
        </Modals>
      )}
    </div>
  )
}

export default Channel
