import { levels } from "../model/Constants";
import EventItem from "../model/EventItem";

const eventsList: EventItem[] = [
  {
    id: 1,
    title: "Gra w siatkówkę",
    description:
      "Gramy w siatkówkę na Chynowie.",
    availablePlaces: 12,
    signedPeople: 5,
    img: "/img/volleyball.jpg",
    level: levels.advanced,
    tags: ['volleyball', 'cracow', 'polishboy'],
    address: {
      street: 'Szkolna 1',
      city: 'Chynów',
      postCode: '05-650',
      country: 'Poland'
    }
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
    tags: ['football', 'warsaw', 'grass', 'sunnyDay'],
    address: {
      street: 'Polki 3C',
      city: 'Warszawa',
      postCode: '02-826',
      country: 'Poland'
    }
  },
  {
    id: 3,
    title: "Gra w koszykówkę",
    description:
      "Gramy w kosza w parku Szczesliwickim.",
    availablePlaces: 12,
    signedPeople: 5,
    img: "/img/basketball.jpg",
    level: levels.recreational,
    tags: ['basket', 'nba', 'sea', 'baltic', 'noFilter'],
    address: {
      street: '',
      city: 'Warszawa',
      postCode: '02-384',
      country: 'Poland'
    }
  },
  {
    id: 4,
    title: "Gra w tenisa",
    description:
      "Gramy w tenisa na Ursynowie.",
    availablePlaces: 2,
    signedPeople: 2,
    img: "/img/tennis.jpg",
    level: levels.intermediate,
    tags: ['tennis', 'poznan'],
    address: {
      street: 'Ludwika Hirszfelda 1',
      city: 'Warszawa',
      postCode: '02-776',
      country: 'Poland'
    }
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
    tags: ['bikeTrip', 'calvariaHills', 'coffe', 'fitDay'],
    address: {
      street: 'Jezynowa 8',
      city: 'Sułkowice',
      postCode: '05-650',
      country: 'Poland'
    }
  },
];

export default eventsList;
