import { useState, useEffect } from "react";
import "../styles/Card.css";

interface Event {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

type EventsProps = {
  otsikko: string;
};

const Events = ({ otsikko }: EventsProps) => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetch("https://68d50656e29051d1c0acf235.mockapi.io/api/p1/events")
      .then((response) => response.json())
      .then((data) => setEvent(data));
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title-center">{otsikko}</h1>
        <div className="card-grid">
          {event.map((item: Event) => (
            <div key={item.id} className="card">
              <img src={item.avatar} alt={item.name} className="card-image" />
              <div className="card-content">
                <h2 className="card-title">{item.name}</h2>
                <p className="card-date">
                  📅 Data: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
