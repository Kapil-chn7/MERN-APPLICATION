import { Container } from '@material-ui/core'
import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'

import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'

import { makeStyles } from '@material-ui/core/styles'
const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  )
const useStyles = makeStyles((theme) => ({
    
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: '50%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}))

const AddRelaManager = () => {
  const classes = useStyles()
  const [errors, setErrors] = useState({
    emailError: '',
    nameerror: '',
   
  })
  const [age, setAge] = React.useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="on"
      style={{
        marginBottom: '5rem',
        padding: '10px 30px 0 10px',
        background: 'white',
      }}
    >
      <div>Id</div>
      <div className="d-flex">
        Name <div style={{ color: 'red' }}> *</div>
      </div>
      <input style={{padding:"10px"}} id="outlined-basic" variant="outlined" />

      <div className="d-flex">
        Email <div style={{ color: 'red' }}> *</div>
      </div>

      <input style={{padding:"10px"}} id="outlined-multiline-static" multiline rows={4} variant="outlined" />
      <div className="d-flex">
        Mobile No <div style={{ color: 'red' }}> *</div>
      </div>
      <input style={{padding:"10px"}}></input>
      <div className="d-flex">
        Address <div style={{ color: 'red' }}> *</div>
      </div>

      <TextField id="outlined-basic" variant="outlined" />
      <div className="d-flex">
        Please Select state <div style={{ color: 'red' }}> *</div>
      </div>

      <div >
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Maharashtra</MenuItem>
            <MenuItem value={20}>Telangana</MenuItem>
            <MenuItem value={30}>Panjab</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="d-flex">
        Please Select state <div style={{ color: 'red' }}> *</div>
      </div>

      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Pune</MenuItem>
            <MenuItem value={20}>Ahemednagar</MenuItem>
            <MenuItem value={30}>Aurangabad</MenuItem>
          </Select>
        </FormControl>
      </div>
      
      <div className="d-flex">
      Please Upload your land image<div style={{ color: 'red' }}> *</div>
      <input  type="file" id="img" name="img" accept="image/*" />

      </div>
       
      
      <div style={{ display: 'flex', justifyContent: 'end', padding: '10px' }}>
        <button className="btn btn-primary">Submit Form</button>
      </div>
    </form>
  )
}

export default AddRelaManager
