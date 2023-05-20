export const getDistanceInKm = (pos1, pos2) => {
  const lat1 = pos1.lat || pos1.latitude;
  const lng1 = pos1.lng || pos1.longitude;
  const lat2 = pos2.lat || pos2.latitude;
  const lng2 = pos2.lng || pos2.longitude;

  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
