import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarContainer, Popup, ButtonContainer, Button,eventContainer,eventTitle,eventStatus,eventStatusPending,eventStatusApproved,eventStatusReject,eventTime } from './mainStyle';
import axios from 'axios';

const ReservationList = () => {
  const [events, setEvents] = useState([]);
  const category = localStorage.getItem('category');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.post('https://api.mever.me:8080/getReservation', {
        category,
      });
      const formattedEvents = response.data.map((reservation) => ({
        title: reservation.orderId,
        start: reservation.reservationDate,
        email: reservation.email,
        status: reservation.status,
        extendedProps: reservation,
      }));
      // 서버에서 받아온 예약 데이터를 events 상태로 설정
      setEvents(formattedEvents);
      console.log(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEventClick = (info) => {
    console.log(info.event)
    setSelectedEvent(info.event);
  };

  const handleConfirmReservation = async () => {
    if (selectedEvent) {
      const seq = selectedEvent.extendedProps.seq;
      const orderId = selectedEvent.extendedProps.orderId;
      try {
        const response =await axios.post('https://api.mever.me:8080/setReservation', {
          status: 'approved',
          seq,
          orderId,
          category
        });
        console.log('API response:', response.data);
        console.log('예약 확정:', selectedEvent.extendedProps);
      } catch (error) {
        console.log('API error:', error);
      }
    }
    fetchEvents();
    setSelectedEvent(null);
  };

  const handleCancelReservation = async () => {
    if (selectedEvent) {
      const seq = selectedEvent.extendedProps.seq;
      const orderId = selectedEvent.extendedProps.orderId;
      try {
        const response =await axios.post('https://api.mever.me:8080/setReservation', {
          status: 'reject',
          seq,
          orderId,
          category
        });
        console.log('API response:', response.data);
        console.log('예약 취소:', selectedEvent.extendedProps);
      } catch (error) {
        console.log('API error:', error);
      }
    }
    fetchEvents();
    setSelectedEvent(null);
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <div style={{ ...eventContainer, display: 'flex' }}>
            <div style={eventTime}>{eventInfo.timeText}</div>
            <div style={eventTitle}>{eventInfo.event.title}</div>
            <div
              style={
                eventInfo.event.extendedProps.status === 'Pending'
                  ? eventStatusPending
                  : eventInfo.event.extendedProps.status === 'approved'
                  ? eventStatusApproved
                  : eventStatusReject
              }
            >
              {eventInfo.event.extendedProps.status}
            </div>
          </div>
        )}
        />
     {selectedEvent && (
        <Popup>
          <h3>예약 정보</h3>
          <p>예약일시: {selectedEvent.start && selectedEvent.start.toLocaleString()}</p>
          <p>상품정보: {selectedEvent.title}</p>
          <p>고객: {selectedEvent.extendedProps.email && selectedEvent.extendedProps.email.toString()}</p>
          <Button onClick={handleConfirmReservation}>예약확정</Button>
          <Button onClick={handleCancelReservation}>예약취소</Button>
        </Popup>
      )}
    </CalendarContainer>
  );
};

export default ReservationList;