import axios from "axios";
import React, { useState } from "react";

const CreateEventButton = ({ fetchEvents }: { fetchEvents: Function }) => {
  const [openForm, setOpenForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const createEvent = async () => {
    const data = axios.post("http://localhost:9000/events", {
      eventName: name,
      eventDesc: description,
      eventImage: imageUrl,
    });
    fetchEvents();
  };

  return (
    <div className="fixed rounded-lg right-10 bottom-10 width-[100px] height-[100px]  bg-black text-white py-5 px-10 flex flex-col">
      {openForm && (
        <>
          <div className="flex flex-col gap-3">
            <div className=" text-red-300">CREATE EVENT NOW </div>

            <div className="shadow flex flex-col">
              <label htmlFor="url">Event Image URL: </label>
              <input
                className="p-2 text-black"
                id="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              ></input>
            </div>

            <div className="shadow flex flex-col">
              <label htmlFor="name">Event Name: </label>
              <input
                className="p-2 text-black"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="shadow flex flex-col">
              <label htmlFor="desc">Event Description: </label>
              <textarea
                className="p-2 text-black h-[200px]"
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex gap-3 justify-between">
              <button
                className="width-[120px] height-[90px] border p-3 rounded-full border-white shadow bg-white text-black"
                onClick={() => {
                  createEvent();
                  setOpenForm(false);
                }}
              >
                Confirm
              </button>
              <button
                className="width-[120px] height-[90px] border p-3 rounded-full border-white shadow bg-black text-white"
                onClick={() => {
                  setOpenForm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
      {!openForm && (
        <button
          className="width-[100px] height-[100px] bg-black text-white hover:opacity-75"
          onClick={() => {
            setOpenForm(true);
          }}
        >
          Create Event
        </button>
      )}
    </div>
  );
};

export default CreateEventButton;
