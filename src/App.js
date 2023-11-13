import TodoForm from "./components/TodoForm";
import TodoWrapper from "./components/TodoWrapper";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./components/EditTodoForm";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  const [todos, setTodos] = useState(localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []);
  const [restore, setRestore] = useState([]);
  const [restoreMsg, setRestoreMsg] = useState(false);
  const nodeRef = useRef(null);

  console.log(localStorage.getItem("todo"))
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos))
  }, [todos])

  const addTask = (todo, isTrue) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: isTrue ? true : false,
        isEdited: false,
      },
    ]);
  };
  const deleteTask = (id) => {
    setRestore([...restore, todos.find((item) => item.id === id)]);
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const deleteRestoreTask = (id) => {
    setRestore(restore.filter((todo) => todo.id !== id));
  };
  const completedText = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  const editTodo = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isEdited: !item.isEdited } : item
      )
    );
  };
  const editTask = (task, id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, task, isEdited: !item.isEdited } : item
      )
    );
  };

  return (
    <div className="wrapper">
      <TransitionGroup>
        {restoreMsg && (
          <CSSTransition
            in={restoreMsg}
            timeout={500}
            classNames="item"
            nodeRef={nodeRef}
            unmountOnExit
          >
            <p className="restoreMsg" ref={nodeRef}>
              You are not having any restore item!
            </p>
          </CSSTransition>
        )}
      </TransitionGroup>

      <TodoWrapper
        restoreMsg={restoreMsg}
        setRestoreMsg={setRestoreMsg}
        addTask={addTask}
        setRestore={setRestore}
        restore={restore}
        deleteRestoreTask={deleteRestoreTask}
      />
      {todos.map((todo) =>
        todo.isEdited ? (
          <EditTodoForm
            todo={todo}
            deleteTask={deleteTask}
            editTask={editTask}
            key={todo.id}
          />
        ) : (
          <TodoForm
            deleteTask={deleteTask}
            completedText={completedText}
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
}

export default App;
