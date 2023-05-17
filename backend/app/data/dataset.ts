import Event from "../model/Event";
import { levels } from "../model/Constants";

// let people: { id: number; name: string }[] = [
//     { id: 1, name: "Cassie" },
//     { id: 2, name: "Rue" },
//     { id: 3, name: "Lexi" },
//   ];
//   export default people;


const eventsList: Event[] = [
  {
    id: 1,
    title: "Gra w siatkówkę",
    description:
      "Gramy w siatkówkę w Krakowie.",
    availablePlaces: 12,
    signedPeople: 5,
    img: "/img/volleyball.jpg",
    level: levels.advanced,
    tags: ['volleyball', 'cracow', 'polishboy']
  },
  {
    id: 2,
    title: "Gramy w piłkę",
    availablePlaces: 12,
    signedPeople: 12,
    description:
      "Gramy w piłkę w Warszawie.",
    img: "/img/football.jpg",
    level: levels.beginner,
    tags: ['football', 'warsaw', 'grass', 'sunnyDay']
  },
  {
    id: 3,
    title: "Gra w koszykówkę",
    description:
      "Gramy w kosza w Koszalinie.",
    availablePlaces: 12,
    signedPeople: 5,
    img: "/img/basketball.jpg",
    level: levels.recreational,
    tags: ['basket', 'nba', 'sea', 'baltic', 'noFilter']
  },
  {
    id: 4,
    title: "Gra w tenisa",
    description:
      "Gramy w tenisa w Poznaniu.",
    availablePlaces: 2,
    signedPeople: 2,
    img: "/img/tennis.jpg",
    level: levels.intermediate,
    tags: ['tennis', 'poznan']
  },
  {
    id: 5,
    title: "Jazda na rowerach",
    description:
      "Jedziemy na wycieczkę rowerową do Góry Kalwarii.",
    availablePlaces: 5,
    signedPeople: 5,
    img: "/img/cycling.jpg",
    level: levels.recreational,
    tags: ['bikeTrip', 'calvariaHills', 'coffe', 'fitDay']
  },
];

export default eventsList;
