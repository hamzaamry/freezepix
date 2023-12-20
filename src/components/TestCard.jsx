import React from 'react';
import { styled } from "@mui/system";

const useStyles = styled((theme) => ({
  container: {
    width: '1200px',
    margin: '0 auto',
    padding: '0',

    [theme.breakpoints.between(992, 1439)]: {
      maxWidth: '1279px',
      margin: '0 80px',
    },

    [theme.breakpoints.down(991)]: {
      maxWidth: '959px',
    },
  },
  gradientCards: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  card: {
    width: 'calc(33.333% - 20px)',
    marginBottom: '20px',

    [theme.breakpoints.down(767)]: {
      width: '100%',
    },
  },
  containerCard: {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    color: '#ffffff',

    '& svg': {
      width: '80px',
      height: '80px',
    },

    '& p': {
      margin: 0,
    },
  },
  bgGreenBox: {
    backgroundImage: 'linear-gradient(140deg, #2FCB89 30%, #1A3E31)',
  },
  bgWhiteBox: {
    backgroundImage: 'linear-gradient(140deg, #FFFFFF 30%, #363437)',
  },
  bgYellowBox: {
    backgroundImage: 'linear-gradient(140deg, #FFEE24 30%, #302A1A)',
  },
  bgBlueBox: {
    backgroundImage: 'linear-gradient(140deg, #61A0FF 30%, #16161D)',
  },
}));

const CardComponent = ({ title, description, gradientClass, svgContent }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.card}`}>
      <div className={`${classes.containerCard} ${gradientClass}`}>
        {svgContent}
        <p className="card-title">{title}</p>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

const TestCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.gradientCards}>
        <CardComponent
          title="Zero-cost Possibilities"
          description="Hubble lets users borrow USDH for a one-time 0.5% fee. No variable rates. No interest charged, ever."
          gradientClass={classes.bgGreenBox}
          
        />
        <CardComponent
          title="Multi-Asset Collateral"
          description="Deposit a variety of assets on Hubble, raise your collateral ratio, and unlock the liquidity in your wallet."
          gradientClass={classes.bgWhiteBox}
          
        />
        <CardComponent
          title="Get Yield on Deposits"
          description="While your collateral is deposited, delegate it to earn the highest yield available in the Solana ecosystem."
          gradientClass={classes.bgYellowBox}
          
        />
        <CardComponent
          title="Get up to 11x Leverage"
          description="Hubble’s capital-efficient 110% collateral ratio lets users leverage up to 11x on their deposits."
          gradientClass={classes.bgBlueBox}
          
        />
      </div>
    </div>
  );
};

export default TestCard;
