import dayjs from "dayjs";

export const rules = {
    required: (message: string = 'Обязательное поле') => ({
        required: true,
        message: message
    }),
    isDateAfter: (message: string) => () => ({
        validator(_: any, value: dayjs.Dayjs) {
            if(value.isSame(dayjs()) || value.isAfter(dayjs())){
                return Promise.resolve()
            }
            return Promise.reject( new Error (message))
        }
    })
}