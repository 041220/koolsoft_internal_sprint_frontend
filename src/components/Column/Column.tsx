import React, { useState, useEffect } from 'react'
import TaskItem from '../TaskItem/TaskItem';
import IconButton from '@mui/material/IconButton';
import { v4 } from 'uuid';
import './column.scss'
import ClearIcon from '@mui/icons-material/Clear';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import SprintSlice, { ColumnType } from '../../redux/slices/SprintSlice';




export type ColumnProps = {
    editColumnId: string,
    key: string,
    column: ColumnType,
}

const Column: React.FC<ColumnProps> = ({ column, editColumnId }) => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [nameTask, setNameTask] = useState('')
    const dispatch = useDispatch();

    const dataTask = useSelector((state: any) => state.oneSprint.allTasks)
    // console.log("dataTask", dataTask);

    useEffect(() => {
        dispatch(SprintSlice.actions.setColumn({ dataTask, editColumnId }))
    }, [dispatch, dataTask, editColumnId])
    const handleAddNewTask = (e: any) => {
        e.preventDefault();
        console.log("CHECKID:", editColumnId);

        dispatch(SprintSlice.actions.addNewTask({
            _id: v4(),
            name: nameTask,
            description: "",
            status: editColumnId,
            createDate: new Date().toLocaleString(),
            projectId: v4(),
            sprintId: v4(),
            parrentId: v4(),
        }))
        setNameTask('')

    }
    return (
        <div className='Column'>

            <div className='Column__list-task'>
                <Droppable droppableId={column.id} >
                    {
                        provided => (
                            <div ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {

                                    column.tasks.map((task, taskIndex) => (
                                        <div className='column-task-bag' key={task._id}>
                                            <div className='columns-task-item'>
                                                <TaskItem
                                                    key={task._id}
                                                    index={taskIndex}
                                                    task={task}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }


                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
                {
                    isOpenForm
                        ? <form id='form-add-task' onSubmit={handleAddNewTask} >

                            <div className='top-form-addTask-onlyColumn'>
                                <button className='btn-cancle-addTask-onlyColumn' onClick={() => setIsOpenForm(false)}><ClearIcon className='icon-clear-add-task' /></button>
                                <input
                                    className='input-addTask-onlyColumn'
                                    placeholder='Task name or type "/" comman '
                                    onChange={(e) => setNameTask(e.target.value)}
                                />
                                <button className='btn-add-assign'><PersonOutlineIcon className='icon-add-assign' /><AddCircleIcon className='icon-add-custom' /></button>
                            </div>
                            <div className='footer-form-addTask-onlyColumn'>
                                <div style={{ width: '80%' }}>
                                    <IconButton>
                                        <TourOutlinedIcon style={{ color: '#3434348f', fontSize: '22px' }} />
                                    </IconButton>
                                    <IconButton>
                                        <ScheduleSendOutlinedIcon style={{ color: '#3434348f', fontSize: '22px' }} />
                                    </IconButton>
                                    <IconButton>
                                        <EventAvailableOutlinedIcon style={{ color: '#3434348f', fontSize: '22px' }} />
                                    </IconButton>
                                </div>
                                <button type='submit' className='btn-save-addTask-onlyColumn' >SAVE</button>
                            </div>
                        </form>
                        : <button className='btn-add-task-onlyColumn' onClick={() => setIsOpenForm(true)}>+ NEW TASK</button>
                }

            </div>

        </div>
    )
}

export default Column