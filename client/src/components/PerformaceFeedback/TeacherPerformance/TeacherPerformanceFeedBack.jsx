import React, { useContext, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';

const TeacherPerformanceFeedBack = ({ setSelectedValues }) => {
  const [selectedRadio, setSelectedRadio] = useState('');
  const auth = useContext(AuthContext);
  const user = auth.user;

  const handleRadioChange = (e) => {
    if (selectedRadio === e.target.value) {
      e.target.checked = false;
      setSelectedRadio('');
      setSelectedValues(0);
    } else {
      setSelectedRadio(e.target.value);
      if (e.target.value === 'Osaa ohjatusti') {
        setSelectedValues(1);
      } else if (e.target.value === 'Osaa itsenäisesti') {
        setSelectedValues(2);
      }
    }
    console.log(e.target.value);
  };

  const getBackgroundColor = () => {
    if (selectedRadio === 'Osaa ohjatusti' || selectedRadio === 'Osaa itsenäisesti') {
      if (user?.role === 'teacher') {
        return '#FFF4B4';
      }
    }
    return '#F2F2F2';
  };

  // const infodata = [
  //   {
  //     info: 'Itsearviointi',
  //     disabled: true,
  //   },
  //   {
  //     info: 'TPO:n havainto',
  //     disabled: true,
  //   },
  //   {
  //     info: 'Opettajan merkintä',
  //     disabled: false,
  //   },
  // ];

  return (
    <main
      className='feedback__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div
        className='first-div-style'
        style={{ width: '60%', marginLeft: '38%' }}
      >
        <p style={{ padding: '2px' }}>Osaa ohjatusti</p>
        <p style={{ padding: '4px' }}>Osaa itsenäisesti</p>
      </div>
      <div>
        {['Itsearviointi', 'TPO:n havainto', 'Opettajan merkintä'].map(
          (label, index) => (
            <div key={label} className='first-div-style'>
              <p style={{ width: '38%', marginTop: '10px' }}>{label}</p>
              <div style={{ marginTop: '10px' }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby='demo-form-control-label-placement'
                    name='position'
                    value={selectedRadio}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value='Osaa ohjatusti'
                      sx={{
                        '& .MuiSvgIcon-root': {
                          marginRight: '70px',
                        },
                      }}
                      control={
                        <Radio
                          disabled={label !== 'Opettajan merkintä'}
                          onChange={handleRadioChange}
                        />
                      }
                      checked={index < 2 || selectedRadio === 'Osaa ohjatusti'}
                      labelPlacement='top'
                    />
                    <FormControlLabel
                      value='Osaa itsenäisesti'
                      sx={{
                        '& .MuiSvgIcon-root': {
                          marginRight: '8%',
                        },
                      }}
                      control={
                        <Radio
                          disabled={label !== 'Opettajan merkintä'}
                          onChange={handleRadioChange}
                        />
                      }
                      checked={
                        label === 'Opettajan merkintä' &&
                        selectedRadio === 'Osaa itsenäisesti'
                      }
                      labelPlacement='start'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default TeacherPerformanceFeedBack;
