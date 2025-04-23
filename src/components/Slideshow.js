import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SikerModal from "./SikerModal";
import { useState } from "react";

function Slideshow() {
  const data = [
    {
      title: "Lilla & Mogyoró",
      text1: "„Ő mentett meg engem, nem fordítva.”",
      text2:"Lilla a pandémia után még mindig nehezen találta a helyét a világban. Egyik este a GoFindMeow oldalt böngészve meglátta Mogyorót – egy háromlábú, balesetet szenvedett cicát, akinek félénk tekintete rögtön megfogta. Az örökbefogadás után Mogyoró szinte azonnal odabújt hozzá, és minden nap együtt töltik.",
      text3:"„Sokan azt mondják, mi mentettük meg a cicát, de én tudom, hogy Mogyoró mentett meg engem. Ő tanított újra bízni, szeretni és érezni, hogy szükség van rám.”",
      img: "/images/siker/s1/s11.jpg",
      img2: "/images/siker/s1/s12.jpg",
      img3: "/images/siker/s1/s13.jpg",
     
    },
    {
      title: "Máté & Nox",
      text1: "„Nox megmutatta, hogy a törődés tanulható – és hogy a szeretet gyógyít.”",
      text2:"Máté régóta küzdött azzal, hogy nem érez kötődést semmihez – aztán a GoFindMeow oldalán megakadt a szeme Noxon, egy korábban bántalmazott, szürke kandúron. Az első találkozásuk néma volt, Nox csak a sarokból nézte. De Máté nem adta fel. Ma már Nox úgy dörgölőzik hozzá, mintha mindig is mellette élt volna.",
      text3:"„Azt hittem, én leszek az, aki megtanítja, hogy lehet újra bízni. Ehelyett ő tanított meg arra, hogy én is képes vagyok gondoskodni – és érezni.”",
      img: "/images/siker/s2/s21.jpg",
      img2: "/images/siker/s2/s22.jpg",
      img3: "/images/siker/s2/s23.jpg",
   
    },
    {
      title: "Dóri & Mazsola",
      text1: "„A szívem mélyén tudtam, hogy nekem ő kell – és talán neki is én.”",
      text2:"Dóri épp egy új életet kezdett egy ismeretlen városban, amikor a GoFindMeow oldalán rátalált Mazsolára – egy vörös, hangos kiscicára, aki nem maradt meg senkinél sokáig. Valamiért mégis úgy érezte, meg kell próbálnia. Azóta Mazsola reggelente az arcához bújik, és este a lábánál alszik.",
      text3:" „Mazsola nemcsak társam lett, hanem tükröm is. Minden nap emlékeztet rá, hogy a szeretet nem mindig egyszerű, de mindig megéri.”",    
      img: "/images/siker/s3/s31.jpg",
      img2: "/images/siker/s3/s32.jpg",
      img3: "/images/siker/s3/s33.jpg",
  
    },
    {
     title: "Ádám & Csipesz",
      text1: "„Az életem szürke volt. Aztán jött Csipesz – és színt hozott minden napomba.”",
      text2:"Ádám korábban visszahúzódó volt, és nem gondolta, hogy egy cica ennyire megváltoztathatja a mindennapjait. A GoFindMeow-on pillantotta meg Csipeszt, egy apró, foltos kóbor cicát, akinek a bundája szinte világított a képeken. A cica bizalmatlan volt, de napok alatt megnyílt, és azóta árnyékként követi őt.",
      text3:" „Nem egy háziállatot kerestem. Valakit kerestem, aki miatt reggel fel akarok kelni. Csipesz lett ez a valaki.”",    
      img: "/images/siker/s4/s42.jpg",
      img2: "/images/siker/s4/s41.jpg",
      img3: "/images/siker/s4/s43.jpg",
  
  
    },
  
  ];
  
   const [selectedStory, setSelectedStory] = useState(null); 
  return (
    <section className="w-full py-8 px-4 bg-gradient-to-b from-white to-black-50">
      <h2 className="text-2xl font-bold text-center mb-6">
        Sikertörténeteink
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col items-start" onClick={() => setSelectedStory(item)}>
              <img
                src={item.img}
                alt={item.title}
                className="skep"
              />
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <SikerModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </section>
  );
}

export default Slideshow;
