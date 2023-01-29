import Table from "react-bootstrap/Table";
import {useEffect} from "react";
import {getData} from "../store/DataSlice";
import {useDispatch, useSelector} from "react-redux";

export default function MainTable({setID}) {
    const data = useSelector((state) => state.data.data);
    const week = useSelector((state) => state.data.currentWeek);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData(week));
    }, [week]);

    if (!data) return;

    return (
        <Table striped bordered hover responsive size="md">
            <thead>
            <tr>
                <th></th>
                <th>Пн.</th>
                <th>Вт.</th>
                <th>Ср.</th>
                <th>Чт.</th>
                <th>Пт.</th>
                <th>Сб.</th>
                <th>Вс.</th>
            </tr>
            </thead>
            <tbody>
            {time.map((time, i) => (
                <tr key={i}>
                    <td>{time}</td>
                    {data[time]?.map((e, i) => (
                        <td
                            className="dataCell"
                            key={i}
                            style={styleTd}
                            onClick={() => setID({time: time, day: i, seats: e})}
                        >
                            {e + " дор."}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

const styleTd = {cursor: "pointer"};

const time = [
    "6:30",
    "7:15",
    "8:00",
    "8:45",
    "9:30",
    "10:15",
    "11:00",
    "11:45",
    "12:30",
    "13:15",
    "14:00",
    "14:45",
    "15:30",
    "16:15",
    "17:00",
    "17:45",
    "18:30",
    "19:15",
    "20:00",
    "20:45",
    "21:30",
];
