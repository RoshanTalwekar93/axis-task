import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Search,
  FilterList,
  Settings,
  MoreVert,
  Add,
  AccessTime,
  Notifications,
  GridView,
} from "@mui/icons-material";

export default function TransactionTable({ transactions }) {
  const [selectedRows, setSelectedRows] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  
  console.log(transactions);
  const totalPages = Math.ceil(transactions.length / limit);
  console.log(totalPages);

  const start = (currentPage - 1) * limit;
  const slicedTransactions = transactions.slice(start, start + limit);
  console.log(slicedTransactions)

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(slicedTransactions.map((t) => t.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  return (
    <>
      <div className="flex-1 overflow-auto px-6 py-4">
        <TableContainer
          component={Paper}
          elevation={0}
          className="border border-gray-200"
          sx={{borderRadius : "12px"}}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                  sx={{'&.Mui-checked' : {color : "#7839CD"}, '&.MuiCheckbox-indeterminate':{color : "#7839CD"}}}
                    checked={selectedRows.length === slicedTransactions.length}
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < slicedTransactions.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{fontWeight : "600"}}>Index#</TableCell>
                <TableCell sx={{fontWeight : "600"}}>File Number</TableCell>
                <TableCell sx={{fontWeight : "600"}}>Matter</TableCell>
                <TableCell sx={{fontWeight : "600"}}>Payee/Payer</TableCell>
                <TableCell sx={{fontWeight : "600"}}>Trans Date</TableCell>
                <TableCell sx={{fontWeight : "600"}}>Type</TableCell>
                <TableCell sx={{fontWeight : "600"}}>Clear Date</TableCell>
                <TableCell sx={{fontWeight : "600"}}>Amount</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedTransactions.length > 0 ? (
                slicedTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    hover
                    selected={selectedRows.includes(transaction.id)}
                  >
                    <TableCell>
                      <Checkbox
                      sx={{'&.Mui-checked' : {color : "#7839CD"}}}
                        checked={selectedRows.includes(transaction.id)}
                        onChange={() => handleSelectOne(transaction.id)}
                      />
                    </TableCell>
                    <TableCell>{transaction.index}</TableCell>
                    <TableCell className="text-sm">
                      {transaction.fileNumber}
                    </TableCell>
                    <TableCell className="text-sm">
                      {transaction.matter}
                    </TableCell>
                    <TableCell className="text-sm">
                      {transaction.payee}
                    </TableCell>
                    <TableCell className="text-sm">
                      {transaction.transDate}
                    </TableCell>
                    <TableCell className="text-sm">
                      {transaction.type}
                    </TableCell>
                    <TableCell className="text-sm">
                      {transaction.clearDate}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {transaction.amount}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    align="center"
                    className="text-gray-500 py-8"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {totalPages >= 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {Array.from({length : totalPages}).map((_, page) => {
              const pageNumber = page + 1
              return(
              <button
                key={pageNumber}
                className={`w-8 h-8 rounded ${
                  pageNumber === currentPage
                    ? "bg-gray-100 text-gray-700 border border-gray-200 rounded-lg bg-gray-100"
                    : "text-gray-700 hover:bg-gray-100 hover:border hover:border-gray-200 hover:rounded-lg"
                } text-sm font-medium`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )})}
          </div>
        )}
      </div>
    </>
  );
}
