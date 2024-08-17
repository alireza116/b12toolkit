// src/components/TaskCard/TaskCard.js
import {observer} from "mobx-react";
import {useTaskStore} from "@/stores/RootStore";
import {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import {useTheme} from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {IconButton, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TaskCard = observer(({task, index}) => {
    const theme = useTheme();
    const taskStore = useTaskStore();
    const [risk, setRisk] = useState("");
    const [action, setAction] = useState("");
    const [descModalOpen, setDescModalOpen] = useState(false);
    const [riskModalOpen, setRiskModalOpen] = useState(false);
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [newDescription, setNewDescription] = useState(task.description);
    const [selectedRiskIndex, setSelectedRiskIndex] = useState(null);
    const [newRiskDescription, setNewRiskDescription] = useState("");
    const [riskError, setRiskError] = useState("");
    const [actionError, setActionError] = useState("");

    const handleAddRisk = () => {
        if (risk.trim() === "") {
            setRiskError("Risk cannot be empty");
            return;
        }
        taskStore.addRiskToTask(index, risk);
        setRisk("");
        setRiskError("");
        setRiskModalOpen(false);
    };

    const handleAddAction = () => {
        if (action.trim() === "") {
            setActionError("Action cannot be empty");
            return;
        }
        taskStore.addActionToRisk(index, selectedRiskIndex, action);
        setAction("");
        setActionError("");
    };

    const handleRemoveRisk = (riskIndex) => {
        taskStore.removeRiskFromTask(index, riskIndex);
        if (selectedRiskIndex === riskIndex) {
            setSelectedRiskIndex(null);
            setActionModalOpen(false);
        }
    };

    const handleRemoveAction = (actionIndex) => {
        taskStore.removeActionFromRisk(index, selectedRiskIndex, actionIndex);
    };

    const handleOpenDescModal = () => {
        setNewDescription(task.description);
        setDescModalOpen(true);
    };

    const handleCloseDescModal = () => setDescModalOpen(false);

    const handleOpenRiskModal = () => setRiskModalOpen(true);
    const handleCloseRiskModal = () => setRiskModalOpen(false);

    const handleOpenActionModal = (riskIndex) => {
        setSelectedRiskIndex(riskIndex);
        setNewRiskDescription(task.risks[riskIndex].description);
        setActionModalOpen(true);
    };
    const handleCloseActionModal = () => setActionModalOpen(false);

    const handleUpdateDescription = () => {
        taskStore.changeDescription(index, newDescription);
        handleCloseDescModal();
    };

    const handleRiskDescriptionChange = (e) => {
        const updatedDescription = e.target.value;
        setNewRiskDescription(updatedDescription);
        taskStore.tasks[index].risks[selectedRiskIndex].description = updatedDescription;
    };

    const handleDeleteTask = () => {
        taskStore.removeTask(index);
    };

    const handleSetPriority = (priority) => {
        taskStore.setPriority(index, priority);
    };

    return (
        <Card className={`shadow-none w-full task-${index}`} sx={{background: theme.palette.background.default}}>
            <CardContent className="flex-row w-full">
                <div className="flex justify-between items-center border-b-2">
                    <Typography variant={"caption"} sx={{display: 'flex', justifyContent: 'center'}}>
                        Task {index + 1}
                    </Typography>
                    <IconButton
                        aria-label="delete"
                        onClick={handleDeleteTask}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <div className={`pb-2 flex flex-col align-middle justify-center border-b-2 task-${index}-description`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <Typography className={"mb-2"} variant="caption">Task Description</Typography>
                        </div>
                        <IconButton
                            aria-label="edit"
                            onClick={handleOpenDescModal}
                        >
                            <EditIcon/>
                        </IconButton>
                    </div>
                    <h5>{task.description}</h5>
                </div>
                <div className={` pb-2 flex flex-col align-middle justify-center task-${index}-risks border-b-2`}>
                    <div className={`flex justify-between items-center`}>
                        <Typography className={"mb-2"} variant="caption">Risks</Typography>
                        <IconButton
                            aria-label="add risk"
                            onClick={handleOpenRiskModal}
                        >
                            <AddCircleIcon/>
                        </IconButton>
                    </div>
                    <div>
                        {task.risks.map((risk, idx) => (
                            <Chip
                                key={idx}
                                className={`task-${index}-risk-${idx}`}
                                avatar={<Avatar sx={{width: 24, height: 24}}>{risk.actions.length}</Avatar>}
                                label={`${risk.description}`}
                                onClick={() => handleOpenActionModal(idx)}
                                onDelete={() => handleRemoveRisk(idx)}
                                size="medium"
                                sx={{
                                    height: 'auto',
                                    paddingTop: '4px',
                                    paddingBottom: "4px",
                                    '& .MuiChip-label': {
                                        display: 'block',
                                        whiteSpace: 'normal',
                                    },
                                    marginBottom: "4px",
                                    marginRight: "4px"
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className={`pt-2 flex flex-col align-middle justify-center task-${index}-priority`}>
                    <Typography className={"mb-2"} variant="caption">Priority</Typography>
                    <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: "wrap", gap: '8px 2px'}}>
                        <Button
                            size={"small"}
                            variant={task.priority === 1 ? "contained" : "outlined"}
                            color={task.priority === 1 ? "low" : "neutral"}
                            onClick={() => handleSetPriority(1)}
                        >
                            Low
                        </Button>
                        <Button
                            size={"small"}
                            variant={task.priority === 2 ? "contained" : "outlined"}
                            color={task.priority === 2 ? "medium" : "neutral"}
                            onClick={() => handleSetPriority(2)}
                        >
                            Medium
                        </Button>
                        <Button
                            size={"small"}
                            variant={task.priority === 3 ? "contained" : "outlined"}
                            color={task.priority === 3 ? "high" : "neutral"}
                            onClick={() => handleSetPriority(3)}
                        >
                            High
                        </Button>
                        <Button
                            size={"small"}
                            variant={task.priority === 4 ? "contained" : "outlined"}
                            color={task.priority === 4 ? "critical" : "neutral"}
                            onClick={() => handleSetPriority(4)}
                        >
                            Critical
                        </Button>
                    </div>
                </div>
            </CardContent>
            <Modal
                open={descModalOpen}
                onClose={handleCloseDescModal}
                aria-labelledby="edit-description-modal"
                aria-describedby="edit-description-modal-description"
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
                    <h2 id="edit-description-modal">Edit Description</h2>
                    <TextField
                        label="Task Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        fullWidth
                        multiline
                        margin="normal"
                    />
                    <Button onClick={handleUpdateDescription} variant="contained" color="neutral">
                        Update
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={riskModalOpen}
                onClose={handleCloseRiskModal}
                aria-labelledby="add-risk-modal"
                aria-describedby="add-risk-modal-description"
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
                    <h2 id="add-risk-modal">Add Risk</h2>
                    <TextField
                        label="New Risk"
                        value={risk}
                        onChange={(e) => setRisk(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!riskError}
                        helperText={riskError}
                    />
                    <Button onClick={handleAddRisk} variant="contained" color="neutral">
                        Add
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={actionModalOpen}
                onClose={handleCloseActionModal}
                aria-labelledby="add-action-modal"
                aria-describedby="add-action-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    paddingTop: 2
                }}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <IconButton onClick={handleCloseActionModal}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    {selectedRiskIndex !== null && (
                        <>
                            <TextField
                                label="Edit Risk Description"
                                value={newRiskDescription}
                                onChange={handleRiskDescriptionChange}
                                fullWidth
                                margin="normal"
                                multiline={true}
                            />
                            <Typography className={"mb-4"}>Actions:</Typography>
                            {task.risks[selectedRiskIndex].actions.map((action, idx) => (
                                <Chip
                                    key={idx}
                                    label={action.description}
                                    onDelete={() => handleRemoveAction(idx)}
                                    sx={{
                                        height: 'auto',
                                        paddingTop: '4px',
                                        paddingBottom: "4px",
                                        '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'normal',
                                        },
                                        marginBottom: "4px",
                                        marginRight: "4px"
                                    }}
                                />
                            ))}
                        </>
                    )}
                    <TextField
                        label="New Action"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={!!actionError}
                        helperText={actionError}
                    />
                    <Button onClick={handleAddAction} variant="contained" color="neutral">
                        Add
                    </Button>
                </Box>
            </Modal>
        </Card>
    );
});

export default TaskCard;