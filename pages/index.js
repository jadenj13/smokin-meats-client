import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from '../components/Carousel';

const useStyles = makeStyles(theme => ({
  root: {},
  carousel: {
    marginTop: theme.spacing(4),
  },
}));

const Home = props => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.carousel}>
        <Carousel slides={props.slides} />
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  return {
    slides: [
      {
        imgUrl:
          'https://www.traegergrills.com/images/en-us/Shared/images/recipes/banners/Pork/20180913_3-2-1-Baby-Back-Ribs_RE_HE',
        heading: '3-2-1 St. Louis Ribs',
        href: '/recipes',
        description:
          'Pack your rack with wood-fired flavor. Rubbed down with Pork & Poultry seasoning, smoked, spritzed, and sauced for the perfect finish, these ribs are…',
      },
      {
        imgUrl:
          'https://www.traegergrills.com/images/en-us/Recipes/2019/April2019/Traeger_Pulled_Pork_RE_HE.jpg',
        heading: 'Pulled Pork',
        href: '/recipes',
        description:
          'This isn’t your typical campsite classic. Our tinfoil dinners are packed with tender stew meat, potatoes, peppers, herbs & seasonings, then topped with a…',
      },
      {
        imgUrl:
          'https://www.traegergrills.com/images/en-us/Shared/images/recipes/banners/Beef/Traeger-BBQ-Brisket_Traeger-Wood-Fired-Grills_RE_HE.jpg',
        heading: 'Whole Packer Brisket',
        href: '/recipes',
        description:
          'Say hello to bold hickory hardwood flavor. This brisket is given a Traeger Beef Rub coating then smoked low n’ slow to tender perfection.',
      },
    ],
  };
};

Home.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Home;
