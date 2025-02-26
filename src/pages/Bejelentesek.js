import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../model/contexts/AuthContext.js';
import MacsCard from '../components/MacsCard.js';


function Bejelentesek() {
    const { macskaLISTA, getMacsCard } = useAuthContext();
    const navigate = useNavigate();
    const { setAktualisMacska } = useAuthContext()

    // Amikor a komponens betöltődik, lekérjük az adatokat
    useEffect(() => {
        getMacsCard();
    }, []);

    const handleCardClick = (elem) => {
        navigate(`/MacskaProfil`);
        setAktualisMacska(elem);
        console.log(elem)
    };

    return (
        <div className='galeriaBody'>
        <h1 className="galeriaCim" style={{ paddingTop:'60px' }}>BEJELENTÉSEK</h1>
            <div className="kepek">
                {macskaLISTA ? (
                    macskaLISTA.map((elem, index) => (
                        <div key={index} onClick={() => handleCardClick(elem)} style={{ cursor: 'pointer' }}>
                            <MacsCard adat={elem} index={index} />
                        </div>
                    ))
                ) : (
                    <p>Betöltés...</p>
                )}
            </div>
        </div>
    );
}

export default Bejelentesek;
