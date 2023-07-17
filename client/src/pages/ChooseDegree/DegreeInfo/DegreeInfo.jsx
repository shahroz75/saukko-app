// Import react packages
import React, { useContext, useEffect, useRef } from 'react';
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
        setRegulationDate(parseDate(degree.regulationDate.fi));
      degree.validFrom !== null && setValidFrom(parseDate(degree.validFrom.fi));
      degree.expiry !== null && setExpiry(parseDate(degree.expiry.fi));
      degree.transitionEnds !== null &&
        setTransitionEnds(parseDate(degree.transitionEnds.fi));
    }
  }, [degreeFound]);

  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

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

  const handleNameClick = () => {
    degreeNameRef.current.focus();
  };
  const handleDescriptionClick = () => {
    degreeDescriptionRef.current.focus();
  };
  const handleDiaryNumberClick = () => {
    diaryNumberRef.current.focus();
  };
  const handleRegulationDateClick = () => {
    regulationDateRef.current.focus();
  };
  const handleValidFromClick = () => {
    validFromRef.current.focus();
  };
  const handleExpiryClick = () => {
    expiryRef.current.focus();
  };
  const transitionEndsClick = () => {
    transitionEndsRef.current.focus();
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

  return (
    <main className='degreeInfo__wrapper'>
      <WavesHeader
        title='Saukko'
        secondTitle={degreeFound ? degree.name.fi : 'ei dataa APIsta'}
      />
      <section className='degreeInfo__container'>
        <Stepper activePage={1} totalPages={4} label={labelStepper.admin} />

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
              />

              <Icon
                onClick={handleDescriptionClick}
                icon='mingcute:pencil-line'
                className='pencil'
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
              />

              <Icon
                onClick={handleNameClick}
                icon='mingcute:pencil-line'
                className='pencil'
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
              />

              <Icon
                onClick={handleDiaryNumberClick}
                icon='mingcute:pencil-line'
                className='pencil'
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <h2>Määräyksen päätöspäivämäärä</h2>
          </div>
          <div className='degreeInfo__container--info--block'>
            <h2>Voimaantulo</h2>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <h2>Voimassaolon päättyminen</h2>
          </div>
          <div className='degreeInfo__container--info--block'>
            <h2>Siirtymäajan päättymisaika</h2>
          </div>
        </div>

        <Hyperlink
          linkText={'Lue lisää tästä linkistä'}
          linkSource={degree.examInfoURL}
        />

        <PageNavigationButtons
          handleBack={() => navigate('/degrees')}
          handleForward={() => navigate(`/degrees/${degree._id}/units`)}
          forwardButtonText={'Valitse tutkinto'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default DegreeInfo;
