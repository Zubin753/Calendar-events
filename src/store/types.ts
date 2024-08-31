import {authAction, authState} from "./reducers/auth/types";
import {eventAction, eventState} from "./reducers/event/types";

export interface typeOfState{
    auth: (state: authState | undefined, action: authAction) => authState,
    event: (state: eventState | undefined, action: eventAction) => eventState
}