import { Alert, Snackbar } from '@mui/material'

interface SnackBarErrorDefaultProps {
  openError: boolean
  setOpenError: (value: boolean) => void
  error: { mensagem: string; tipo: 'success' | 'warning' | 'error' }
  setError: (value: {
    mensagem: string
    tipo: 'success' | 'warning' | 'error'
  }) => void
}

function SnackBarErrorDefault({
  openError,
  setOpenError,
  error,
  setError,
}: SnackBarErrorDefaultProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={openError}
      autoHideDuration={5000}
      onClose={() => setOpenError(false)}
    >
      <Alert
        onClose={() => setOpenError(false)}
        severity={error.tipo}
        sx={{ width: '100%' }}
      >
        {error.mensagem}
      </Alert>
    </Snackbar>
  )
}

export default SnackBarErrorDefault
