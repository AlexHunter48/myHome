import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function PropertyMap({ latitude, longitude, location }) {
  if (!latitude || !longitude) {
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
    <div className="mt-5 overflow-hidden rounded-3xl border border-neutral-200">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-[320px] w-full sm:h-[380px]"
      >
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
