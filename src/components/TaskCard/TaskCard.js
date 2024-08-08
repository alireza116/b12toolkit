// src/components/TaskCard/TaskCard.js
import {observer} from "mobx-react";
import {useTaskStore} from "@/stores/RootStore";
import {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import {useTheme} from "@mui/material/styles";

const TaskCard = observer(({task, index}) => {
    const theme = useTheme();
    const taskStore = useTaskStore();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [risk, setRisk] = useState("");
    const [action, setAction] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        taskStore.changeTitle(index, e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        taskStore.changeDescription(index, e.target.value);
    };

    const handleAddRisk = () => {
        taskStore.addRiskToTask(index, risk);
        setRisk("");
    };

    const handleAddAction = () => {
        taskStore.addActionToTask(index, action);
        setAction("");
    };

    const handleRemoveRisk = (riskIndex) => {
        taskStore.removeRiskFromTask(index, riskIndex);
    };

    const handleRemoveAction = (actionIndex) => {
        taskStore.removeActionFromTask(index, actionIndex);
    };

    return (
        <Card className={"shadow-none"} sx={{background: theme.palette.background.default}}>
            <CardContent className="flex-row space-y-4">
                <TextField
                    label="Task Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    fullWidth
                    multiline
                />
                <hr/>
                <div>
                    {/*<Typography className={"mb-4"} variant="subtitle2">Risks</Typography>*/}
                    <div className={"flex"}>
                        <TextField
                            label="New Risk"
                            value={risk}
                            onChange={(e) => setRisk(e.target.value)}
                            fullWidth
                        />
                        <Button onClick={handleAddRisk}>Add Risk</Button>
                    </div>
                    {task.risks.map((risk, idx) => (
                        <Chip
                            key={idx}
                            label={risk}
                            onDelete={() => handleRemoveRisk(idx)}

                            sx={{
                                height: 'auto',
                                padding: "1px",
                                '& .MuiChip-label': {
                                    display: 'block',
                                    whiteSpace: 'normal',
                                }, margin: "4px"
                            }}
                        />
                    ))}

                </div>
                <hr/>
                <div>
                    {/*<Typography variant="subtitle2">Actions</Typography>*/}
                    <div className={"flex"}>
                        <TextField
                            size={"small"}
                            label="New Action"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            fullWidth
                        />
                        <Button onClick={handleAddAction}>Add Action</Button>
                    </div>
                    {task.actions.map((action, idx) => (
                        <Chip
                            key={idx}
                            label={action}
                            onDelete={() => handleRemoveAction(idx)}
                            sx={{
                                height: 'auto',
                                '& .MuiChip-label': {
                                    display: 'block',
                                    whiteSpace: 'normal',
                                }, margin: "4px"
                            }}

                        />
                    ))}

                </div>
            </CardContent>
        </Card>
    );
});

export default TaskCard;