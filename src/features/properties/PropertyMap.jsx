import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

function PropertyMap({ latitude, longitude, location }) {
  if (latitude == null || longitude == null) {
    return (
      <div className="mt-5 flex min-h-[220px] items-center justify-center rounded-3xl border border-neutral-200 bg-[#eeece6]">
        <div className="text-center">
          <p className="text-sm font-semibold text-neutral-800">
            Map location unavailable
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            We couldn't determine the exact map location for this property.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-map mt-5 overflow-hidden rounded-3xl border border-neutral-200">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-[320px] w-full sm:h-[380px]"
      >
        <MapResizeHandler />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="text-sm font-medium">{location}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default PropertyMap;
