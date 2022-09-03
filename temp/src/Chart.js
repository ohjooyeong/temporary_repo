import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    BarChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    Label,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
} from "recharts";

const tabs = [
    { label: "일사량(W/m2)", key: "일사량" },
    { label: "기온", key: "기온" },
    { label: "패널온도", key: "패널온도" },
];

export default function Chart({ chartDay }) {
    const [tabInfo, setTabInfo] = useState({
        label: "일사량(W/m2)",
        key: "일사량",
    });
    const [chartDayData, setChartDayData] = useState([]);

    const handleClickTabInfo = (key) => {
        console.log(key);
        const index = tabs.findIndex((info) => info.key === key);
        setTabInfo({ ...tabs[index] });
    };

    useEffect(() => {
        if (Object.keys(chartDay).length > 0) {
            const tempDay = [];
            // 아까 일자에 해당 하는 데이터들을 평균값 내서 새롭게 변수에다 넣는 코드
            Object.entries(chartDay).forEach(([date, data]) => {
                let tempSolar =
                    Math.floor(
                        (data.reduce((p, c) => p + c.태양광발전, 0) /
                            data.length) *
                            100
                    ) / 100;
                let tempSolarRadi =
                    Math.floor(
                        (data.reduce((p, c) => p + c.일사량, 0) / data.length) *
                            100
                    ) / 100;
                let tempTemperature =
                    Math.floor(
                        (data.reduce((p, c) => p + c.기온, 0) / data.length) *
                            100
                    ) / 100;
                let tempPanel =
                    Math.floor(
                        (data.reduce((p, c) => p + c.패널온도, 0) /
                            data.length) *
                            100
                    ) / 100;

                const tempAvgData = {
                    date: dayjs(date).format("MM/DD"),
                    발전량: tempSolar,
                    일사량: tempSolarRadi,
                    기온: tempTemperature,
                    패널온도: tempPanel,
                    amt: 0,
                };
                tempDay.push(tempAvgData);
            });
            setChartDayData([...tempDay]);
            console.log(tempDay); // 확인하고 지우셈
        }
    }, []);

    return (
        <div
            style={{
                width: 1000,
                height: 400,
                backgroundColor: "#10254D",
                position: "relative",
            }}
        >
            <section
                style={{ position: "absolute", top: 0, right: 0, zIndex: 1000 }}
            >
                {tabs.map((info) => (
                    <button
                        key={info.key}
                        onClick={() => handleClickTabInfo(info.key)}
                    >
                        {info.key}
                    </button>
                ))}
            </section>
            <ComposedChart
                width={1000}
                height={400}
                data={chartDayData}
                margin={{
                    top: 40,
                    right: 40,
                    bottom: 30,
                    left: 40,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" stroke="#0f0" />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#ff7300"
                    Label={{
                        value: tabInfo.label,
                        offset: 30,
                        angel: 0,
                        position: "top",
                    }}
                />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="발전량" barSize={30} fill="#0f0" />
                {/* <Line type="monotone" dataKey="amt" stroke="#fff" /> */}
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey={tabInfo.key}
                    stroke="#ff7300"
                />
            </ComposedChart>
        </div>
    );
}
