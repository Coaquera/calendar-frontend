import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
    //esto se hace como un intermediario por que caso 
    // de no hacerlo en CalendarPage y CalendarModal 
    // tendremos que importa el useDispatch y useSelector
    //para los dos, pero aca usamos eso entonces el 
    //CalendarPage y CalendarModal  solo reciben
    //las funciones openDateModal y closeDateModal
    const dispatch = useDispatch();

    const {isDateModalOpen} = useSelector(state => state.ui);

    const openDateModal = ( ) => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    return {
        //propiedades
        isDateModalOpen,
  
        //metodos
        openDateModal,
        closeDateModal,
    }
}
