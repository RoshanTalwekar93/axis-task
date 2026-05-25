import {
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
} from "@mui/material";
import { Search, AccessTime, Notifications } from "@mui/icons-material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-[24px] py-[16px] h-[80px]">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4 flex-1 h-[48px]">
          <TextField
            placeholder="Global Search"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: "352px", '& .MuiOutlinedInput-root' :{ height : "46px", borderRadius : "8px", borderColor : "#E4E4E4"} }}
          />
        </div>
        <div className="flex items-center gap-5 h-[48px]">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#E9FFEF] border-1 border-[#409261] rounded-lg h-[38px]">
            <AccessTime fontSize="small" className="text-[#409261]" />
            <span className="text-base text-[#409261]">00:00:00</span>
          </div>
          <IconButton size="small">
            <HelpOutlineOutlinedIcon fontSize="medium" />
          </IconButton>
          <IconButton size="small">
            <NotificationsOutlinedIcon fontSize="medium" />
          </IconButton>
          <div className="flex items-center h-[38px] border-1 text-[#E4E4E4] bg-[#E4E4E4]">
          </div>
          <Avatar alt="R" src="https://i.pravatar.cc/32" sx={{ width: "32px", height: "32px" }} />
        </div>
      </div>
    </div>
  );
}
