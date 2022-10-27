import React, { useState, useEffect, useMemo } from 'react'
import TaskItem from '../TaskItem/TaskItem';
import { ColumnType } from '../TaskHome';
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
import SprintSlice from '../../redux/slices/SprintSlice';


export interface ColumnProps {
    editColumnId: string,
    key: string,
    column: ColumnType

}

const Column: React.FC<ColumnProps> = ({ column, editColumnId }) => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [nameTask, setNameTask] = useState('')

    const dispatch = useDispatch();

    const dataSprint = useSelector((state: any) => state.oneSprint.sprint)

    console.log("name:", nameTask);


    // const itemColumn = useMemo(() => {
    //     return (
    //         dataSprint.find((item: { id: string }) => item.id === editColumn)
    //     )
    // }, [editColumn, dataSprint])


    // console.log("itemColumn:", itemColumn);
    // useEffect(() => {
    //     dispatch(ColumnSlice.actions.getDataColumn(itemColumn))
    // }, [dispatch, itemColumn])

    console.log("column:", column);

    const handleAddNewTask = () => {
        console.log("CHECKID:", editColumnId);

        dispatch(SprintSlice.actions.addNewTask({
            id: editColumnId,
            tasks: {
                _id: v4(),
                name: nameTask
            }
        }))
        // console.log("check1:", dataColumn);
        // dispatch(SprintSlice.actions.updateSprint(dataColumn))
        // columns.map(item => (item.id === column.id ? { ...item, tasks: [...item.tasks, { id: v4(), name: nameTask }] } : { ...item }))
    }
    return (
        <div className='Column'>
            <div className='Column__list-task'>
                {

                    column.tasks.map(task => (
                        <div className='column-task-bag'>
                            <div className='columns-task-item'>
                                <TaskItem task={task} />
                            </div>
                        </div>
                    ))
                }
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