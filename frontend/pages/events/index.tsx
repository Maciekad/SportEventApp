import Card from "../../components/Card"
import SearchInput from '../../components/SearchInput';
import EventItem from "../../model/EventItem";
import { useEffect, useState } from 'react';
import Modal from "../../components/Modal";
import { buttonClass } from '../../model/Constants';
import AddressForm from "../../components/AddressForm";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { getEventsList } from "../../service/EventsService";

const EventsPage: NextPage = ({
    result,
}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const [events, setEvents] = useState(result);
    const [filter, setFilter] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {

        const eventsTemp: any[] = result
            .filter((ev: any) => filterEvent(ev));

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
                    .map((ev: any) => {
                        return <Card key={ev.id} eventItem={ev} />
                    })}
            </div>
            {modalIsOpen &&
                <Modal onCancel={closeModal} onSubmit={closeModal}>
                    <AddressForm />
                </Modal>}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const result = await getEventsList();
    return {
        props: {
            result,
        },
    };
};

export default EventsPage;
