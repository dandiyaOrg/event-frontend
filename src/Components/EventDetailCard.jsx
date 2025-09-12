import React from "react";

const EventDetailCard = ({
  status,
  eventName,
  startDate,
  endDate,
  venue,
  days,
  description}
) => {
  return (
    <div>
      <div>
        <div>Status : {status}</div>
        <div>{eventName}</div>
      </div>

      <div>
        <div>
          <p>Start date : {startDate}</p>
          <p>End date : {endDate}</p>
          <p>Venue : {venue}</p>
          <p>Number of days : {days}</p>
          <p>Description : {description} </p>
        </div>
        <div>
          <image></image>
        </div>
      </div>
    </div>
  );
};

export default EventDetailCard;
