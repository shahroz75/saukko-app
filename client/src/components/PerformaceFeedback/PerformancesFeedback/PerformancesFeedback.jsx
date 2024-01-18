import React, { useState, useContext, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';

const PerformancesFeedback = ({ selectedValues, setSelectedValues, unit, setSelectedUnitId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');

  const auth = useContext(AuthContext);
  const user = auth.user;

  const handleRadioChange = (event, unit) => {
    setSelectedRadio(event.target.value);
    setSelectedUnitId(unit._id); // This is the unit id
    if (event.target.value === 'Osaa ohjatusti') {
      setSelectedValues(1);
    } else if (event.target.value === 'Osaa itsenäisesti') {
      setSelectedValues(2);
    }
    console.log(event.target.value);
  };

  useEffect(() => {
    console.log('selectedValues changed:', selectedValues);
  }, [selectedValues]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type and size
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        if (file.size <= 2 * 1024 * 1024) {
          setSelectedFiles([...selectedFiles, file]);
        } else {
          alert('File size exceeds the limit (Max 2 MB)');
        }
      }
    }
  };

  // Defining the background color based on the user role

  const getBackgroundColor = () => {
    if (selectedRadio === 'Osaa ohjatusti' || selectedRadio === 'Osaa itsenäisesti') {
      if (user?.role === 'supervisor') {
        return '#F6E2E6';
      } else if (user?.role === 'customer') {
        return '#E2F5F3';
      }
    }
    return '#F2F2F2';
  };

  return (
    <main
      className='feedbackpage__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className='feedback'>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby='demo-form-control-label-placement'
            name='position'
            value={selectedRadio}
            unit={unit}
            // onChange={handleRadioChange}
          >
            <FormControlLabel
              value='Osaa ohjatusti'
              control={<Radio onChange={(event) => handleRadioChange(event, unit)}  />}
              label='Osaa ohjatusti'
              labelPlacement='top'
            />
            <FormControlLabel
              value='Osaa itsenäisesti'
              control={<Radio onChange={(event) => handleRadioChange(event, unit)}  />}
              label='Osaa itsenäisesti'
              labelPlacement='top'
            />
          </RadioGroup>
        </FormControl>
      </div>
    </main>
  );
};

export default PerformancesFeedback;
