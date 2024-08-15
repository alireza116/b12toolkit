// src/components/TaskEditor/TaskEditor.js
import {observer} from "mobx-react";
import {useTaskStore} from "@/stores/RootStore";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TaskCard from "@/components/TaskCard/TaskCard";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Stack} from "@mui/material";

const TaskEditor = observer(({tabHeight}) => {
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            taskStore.loadTasksFromLocalStorage();
        }

        const handleBeforeUnload = () => {
            taskStore.saveTasksToLocalStorage();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    return (
        <Stack className={"h-full"}>
            <Box
                className={`h-[${tabHeight}px] flex justify-center align-middle pl-12 pr-12 p-4 `}>
                <Button className={"create-task"} onClick={handleOpen} variant="outlined" fullWidth>
                    Create Task
                </Button>
            </Box>
            <Box className={"flex-row space-y-4 w-full h-full overflow-y-auto p-4"}>
                {taskStore.tasks.slice().reverse().map((task, index) => {
                    const originalIndex = taskStore.tasks.length - 1 - index;
                    return <TaskCard key={originalIndex} task={task} index={originalIndex}/>;
                })}
            </Box>
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
        </Stack>
    );
});

export default TaskEditor;