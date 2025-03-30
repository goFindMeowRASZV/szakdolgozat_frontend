import React, { useContext } from 'react'
import useAuthContext from '../contexts/AuthContext'
import styles from '../Fonts.module.css';

function Kezdolap() {
  const { user } = useAuthContext()
  console.log("Bejelentkezett felhasználó: "+user)

  return (
    <div className='wallpaper'>
      <h1 className={styles.aesthetic}>GoFindMeow</h1>
      <img className="wallpaperPhoto" src="images/KezdolapKep.png" alt="Wallpaper image"/>
      <div className='kezdolapFelezett'>
        <div className='bekezdes'>
        <h2>Szia!</h2>
        <p>Alapítványunk célja, hogy segítse a bajba jutott, elhagyott és sérült cicák új otthonra találását. Munkánk során fontos számunkra, hogy a cicáknak ne csak menedéket, hanem szeretetteljes, örök otthont biztosítsunk. Örömmel dolgozunk együtt önkéntesekkel, állatorvosokkal és helyi közösségekkel annak érdekében, hogy a lehető legjobb ellátást biztosítsuk a rászoruló macskák számára. Képesek vagyunk megmenteni a cicákat, és új esélyt adni nekik, köszönhetően a támogatóinknak és az embereknek, akik segítenek nekünk az adományokkal és önkéntes munkájukkal.
        </p>
        <p>Csatlakozz te is a küldetésünkhöz! Ha szeretnél többet megtudni a mentett cicákról, fogadj örökbe egy cicát, vagy szeretnél segíteni az alapítvány munkájában, nézd meg az oldalunk többi részét. Akár adományozhatsz, akár önkénteskedhetsz, minden segítség számít, és hatalmas különbséget jelenthet a kis macskák életében. Köszönjük, hogy támogatod a cicákat és hozzájárulsz ahhoz, hogy minden mentett cica biztonságban, szeretetben és boldogan élhesse életét!</p>
        </div>
        <img className="wallpaperPhoto2" src="images/cica1.png" alt="Wallpaper image"/>
      </div>
    </div>
  )
}

export default Kezdolap
