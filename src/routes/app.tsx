import { createFileRoute } from "@tanstack/react-router";
import "../styles/to-do.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/app")({
  component: ToDoApp,
});

function ToDoApp() {
  const [tasks, setTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ todo: string }>();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data: { todo: string }) => {
    if (data.todo.trim()) {
      setTasks([...tasks, data.todo]);
      reset();
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearAllTasks = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
    }
  };

  return (
    <div className="to-do-box">
      <div className="to-do-container">
        <div className="box-1">
          <p className="task-counter">Total tasks: {tasks.length}</p>
        </div>

        <div className="box-2">
          <div className="tasks-header">
            <h2>Your Tasks</h2>
            {tasks.length > 0 && (
              <button
                onClick={clearAllTasks}
                className="clear-all-btn"
                aria-label="Clear all tasks"
              >
                Clear All
              </button>
            )}
          </div>

          {tasks.length === 0 ? (
            <p className="empty-state">No tasks yet. Add your first task!</p>
          ) : (
            <ul className="tasks-list">
              {tasks.map((task, index) => (
                <li key={index} className="task-item">
                  <span className="task-text">{task}</span>
                  <button
                    onClick={() => removeTask(index)}
                    className="delete-btn"
                    aria-label={`Delete task: ${task}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box-3">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit(addTask)} className="task-form">
            <input
              {...register("todo", {
                required: "Task cannot be empty",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
              type="text"
              placeholder="Enter your task..."
              className="task-input"
              aria-invalid={errors.todo ? "true" : "false"}
            />
            {errors.todo && (
              <p className="error-message">{errors.todo.message}</p>
            )}
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
