import React, { useState } from 'react'

const StatusToggler = ({users}) => {

    const [usersStatus, setUsersStatus] = useState(users.map(u => ({ name: u, status: 'Online' })));


    const changeStatus = (i) => {
        setUsersStatus(prev => prev.map((user, idx) => idx !== i ? user : { ...user, status: user.status === 'Online' ? 'Offline' : 'Online' }));
    }

    return <ul>
        {
            usersStatus.map((us, i) => <li key={`${i}-${us.name}`} >
                {us.name} - {us.status} <button onClick={() => changeStatus(i)} >Change</button>
            </li>)
        }
    </ul>
}

export default StatusToggler;