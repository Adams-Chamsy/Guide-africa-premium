import React from 'react';
import { FiWifi, FiMapPin, FiStar, FiMusic, FiSun, FiCoffee, FiTruck, FiShield, FiDroplet, FiWind } from 'react-icons/fi';
import { MdPool, MdSpa, MdRestaurant, MdFitnessCenter, MdRoomService, MdPets, MdLocalParking, MdAcUnit, MdOutdoorGrill, MdFreeBreakfast } from 'react-icons/md';
import PropTypes from 'prop-types';

const iconMap = {
  'wifi': FiWifi,
  'parking': MdLocalParking,
  'pool': MdPool,
  'piscine': MdPool,
  'spa': MdSpa,
  'restaurant': MdRestaurant,
  'gym': MdFitnessCenter,
  'salle-sport': MdFitnessCenter,
  'shuttle': FiTruck,
  'navette': FiTruck,
  'breakfast': MdFreeBreakfast,
  'petit-dejeuner': MdFreeBreakfast,
  'pets': MdPets,
  'animaux': MdPets,
  'ac': MdAcUnit,
  'climatisation': MdAcUnit,
  'room-service': MdRoomService,
  'concierge': FiShield,
  'halal': FiStar,
  'vegetarian': FiSun,
  'vegan': FiDroplet,
  'gluten-free': FiCoffee,
  'terrace': MdOutdoorGrill,
  'terrasse': MdOutdoorGrill,
  'music': FiMusic,
  'musique': FiMusic,
  'private-room': FiMapPin,
  'salle-privee': FiMapPin,
};

const labelMap = {
  'wifi': 'WiFi', 'parking': 'Parking', 'pool': 'Piscine', 'piscine': 'Piscine',
  'spa': 'Spa', 'restaurant': 'Restaurant', 'gym': 'Fitness', 'salle-sport': 'Fitness',
  'shuttle': 'Navette', 'navette': 'Navette', 'breakfast': 'Petit-d\u00e9j', 'petit-dejeuner': 'Petit-d\u00e9j',
  'pets': 'Animaux', 'animaux': 'Animaux', 'ac': 'Clim', 'climatisation': 'Clim',
  'room-service': 'Room Service', 'concierge': 'Conciergerie',
  'halal': 'Halal', 'vegetarian': 'V\u00e9g\u00e9tarien', 'vegan': 'Vegan', 'gluten-free': 'Sans gluten',
  'terrace': 'Terrasse', 'terrasse': 'Terrasse', 'music': 'Musique', 'musique': 'Musique',
  'private-room': 'Salle priv\u00e9e', 'salle-privee': 'Salle priv\u00e9e',
};

const AmenityIcon = ({ type, size = 20, showLabel = true }) => {
  const Icon = iconMap[type] || FiStar;
  const label = labelMap[type] || type;

  return (
    <div className="amenity-icon-wrapper">
      <div className="amenity-icon"><Icon size={size} /></div>
      {showLabel && <span className="amenity-icon-label">{label}</span>}
    </div>
  );
};

AmenityIcon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  showLabel: PropTypes.bool,
};

export default React.memo(AmenityIcon);
