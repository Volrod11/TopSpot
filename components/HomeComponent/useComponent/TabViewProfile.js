import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import PicturesPage from '../pages/PicturesPage';
import GaragesPage from '../pages/GaragesPage';

const PicturesRoute = () => (
    <PicturesPage />
);
const GaragesRoute = () => (
    <GaragesPage />
);

export default class TabViewProfile extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'pictures', title: 'Photos' },
      { key: 'garages', title: 'Garages' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          pictures: PicturesRoute,
          garages: GaragesRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
        renderTabBar={props => <TabBar {...props} style={styles.tab_bar} indicatorStyle={styles.tab_bar_selected}/>}
      />
    );
  }
}

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