import EventsPage from "./EventsPage";

const InternationalEvents = () => (
    <EventsPage
        title="International Events"
        subtitle="Global football news — Premier League, La Liga, World Cup, and more"
        query="football Premier League OR La Liga OR World Cup"
        category="international"
    />
);

export default InternationalEvents;
