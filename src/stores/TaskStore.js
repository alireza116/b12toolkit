// Import MobX utility for making the class observable
import {makeAutoObservable} from 'mobx';
// Import the Task model
import Task from '@/stores/models/Task';
// Import sample tasks data
import sampleTasks from '@/data/sampleTasks.js';

// Define the TaskStore class to manage the state related to tasks
class TaskStore {
    tasks = []; // Array to hold the list of tasks

    // Constructor to initialize the store and make it observable
    constructor() {
        makeAutoObservable(this);

    }

    // Method to load sample tasks into the store
    loadSampleTasks() {
        sampleTasks.forEach(taskData => {
            const task = new Task(taskData.description, taskData.priority);
            taskData.risks.forEach(riskData => {
                const risk = task.addRisk(riskData.description);
                riskData.actions.forEach(actionData => {
                    risk.addAction(actionData.description);
                });
            });
            this.tasks.push(task);
        });
    }

    // Method to add a new task to the store
    addTask(description, priority = null) {
        const newTask = new Task(description, priority);
        this.tasks.push(newTask);
        this.saveTasksToLocalStorage(); // Save tasks to local storage
    }

    // Method to remove a task from the store by index
    removeTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
        this.saveTasksToLocalStorage(); // Save tasks to local storage
    }

    // Method to change the description of a task by index
    changeDescription(taskIndex, newDescription) {
        const task = this.tasks[taskIndex];
        task.description = newDescription;
        this.saveTasksToLocalStorage(); // Save tasks to local storage
    }

    // Method to set the priority of a task by index
    setPriority(taskIndex, newPriority) {
        const task = this.tasks[taskIndex];
        task.setPriority(newPriority);
        this.saveTasksToLocalStorage(); // Save tasks to local storage
    }

    // Method to add a risk to a task by index
    addRiskToTask(taskIndex, riskDescription) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.addRisk(riskDescription);
            this.saveTasksToLocalStorage(); // Save tasks to local storage
        }
    }

    // Method to remove a risk from a task by task index and risk index
    removeRiskFromTask(taskIndex, riskIndex) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.removeRisk(riskIndex);
            this.saveTasksToLocalStorage(); // Save tasks to local storage
        }
    }

    // Method to add an action to a risk by task index and risk index
    addActionToRisk(taskIndex, riskIndex, actionDescription) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.risks[riskIndex].addAction(actionDescription);
            this.saveTasksToLocalStorage(); // Save tasks to local storage
        }
    }

    // Method to remove an action from a risk by task index, risk index, and action index
    removeActionFromRisk(taskIndex, riskIndex, actionIndex) {
        const task = this.tasks[taskIndex];
        if (task) {
            task.risks[riskIndex].removeAction(actionIndex);
            this.saveTasksToLocalStorage(); // Save tasks to local storage
        }
    }

    // Method to save the current tasks to local storage
    saveTasksToLocalStorage() {
        if (typeof window !== 'undefined') {
            const tasksJson = JSON.stringify(this.tasks);
            localStorage.setItem('tasks', tasksJson);
        }
    }

    // Method to load tasks from local storage into the store
    loadTasksFromLocalStorage() {
        if (typeof window !== 'undefined') {
            const tasksJson = localStorage.getItem('tasks');
            if (tasksJson) {
                const tasksArray = JSON.parse(tasksJson);
                this.tasks = tasksArray.map(taskData => {
                    const task = new Task(taskData.description, taskData.priority);
                    taskData.risks.forEach(riskData => {
                        const risk = task.addRisk(riskData.description);
                        riskData.actions.forEach(actionData => {
                            risk.addAction(actionData.description);
                        });
                    });
                    return task;
                });
            }
            // Load sample tasks if no tasks are found in local storage
            if (this.tasks.length === 0) {
                this.loadSampleTasks();
            }
        }
    }
}

// Create an instance of TaskStore and export it as the default export
const store = new TaskStore();
export default store;