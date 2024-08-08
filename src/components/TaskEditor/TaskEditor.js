// src/components/TaskEditor/TaskEditor.js
import {observer} from "mobx-react";
import {useTaskStore} from "@/stores/RootStore";
import Button from "@mui/material/Button";
import TaskCard from "@/components/TaskCard/TaskCard";

const TaskEditor = observer(() => {
    const taskStore = useTaskStore();
    return (
        // gap between items in the div
        // flex-row to display items horizontally
        // map through tasks and display them in TaskCard component
        <div className={"flex-row space-y-4"}>
            {taskStore.tasks.map((task, index) => (
                <TaskCard key={index} task={task} index={index}/>
            ))}
            <Button onClick={() => taskStore.addTask("New Task", "New Description")}>
                Create Task
            </Button>
        </div>
    );
});

export default TaskEditor;