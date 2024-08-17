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
    priority = null; // Default to null

    constructor(description, priority = null) {
        this.description = description;
        this.setPriority(priority);
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

    setPriority(priority) {
        if (priority === null || [1, 2, 3, 4].includes(priority)) {
            this.priority = priority;
        } else {
            throw new Error("Invalid priority value. Acceptable values are null, 1 (Low), 2 (Medium), 3 (High), 4 (Critical).");
        }
    }

    getPriority() {
        return this.priority;
    }
}

export default Task;