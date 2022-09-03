import dayjs from "dayjs";

// 일자별로 나누는 코드
// 이거 응용해서 다른 코드를 새로 만들어도 됨
export default function makeDate(data) {
    const sections = {};
    data.forEach((chart) => {
        const monthDate = dayjs(String(chart.일자)).format("YYYY-MM-DD");
        if (Array.isArray(sections[monthDate])) {
            sections[monthDate].push(chart);
        } else {
            sections[monthDate] = [chart];
        }
    });
    return sections;
}
