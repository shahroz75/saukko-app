import React, { useContext, useState, useEffect } from 'react';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import PerformancesFeedback from '../../../components/PerformaceFeedback/PerformancesFeedback/PerformancesFeedback';
import Button from '../../../components/Button/Button';
import TeacherPerformanceFeedBack from '../../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack';
import useStore from '../../../store/zustand/formStore';
import AuthContext from '../../../store/context/AuthContext';
import { Icon } from '@iconify/react';
import CriteriaModal from '../../../components/CriteriaModal/CriteriaModal';
import {
  fetchEvaluationById,
  updateEvaluationById,
} from '../../../api/evaluation';
import InternalApiContext from '../../../store/context/InternalApiContext';

const useFetchData = (evaluationId) => {
  const [ownEvaluation, setOwnEvaluation] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchEvaluationById(`${evaluationId}`);
      setOwnEvaluation(response.units);
    };
    fetchData();
  }, [evaluationId]);
  return ownEvaluation;
};

const UserPerformance = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const { evaluation } = useContext(InternalApiContext);
  const evaluationId = evaluation._id;
  const [selectedValues, setSelectedValues] = useState([]);
  const { openNotificationModal, setOpenNotificationModal } = useStore();
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);
  const ownEvaluation = useFetchData(evaluationId);
  // Add a state for error
  const [error, setError] = useState(null);

  const handleOpenCriteriaModal = () => {
    setIsCriteriaModalOpen(true);
  };

  const handleCloseCriteriaModal = () => {
    setIsCriteriaModalOpen(false);
  };

  const buttonStyle = {
    color: 'var(--saukko-main-white)',
    border: 'var(--saukko-main-black)',
    background: '#0000BF',
    marginTop: '35px',
    marginLeft: '20px',
    width: '88%',
  };

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };

  const handleSubmit = async () => {
    const updatedUnits = ownEvaluation.map((unit) => {
      return {
        ...unit,
        assessments: unit.assessments.map((assessment) => {
          let answer = assessment.answer;
          let answerSupervisor = assessment.answerSupervisor;
          let answerTeacher = assessment.answerTeacher;
          if (user?.role === 'customer') {
            answer = selectedValues === 1 ? 1 : 2;
          } else if (user?.role === 'supervisor') {
            answerSupervisor = selectedValues === 1 ? 1 : 2;
          } else if (user?.role === 'teacher') {
            answerTeacher = selectedValues === 1 ? 1 : 2;
          }
          return {
            ...assessment,
            answer,
            answerSupervisor,
            answerTeacher,
          };
        }),
      };
    });
    const updatedData = {
      units: updatedUnits,
    };
    try {
      const response = await updateEvaluationById(
        `${evaluationId}`,
        updatedData
      );

      console.log('Evaluation updated:', response.units);
      setSelectedValues([]);
    } catch (error) {
      console.error('Error updating evaluation:', error);
    }
    setIsButtonEnabled(true);
    handleNotificationModalOpen();
    // Perform other submission logic here
  };

  const handleAnswersChange = (answerState, answerSupervisorState) => {
    // Do something with the answers here
    console.log('Answer:', answerState);
    console.log('Answer Supervisor:', answerSupervisorState);
  };

  return (
    <main>
      <div>
        <WavesHeader
          title='Saukko'
          secondTitle={`Tervetuloa, ${user?.firstName}`}
        />
      </div>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '18px',
          textDecoration: 'underline',
          marginTop: '58%',
        }}
      >
        Ammattitaitovaatimukset
      </h2>

      <div>
        {/* <ul>
          {mockdata.map((data, index) => (
            <li key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 15px 0 0',
                }}
              >
                <div>
                  <p className='para-title-style'>{data.title} </p>
                </div>
                <div>
                  <Icon
                    icon='material-symbols:info'
                    color='#1769aa'
                    style={{ verticalAlign: 'middle', fontSize: '21px' }}
                    cursor={'pointer'}
                    onClick={handleOpenCriteriaModal}
                  />
                </div>
              </div>
              {user?.role === 'teacher' ? (
                <TeacherPerformanceFeedBack />
              ) : (
                <PerformancesFeedback />
              )}
            </li>
          ))}
        </ul> */}

        {/* Evaluation */}
        <ul>
          {ownEvaluation.map((unit, index) => (
            <li key={index}>
              <p className='para-title-style'>{unit.name.fi}</p>
              <p>Customer answer: {unit.assessments[0].answer}</p>
              <p>Supervisor answer: {unit.assessments[0].answerSupervisor}</p>
              <p>Teacher answer: {unit.assessments[0].answerTeacher}</p>
              {user?.role === 'teacher' ? (
                <TeacherPerformanceFeedBack
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                />
              ) : (
                <PerformancesFeedback
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                  // onAnswersChange={handleAnswersChange}
                />
              )}
            </li>
          ))}
          {/* {ownEvaluation.map((unit, index) => (
            <li key={index}>
              <p className='para-title-style'>{unit.name.fi}</p>
              {unit.assessments.length === 0 ? (
                <div>
                  <p>No assessments available</p>
                  {user?.role === 'teacher' ? (
                    <TeacherPerformanceFeedBack
                      answer=''
                      answerSupervisor=''
                      answerTeacher=''
                    />
                  ) : (
                    <PerformancesFeedback answer='' answerSupervisor='' />
                  )}
                </div>
              ) : (
                unit.assessments.map((assess, assessIndex) => (
                  <div key={assessIndex}>
                    <p>Assessments: {assess.name.fi}</p>
                    <p>Assessments: {assess.answer}</p>
                    <p>Assessments: {assess.answerSupervisor}</p>
                    <p>Assessments: {assess.answerTeacher}</p>
                    {user?.role === 'teacher' ? (
                      <TeacherPerformanceFeedBack
                        answer={assess.answer}
                        answerSupervisor={assess.answerSupervisor}
                        answerTeacher={assess.answerTeacher}
                      />
                    ) : (
                      <PerformancesFeedback
                        answer={assess.answer}
                        answerSupervisor={assess.answerSupervisor}
                        setSelectedValues={setSelectedValues}
                      />
                    )}
                  </div>
                ))
              )}
            </li>
          ))} */}
        </ul>
      </div>
      {error && <p>{error}</p>}
      <h2
        style={{
          textAlign: 'center',
          fontSize: '18px',
          textDecoration: 'underline',
          marginTop: '40px',
        }}
      >
        {' '}
      </h2>
      <form action=''>
        <p className='para-title-style'>
          {user?.role === 'customer' ? 'Lisätietoa' : 'Palaute'}
        </p>
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

      {/* Modal for showing criteria */}
      <CriteriaModal
        open={isCriteriaModalOpen}
        handleClose={handleCloseCriteriaModal}
      />
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
