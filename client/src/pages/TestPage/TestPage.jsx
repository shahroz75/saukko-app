// Importing React packages
import React, { useEffect, useState } from 'react';
import useStore from '../../store/zustand/formStore';

// Importing components
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
import InfoList from '../../components/InfoList/InfoList';
import TeacherPerformanceFeedBack from '../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack';

// Importing saukko database
import { fetchAllInternalWorkplaces } from '../../api/workplace';

const TestPage = () => {
  const [workplaces, setWorkplaces] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllInternalWorkplaces();
        setWorkplaces(data);
        console.log('workplace data', data)
      } catch (error) {
        console.error('Error fetching workplaces----------:', error);
      }
    };

    fetchData();
  }, []);
  const {
    password,
    passwordOld,
    passwordVerify,
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  const handleClickOpen = () => {
    setOpenNotificationModal(true);
  };

  const data = [
    {
      title: 'Asiakkaan nimi',
      content: 'Alex Tenerio',
    },
    {
      title: 'Koulutus',
      content: 'Tieto- ja viestintätekniikan perustutkinto',
    },
    {
      title: 'Työpaikka',
      content: 'Lorem ipsum OY',
    },
    {
      title: 'Opettaja',
      content: 'Sanna Virtanen',
    },
    {
      title: 'Ohjaaja',
      content: 'Jonna Koskinen',
    },
  ];

  return (
    <main className='testpage__wrapper'>



      <InfoList title='tiedot' data={data} />

      <section className='testpage__container'>
        <PasswordInput value='passwordOld' label='Vanha salasana *' />
        <PasswordInput value='password' label='Uusi salasana *' />
        <PasswordInput value='passwordVerify' label='Vahvista salasana *' />

        <p>This is the old password: {passwordOld}</p>
        <p>This is the new password: {password}</p>
        <p>This is the verify password: {passwordVerify}</p>
      </section>


      <section>
        <NotificationModal
          type='warning'
          title='Vahvistus ei onnistunut'
          body='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia tempore porro ex repudiandae. Architecto, ad voluptatem! Libero ad harum sint tempore ex enim dignissimos, corporis fugiat quasi veniam! Possimus, iste!'
          open={openNotificationModal}
        />

      </section>
      
      <section>
        <TeacherPerformanceFeedBack
          columnTitle={'osa'}></TeacherPerformanceFeedBack>

      </section>

      <div>
        <h1>Workplace data</h1>
        <ul>
          {workplaces.map((workplace) => (
            <li key={workplace.id}>
              Name: {workplace?.name}
              Business ID: {workplace?.businessId}
              <ul>
                {workplace.departments.map((department) => (
                  <li key={department._id}>
                    Department Name: {department.name}
                    <ul>
                      {department.supervisors.map((supervisor, index) => (
                        <li key={index}>
                          Supervisor {index + 1}:
                          <ul>
                            <li>First Name: {supervisor.firstName}</li>
                            <li>Last Name: {supervisor.lastName}</li>
                            <li>Email: {supervisor.email}</li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

    </main>
  );
};

export default TestPage;


