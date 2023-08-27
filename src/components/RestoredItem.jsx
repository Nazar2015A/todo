import React from "react";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

const RestoredItem = ({ restore, addTask, deleteRestoreTask, clearAll }) => {
  const restoreTask = (item) => {
    addTask(item.task, item.completed ? true : false);
    deleteRestoreTask(item.id);
  };
  const Item = (item) => {
    return (
      <div className="itemTask" key={item.id}>
        <p className={`${item.completed ? "complete" : ""}`}>{item.task}</p>
        <div className="restoreIconWrapper">
          <MdOutlineSettingsBackupRestore
            className="restoreIcon"
            onClick={() => restoreTask(item)}
          />
        </div>
      </div>
    );
  };
  return (
      <div className="restoredItem">
        <button className="deleteAllBtn" onClick={() => clearAll()}>
          Clear All
        </button>
        {restore.map((item) => Item(item))}
      </div>
  );
};

export default RestoredItem;
