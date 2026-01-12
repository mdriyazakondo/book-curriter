import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Container from "../../../shared/Container/Container";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const rangpurDistricts = [
  { name: "Rangpur", position: [25.7439, 89.2752] },
  { name: "Dinajpur", position: [25.6217, 88.635] },
  { name: "Kurigram", position: [25.8054, 89.636] },
  { name: "Nilphamari", position: [25.931, 88.856] },
  { name: "Lalmonirhat", position: [25.9923, 89.2847] },
  { name: "Thakurgaon", position: [26.033, 88.4617] },
  { name: "Panchagarh", position: [26.3354, 88.5516] },
  { name: "Gaibandha", position: [25.3287, 89.528] },
];

const Coverage = () => {
  const center = [25.7439, 89.2752];

  return (
    <div className="bg-white dark:bg-slate-950 py-16 transition-colors duration-300 w-full overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-10 h-0.5 bg-emerald-500"></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs">
              Network
            </span>
            <span className="w-10 h-0.5 bg-emerald-500"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Our Delivery <span className="text-emerald-600">Coverage</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            We are currently serving across all major districts of Rangpur
            division. Expanding soon to other regions!
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-100/50 dark:bg-emerald-600/10 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

          <div className="relative h-[500px] w-full rounded-3xl md:rounded-[40px] overflow-hidden border-8 border-slate-50 dark:border-slate-800 shadow-2xl z-10">
            <MapContainer
              center={center}
              zoom={8}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
              className="map-container"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {rangpurDistricts.map((d, idx) => (
                <Marker key={idx} position={d.position}>
                  <Popup>
                    <div className="p-1">
                      <h4 className="font-bold text-slate-900">{d.name}</h4>
                      <p className="text-xs text-emerald-600 font-medium">
                        Active Coverage Area
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {rangpurDistricts.map((d, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all cursor-default shadow-sm"
            >
              {d.name}
            </span>
          ))}
        </div>
      </Container>

      <style jsx global>{`
        /* Dark Mode Map Filter */
        .dark .map-container .leaflet-tile-container {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }

        /* Popup Styling for Dark Mode */
        .dark .leaflet-popup-content-wrapper,
        .dark .leaflet-popup-tip {
          background: #1e293b !important; /* slate-800 */
          color: white !important;
          border: 1px solid #334155;
        }

        .dark .leaflet-popup-content h4 {
          color: white !important;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          padding: 5px !important;
          border: 1px solid #e2e8f0;
        }

        .leaflet-container {
          font-family: inherit;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default Coverage;
