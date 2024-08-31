import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {Option} from "antd/es/mentions";
import {Interface} from "readline";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import dayjs from "dayjs";
import {formatDate} from "../utils/date";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {useTypedSelector} from "../hooks/useSelector";

interface EventFromProps {
    guest: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFromProps> = ({guest, submit}) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)

    const {user} = useTypedSelector((state: any) => state.auth)

    const selectDate = (date: dayjs.Dayjs) => {
        if(date){
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item label="Название события"
                       name="description"
                       rules={[rules.required()]}>
                <Input
                    value = {event.description}
                    onChange = {e => setEvent({...event, description: e.target.value})}
                />
            </Form.Item>

            <Form.Item label="Дата события"
                       name="date"
                       rules={[rules.required(), rules.isDateAfter('Невозможно создать событие на прошедшую дату')]}>

                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>

            <Form.Item label="Причастный пользователь"
                       name="guest"
                       rules={[rules.required()]}>

                <Select onChange={(guest: string) => setEvent({...event, guest: guest})} style={{width: 120}} >
                    {guest.map(g => (
                        <Option value={g.username} key={g.username}>{g.username}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Row justify="end">
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type = "primary" htmlType="submit" >
                        Создать
                    </Button>
                </Form.Item>
            </Row>

        </Form>
    );
};

export default EventForm;