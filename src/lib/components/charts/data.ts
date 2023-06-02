import * as am5 from "@amcharts/amcharts5";

function generateData(date: Date, timeUnit: 'day' | 'hour' | 'minute' | 'second' | 'millisecond' = 'day') {
    let value = 100;

    value = Math.round((Math.random() * 10 - 5) + value);

    am5.time.add(date, timeUnit, 1);

    return {
        date: date.getTime(),
        value: value
    };
}

export function generateDatas(count: number, timeUnit: 'day' | 'hour' | 'minute' | 'second' | 'millisecond' = 'day') {
    const data = [];
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    for (let i = 0; i < count; ++i) {
        data.push(generateData(date, timeUnit));
    }

    return data;
}