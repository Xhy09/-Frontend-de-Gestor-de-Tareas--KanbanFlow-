import { useState } from "react";
import "./TaskForm.css";



const TaskForm = ({ columnId, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      assignee
    };
    onSave(columnId, newTask);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Nueva tarea</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Responsable"
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
