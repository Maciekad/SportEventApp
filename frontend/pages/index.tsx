import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from "next";
import { getEventsList } from "../service/EventsService";
import Dashboard from "../components/Dashboard";

const Home: NextPage = ({
  result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Dashboard events={result} />
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await getEventsList();
  return {
    props: {
      result,
    },
  };
};

export default Home;

