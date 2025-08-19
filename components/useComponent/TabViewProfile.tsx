import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PicturesPage from '../pages/PicturesPage';
import PicturePage from '../pages/PicturePage';
import GaragesPage from '../pages/GaragesPage';
import { useUser } from '../../context/UserContext';



type TabViewProfileProps = {
  user_id: string;
};

type State = {
  index: number;
  routes: { key: string; title: string }[];
};

const PicturesRoute = (userId: string) => () => (
  <PicturesPage user_id={userId} />
);
const GaragesRoute = (userId: string) => () => (
  <GaragesPage user_id={userId} is_garages_page_menu={false} />
);

const TabViewProfile: React.FC = () => {
  const { currentUserId } = useUser();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pictures', title: 'Photos' },
    { key: 'garages', title: 'Garages' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        pictures: PicturesRoute(currentUserId),
        garages: GaragesRoute(currentUserId),
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={styles.container}
      renderTabBar={props =>
        <TabBar {...props}
          style={styles.tab_bar}
          indicatorStyle={styles.tab_bar_selected}
          labelStyle={{ color: 'black' }} />}
    />
  );
};


export default TabViewProfile;


const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  tab_bar: {
    backgroundColor: "#fff",
    marginBottom: 1,
  },
  tab_bar_selected: {
    backgroundColor: '#ffe100',
  },
});