// src/stores/TaskStore.js
import {makeAutoObservable} from 'mobx';
import Task from './models/Task';

class TaskStore {
    tasks = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(title, description) {
        const new_id = this.tasks.length;
        const newTask = new Task(new_id, title, description);
        this.tasks.push(newTask);
    }

    removeTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
    }

    changeDescription(taskIndex, newDescription) {
        const task = this.tasks[taskIndex]
        task.description = newDescription;
    }

    changeTitle(taskIndex, newTitle) {
        const task = this.tasks[taskIndex]
        task.title = newTitle;
    }

    addRiskToTask(taskIndex, risk) {
        const task = this.tasks[taskIndex]
        if (task) {
            task.risks.push(risk);
        }
    }

    addActionToTask(taskIndex, action) {
        const task = this.tasks[taskIndex]
        if (task) {
            task.actions.push(action);
        }
    }

    removeRiskFromTask(taskIndex, riskIndex) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.risks.splice(riskIndex, 1);
        }
    }

    removeActionFromTask(taskIndex, actionIndex) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.actions.splice(actionIndex, 1);
        }
    }
}

const store = new TaskStore();
export default store;