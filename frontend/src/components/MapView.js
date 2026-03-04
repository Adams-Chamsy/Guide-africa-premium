import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const restaurantIcon = L.divIcon({
  className: 'marker-icon-restaurant',
  html: '<span>R</span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

const hotelIcon = L.divIcon({
  className: 'marker-icon-hotel',
  html: '<span>H</span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

const MapView = ({ markers = [], center = [5, 20], zoom = 4, height = '500px' }) => {
  return (
    <div className="map-container" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.type + '-' + marker.id}
            position={[marker.lat, marker.lng]}
            icon={marker.type === 'restaurant' ? restaurantIcon : hotelIcon}
          >
            <Popup>
              <div className="map-popup-content">
                <div className="map-popup-name">{marker.name}</div>
                <div className="map-popup-type">
                  {marker.type === 'restaurant' ? 'Restaurant' : 'H\u00f4tel'}
                </div>
                {marker.note != null && (
                  <div className="map-popup-rating">
                    {'\u2605'} {marker.note}/5
                  </div>
                )}
                <Link
                  to={marker.type === 'restaurant' ? '/restaurants/' + marker.id : '/hotels/' + marker.id}
                  className="map-popup-link"
                >
                  Voir d&eacute;tails &rarr;
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

MapView.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  markers: PropTypes.array,
};

export default MapView;
