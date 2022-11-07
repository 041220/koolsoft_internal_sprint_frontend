import React from 'react'
import './index.scss'
import CloseIcon from '@mui/icons-material/Close';
import { Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
interface PropsModal {
    displayModal: boolean,
    setDisplayModal: (value: boolean) => void,
}

const AddNewModal: React.FC<PropsModal> = ({ setDisplayModal }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dataColumn = useSelector((state: any) => state.oneSprint.columns)
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
                <div className='heading-modal-add-left'>
                    <div className='heading-modal-add-status'>
                        <div style={{ display: 'flex', alignItems: 'center', width: '160px' }}>
                            <button
                                id="basic-button-status"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ backgroundColor: "orange" }}
                            >
                                OPEN
                            </button>
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
                            <button id="basic-button-next-status" style={{ backgroundColor: "orange" }}><ArrowRightIcon /></button>
                        </div>
                    </div>
                    <div className='heading-modal-add-checkend'>
                        <button className='heading-modal-btn-checkend'><CheckIcon style={{ fontSize: '16px' }} /></button>
                    </div>
                    <div className='heading-modal-assign'>
                        <button className='heading-modal-btnAdd-assign'><PersonOutlineIcon style={{ fontSize: '25px' }} /><AddCircleIcon style={{ position: 'absolute', fontSize: '17px', marginTop: '15px', marginLeft: '-12px', color: '#747272ca' }} /></button>
                    </div>
                    <div className='heading-modal-priority'>
                        <button className='heading-modal-btn-priority'> <TourOutlinedIcon style={{ fontSize: '25px' }} /></button>
                    </div>
                    <div className='heading-modal-setting'>
                        <button className='heading-modal-btn-setting'><MoreHorizIcon style={{ fontSize: '32px' }} /></button>
                    </div>
                </div>
                <div className='left-modal__content'>

                </div>
            </div>
        </div>
    )
}

export default AddNewModal