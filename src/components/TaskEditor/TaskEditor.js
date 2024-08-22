// Import necessary modules and components
import {observer} from "mobx-react";
import {useTaskStore} from "@/stores/RootStore";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TaskCard from "@/components/TaskCard/TaskCard";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Stack} from "@mui/material";

// Define the TaskEditor component, which is an observer for MobX state management
const TaskEditor = observer(({tabHeight}) => {
    // Get the task store from the root store
    const taskStore = useTaskStore();
    // State to manage the modal open/close status
    const [open, setOpen] = useState(false);
    // State to manage the new task description
    const [newDescription, setNewDescription] = useState("");

    // Function to open the modal
    const handleOpen = () => setOpen(true);
    // Function to close the modal
    const handleClose = () => setOpen(false);

    // Function to create a new task
    const handleCreateTask = () => {
        console.log(newDescription);
        taskStore.addTask(newDescription); // Add the new task to the store
        setNewDescription(""); // Reset the new task description
        handleClose(); // Close the modal
    };

    // Effect to load tasks from local storage on component mount and save tasks on window unload
    useEffect(() => {
        if (typeof window !== 'undefined') {
            taskStore.loadTasksFromLocalStorage(); // Load tasks from local storage
        }

        const handleBeforeUnload = () => {
            taskStore.saveTasksToLocalStorage(); // Save tasks to local storage
        };

        window.addEventListener('beforeunload', handleBeforeUnload); // Add event listener for beforeunload

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload); // Cleanup event listener on component unmount
        };
    }, []);

    return (
        <Stack className={"h-full"}>
            {/* Button to open the create task modal */}
            <Box className={`h-[${tabHeight}px] flex justify-center align-middle pl-12 pr-12 p-4 `}>
                <Button className={"create-task"} onClick={handleOpen} variant="contained" color={"neutral"} fullWidth>
                    Create Task
                </Button>
            </Box>
            {/* List of task cards */}
            <Box className={"flex-row space-y-4 w-full h-full overflow-y-auto p-4"}>
                {taskStore.tasks.slice().reverse().map((task, index) => {
                    const originalIndex = taskStore.tasks.length - 1 - index;
                    return <TaskCard key={originalIndex} task={task} index={originalIndex}/>;
                })}
            </Box>
            {/* Modal for creating a new task */}
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
                    {/* Text field for task description */}
                    <TextField
                        label="Task Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        fullWidth
                        multiline
                        margin="normal"
                    />
                    {/* Button to create the task */}
                    <Button onClick={handleCreateTask} variant="contained" color="neutral">
                        Create
                    </Button>
                </Box>
            </Modal>
        </Stack>
    );
});

// Export the TaskEditor component
export default TaskEditor;