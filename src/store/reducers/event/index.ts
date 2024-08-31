import {eventAction, EventActionEnum, eventState} from "./types";


const initalState : eventState = {
    events: [],
    guests: [],
}
export const eventReducer = (state :eventState = initalState, action : eventAction) : eventState => {
    switch (action.type){

        case EventActionEnum.SET_EVENTS: {
            return {...state, events: action.payload}
        }

        case EventActionEnum.SET_GUESTS: {
            return {...state, guests: action.payload}
        }

        default:
            return state
    }
}