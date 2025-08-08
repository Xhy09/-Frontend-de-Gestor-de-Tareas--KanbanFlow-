import "./column.css";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "../Task/Task.jsx";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ id, title, tasks, onAddTask }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="column" ref={setNodeRef}>
      <h2>{title}</h2>
      <button className="add-btn" onClick={onAddTask}>+ Añadir tarea</button>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.map(task => (
          <Task
            id={task.id}
            title={task.title}
            description={task.description}
            assignee={task.assignee}
            key={task.id}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
