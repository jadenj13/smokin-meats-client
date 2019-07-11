import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {},
  img: {
    display: 'block',
    width: '100%',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#373737',
    color: '#fff',
    padding: theme.spacing(4),
  },
}));

const Carousel = props => {
  const classes = useStyles();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = props.slides[activeSlideIndex];

  useEffect(() => {
    setTimeout(() => {
      const nextSlideIndex =
        activeSlideIndex === props.slides.length - 1 ? 0 : activeSlideIndex + 1;
      setActiveSlideIndex(nextSlideIndex);
    }, 10000);
  });

  return (
    <div className={classes.root}>
      <SwitchTransition>
        <CSSTransition
          classNames="fade"
          timeout={800}
          key={activeSlide.heading}
        >
          <div>
            <Link href={activeSlide.href}>
              <a>
                <img
                  src={activeSlide.imgUrl}
                  alt={activeSlide.heading}
                  className={classes.img}
                />
                <div className={classes.textContainer}>
                  <Typography variant="h3">{activeSlide.heading}</Typography>
                  <Typography variant="h6">
                    {activeSlide.description}
                  </Typography>
                </div>
              </a>
            </Link>
          </div>
        </CSSTransition>
      </SwitchTransition>

      <style jsx>{`
        .fade-enter {
          opacity: 0.01;
        }

        .fade-enter.fade-enter-active {
          opacity: 1;
          transition: opacity 800ms ease-in;
        }

        .fade-leave {
          opacity: 1;
        }

        .fade-leave.fade-leave-active {
          opacity: 0.01;
          transition: opacity 800ms ease-in;
        }
      `}</style>
    </div>
  );
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carousel;
