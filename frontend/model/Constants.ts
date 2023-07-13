import { Coordinates } from './Coordinates';
import { Level } from './Level';

export const buttonClass = 'p-2 my-2 rounded-lg border border-gray-300 focus:border-blue-500 hover:shadow-lg';

export const googleMapsApiKey = process.env.GOOGLE_API_KEY;

export const firebaseDbUrl = "fake";

export const sulkowiceCoordinates: Coordinates = { lat: 51.9, lng: 21.1 };

export const levels = {
    beginner: <Level>{
      num: 1,
      description: "Początkujący",
    },
    recreational: <Level>{
      num: 2,
      description: "Rekreacyjny",
    },
    intermediate: <Level>{
      num: 3,
      description: "Średniozaawansowany",
    },
    advanced: <Level>{
      num: 4,
      description: "Zaawansowany",
    },
  };

export { Coordinates };
