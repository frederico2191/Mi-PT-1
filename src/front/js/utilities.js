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

export const mappedGoals = [
  { value: "lose_weight", label: "Loose Weight" },
  { value: "get_toned", label: "Get Toned" },
  { value: "increas_muscle_mass", label: "Increase Muscle Mass" },
  { value: "improve_health", label: "Improve Health" },
  { value: "improve_as_athlete", label: "Improve as Athlete" },
];

export const mappedSpecialty = [
  { value: "running_performance", label: "Running Performance" },
  { value: "functional_training", label: "Functional Training" },
  { value: "postpartum_training", label: "Postpartum Training" },
  { value: "weight_loss", label: "Weight Loss" },
  { value: "strength_development", label: "Strength Development" },
  { value: "metabolic_conditioning", label: "Metabolic Conditioning" },
  { value: "injury_reduction", label: "Injury Reduction" },
  { value: "sports_performance", label: "Sports Performance" },
  { value: "flexibility", label: "Flexibility" },
];

export const mappedCoachingStyle = [
  { value: "supportive", label: "Supportive" },
  { value: "laid_back", label: "Laid Back" },
  { value: "results_oriented", label: "Results Oriented" },
  { value: "motivating", label: "Motivating" },
  { value: "high_energy", label: "High Energy" },
  { value: "calm", label: "Calm" },
];

export const mappedFitnessExperience = [
  { value: "new_to_it", label: "New to It" },
  { value: "getting_back", label: "Getting Back" },
  { value: "currently_working_out", label: "Currently Working Out" },
  { value: "fitness_enthusiast", label: "Fitness Enthusiast" },
];
