import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'

const ProfilePage = () => {
    const { user } = useContext(UserContext)
    return (
        <div>
            Mi Perfil,
            Hola: {user.displayName}
        </div>
    )
}

export default ProfilePage
