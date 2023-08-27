import React, { useEffect, useState } from "react";
import RestoredItem from "./RestoredItem";
import { CSSTransition } from "react-transition-group";

const TodoWrapper = ({ addTask, restore, deleteRestoreTask, clearAll, setRestoreMsg, restoreMsg }) => {
  const [value, setValue] = useState("");
  const [isRestore, setIsRestore] = useState(false);
  let time = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTask(value);
    }
    setValue("");
  };

  const restoreFunc = () => {
    setIsRestore((prev) => !prev);
    if(restore.length === 0) {
      setRestoreMsg(true);
      clearTimeout(time);
      // time = null;
      console.log(time)
      if (time ===  null) {
        time = setTimeout(() => {
          setRestoreMsg(false);
        }, 5000);
      }
    }
    if (!restoreMsg) {
      setTimeout(() => {
        setRestoreMsg(false);
      }, 5000);
    }
    if (restore.length !== 0) {
      setRestoreMsg(false);
    }
    
  }
  // useEffect(() => {
  //   let time = null;
  //   if (restoreMsg) {
  //     time = setTimeout(() => {
  //       setRestoreMsg(false);
  //     }, 5000);
  //   }
  //   if (restore.length !== 0) {
  //     setRestoreMsg(false);
  //   }
  // }, [restore.length, restoreMsg])

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
        // disabled={restoreMsg ? true : false}
      >
        Restore
      </button>

        <div>
          {isRestore && restore.length !== 0 && (

                <RestoredItem
                  isRestore={isRestore}
                  clearAll={clearAll}
                  restore={restore}
                  addTask={addTask}
                  deleteRestoreTask={deleteRestoreTask}
                />
          )}
        </div>
    </form>
  );
};

export default TodoWrapper;
