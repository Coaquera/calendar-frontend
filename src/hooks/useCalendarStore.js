import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent,onDeleteEvent,onLoadEvents } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDate } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const {events,activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector (state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
        //TODO : llegar al backend
        try {            
            //TODO
            if (calendarEvent.id){
                //actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`,calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent}));
                
            }else {
                //creando
                const {data} = await calendarApi.post('/events',calendarEvent);
                dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id,user}));
            }
        } catch (error) {
            Swal.fire('Error al guardar',error.response.data.msg,'error');
        }
    }

    const startDeletingEvent= async() =>{
        //Todo: llegar a backend
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            Swal.fire('Error al eliminar',error.response.data.msg,'error');

        }
    }

    const startLoadingEvents = async() => {

        try {
            const {data} = await calendarApi.get('/events');
            //console.log('malas fechas',{data});
            const events = convertEventsToDate(data.eventos);
            //console.log(events);
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log(error)
        }
    }
  
    return {
        //propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
