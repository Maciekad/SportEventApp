import { Box, Card, Container, Grid } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Coordinates } from "../model/Coordinates";

interface CustomMarkerProps {
    position: Coordinates;
    onClick: (coordinates: Coordinates) => void;
}

const CustomMarker = (props: CustomMarkerProps) => {
    return (
        <Box _hover={{ cursor: 'pointer' }} style={{ position: 'absolute', width: '0px', height: '0px', top: '-25px', left: '-15px', transform: 'translateZ(0) translate(-50%, -50%)' }}>
            <FaMapMarkerAlt onClick={() => props.onClick(props.position)} size={30} color="red" />
        </Box>
    );
}

export default CustomMarker;