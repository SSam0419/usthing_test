"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import EventDesc from "./_components/EventDesc";
import CreateEventButton from "./_components/CreateEventButton";

export type EventDetails = {
  event_id: string;
  eventName: string;
  eventDesc: string;
  eventImage: string;
  eventStartDate: Date;
};

const Page = () => {
  const [events, setEvents] = useState([]);

  const deleteEvent = (idx: number) => {
    console.log(idx);
    setEvents((prev) => prev.filter((event, _idx) => _idx !== idx));
  };

  const fetchEvents = async () => {
    const data = await axios.get("http://localhost:9000/events");
    setEvents(data.data.events);
    console.log(data.data.events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {events &&
        events.map((event, idx) => (
          <EventDesc
            eventDetails={event}
            key={idx}
            fetchEvents={fetchEvents}
            deleteEvent={() => {
              deleteEvent(idx);
            }}
          />
        ))}
      <CreateEventButton fetchEvents={fetchEvents} />
    </div>
  );
};

export default Page;
