import React from 'react'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Navigate, useNavigate } from 'react-router-dom';




const SidebarComponent = () => {

    const { collapseSidebar } = useProSidebar(); 
    const navigate = useNavigate();
    return (
        <div>
            <div id="sidebar" style={({ height: "100vh" }, { display: "flex" }, {position: "relative"}, {marginTop: "4rem"})}>
                <Sidebar style={{ height: "100vh" }}>
                    <Menu>
                    <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={() => {
                        collapseSidebar();
                    }}
                    style={{ textAlign: "center" }}
                    >
                    {" "}
                    <h2>Panel</h2>
                    </MenuItem>
                    <MenuItem icon={<HomeOutlinedIcon />} onClick = {() => navigate("/")}>Home</MenuItem>
                    <MenuItem icon={<NoteAddIcon />}>Document</MenuItem>
                    <MenuItem icon={<PostAddIcon />} onClick = {() => navigate("/ClauseLib")}>Clause</MenuItem>
                    <MenuItem icon={<HelpOutlineOutlinedIcon />}>Help</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        </div>
    )
}

export default SidebarComponent