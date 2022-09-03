import Chart from "./Chart";
import sampledata from "./data/sampledata.json";
import makeDate from "./utils/makeDate";

function App() {
    const chartData = sampledata.slice(1, sampledata.length); // 앞에 null 값 없앤거
    const chartDay = makeDate(chartData); // 일자에 해당하는 값들 객체로 넣어놓는 함수
    // console.log(chartDay); // 콘솔찍어보면 암

    return (
        <div className="App">
            <Chart chartDay={chartDay} />
        </div>
    );
}

export default App;
