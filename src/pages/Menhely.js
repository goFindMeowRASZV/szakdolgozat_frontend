import React, { useEffect } from 'react';
import MacsCard from '../components/MacsCard.js';
import useAuthContext from '../model/contexts/AuthContext.js';
import Szures from '../components/Szures.js';

function Menhely() {
    const { menhelyLISTA, getMacsCardMenhely } = useAuthContext();


    
    // Amikor a komponens betöltődik, lekérjük az adatokat
    useEffect(() => {
        getMacsCardMenhely();
    }, []);

    return (
        <div className='galeriaBody'>
            <Szures/>
        <h1 className="galeriaCim">GAZDIKERESŐ CICÁINK</h1>
        {/* <div className="kepek">
            {menhelyLISTA ? (
                menhelyLISTA.map((elem, index) => (
                    <MacsCard adat={elem} key={index} index={index} />
                ))
            ) : (
                <p>Betöltés...</p>
            )}
        </div> */}
        </div>
    );
}

export default Menhely;
