import React, { useState } from "react";
import { EventDetails } from "../page";
import Image from "next/image";
import axios from "axios";

type props = {
  eventDetails: EventDetails;
  fetchEvents: Function;
  deleteEvent: Function;
};

const EventDesc = ({
  eventDetails,
  fetchEvents,
  deleteEvent: _deleteEvent,
}: props) => {
  const [editMode, setEditMode] = useState(false);

  const [imageUrl, setImageUrl] = useState(eventDetails.eventImage);
  const [description, setDescription] = useState(eventDetails.eventDesc);
  const [name, setName] = useState(eventDetails.eventName);

  const updateEvent = async () => {
    const data = axios.put(
      "http://localhost:9000/events/" + eventDetails.event_id,
      {
        eventName: name,
        eventDesc: description,
        eventImage: imageUrl,
      }
    );
    fetchEvents();
  };

  const deleteEvent = async () => {
    const data = await axios.delete(
      "http://localhost:9000/events/" + eventDetails.event_id
    );
    fetchEvents();
  };

  return (
    <div className="flex flex-col bg-white border p-5 shadow width-[400px] m-10">
      <div className="border width-[300px] height-[300px]">
        <Image
          loader={({ src }) => src}
          alt="cant load iamge"
          src={eventDetails.eventImage}
          height={300}
          width={300}
        />
      </div>
      <div className="flex m-3 items-center gap-4">
        <div>
          <button
            className="bg-red-600 py-2 px-4 text-white rounded"
            onClick={() => {
              deleteEvent();
            }}
          >
            Delete
          </button>
        </div>

        <div>
          <button
            className="bg-red-300 py-2 px-4 text-white rounded"
            onClick={() => {
              setEditMode((prev) => !prev);
            }}
          >
            EDIT
          </button>
        </div>
        {editMode && (
          <div>
            <button
              className="bg-black py-2 px-4 text-white rounded"
              onClick={() => {
                setEditMode((prev) => !prev);
                updateEvent();
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
      {editMode && (
        <h1 className="m-2 text-red-300">YOU ARE IN EDIT MODE NOW </h1>
      )}
      {editMode && (
        <>
          <div className="p-2 shadow m-2 flex flex-col">
            <label htmlFor="url">Event Image URL: </label>
            <input
              className="p-2 "
              id="url"
              value={imageUrl}
              disabled={!editMode}
              onChange={(e) => setImageUrl(e.target.value)}
            ></input>
          </div>
        </>
      )}
      <div className="p-2 shadow m-2 flex flex-col">
        <label htmlFor="name">Event Name: </label>
        <input
          className="p-2  "
          id="name"
          value={name}
          disabled={!editMode}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="p-2 shadow m-2 flex flex-col">
        <label htmlFor="desc">Event Description: </label>
        <textarea
          className="p-2 h-[200px]"
          id="desc"
          value={description}
          disabled={!editMode}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default EventDesc;
