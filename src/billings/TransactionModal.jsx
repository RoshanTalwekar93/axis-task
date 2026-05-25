import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const schema = yup.object().shape({
  fileNumber: yup.string().required('File Number is required'),
  matter: yup.string().required('Matter is required'),
  payee: yup.string().required('Payee/Payer is required'),
  type: yup.string().required('Type is required'),
  transDate: yup.date().required('Transaction Date is required'),
  clearDate: yup.date().required('Clear Date is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .typeError('Amount must be a number'),
});

export default function TransactionModal({ open, onClose, handleAddTransaction }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fileNumber: '',
      matter: '',
      payee: '',
      type: '',
      transDate: null,
      clearDate: null,
      amount: '',
    },
  });

  const handleFormSubmit = (data) => {
    console.log(data);
    // const currentYear = new Date().getFullYear();
    const formattedData = {
      ...data,
      // fileNumber : `THNCOI-${data.fileNumber}-${currentYear}`,
      transDate: dayjs(data.transDate).format('MM/DD/YY'),
      clearDate: dayjs(data.clearDate).format('MM/DD/YY'),
      amount: parseFloat(data.amount).toFixed(2),
    };
    
    console.log(formattedData);
    
    handleAddTransaction(formattedData);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const matterTypes = [
    { value: 'Rent Act Matters', label: 'Rent Act Matters' },
    { value: 'Labour Matters', label: 'Labour Matters' },
    { value: 'Family Law Matters', label: 'Family Law Matters' },
    { value: 'Direct Taxes Matters', label: 'Direct Taxes Matters' },
    { value: 'Criminal Matters', label: 'Criminal Matters' },
    { value: 'Election Matters', label: 'Election Matters' },
    { value: 'Service Matters', label: 'Service Matters' },
  ];

  const transactionTypes = [
    { value: 'Deposit', label: 'Deposit' },
    { value: 'Withdrawal', label: 'Withdrawal' },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '8px',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '16px',
            backgroundColor: "#E4E4E4"
          }}
        >
          <span className="text-xl font-semibold">Add Transaction</span>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogContent dividers sx={{ padding: '24px' }}>
            <Grid container spacing={3}>

              <Grid item size={6}>
                <Controller
                  name="fileNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="File Number"
                      fullWidth
                      error={!!errors.fileNumber}
                      helperText={errors.fileNumber?.message}
                      placeholder="THNCOI-XXXXX-YYYY"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item size={6}>
                <Controller
                  name="matter"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Matter"
                      fullWidth
                      error={!!errors.matter}
                      helperText={errors.matter?.message}
                      placeholder="Enter matter type"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    >
                      {matterTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                      </TextField>
                  )}
                />
              </Grid>

              <Grid item size={6}>
                <Controller
                  name="payee"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Payee/Payer"
                      fullWidth
                      error={!!errors.payee}
                      helperText={errors.payee?.message}
                      placeholder="Enter payee name"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item size={6}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Type"
                      fullWidth
                      error={!!errors.type}
                      helperText={errors.type?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    >
                      {transactionTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item size={6}>
                <Controller
                  name="transDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Transaction Date"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.transDate,
                          helperText: errors.transDate?.message,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            },
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item size={6}>
                <Controller
                  name="clearDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Clear Date"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.clearDate,
                          helperText: errors.clearDate?.message,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            },
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item size={6}>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Amount"
                      fullWidth
                      type="number"
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                      placeholder="0.00"
                      inputProps={{
                        step: '0.01',
                        min: '0',
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ padding: '16px 24px' }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                borderColor: '#E4E4E4',
                color: '#534D59',
                paddingX: '24px',
                paddingY: '10px',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                backgroundColor: '#7839CD',
                paddingX: '24px',
                paddingY: '10px',
                '&:hover': {
                  backgroundColor: '#6527b8',
                },
              }}
            >
              Add Transaction
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
}
