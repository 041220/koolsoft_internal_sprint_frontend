import React from 'react'
import { Card, CardContent, Typography, CardActions } from '@mui/material'
import './index.scss'

type TaskItemProps = {
    task: any
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        // <div style={{ border: '1px solid black' }}>
        //     {task?.name}
        // </div>
        <div className='item-column-bag' >
            <Card style={{ marginBottom: '20px' }}>
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
        </div>
    )
}

export default TaskItem