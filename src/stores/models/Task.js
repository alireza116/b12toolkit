// src/models/TaskCard.js
import {makeAutoObservable} from 'mobx';

class Task {
    id;
    title;
    description;
    risks = [];
    actions = [];

    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        makeAutoObservable(this, {
            title: true,
            description: true,
            risks: true, // Make risks observable
            actions: true, // Make actions observable
        });
    }
}

export default Task;