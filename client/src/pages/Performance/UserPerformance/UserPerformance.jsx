import React, { useContext, useState } from 'react';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import PerformancesFeedback from '../../../components/PerformaceFeedback/PerformancesFeedback/PerformancesFeedback';
import Button from '../../../components/Button/Button';
import TeacherPerformanceFeedBack from '../../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack';
import useStore from '../../../store/zustand/formStore';
import AuthContext from '../../../store/context/AuthContext';

const UserPerformance = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const mockdata = [
    {
      title: 'Opiskelija toimii tieto- ja viestintätekniikan työtehtävissä',
    },
    {
      title: 'Opiskelija tekee tiedonhakua ja ratkaisee tieto- ja viestintätekniikan ongelmia',
    },
    {
      title: 'Opiskelija käyttää tietoteknistä ympäristöä',
    },
  ];

  const buttonStyle = {
    color: 'var(--saukko-main-white)',
    border: 'var(--saukko-main-black)',
    background: '#0000BF',
    marginTop: '35px',
    marginLeft: '20px',
    width: '88%',
  };

  const { openNotificationModal, setOpenNotificationModal } = useStore();

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };

  const handleSubmit = () => {
    setIsButtonEnabled(true);
    handleNotificationModalOpen();
    // Perform other submission logic here
  };

  return (
    <main>
      <div>
        <WavesHeader title="Saukko" secondTitle={`Tervetuloa, ${user?.firstName}`} />
      </div>
      <h2 style={{ textAlign: 'center', fontSize: '18px', textDecoration: 'underline', marginTop: '58%' }}>
        Ammattitaitovaatimukset
      </h2>

      <div>
        <ul>
          {mockdata.map((data, index) => (
            <li key={index}>
              <p className='para-title-style'>{data.title}</p>
              {user?.role === 'teacher' ? <TeacherPerformanceFeedBack /> : <PerformancesFeedback />}
            </li>
          ))}
        </ul>
      </div>
      <h2 style={{ textAlign: 'center', fontSize: '18px', textDecoration: 'underline', marginTop: '40px' }}> </h2>
      <form action="">
        <p className='para-title-style'>{user?.role === 'customer' ? "Lisätietoa" : "Palaute"}</p>
        <textarea
          rows={8}
          cols={38}
          style={{ width: '87%', padding: '5px' }}
          className='para-title-style'
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
      </form>

      <section>
        <Button
          style={buttonStyle}
          type='submit'
          text='Lähetä'
          onClick={handleSubmit}
        />
      </section>
      <div style={{ marginBottom: '90px' }}>
        <UserNav></UserNav>
      </div>
      <NotificationModal
        type='success'
        title='Lähetetty'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}
      />
    </main>
  );
};

export default UserPerformance;













