import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PicturesPage from '../pages/PicturesPage';
import PicturePage from '../pages/PicturePage';
import GaragesPage from '../pages/GaragesPage';



type TabViewProfileProps = {
  user_id: string;
};

type State = {
  index: number;
  routes: { key: string; title: string }[];
};

const PicturesRoute = (userId : string) => () => (
    <PicturesPage user_id={userId} />
);
const GaragesRoute = (userId : string) => () => (
    <GaragesPage user_id={userId}/>
);

const TabViewProfile: React.FC<TabViewProfileProps> = ({ user_id }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pictures', title: 'Photos' },
    { key: 'garages', title: 'Garages' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        pictures: PicturesRoute(user_id),
        garages: GaragesRoute(user_id),
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={styles.container}
      renderTabBar={props => <TabBar {...props} style={styles.tab_bar} indicatorStyle={styles.tab_bar_selected}/>}
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
    backgroundColor: "#0D0D0D",
    marginBottom: 1,
  },
  tab_bar_selected: {
    backgroundColor: '#ffe100',
  },
});