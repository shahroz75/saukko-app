import React from 'react';
import rightAngle from '../../assets/angle-right.svg';
import circle from '../../assets/circle-icone.svg';

const MessagePreview = (props) => {

  const { name, role, subtitle, unit, dateTime, } = props
  return (
    <main className='unitstatus-wrapper' style={{ color: '#E5EFF8' }}>
      <div className='unitstatus'>
        <div>{circle}</div>
        <h1>{name} ({role})</h1>

        <Link to={link}><img className="right-angle-icon" src={rightAngle} alt="Angle Icone" /></Link>

      </div>

      {subheader && <h2>vastasi {subtitle}  25op kysymykseen.</h2>}
      <div>
        {dateTime}
      </div>

    </main>
  );
};

export default MessagePreview;

