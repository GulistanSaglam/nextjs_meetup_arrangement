// import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList'
import { Fragment } from 'react';
import Head from 'next/head';


// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/15-10-27-Vista_des_de_l%27est%C3%A0tua_de_Colom_a_Barcelona-WMA_2800.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Arc_de_Triomphe_-_Champs-%C3%89lys%C3%A9es.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a second meetup!'
//     },
// ];

function HomePage(props) {

    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(() => {
    //     // send a http request and fetch data
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     // fetch data from an API
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//         // no need revalidate
//     };
// }


export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://GulistanSaglam:yEZvQOTSJdj8EpJG@cluster0.u60jyq2.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collections('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1,
    };
}

export default HomePage;