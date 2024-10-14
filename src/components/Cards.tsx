import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import '../pages/home/home.css'
import { CardProps } from '../interfaces/InterfaceComponents'

export default function Cards({ data }: CardProps) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      {/* padding dos cards default 12 */}
      <Grid item xs={0}>
        <Grid container justifyContent='center' spacing={12}>
          {data?.map((value, index) => (
            <Grid item key={index}>
              <Paper
                sx={{
                  height: 280,
                  width: 250,
                  boxShadow: '0px 0px 5px rgba(0, 0, 0, 2)',
                  border: '3px solid black',
                }}
              >
                <div className='icons-cards-home'>
                  <div style={{ paddingTop: 45 }}>{value.icon}</div>
                  <div className='text-cards-home'>{value.text} </div>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
