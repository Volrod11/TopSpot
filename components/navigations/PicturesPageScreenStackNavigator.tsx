import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PicturesPage from '../HomeComponent/pages/PicturesPage'; // Assurez-vous que le chemin est correct
import PicturePage from '../HomeComponent/pages/PicturePage'; // Assurez-vous que le chemin est correct

const Stack = createStackNavigator();

const PicturesPageScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PicturesPage" component={PicturesPage} />
      <Stack.Screen name="PicturePage" component={PicturePage} />
    </Stack.Navigator>
  );
};

export default PicturesPageScreenStackNavigator;