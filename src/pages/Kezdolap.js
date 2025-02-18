import React, { useContext } from 'react'
import useAuthContext from '../model/contexts/AuthContext'


function Kezdolap() {
  const { user } = useAuthContext()
  console.log(user)

  return (
    <div>
      

      {user ? (
        <p>
          Sikeres bejelentkezés!<br />
        </p>
      ) : (
        <p>
          Nincs bejelentkezett felhasználó!<br />
          {user ? user.name : ''}
        </p>
      )}
    </div>
  )
}

export default Kezdolap
