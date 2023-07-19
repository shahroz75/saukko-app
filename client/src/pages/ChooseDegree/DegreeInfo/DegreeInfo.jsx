import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../../useStore';
import { Icon } from '@iconify/react';

// Import components
import DegreeContext from '../../../utils/context/DegreeContext';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import Hyperlink from '../../../components/Hyperlink/Hyperlink';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Button from '../../../components/Button/Button';
import ContentEditable from 'react-contenteditable';

function DegreeInfo() {
  const {
    degreeName,
    setDegreeName,
    degreeDescription,
    setDegreeDescription,
    diaryNumber,
    setDiaryNumber,
    regulationDate,
    setRegulationDate,
    validFrom,
    setValidFrom,
    expiry,
    setExpiry,
    transitionEnds,
    setTransitionEnds,
  } = useStore();

  const [isEditable, setIsEditable] = useState(false);
  const degreeNameRef = useRef(null);
  const degreeDescriptionRef = useRef(null);
  const diaryNumberRef = useRef(null);
  const regulationDateRef = useRef(null);
  const validFromRef = useRef(null);
  const expiryRef = useRef(null);
  const transitionEndsRef = useRef(null);

  const navigate = useNavigate();

  // Set path & get degree from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();
  // Define different text for stepper's labels
  const labelStepper = {
    admin: [
      'Tutkintotiedot',
      'Valitse tutkinnonosat',
      'Muokkaa tietoja',
      'Vahvista',
    ],
  };

  useEffect(() => {
    if (degreeFound) {
      degree.name !== null && setDegreeName(degree.name.fi);
      degree.description !== null &&
        setDegreeDescription(degree.description.fi);
      degree.diaryNumber !== null && setDiaryNumber(degree.diaryNumber);
      degree.regulationDate !== null &&
        setRegulationDate(parseDate(degree.regulationDate));
      degree.validFrom !== null && setValidFrom(parseDate(degree.validFrom));
      degree.expiry !== null && setExpiry(parseDate(degree.expiry));
      degree.transitionEnds !== null &&
        setTransitionEnds(parseDate(degree.transitionEnds));
    }
  }, [degreeFound]);

  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

  // Handle Text Changes
  const handleNameChange = (event) => {
    setDegreeName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDegreeDescription(event.target.value);
  };
  const handleDiaryNumberChange = (event) => {
    setDiaryNumber(event.target.value);
  };
  const handleRegulationDateChange = (event) => {
    setRegulationDate(event.target.value);
  };
  const handleValidFromChange = (event) => {
    setValidFrom(event.target.value);
  };
  const handleExpiryChange = (event) => {
    setExpiry(event.target.value);
  };
  const handleTransitionEndsChange = (event) => {
    setTransitionEnds(event.target.value);
  };

  // Toggle text editable mode
  const handleEditToggle = () => {
    setIsEditable((prevState) => !prevState);
  };

  // Parse date
  function parseDate(milliseconds) {
    if (milliseconds === null) {
      return null;
    } else {
      const dateObj = new Date(milliseconds);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const finnishLocale = 'fi-FI';
      const finnishDate = dateObj.toLocaleDateString(finnishLocale, options);
      return finnishDate.replace(/(\d+)\s+(\w+)\s+(\d+)/, '$1. $2 $3.');
    }
  }

  console.log('degreeName: ', degreeName);

  // Button styling/CSS
  const buttonStyleSave = {
      background: '#0000bf',
      color: '#fff',
      border: 'red',
      padding: '1rem',
      marginTop: '20px',
      width: '90%',
    },
    buttonStyleEdit = {
      background: '#fff',
      color: '#0000bf',
      border: 'solid 2px #0000bf',
      padding: '1rem',
      marginTop: '20px',
      width: '90%',
    };

  return (
    <main className='degreeInfo__wrapper'>
      <WavesHeader
        title='Saukko'
        secondTitle={degreeFound ? degree.name.fi : 'ei dataa APIsta'}
      />
      <section className='degreeInfo__container'>
        <Stepper activePage={1} totalPages={4} label={labelStepper.admin} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={handleEditToggle}
            type='submit'
            style={isEditable ? buttonStyleSave : buttonStyleEdit}
            text={isEditable ? 'Esikatsele' : 'Muokkaa tietoja'}
            icon={'mingcute:pencil-line'}
          />
        </div>

        <div className='degreeInfo__container--info'>
          <div className='degreeInfo__container--info--block'>
            <h1>Tutkinnon suorittaneen osaaminen</h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={degreeDescription}
                onChange={handleDescriptionChange}
                innerRef={degreeDescriptionRef}
                tagName='p'
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <h2>Perusteen nimi</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={degreeName}
                onChange={handleNameChange}
                innerRef={degreeNameRef}
                tagName='p'
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block'>
            <h2>Määräyksen diaarinumero</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={diaryNumber}
                onChange={handleDiaryNumberChange}
                innerRef={diaryNumberRef}
                tagName='p'
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <h2>Määräyksen päätöspäivämäärä</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={regulationDate}
                onChange={handleRegulationDateChange}
                innerRef={regulationDateRef}
                tagName='p'
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block'>
            <h2>Voimaantulo</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={validFrom}
                onChange={handleValidFromChange}
                innerRef={validFromRef}
                tagName='p'
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <h2>Voimassaolon päättyminen</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={expiry}
                onChange={handleExpiryChange}
                innerRef={expiryRef}
                tagName='p'
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block'>
            <h2>Siirtymäajan päättymisaika</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={transitionEnds}
                onChange={handleTransitionEndsChange}
                innerRef={transitionEndsRef}
                tagName='p'
                disabled={!isEditable}
              />
            </div>
          </div>
        </div>

        <Hyperlink
          linkText={'Lue lisää tästä linkistä'}
          linkSource={degree.examInfoURL}
        />

        <PageNavigationButtons
          handleBack={() => navigate('/degrees')}
          handleForward={() => navigate(`/degrees/${degree._id}/units`)}
          forwardButtonText={'Seuraava'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default DegreeInfo;
