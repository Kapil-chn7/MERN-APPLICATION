import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Form from 'react-bootstrap/Form'

import { useStyles } from '../CommonCss'

export default function AlertDialog({
  setDimentions,
  dimentions,
  plotArea,
  facing,
  setPlotArea,
  setFacing,
  indexNo,
}) {



  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdate = () => {


    if (dimentions) {
      const newArr = dimentions.map((obj, index) => {
        if (index === indexNo) {
          return {
            PlotArea: plotArea,
            Facing: facing,
          }
        }

        return obj
      })

    

      setDimentions([...newArr])
    }

    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      

        <DialogContent>
          {setDimentions && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
              }}
            >
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Form.Label className={classes.label}>Plot size </Form.Label>

                <OutlinedInput
                  startAdornment={<InputAdornment position="start">Sq.Yards</InputAdornment>}
                  defaultValue={dimentions[indexNo].PlotArea ? dimentions[indexNo].PlotArea : ' '}
                  onChange={(event) => {
                    setPlotArea(event.target.value)
                  }}
                />
              </FormControl>

              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Form.Label className={classes.label}>Facing</Form.Label>

                <Select
                  defaultValue={dimentions[indexNo].Facing ? dimentions[indexNo].Facing  : ' '}
                  onChange={(event) => {
                    setFacing(event.target.value)
                  }}
                >
                  <MenuItem value="">
                    <em>--Select--</em>
                  </MenuItem>
                  <MenuItem value="East">East</MenuItem>
                  <MenuItem value="West">West</MenuItem>
                  <MenuItem value="South">South</MenuItem>
                  <MenuItem value="North">North</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
