import { makeAutoObservable } from 'mobx';

class riskStore {
    risks = [];

    constructor() {
        makeAutoObservable(this);
    }

    addRisk(newRisk) {
        this.risks.push(newRisk);
    }

    removeRisk(risk, index) {
        this.risks.splice(index, 1);
    }
}

const store = new riskStore();
export default store;