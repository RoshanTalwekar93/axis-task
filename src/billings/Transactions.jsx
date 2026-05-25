import React, { useState } from "react";
import TheatersRoundedIcon from "@mui/icons-material/TheatersRounded";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import TransactionTable from "./TransactionTables";
import TransactionModal from "./TransactionModal";

export default function Transactions() {
  const [openModal, setOpenModal] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      index: "0012023",
      fileNumber: "THNCOI-17891-2023",
      matter: "Rent Act Matters",
      payee: "Oliver Elijah",
      transDate: "05/27/15",
      type: "Deposit",
      clearDate: "05/27/15",
      amount: "200.00",
    },
    {
      id: 2,
      index: "0022023",
      fileNumber: "THNCOI-14899-2023",
      matter: "Policy Matters",
      payee: "Samuel Jackson",
      transDate: "05/26/15",
      type: "Withdrawal",
      clearDate: "05/26/15",
      amount: "285.00",
    },
  ]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddTransaction = (formData) => {
    console.log(formData);

    const newId = transactions.length + 1;
    const newIndex = `${String(newId).padStart(3, "0")}2026`;

    const newTransaction = {
      id: newId,
      index: newIndex,
      ...formData,
    };
    console.log(newTransaction);

    setTransactions([...transactions,newTransaction]);
  };
  
  return (
    <>
      <div className="h-[100px] flex justify-between border-b border-gray-200 px-[24px]">
        <div className="py-2 flex flex-col gap-5 ">
          <div className="text-sm text-[#474747]">
            <span className="font-semibold">Billing</span> / Bank / Transaction
          </div>
          <div className="text-xl font-semibold">Transaction</div>
        </div>
        <div className="py-2 flex items-center gap-5">
          <div className="text-sm text-[#474747] border-1 border-gray-200 rounded-md w-[46px] h-[46px] p-2 flex items-center justify-center">
            <TheatersRoundedIcon fontSize="medium" />
          </div>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{
              width: "218px",
              height: "48px",
              backgroundColor: "#7839CD",
              borderRadius: "8px",
              boxShadow: "none",
            }}
          >
            Add Transactions
          </Button>
        </div>
      </div>
      <div className="h-[80px] flex justify-between px-[24px] py-[16px] ">
        <div className="flex items-center gap-4 flex-1 h-[48px]">
          <div className="flex items-center gap-4">
            <TextField
              placeholder="Search Transactions"
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
              className="rounded-lg"
              sx={{
                width: "352px",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  height: "46px",
                  borderRadius: "8px",
                  borderColor: "#E4E4E4",
                },
              }}
            />
            <Button
              variant="outlined"
              sx={{
                width: "107px",
                height: "48px",
                borderColor: "#E4E4E4",
                color: "#534D59",
                borderRadius: "8px",
                boxShadow: "none",
                textTransform: "none",
              }}
              endIcon={
                <FilterAltOutlinedIcon
                  sx={{ color: "#534D59" }}
                  fontSize="large"
                />
              }
            >
              Filter
            </Button>
          </div>
        </div>
        <div>
          <Button
            variant="outlined"
            sx={{
              width: "129px",
              height: "48px",
              borderColor: "#E4E4E4",
              color: "#534D59",
              borderRadius: "8px",
              boxShadow: "none",
              textTransform: "none",
            }}
            endIcon={
              <SettingsOutlinedIcon
                sx={{ color: "#534D59" }}
                fontSize="large"
              />
            }
          >
            Settings
          </Button>
        </div>
      </div>
      <div className="h-full bg-[#f9fafb]">
        <TransactionTable transactions={transactions} />
      </div>

      <TransactionModal
        open={openModal}
        onClose={handleCloseModal}
        handleAddTransaction={handleAddTransaction}
      />
    </>
  );
}
