import React, { useContext } from 'react'

import MacsCard from './MacsCard.js'
import useAuthContext from '../model/contexts/AuthContext.js'

function Bejelentesek(props) {
    const { macskaLISTA } = useContext(useAuthContext)
    return (
        <div>
            {
                macskaLISTA.map((elem, index) => {
                    return (<MacsCard adat={elem} key={index} index={index} />)
                })
            }
        </div>
    )
}

export default Bejelentesek