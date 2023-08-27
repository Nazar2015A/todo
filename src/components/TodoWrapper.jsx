import React, { useEffect, useRef, useState } from "react";
import RestoredItem from "./RestoredItem";
import { CSSTransition } from "react-transition-group";

const TodoWrapper = ({
  addTask,
  restore,
  deleteRestoreTask,
  setRestoreMsg,
  restoreMsg,
  setRestore,
}) => {
  const [value, setValue] = useState("");
  const [isRestore, setIsRestore] = useState(false);
  const time = useRef(null);
  const nodeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTask(value);
    }
    setValue("");
  };

  const restoreFunc = () => {
    clearTimeout(time.current);
    setIsRestore((prev) => (restore.length ? !prev : prev));
    if (restore.length === 0) {
      setRestoreMsg(true);
      time.current = setTimeout(() => {
        setRestoreMsg(false);
      }, 5000);
    } else {
      setRestoreMsg(false);
    }
    if (!restoreMsg) {
      setTimeout(() => {
        setRestoreMsg(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (restore.length === 0) {
      setIsRestore(false)
    }
  }, [restore.length])


  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Enter your Task"
      />
      <button type="submit">Add Task</button>
      <button
        className="restoreBtn"
        type="submit"
        onClick={restoreFunc}
      >
        Restore
      </button>
      <CSSTransition
      nodeRef={nodeRef}
        in={isRestore}
        timeout={1000}
        classNames="item"
        
      >
        <div ref={nodeRef}>
          {(isRestore && restore.length !== 0) && (
            <RestoredItem
              setRestore={setRestore}
              restore={restore}
              addTask={addTask}
              deleteRestoreTask={deleteRestoreTask}
            />
          )}
        </div>
      </CSSTransition>
    </form>
  );
};

export default TodoWrapper;
