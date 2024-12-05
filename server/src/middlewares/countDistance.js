function countDistance(start, end) {
  const toRad = (value) => (value * Math.PI) / 180; // Конвертация в радианы

  const [lat1, lon1] = start.split(",").map(Number);
  const [lat2, lon2] = end.split(",").map(Number);

  const R = 6371; // Радиус Земли в километрах
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c * 1000);
}
module.exports = countDistance;
