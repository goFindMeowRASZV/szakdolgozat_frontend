import React, {useContext} from 'react'
import AuthContext from '../model/contexts/AuthContext'

function Public() {
    const {user}=useContext(AuthContext)
    console.log(user)
  return (
    <div>
        <h1>Kezdőlap</h1>
        <p>{user ? user.name : "Nincs bejelentkezett felhasználó"}</p>
    </div>
  )
}

export default Public