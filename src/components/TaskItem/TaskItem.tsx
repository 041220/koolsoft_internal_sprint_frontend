import React, { useEffect } from 'react'
import { Card, CardContent, Typography, CardActions } from '@mui/material'
import './index.scss'
import { Draggable } from 'react-beautiful-dnd'

type TaskItemProps = {
    task: any,
    index: number,

}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
    console.log("index:", index);

    return (

        <div className='item-column-bag' >
            <Draggable
                index={index}
                draggableId={task._id}
                key={task._id}
            >
                {
                    provided => (
                        <Card
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <CardContent>
                                <Typography>

                                </Typography>
                                <Typography style={{ fontSize: '15px' }}>
                                    {task.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <button className='btn-add-subtask-onlyTask'>+ ADD SUBTASK</button>
                            </CardActions>
                        </Card>
                    )
                }
            </Draggable>
        </div>
    )
}

export default TaskItem