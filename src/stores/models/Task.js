// src/models/TaskCard.js
import {makeAutoObservable} from 'mobx';

class Action {
    id = Math.random();
    description = "";

    constructor(description) {
        this.description = description;
        makeAutoObservable(this);
    }
}

class Risk {
    id = Math.random();
    description = "";
    actions = [];

    constructor(description) {
        this.description = description;
        this.actions = [];
        makeAutoObservable(this);
    }

    addAction(description) {
        this.actions.push(new Action(description));
    }

    removeAction(index) {
        this.actions.splice(index, 1);
    }
}

class Task {
    description;
    risks = [];

    constructor(description) {
        this.description = description;
        makeAutoObservable(this);
    }

    addRisk(description) {
        const newRisk = new Risk(description);
        this.risks.push(newRisk);
        return newRisk;
    }

    removeRisk(index) {
        this.risks.splice(index, 1);
    }
}

export default Task;