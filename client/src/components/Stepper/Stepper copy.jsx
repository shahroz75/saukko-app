import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import DegreeContext from '../../utils/context/DegreeContext';

const Stepper = ({ activePage, label }) => {
  const navigate = useNavigate();

  // Get degree from DegreeContext
  const { degree } = useContext(DegreeContext);

  return (
    <div className='stepper__wrapper'>
      <div className='stepper__wrapper--numbers'>
        <div className={`circle ${activePage === 1 ? 'active' : 'done'}`}>
          {activePage === 1 ? (
            <span className={`number ${activePage >= 1 ? 'active' : ''}`}>
              1
            </span>
          ) : (
            <Icon icon='mdi:tick' color='white' />
          )}
        </div>
        <div className={`line ${activePage >= 2 ? 'active' : ''}`} />
        <div
          className={`circle ${activePage === 2 ? 'active' : ''} ${
            activePage >= 3 ? 'done' : ''
          }`}
        >
          {activePage <= 2 ? (
            <span className={`number ${activePage >= 2 ? 'active' : ''}`}>
              2
            </span>
          ) : (
            <Icon icon='mdi:tick' color='white' />
          )}
        </div>
        <div className={`line ${activePage >= 3 ? 'active' : ''}`} />
        <div className={`circle ${activePage >= 3 ? 'active' : ''}`}>
          <span className={`number ${activePage === 3 ? 'active' : ''}`}>
            3
          </span>
        </div>
        <div className={`line ${activePage >= 4 ? 'active' : ''}`} />
        <div className={`circle ${activePage >= 4 ? 'active' : ''}`}>
          <span className={`number ${activePage === 4 ? 'active' : ''}`}>
            4
          </span>
        </div>
      </div>
      <div>
        <div className='stepper__wrapper--text'>
          <span
            className={`page-text ${activePage >= 1 ? 'active' : ''}`}
            onClick={() => navigate(`/degrees/${degree._id}`)}
          >
            {label[0]}
          </span>
          <span
            className={`page-text ${activePage >= 2 ? 'active' : ''}`}
            onClick={() => navigate(`/degrees/${degree._id}/units`)}
          >
            {label[1]}
          </span>
          <span
            className={`page-text ${activePage === 3 ? 'active' : ''}`}
            onClick={() =>
              navigate(`/degrees/${degree._id}/units/confirm-selection`)
            }
          >
            {label[2]}
          </span>
          <span
            className={`page-text ${activePage === 4 ? 'active' : ''}`}
            onClick={() =>
              navigate(`/degrees/${degree._id}/units/confirm-selection`)
            }
          >
            {label[3]}
          </span>
        </div>
      </div>
    </div>
  );
};

Stepper.propTypes = {
  activePage: PropTypes.number.isRequired,
  labelStepper: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Stepper;
