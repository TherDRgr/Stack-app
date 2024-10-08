import React from 'react';
import Buttons from './../Buttons';
import { FaAngleDown,  FaUserPlus } from 'react-icons/fa'
import { BsStack } from 'react-icons/bs'

function ChannelHeader({ handleOpen, channelName, membersNum }) {
    return (
        <div className='Channel-header-container'>
            <div className='btn-container'>
                <Buttons className={`btn-channel-title btn-rectangle-medium`} title='btn-channel-title'>
                    <span className='lock'><BsStack/></span>
                    <span className='channelname'>{channelName}</span>
                    <span className='chevrondown'><FaAngleDown/></span>
                </Buttons>
            </div>
            <div className='btn-container'onClick={handleOpen}>
                <Buttons className={`btn-channel-addUsers btn-rectangle-medium`} title='btn-channel-addUsers' >
                    <span className='icon-addmembers'><FaUserPlus /></span>
                    <span className='icon-membersNum'>{membersNum}</span>
                </Buttons>
            </div>
        </div>
    );
}

export default ChannelHeader;
