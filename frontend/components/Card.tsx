import { CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button } from "@chakra-ui/react";
import EventItem from "../model/EventItem";


interface CardProps {
    eventItem: EventItem
}

const Card = (props: CardProps) => {
    return (
        // <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer">
        //     <img className="w-full" src={props.eventItem.img} alt="Sunset in the mountains"/>
        //         <div className="px-6 py-4">
        //             <div className="font-bold text-xl mb-2">{props.eventItem.title}</div>
        //             <p className="text-gray-700 text-base mb-2">
        //                 {props.eventItem.description}
        //             </p>
        //             <p className="text-gray-500 text-sm mb-2">
        //                 <FontAwesomeIcon icon={faUserAlt} fontSize={13}/>
        //                 <span className="px-1">{props.eventItem.signedPeople}/{props.eventItem.availablePlaces}</span>
        //             </p>
        //             <p className="text-gray-500 text-sm">
        //                 {props.eventItem.level.description}
        //             </p>
        //         </div>
        //         <div className="px-6 pt-2 pb-2">
        //             {props.eventItem.tags.map(tag => {
        //                 return <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
        //             })}
        //         </div>
        // </div>
    );
}

export default Card;