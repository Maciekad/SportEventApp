import Card from "../../components/Card"
import eventsData from "../../data"
import SearchInput from '../../components/SearchInput';
import EventItem from "../../model/EventItem";
import { useEffect, useState } from 'react';
import Modal from "../../components/Modal";
import { buttonClass } from '../../model/Constants';
import AddressForm from "../../components/AddressForm";

const EventsPage = () => {

    const [events, setEvents] = useState(Array<EventItem>);
    const [filter, setFilter] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {

        const eventsTemp: EventItem[] = eventsData
        .filter(ev => filterEvent(ev));

        setEvents(eventsTemp);

    }, [filter]);

    const onSearchTextChanged = (text: string) => {
        setFilter(text);
    }

    const filterEvent = (ev: EventItem): boolean => {

        if (ev.title.toLowerCase().includes(filter))
            return true;

        if (ev.description.toLowerCase().includes(filter))
            return true;

        if (ev.tags.some(tag => tag.toLowerCase().includes(filter))) 
            return true;
        
        return false;
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
 
    return (
        <div>
            <div>
                <SearchInput onSearchTextChanged={onSearchTextChanged} />
                <button
                    className={buttonClass}
                    onClick={openModal}>
                    Open modal
                    </button>
            </div>
            <div className="lg:px-24 md:px-20 py-10 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {events
                .map(ev => {
                    return <Card key={ev.id} eventItem={ev} />
                })}
            </div>
            {modalIsOpen &&
                <Modal onCancel={closeModal} onSubmit={closeModal}>
                    <AddressForm/>
                </Modal>}
        </div>
    )
}

export default EventsPage;
