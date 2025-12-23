import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl;

export const pickupIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [42,42],
    iconAnchor: [16,32]
})

export const dropIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [42, 42],
  iconAnchor: [16, 32],
})