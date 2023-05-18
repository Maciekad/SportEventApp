import Card from "../../components/Card"
import SearchInput from '../../components/SearchInput';
import EventItem from "../../model/EventItem";
import { useEffect, useState } from 'react';
import Modal from "../../components/Modal";
import { buttonClass } from '../../model/Constants';
import AddressForm from "../../components/AddressForm";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { getEventsList } from "../../service/EventsService";
import CategorySelector from "../../components/CategorySelector";
import { useSearchParams } from 'next/navigation';


const EventsPage: NextPage = ({
    result,
}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const [events, setEvents] = useState(result);
    const [filter, setFilter] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const search = searchParams.get('search');
        search ? setFilter(search) : setFilter('');
      }, [searchParams]);

    useEffect(() => {

        console.log(filter)
        const eventsTemp: any[] = result
            .filter((ev: any) => filterEvent(ev));

        setEvents(eventsTemp);

    }, [filter]);

    const onSearchTextChanged = (text: string) => {
        setFilter(text);
    }

    const filterEvent = (ev: EventItem): boolean => {

        if (ev.title.toLowerCase().includes(filter.toLowerCase()))
            return true;

        if (ev.description.toLowerCase().includes(filter.toLowerCase()))
            return true;

        if (ev.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())))
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
        <div className="px-20 py-10">
            {/* <div className="px-20">
                <SearchInput onSearchTextChanged={onSearchTextChanged} />
                <button
                    className={buttonClass}
                    onClick={openModal}>
                    Open modal
                </button>
            </div> */}
            <CategorySelector />
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
