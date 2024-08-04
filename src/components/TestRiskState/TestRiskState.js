// src/components/CounterComponent.js
import React, {useState} from 'react';
import {observer} from "mobx-react"
import {useRiskStore} from '@/stores/RootStore';
import Button from "@mui/material/Button";

const RiskComponent = observer(() => {
    const riskStore = useRiskStore();
    const [riskText, setRiskState] = useState(null);

    const addRisk = () => {
        riskStore.addRisk(riskText);
        setRiskState(null);
    }

    return (
        <div>

            <div>
                <input type="text" placeholder="Enter risk" value={riskText ? riskText : ""} onInput={(e) => {
                    setRiskState(e.target.value);
                }}/>
                <Button onClick={addRisk}>Add Risk</Button>
            </div>
            <hr/>
            {riskStore.risks.map((risk, index) => {
                return (
                    <div key={index} className={"flex"}>
                        <h1>Risk: {risk}</h1>
                        <Button onClick={() => riskStore.removeRisk(risk, index)}>Remove</Button>
                    </div>)
            })}
        </div>
    );
})

export default RiskComponent;