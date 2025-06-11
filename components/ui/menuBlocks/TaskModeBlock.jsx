import { useContext } from "react";
import { TASKS } from "../../../staticData/tasks";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";

export default function TaskModeBlock() {
    const { currentTask, setCurrentTask } = useContext(ContentContext);

    function handleChange(option) {
        setCurrentTask(option);
		// console.log("TaskModeBlock", option);
    }

    return (
        <div className="w-full">
            <p className="font-sans text-base text-amber-800">Плейлист</p>
            <CustomDropdown
                initialValue={currentTask.name}
                options={TASKS}
                onChange={handleChange}
            />
        </div>
    );
}
