import classes from "./PlaceName.module.css";

const PlaceName = ({title}) => {
  return (
    <h3 className={classes.title}>
      {title}
    </h3>
  )
}

export default PlaceName