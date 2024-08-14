// src/stores/TaskStore.js
import {makeAutoObservable} from 'mobx';
import Task from './models/Task';
import sampleTasks from '@/data/sampleTasks.js';

class TaskStore {
    tasks = [];

    constructor() {
        makeAutoObservable(this);
        this.loadSampleTasks();
    }

    loadSampleTasks() {
        sampleTasks.forEach(taskData => {
            const task = new Task(taskData.description);
            taskData.risks.forEach(riskData => {
                const risk = task.addRisk(riskData.description);
                riskData.actions.forEach(actionData => {
                    risk.addAction(actionData.description);
                });
            });
            this.tasks.push(task);
        });
    }

    addTask(description) {
        const newTask = new Task(description);
        this.tasks.push(newTask);
    }

    removeTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
    }

    changeDescription(taskIndex, newDescription) {
        const task = this.tasks[taskIndex];
        task.description = newDescription;
    }

    addRiskToTask(taskIndex, riskDescription) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.addRisk(riskDescription);
        }
    }

    removeRiskFromTask(taskIndex, riskIndex) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.removeRisk(riskIndex);
        }
    }

    addActionToRisk(taskIndex, riskIndex, actionDescription) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.risks[riskIndex].addAction(actionDescription);
        }
    }

    removeActionFromRisk(taskIndex, riskIndex, actionIndex) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.risks[riskIndex].removeAction(actionIndex);
        }
    }
}

const store = new TaskStore();
export default store;