import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useSelector";
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useAction} from "../hooks/useMyDispatch";
import {IEvent} from "../models/IEvent";
import {typeOfState} from "../store/types";
import {RootStateType} from "../store";

const Event: React.FC = () => {
    const isAuth = useTypedSelector((state: any) => state.auth.isAuth)
    const event = useTypedSelector((state: any) => state.event)
    const user = useTypedSelector((state: any) => state.auth.user)
    const {fetchGuests, createEvent, fetchEvents} = useAction()

    const [modalVisible, setModalVisible] = useState(false)

    const addNewEvent = (evento: IEvent) => {
        setModalVisible(false)
        createEvent(evento)
    }

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    return (
        <Layout>
            <Row justify={"center"} align={"middle"} className="h50">

                <EventCalendar events={event.events}/>
                <Row justify="center" className={"button--add"}>
                    <Button onClick={() => setModalVisible(true)}>Добавить событие</Button>
                </Row>
                <Modal title='Добавить событие'
                        visible={modalVisible}
                        footer={null}
                         onCancel={()=>setModalVisible(false)}>
                    <EventForm guest={event.guests} submit={evento => addNewEvent(evento)}/>
                </Modal>
            </Row>
        </Layout>
    );
};

export default Event