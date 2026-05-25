import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Header from "./Header";
import SideBar from "./SideBar";
import Transactions from "../billings/Transactions";

export default function Dashboard() {
  const [tab, setTab] = useState("Billing");

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - 262px)` },
          ml: { sm: "262px" },
        }}
        elevation={0}
      >
        <Header />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: "262px" }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "262px",
            },
          }}
          open
        >
          <SideBar setTabItem={setTab} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          //   p: 3,
          py: 3,
          position : "absolute",
          left: "262px",
          // height : {sm: `calc(100% - 80px)`  },
          width: { sm: `calc(100% - 262px)` },
        }}
      >
        <Toolbar />
        {tab === "Billing" ? <Transactions /> : "Choose correct tab"}
      </Box>
    </Box>
  );
}
