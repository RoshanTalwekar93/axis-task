import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import phoenixlogo from "../assets/phoenixlogo.png";

export default function SideBar({tabItem,setTabItem}) {
  const [selectedItem, setSelectedItem] = useState("Billing");

  const navBarItems = [
    { title: "Dashboard", icon: <GridViewOutlinedIcon /> },
    { title: "Matters", icon: <FolderOutlinedIcon /> },
    { title: "Billing", icon: <MonetizationOnOutlinedIcon /> },
    { title: "Activity", icon: <ShowChartOutlinedIcon /> },
    { title: "Reports", icon: <BarChartOutlinedIcon /> },
    { title: "Clients", icon: <FolderSharedOutlinedIcon /> },
    { title: "Settings", icon: <SettingsOutlinedIcon /> },
  ];

  const handleTabItem =(title)=>{
    setSelectedItem(title);
    setTabItem(title)
  }

  
  return (
    <div>
      <Toolbar>
        <img src={phoenixlogo} alt="Phoenix Logo" style={{ height: "60px", marginBottom: "20px" }} />
      </Toolbar>
      <List>
        {navBarItems.map((item, index) => {
          const isSelected = selectedItem === item.title;
          return (
            <ListItem key={item.title} sx={{padding : "10px 10px"}}>
              <ListItemButton
                selected={isSelected}
                onClick={() => handleTabItem(item.title)}
                sx={{
                  borderRadius: "6px",
                  color: isSelected ? "#7839CD" : "#474747",
                  backgroundColor: "transparent",
                  "& .MuiListItemIcon-root": {
                    color: isSelected ? "#7839CD" : "#474747",
                  },
                  "&:hover": {
                    backgroundColor: "#f1eefe",
                    color: "#7839CD",
                  },
                  "&:hover": {
                    backgroundColor: "#f1eefe",
                    color: "#7839CD",
                    "& .MuiListItemIcon-root": {
                      color: "#7839CD",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
