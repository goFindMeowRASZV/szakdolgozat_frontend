import L from "leaflet";

const blueIcon = new L.Icon({
  iconUrl: "/icons/marker-icon-2x-blue.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const orangeIcon = new L.Icon({
  iconUrl: "/icons/marker-icon-2x-orange.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl: "/icons/marker-icon-2x-green.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "/icons/marker-icon-2x-red.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const statusIcons = {
  t: greenIcon,   // Talált
  k: redIcon,     // Keresett
  l: blueIcon,    // Látott
  m: orangeIcon,  // Menhely
};