import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '5rem',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '2rem',

    '& > *': {
      margin: theme.spacing(1),
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
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
  commonclass: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
  },
  boxShadow: {
    padding: '1rem',
    background: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  sectionOne: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionTwo: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  mandatory: {
    color: 'red',
  },
  table: {
    minWidth: 400,
    border:"2px solid black",
    marginTop:"2rem"
  },
}))
