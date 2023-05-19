import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { getEventsList } from "../service/EventsService";
import Dashboard from "../components/Dashboard";


const Home: NextPage = ({
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <><Dashboard events={result}/></>
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

export default Home;

