import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const events = {
//     _id: new Date().getTime(),
//     title:'cumple',
//     notes: 'comprar pastel',
//     start: new Date(),
//     end: addHours(new Date(),1),
//     bdColor:'#fafafa',
//     user:{
//       _id:'123',
//       name:'coaquera',
//     }
//   };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents:true,
        events:[
            //events
        ],
        activeEvent:null,
    },
    reducers: {
        onSetActiveEvent: (state,{payload}) => {
            //console.log('this is the event',payload)
            state.activeEvent = payload;
        },
        onAddNewEvent: (state,{payload}) =>{
            
            state.events.push(payload);
            //console.log("despues",JSON.stringify(state));
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state,{payload=[]}) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exist = state.events.some(stateEvent=>stateEvent.id === event.id);
                if (!exist){
                    state.events.push(event);
                }
            });
        },
        onLogoutCalendar:(state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }

    }
});

//Action creators are generated for each case reducer function
export const { 
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar } = calendarSlice.actions;