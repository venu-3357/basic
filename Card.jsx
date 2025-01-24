import React from 'react';
import classes from './Card.module.scss';

const Card = ({ headerTitle, icon, children, subHeader, isBordered }) => {
  return (
    <div
      className={
        isBordered ? `${classes.cardContainer} h-100` : `${classes.cardBorderLessContainer} h-100`
      }
    >
      <div className={`${classes.cardHeader} mb-1`}>
        <h6 className={`${classes.cardTitle}`}>{headerTitle}</h6>
        <div className={`${classes.iconContainer}`}>
          <img src={icon} alt="card-icon" />
        </div>
      </div>
      <div className={`${classes.cardSubHeaderWrapper}`}>
        <p className={`${classes.cardSubHeader} pb-2`}>{subHeader}</p>
      </div>
      <div className={`${classes.cardBody}`}>{children}</div>
    </div>
  );
};

export default Card;
