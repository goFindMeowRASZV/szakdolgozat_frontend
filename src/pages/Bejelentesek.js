import React, { useEffect } from 'react';
import MacsCard from './MacsCard.js';
import useAuthContext from '../model/contexts/AuthContext.js';

function Bejelentesek() {
    const { macskaLISTA, getMacsCard } = useAuthContext();

    // Amikor a komponens betöltődik, lekérjük az adatokat
    useEffect(() => {
        getMacsCard();
    }, []);

    return (
        <div className='galeriaBody'>
        <h1 className="galeriaCim">GAZDIKERESŐ CICÁINK</h1>
        <div className="kepek">
            {macskaLISTA ? (
                macskaLISTA.map((elem, index) => (
                    <MacsCard adat={elem} key={index} index={index} />
                ))
            ) : (
                <p>Betöltés...</p>
            )}
        </div>
        </div>
    );
}

export default Bejelentesek;
