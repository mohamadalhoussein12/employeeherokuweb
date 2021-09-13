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

import { useSelector, useDispatch } from "react-redux";


import { CURRENT_EMPLOYEE } from '../../../actionTypes';

import "./styles.css";

const EmployeeCard = ({ employee, handleDelete, handleEdit }) => {

  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 250,
      marginTop: '20px',
      cursor: "pointer",
      border: '1px solid #b6b6b6',
      '&:hover': {
        transform: 'scale(1.08)',
        // boxShadow: '0 10px 20px rgba(0,0,0,.16), 0 4px 8px rgba(0,0,0,.06)',
        animation: '10px 20px 30px blue 5s infinite',
        border: '1px solid green',
      }
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    typography: {
      backgroundColor: "green",
      color: "white",
      padding: "5px",
      textAlign: "center",
      float: "left",
      marginBottom: "10px"
    },
    email: {
      marginRight: '10px',
    },
    deleteIcon: {
      color: "red",
      float: "right"
    }
    // avatar: {
    //   backgroundColor: red[500],
    // },
  }));

  const onEditClicked = (e) => {
    console.log('edit clicked');
    e.preventDefault();
    dispatch({ type: CURRENT_EMPLOYEE, payload: employee });
    handleEdit(employee._id);
  }

  const onDeleteClicked = (e) => {
    e.preventDefault();
    console.log('on delete clicked inside', e);
    handleDelete(employee._id);
  }

  const classes = useStyles();

  return (
    <Card
      className={classes.root}
    >
      <CardHeader
        action={
          <IconButton aria-label="edit">
          <EditIcon
            onClick={(e) => onEditClicked(e)}
          />
          </IconButton>
        }
        title={employee.name}
        subheader={employee.locationId.name}
      />
      <CardMedia
        className={classes.media}
        image={employee.imageUrl}
        placeholder='logo512.png'
      />
      <CardContent>
        <div>
          <Typography variant="body" className={classes.typography}>
            {employee.departmentId.title}
          </Typography>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={(e) => onDeleteClicked(e)}
          />
        </div>
        <Typography className={classes.email}>
         {employee.email}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default EmployeeCard;
