'use client'
import CounterComponent from "@/components/TestCounterState/TestCounterState";
import RiskComponent from "@/components/TestRiskState/TestRiskState";

const Home = () => {
    return (
        <main className="flex min-h-screen flex-col p-12">
            {/*<Button>Hello</Button>*/}
            <CounterComponent></CounterComponent>
            <RiskComponent></RiskComponent>
        </main>
    );
}

export default Home;