// src/components/CounterComponent.js
import React from 'react';
import {observer} from "mobx-react"
import {useCounterStore} from '@/stores/RootStore';
import Button from "@mui/material/Button";

const CounterComponent = observer(() => {
    const counterStore = useCounterStore();
    console.log(counterStore)
    const increment = () => {
        counterStore.increment();
        console.log(counterStore.counter)
    }
    //a function to decrement the store
    const decrement = () => {
        counterStore.decrement();
        console.log(counterStore.counter)
    }

    return (
        <div>
            <h1>Counter: {counterStore.counter}</h1>
            <Button onClick={increment}>Increment</Button>
            <Button onClick={decrement}>Decrement</Button>
        </div>
    );
})

export default CounterComponent;