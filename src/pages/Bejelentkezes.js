import React, {useState, useContext} from 'react'
import AuthContext from '../model/contexts/AuthContext';

function Bejelentkezes() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const {bejelentkezes_fv}=useContext(AuthContext)

    function handleSubmit(e){
        e.preventDefault();
        console.log("katt");
        const adat={
            email:email,
            password:password

        }
        console.log(adat);
        bejelentkezes_fv(adat)
    }

    return (
        <div className="m-auto" style={{maxWidth: "400px"}}>
            <h1 className="text-center">Bejelentkezés</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}>
         </input>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label">Jelszó</label>
          <input type="password" className="form-control" id="password" placeholder="Jelszó" value={password} onChange={(e)=>{setPassword(e.target.value)}}>
         </input>
        </div>
        <button type="submit" class="btn btn-dark">Bejelentkezés</button>
        </form>
        </div>
    )
}

export default Bejelentkezes