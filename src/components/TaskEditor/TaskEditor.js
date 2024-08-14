// src/components/TaskEditor/TaskEditor.js
import {observer} from "mobx-react";
import {useTaskStore} from "@/stores/RootStore";
import {useState} from "react";
import Button from "@mui/material/Button";
import TaskCard from "@/components/TaskCard/TaskCard";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const TaskEditor = observer(() => {
    const taskStore = useTaskStore();
    const [open, setOpen] = useState(false);
    const [newDescription, setNewDescription] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateTask = () => {
        console.log(newDescription)
        taskStore.addTask(newDescription);
        setNewDescription("");
        handleClose();
    };


    return (
        <div className={"flex-row space-y-4 w-full"}>
            <Button className={"create-task"} onClick={handleOpen} variant="outlined" fullWidth>
                Create Task
            </Button>
            {taskStore.tasks.slice().reverse().map((task, index) => {
                const originalIndex = taskStore.tasks.length - 1 - index;
                return <TaskCard key={originalIndex} task={task} index={originalIndex}/>;
            })}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-task-modal"
                aria-describedby="create-task-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <h2 id="create-task-modal">Create Task</h2>
                    <TextField
                        label="Task Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        fullWidth
                        multiline
                        margin="normal"
                    />
                    <Button onClick={handleCreateTask} variant="contained" color="primary">
                        Create
                    </Button>
                </Box>
            </Modal>
        </div>
    );
});

export default TaskEditor;