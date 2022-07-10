import { useState, useEffect } from "react";
import locked from "./images/locked-img.svg";
import opened from "./images/open-img.svg";
import axios from "axios";

function App() {
    const [doorState, setDoorState] = useState<boolean>(false);
    const BLYNK_TOKEN = process.env.REACT_APP_BLYNK_TOKEN;
    const BLYNK_BASE_URL = process.env.REACT_APP_BLYNK_BASE_URL;

    const getDoorState = () => {
        axios
            .get(`${BLYNK_BASE_URL}get?token=${BLYNK_TOKEN}&dataStreamId=1`)
            .then((res) => {
                if (res.data === 1) {
                    setDoorState(true);
                } else {
                    setDoorState(false);
                }
            });
    };

    const updateDoorState = (state: boolean) => {
        axios
            .get(
                `${BLYNK_BASE_URL}update?token=${BLYNK_TOKEN}&dataStreamId=1&value=${
                    state ? 1 : 0
                }`
            )
            .then(() => getDoorState());
    };

    useEffect(() => {
        getDoorState();
    }, []);

    return (
        <div className="App text-center">
            <div
                className={`bg-gradient-to-b ${
                    doorState
                        ? "from-teal-600 to-teal-500"
                        : "from-red-400 to-red-500"
                } w-full h-[calc(100vh-200px)] rounded-b-[150px] pt-5`}
            >
                <h1 className="font-bold text-white text-3xl">
                    Aplikasi Kunci Pintu
                </h1>
                <div className="flex justify-center h-full">
                    {doorState ? (
                        <img
                            src={opened}
                            alt="door opened"
                            width="70%"
                            className="self-center max-w-sm"
                        />
                    ) : (
                        <img
                            src={locked}
                            alt="door locked"
                            width="70%"
                            className="self-center max-w-sm"
                        />
                    )}
                </div>
            </div>
            {doorState ? (
                <button
                    className="bg-slate-900 text-white border-4 border-white h-28 w-28 font-semibold text-lg rounded-full -mt-12 shadow-xl shadow-teal-100"
                    onClick={() => updateDoorState(false)}
                >
                    Kunci
                </button>
            ) : (
                <button
                    className="bg-slate-900 text-white border-4 border-white h-28 w-28 font-semibold text-lg rounded-full -mt-12 shadow-xl shadow-red-200"
                    onClick={() => updateDoorState(true)}
                >
                    Buka
                </button>
            )}
        </div>
    );
}

export default App;
