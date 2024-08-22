// Import MobX utility for making the class observable
import {makeAutoObservable} from 'mobx';

// Define the Action class to represent individual actions
class Action {
    id = Math.random(); // Unique identifier for the action
    description = ""; // Description of the action

    // Constructor to initialize the action with a description
    constructor(description) {
        this.description = description;
        makeAutoObservable(this); // Make the properties observable
    }
}

// Define the Risk class to represent individual risks
class Risk {
    id = Math.random(); // Unique identifier for the risk
    description = ""; // Description of the risk
    actions = []; // Array to hold actions associated with the risk

    // Constructor to initialize the risk with a description
    constructor(description) {
        this.description = description;
        this.actions = [];
        makeAutoObservable(this); // Make the properties observable
    }

    // Method to add an action to the risk
    addAction(description) {
        this.actions.push(new Action(description));
    }

    // Method to remove an action from the risk by index
    removeAction(index) {
        this.actions.splice(index, 1);
    }
}

// Define the Task class to represent individual tasks
class Task {
    description; // Description of the task
    risks = []; // Array to hold risks associated with the task
    priority = null; // Priority of the task, default is null

    // Constructor to initialize the task with a description and optional priority
    constructor(description, priority = null) {
        this.description = description;
        this.setPriority(priority);
        makeAutoObservable(this); // Make the properties observable
    }

    // Method to add a risk to the task
    addRisk(description) {
        const newRisk = new Risk(description);
        this.risks.push(newRisk);
        return newRisk;
    }

    // Method to remove a risk from the task by index
    removeRisk(index) {
        this.risks.splice(index, 1);
    }

    // Method to set the priority of the task
    setPriority(priority) {
        if (priority === null || [1, 2, 3, 4].includes(priority)) {
            this.priority = priority;
        } else {
            throw new Error("Invalid priority value. Acceptable values are null, 1 (Low), 2 (Medium), 3 (High), 4 (Critical).");
        }
    }

    // Method to get the current priority of the task
    getPriority() {
        return this.priority;
    }
}

// Export the Task class as the default export
export default Task;