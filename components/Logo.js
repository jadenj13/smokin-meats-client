import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  img: {
    backgroundColor: '#fff',
  },
});

const Logo = ({ size }) => {
  const classes = useStyles();
  const width = size === 'lg' ? 200 : size === 'sm' ? 100 : 150;

  return (
    <div className={classes.root}>
      <img
        src="/static/logo.png"
        alt="Let's Get Smokin"
        width={width}
        className={classes.img}
      />
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.string,
};

export default Logo;
