// Import react packages
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import DegreeContext from '../../../utils/context/DegreeContext';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers2 from '../../../components/PageNumbers2/PageNumbers2';
import Hyperlink from '../../../components/Hyperlink/Hyperlink';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

function DegreeInfo() {
  const navigate = useNavigate();

  // Set path & get degree from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();

  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

  console.log('degree from context:', degree);

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

  return (
    <main className='degreeInfo__wrapper'>
      <WavesHeader
        title='Saukko'
        secondTitle={'Tutkintojen hallinta'}
        fill='#FFC61E'
      />
      <section className='degreeInfo__container'>
        <PageNumbers2
          activePage={1}
          totalPages={4}
          pageTexts={[
            'Muokkaa tutkinto',
            'Valitse tutkinnonosat',
            'Muokkaa tutkinnonosat',
            'Vahvista',
          ]}
        />
        <div className='degreeInfo__container--info'>
          <div className='degreeInfo__container--info--block'></div>
          <label htmlFor=''>Tutkinnon nimi *</label>

          <input
            value={degreeFound ? degree.name.fi : 'ei dataa APIsta'}
            type='text'
            onChange={(e) => {}}
          />
          <p>{degreeFound ? degree.name.fi : 'ei dataa APIsta'}</p>

          <div className='degreeInfo__container--info--block'>
            <h2>Määräyksen diaarinumero</h2>
            <p>{degreeFound ? degree.diaryNumber : 'ei dataa APIsta'}</p>
          </div>

          <h2>Määräyksen päätöspäivämäärä</h2>
          <p>
            {degreeFound ? parseDate(degree.regulationDate) : 'ei dataa APIsta'}
          </p>

          <div className='degreeInfo__container--info--block'>
            <h2>Voimaantulo</h2>
            <p>
              {degreeFound ? parseDate(degree.validFrom) : 'ei dataa APIsta'}
            </p>
          </div>

          <h2>Voimassaolon päättyminen</h2>
          <p>{degreeFound ? parseDate(degree.expiry) : 'ei dataa APIsta'}</p>

          <div className='degreeInfo__container--info--block'>
            <h2>Siirtymäajan päättymisaika</h2>
            <p>
              {degreeFound
                ? parseDate(degree.transitionEnds)
                : 'ei dataa APIsta'}
            </p>
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
