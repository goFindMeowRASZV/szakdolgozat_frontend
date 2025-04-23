import React, { useContext, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import styles from "../Fonts.module.css";
import Slideshow from "../components/Slideshow";


function Kezdolap() {

  const { user } = useAuthContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
    const headers = document.querySelectorAll(".f-accordian-toggle");
  
    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const parent = header.closest(".f-accordian-dropdown");
        const currentlyActive = document.querySelector(".f-accordian-dropdown.active");
  
        if (currentlyActive && currentlyActive !== parent) {
          currentlyActive.classList.remove("active");
          currentlyActive.querySelector(".f-accordian-list").style.maxHeight = null;
        }
  
        const content = parent.querySelector(".f-accordian-list");
  
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
          content.style.maxHeight = null;
        } else {
          parent.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  },0);
  
  return () => clearTimeout(timeout);

  }, []);
  

  return (
    <div className="kezdolap">
      <section className="wallpaper">
        <h1 className={styles.focim}>GoFindMeow</h1>
        <img
          className="wallpaperPhoto"
          src="images/KezdolapKep.png"
          alt="Wallpaper image"
        />
      </section>
      <section className="sec">
        <div className="bekezdes">
          {user ? <h2>Szia {user.name}!</h2> : <h2>Szia!</h2>}
          <p>
            Alapítványunk célja, hogy segítse a bajba jutott, elhagyott és
            sérült cicák új otthonra találását. Munkánk során fontos számunkra,
            hogy a cicáknak ne csak menedéket, hanem szeretetteljes, örök
            otthont biztosítsunk. Örömmel dolgozunk együtt önkéntesekkel,
            állatorvosokkal és helyi közösségekkel annak érdekében, hogy a
            lehető legjobb ellátást biztosítsuk a rászoruló macskák számára.
            Képesek vagyunk megmenteni a cicákat, és új esélyt adni nekik,
            köszönhetően a támogatóinknak és az embereknek, akik segítenek
            nekünk az adományokkal és önkéntes munkájukkal.
          </p>
        </div>
        <img
          className="wallpaperPhoto2"
          src="images/cica1.png"
          alt="Wallpaper image"
        />
      </section>
      <section className="sec2">
        <img
          className="wallpaperPhoto2"
          src="images/emailKep3.jpg"
          alt="Wallpaper image"
        />
        <div className="bekezdes">
          <p>
            Csatlakozz te is a küldetésünkhöz! Ha szeretnél többet megtudni a
            mentett cicákról, fogadj örökbe egy cicát, vagy szeretnél segíteni
            az alapítvány munkájában, nézd meg az oldalunk többi részét. Akár
            adományozhatsz, akár önkénteskedhetsz, minden segítség számít, és
            hatalmas különbséget jelenthet a kis macskák életében. Köszönjük,
            hogy támogatod a cicákat és hozzájárulsz ahhoz, hogy minden mentett
            cica biztonságban, szeretetben és boldogan élhesse életét!
          </p>
        </div>
      </section>

      <Slideshow />

      <section className="faq-section" style={{ opacity: 100 }}>
  <div className="faq-content">
    <h1>
      Gyakori kérdések <br />
      Itt megtalálod a válaszokat!
    </h1>

    <div className="faq-items">
      {/* 1. Kérdés */}
      <div className="f-accordian-dropdown w-dropdown">
        <div className="f-accordian-toggle w-dropdown-toggle">
          <div className="f-accordian-title-wrapper">
            <div className="f-accordian-title">Mi az a GoFindMeow?</div>
          </div>
          <div className="f-accordian-icon w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15L8 11h8l-4 4z" fill="currentColor"/></svg>
          </div>
        </div>
        <nav className="f-accordian-list w-dropdown-list">
          <div className="f-accordian-content">
            <p className="f-paragraph-small-3">
              A GoFindMeow egy olyan webes platform, amelynek célja az elveszett, talált és menhelyi cicák adatainak nyilvántartása, bejelentése, valamint az örökbefogadás elősegítése.
            </p>
          </div>
        </nav>
      </div>

      {/* 2. Kérdés */}
      <div className="f-accordian-dropdown w-dropdown">
        <div className="f-accordian-toggle w-dropdown-toggle">
          <div className="f-accordian-title-wrapper">
            <div className="f-accordian-title">Hogyan lehet cicát bejelenteni?</div>
          </div>
          <div className="f-accordian-icon w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15L8 11h8l-4 4z" fill="currentColor"/></svg>
          </div>
        </div>
        <nav className="f-accordian-list w-dropdown-list">
          <div className="f-accordian-content">
            <p className="f-paragraph-small-3">
              A Bejelentés oldalon egy űrlap segítségével megadható a cica állapota, színe, mintázata, és egyéb fontos információk. A rendszer kötelezően kér képet is, és elvégzi az adatok validációját.
            </p>
          </div>
        </nav>
      </div>

      {/* 3. Kérdés */}
      <div className="f-accordian-dropdown w-dropdown">
        <div className="f-accordian-toggle w-dropdown-toggle">
          <div className="f-accordian-title-wrapper">
            <div className="f-accordian-title">Ki tud módosítani egy bejelentést?</div>
          </div>
          <div className="f-accordian-icon w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15L8 11h8l-4 4z" fill="currentColor"/></svg>
          </div>
        </div>
        <nav className="f-accordian-list w-dropdown-list">
          <div className="f-accordian-content">
            <p className="f-paragraph-small-3">
              A bejelentéseket csak az adminok és a staff tagok módosíthatják, a felhasználók kizárólag a saját bejelentéseiket tudják szerkeszteni.
            </p>
          </div>
        </nav>
      </div>

      {/* 4. Kérdés */}
      <div className="f-accordian-dropdown w-dropdown">
        <div className="f-accordian-toggle w-dropdown-toggle">
          <div className="f-accordian-title-wrapper">
            <div className="f-accordian-title">Hogyan működik az örökbefogadás?</div>
          </div>
          <div className="f-accordian-icon w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15L8 11h8l-4 4z" fill="currentColor"/></svg>
          </div>
        </div>
        <nav className="f-accordian-list w-dropdown-list">
          <div className="f-accordian-content">
            <p className="f-paragraph-small-3">
              A menhelyi macskáknál megjelenik egy „Örökbefogadom” gomb, amelyre kattintva megadható egy bemutatkozó szöveg. Ez e-mailben kerül továbbításra az adminoknak, és az örökbeadás admin felületen történik meg.
            </p>
          </div>
        </nav>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}

export default Kezdolap;
