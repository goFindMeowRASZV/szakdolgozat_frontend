import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Az alapértelmezett marker ikont állítjuk be
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


function Terkep() {
    // A térkép középpontja és a zoom szintje
    const position = [47.4979, 19.0402]  // Itt a lat, long koordináták
    const zoom = 13
  return (
    <div>
      <h1>Térkép</h1>
      <div style={{ height: '400px', width: '100%' }}>
        {/* Leaflet térkép */}
        <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Fekete-fehér cica
              <img 
                  src="https://i.pinimg.com/474x/35/25/3f/35253f64facc999e781f9d679feb1841.jpg" 
                  alt="Kép leírása" 
                  style={{ width: '100%', height: 'auto' }}
                />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default Terkep