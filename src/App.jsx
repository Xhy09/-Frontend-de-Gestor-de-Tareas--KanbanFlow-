import { useState } from "react";
import "./App.css";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./components/column/Column.jsx";
import TaskForm from "./components/TaskForm/TaskForm.jsx";

function App() {
  
  const [columns, setColumns] = useState([
    { id: "todo", title: "Pendiente", tasks: [] },
    { id: "in-progress", title: "En Proceso", tasks: [] },
    { id: "done", title: "Completado", tasks: [] }
  ]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);

    // 🔹 Reemplaza la función anterior por esta
const findColumnByTaskOrId = (id) => {
  // Buscar por tarea
  const column = columns.find(col => col.tasks.some(task => task.id === id));
  if (column) return column;
  // Si no hay tarea con ese ID, buscar por ID de columna
  return columns.find(col => col.id === id);
};

const handleDragEnd = ({ active, over }) => {
  if (!over) return;

  const sourceCol = findColumnByTaskOrId(active.id);
  const destCol = findColumnByTaskOrId(over.id);

  if (!sourceCol || !destCol) return;

  if (sourceCol.id === destCol.id) {
    // Reordenar dentro de la misma columna
    const newTasks = arrayMove(
      sourceCol.tasks,
      sourceCol.tasks.findIndex((t) => t.id === active.id),
      sourceCol.tasks.findIndex((t) => t.id === over.id)
    );

    setColumns((prev) =>
      prev.map((col) =>
        col.id === sourceCol.id ? { ...col, tasks: newTasks } : col
      )
    );
  } else {
    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    const [movedTask] = sourceTasks.splice(
      sourceTasks.findIndex((t) => t.id === active.id),
      1
    );

    // Si sueltas en una columna vacía, añadir al final
    if (destTasks.length === 0) {
      destTasks.push(movedTask);
    } else {
      destTasks.splice(
        destTasks.findIndex((t) => t.id === over.id),
        0,
        movedTask
      );
    }

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceCol.id) return { ...col, tasks: sourceTasks };
        if (col.id === destCol.id) return { ...col, tasks: destTasks };
        return col;
      })
    );
  }
};


  const handleAddTask = (columnId, task) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  return (
    <div className="App">
      <h1>tareas</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className="board">
          {columns.map(col => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={col.tasks}
              onAddTask={() => {
                setActiveColumn(col.id);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      </DndContext>

      {modalOpen && (
        <TaskForm
          columnId={activeColumn}
          onClose={() => setModalOpen(false)}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;
