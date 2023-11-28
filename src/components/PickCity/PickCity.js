import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './PickCity.module.scss';

import { useState } from 'react';

const PickCity = (props) => {
  const [city, setCity] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    props.handleCityChange(city);
    setCity('');
  };

  return (
    <form onSubmit={submitHandler} className={styles.pickCityForm}>
      <label>
        <TextInput
          placeholder="Enter city name...."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <Button>Search</Button>
    </form>
  );
};

export default PickCity;
