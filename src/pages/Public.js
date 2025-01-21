import React, {useContext} from 'react'
import useAuthContext from '../model/contexts/AuthContext'

function Public() {
    const {user}=useAuthContext();
    console.log(user)
  return (
    <div>
      {user ? (
        <p>Sikeres bejelentkezés!<br></br>
          <img 
            src="images/happy.gif" 
            alt="Sikeres bejelentkezés" 
            style={{
              height: "100%", 
              width: "100%",
            }}
          />
        </p>
      ) : (
        <p>Nincs bejelentkezett felhasználó!<br></br>
          <img 
            src="images/sad.gif" 
            alt="User kép" 
          />{" "}
          {user ? user.name : ""}
        </p>
      )}
    </div>
  )
}

export default Public
