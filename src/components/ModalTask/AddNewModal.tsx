import React from 'react'
import './index.scss'
import CloseIcon from '@mui/icons-material/Close';
import { Button, Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

interface PropsModal {
    displayModal: boolean,
    setDisplayModal: (value: boolean) => void,
}

const AddNewModal: React.FC<PropsModal> = ({ setDisplayModal }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dataColumn = useSelector((state: any) => state.oneSprint.sprint)
    console.log("dataColumn", dataColumn);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='container-modal'>
            <div className='top-modal'>
                <button className='top-modal-close' onClick={() => setDisplayModal(false)}><CloseIcon fontSize='small' style={{ color: "rgb(116 114 114 / 79%)", fontWeight: "700" }} /></button>
            </div>
            <div className='heading-modal-add'>
                <div className='heading-modal-status'>
                    <div>
                        <Button
                            id="basic-button-status"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            style={{}}
                        >
                            check
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {dataColumn.map((item: any) => (
                                <MenuItem onClick={handleClose}><span style={{ backgroundColor: `${item.color}`, width: '50px', height: '50px' }} />{item.title}</MenuItem>
                            ))}


                        </Menu>
                    </div>
                </div>
                <div className='left-modal__content'>

                </div>
            </div>
        </div>
    )
}

export default AddNewModal