import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar } from "../components/Navbar"
import { getMessagesES, localizer } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';


export const CalendarPage = () => {

  const {user} = useAuthStore();
  const {openDateModal} = useUiStore();
  const {events,setActiveEvent,startLoadingEvents} = useCalendarStore();

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log({event,start,end,isSelected});
    //console.log('imprime');

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent? '#347CF7': '#465660',
      borderRadius:'0px',
      opacity:0.8,
      color:'white',
    }
    return { style}
  }

  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    //console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    console.log({viewChanged:event});
    localStorage.setItem('lastView', event );
    setlastView( event )
  }

  useEffect(() => {
    startLoadingEvents();
  },[])

  return (
    <>
      <Navbar/>

      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event:CalendarEvent //aca referencamos a CalendarEvent 
        //y se le envia el event que contien todos los datos
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>

    </>
  )
}
