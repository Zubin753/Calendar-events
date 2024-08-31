import {IEvent} from "../../../models/IEvent";
import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
    setEvents: (events: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload: events}),
    setGuests: (guests: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload: guests}),
    fetchGuests: () =>
        async (dispatch: AppDispatch) => {
            try {
                const response = await UserService.getUsers()
                const guests = response.data;
                dispatch(EventActionCreators.setGuests(guests))

            }catch (e) {
                console.log(e)
            }
        },
    createEvent: (event: IEvent) => 
        async (dispatch: AppDispatch) => {
            try {
                console.log("Добавялю ивент")
                console.log(event)
                const events = localStorage.getItem("events") || '[]'
                const json = JSON.parse(events) as IEvent[];
                json.push(event)
                dispatch(EventActionCreators.setEvents(json))
                localStorage.setItem('events', JSON.stringify(json))
            }catch (e) {
                console.log(e)
            }
        },
    fetchEvents: (username: string) =>
        async (dispatch: AppDispatch) => {
            try {
                const eventsStr = localStorage.getItem('events') || '[]';
                const events = JSON.parse(eventsStr) as IEvent[];
                const currentUserEvents = events.filter(e => e.guest === username || e.author === username)
                dispatch(EventActionCreators.setEvents(currentUserEvents))
            }catch (e) {
                console.log(e)
            }
        }
}