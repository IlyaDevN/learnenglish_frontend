import { useState, useContext, useEffect } from "react";
import { INITIAL_TASK, TASKS } from "../../../staticData/tasks";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";

export default function TaskModeBlock() {
    const { currentTask, setCurrentTask } = useContext(ContentContext);

    function handleChange(option) {
        setCurrentTask(option);
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
