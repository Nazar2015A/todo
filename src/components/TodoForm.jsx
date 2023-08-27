import React from 'react'
import {BsFillTrashFill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
const TodoForm = ({todo, deleteTask, completedText, editTodo}) => {
  
  return (
    <div className='Todo'>
      <p onClick={() => completedText(todo.id)} className={`${todo.completed ? 'complete' : ''}`}>{todo.task}</p>
      <div className='icons'>
      <AiFillEdit  className='icon' onClick={() => editTodo(todo.id) }/>
      <BsFillTrashFill className='icon' onClick={() => deleteTask(todo.id)} />
      </div>
    </div>
  )
}

export default TodoForm