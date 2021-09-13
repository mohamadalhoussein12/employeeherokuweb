// libraries
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// marerial ui
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

// constants
import { CURRENT_EMPLOYEE } from '../../../actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    marginTop: '20px',
    cursor: 'pointer',
    border: '1px solid #b6b6b6',
    '&:hover': {
      transform: 'scale(1.08)',
      animation: '10px 20px 30px blue 5s infinite',
      border: '1px solid green',
    },
    '& .MuiCardHeader-content': {
      'whiteSpace': 'nowrap',
      'overflow': 'hidden !important',
      'textOverflow': 'ellipsis',
      'width': '90%'
    },
    '& .MuiCardHeader-title': {
      'overflow': 'hidden !important',
      'textOverflow': 'ellipsis',
    }
  },
  media: {
    paddingTop: '60%',
  },
  typography: {
    backgroundColor: 'green',
    color: 'white',
    padding: '5px',
    textAlign: 'center',
    float: 'left',
    marginBottom: '10px'
  },
  deleteIcon: {
    color: 'red',
    float: 'right'
  }
}));
const EmployeeCard = ({ employee, onDeleteClick, onEditClick }) => {

  const dispatch = useDispatch();

  const handleEditClick = (e) => {
    e.preventDefault();
    dispatch({ type: CURRENT_EMPLOYEE, payload: employee });
    onEditClick(employee._id);
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDeleteClick(employee._id);
  }

  const classes = useStyles();

  return (
    <Card
      className={classes.root}
    >
      <CardHeader
        action={
          <IconButton aria-label='edit'>
          <EditIcon
            onClick={(e) => handleEditClick(e)}
          />
          </IconButton>
        }
        title={employee.name}
        subheader={employee.locationId.name}
      />
      <CardMedia
        className={classes.media}
        image={employee.imageUrl}
      />
      <CardContent>
        <div>
          <Typography variant='body' className={classes.typography}>
            {employee.departmentId.title}
          </Typography>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={(e) => handleDeleteClick(e)}
          />
        </div>
        <Typography>
         {employee.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

// default props
EmployeeCard.defaultProps = {
  employee: {
    name: '',
    email: '',
    departmentId: {
      _id: 0,
      name: ''
    },
    locationId: {
      _id: 0,
      name: ''
    }
  }
}

//prop types
EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
}
export default EmployeeCard;
