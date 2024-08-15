// src/stores/TaskStore.js
import {makeAutoObservable} from 'mobx';
import Task from '@/stores/models/Task';
import sampleTasks from '@/data/sampleTasks.js';

class TaskStore {
    tasks = [];

    constructor() {
        makeAutoObservable(this);
        // if (typeof window !== 'undefined') {
        //     this.loadTasksFromLocalStorage();
        // }

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
        this.saveTasksToLocalStorage();
    }

    removeTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
        this.saveTasksToLocalStorage();
    }

    changeDescription(taskIndex, newDescription) {
        const task = this.tasks[taskIndex];
        task.description = newDescription;
        this.saveTasksToLocalStorage();
    }

    addRiskToTask(taskIndex, riskDescription) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.addRisk(riskDescription);
            this.saveTasksToLocalStorage();
        }
    }

    removeRiskFromTask(taskIndex, riskIndex) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.removeRisk(riskIndex);
            this.saveTasksToLocalStorage();
        }
    }

    addActionToRisk(taskIndex, riskIndex, actionDescription) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.risks[riskIndex].addAction(actionDescription);
            this.saveTasksToLocalStorage();
        }
    }

    removeActionFromRisk(taskIndex, riskIndex, actionIndex) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.risks[riskIndex].removeAction(actionIndex);
            this.saveTasksToLocalStorage();
        }
    }

    saveTasksToLocalStorage() {
        if (typeof window !== 'undefined') {
            const tasksJson = JSON.stringify(this.tasks);
            localStorage.setItem('tasks', tasksJson);
        }
    }

    loadTasksFromLocalStorage() {
        if (typeof window !== 'undefined') {
            const tasksJson = localStorage.getItem('tasks');
            if (tasksJson) {
                const tasksArray = JSON.parse(tasksJson);
                this.tasks = tasksArray.map(taskData => {
                    const task = new Task(taskData.description);
                    taskData.risks.forEach(riskData => {
                        const risk = task.addRisk(riskData.description);
                        riskData.actions.forEach(actionData => {
                            risk.addAction(actionData.description);
                        });
                    });
                    return task;
                });
            }
            if (this.tasks.length === 0) {
                this.loadSampleTasks();
            }
        }
    }
}

const store = new TaskStore();
export default store;