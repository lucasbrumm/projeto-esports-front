import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { stylesModalDefault } from '../utils/styles'
import { TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { ModalDefaultProps } from '../interfaces/InterfaceComponents'

function ModalDefault({
  openModal,
  setOpenModal,
  titleModal,
  modalText,
  hasInput,
  hasButton,
  action,
  buttonText,
  inputData,
  hasLoading,
  loading,
}: ModalDefaultProps) {
  function closeModal() {
    setOpenModal(false)
  }

  function loadingModal() {
    if (hasLoading) {
      return loading ? (
        <div>
          <Button fullWidth variant='contained' sx={{ mt: 2 }}>
            <CircularProgress size={24} color='inherit' />
          </Button>
        </div>
      ) : (
        <Button
          fullWidth
          variant='contained'
          sx={{ mt: 2 }}
          onClick={action}
          disabled={loading}
        >
          {buttonText}
        </Button>
      )
    } else {
      return (
        <Button fullWidth variant='contained' sx={{ mt: 2 }} onClick={action}>
          {buttonText}
        </Button>
      )
    }
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={stylesModalDefault.style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {titleModal}
          </Typography>

          <Typography id='modal-modal-description' sx={{ mt: 4 }}>
            {modalText}
          </Typography>

          <div
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {hasInput &&
              inputData &&
              inputData?.map((input) => (
                <TextField
                  key={input.id}
                  label={input.label}
                  variant={input.variant}
                  focused={input.focused}
                  inputProps={input.inputProps}
                  fullWidth
                  sx={{ mt: 2 }}
                  type={input.type}
                  value={input.value}
                  onChange={input.onChange}
                  style={input.style}
                  InputProps={input.InputProps}
                />
              ))}

            {hasButton && loadingModal()}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalDefault
