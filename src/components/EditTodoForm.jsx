import React, { useState } from 'react'

const EditTodoForm = ({todo, editTask, deleteTask}) => {
    const [value, setValue] = useState(todo.task);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            editTask(value, todo.id)
        }
    }
  return (
    <form className='form' onSubmit={handleSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder='Enter your Task' />
        <button type='submit'>Add Task</button>
        {
          !value && (
            <button className='deleteTask' onClick={() => deleteTask(todo.id)}>Delete</button>
          )
        }
    </form>
  )
}

export default EditTodoForm