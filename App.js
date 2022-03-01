/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect,useState } from 'react';
import { Button, TextInput, View, Text, FlatList } from 'react-native';

const Style = {
  borderColor: 'black',
  borderWidth: 1,
}

const App = () => {

  const [inputValue, setInputValue] = useState();
  const [inputPhone, setPhoneValue] = useState();
  const [inputHobby, setHobbyValue] = useState();
  const [inputFood, setFoodValue] = useState();
  const [inputCity, setCityValue] = useState();
  const [inputDatos, setDatosValue] = useState();


const getData = () => {
  fetch('https://calculadora-server.herokuapp.com/alumns')
  .then(response=>response.json())
  .then((data) => {
    setDatosValue(data);
  })
};

const hacerFetch = () => {
  const url = 'https://calculadora-server.herokuapp.com/alumns';
  const body = {
      accountNumber: parseInt(inputValue),
      phone: parseInt(inputPhone),
      hobby: inputHobby,
      favoriteFood: inputFood,
      bornCity: inputCity,
  };
  return fetch(url, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
      })
      .then(res => res.json())
      .catch(err => console.error(err.message))
      .then(respuesta => {console.log(respuesta)});
};

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <Item title={item.name} />
);

  return (
    <View>
      <Text>Formulario</Text>
      <TextInput style={Style} value={inputValue} onChangeText={number => setInputValue(number)} />
      <TextInput style={Style} value={inputPhone} onChangeText = { number => setPhoneValue(number)}  />
      <TextInput style={Style} value={inputHobby} onChangeText = { text => setHobbyValue(text) } />
      <TextInput style={Style} value={inputFood} onChangeText = { text => setFoodValue(text) } />
      <TextInput style={Style} value={inputCity}  onChangeText = { text => setCityValue(text) } />
      <Button title='Click' onPress={hacerFetch} />
      <Button title='Ver Lista' onPress={getData} />
      <FlatList
        data={inputDatos}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default App;
