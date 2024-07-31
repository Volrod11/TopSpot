import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import PicturesPage from '../pages/PicturesPage';
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

class TabViewProfile extends React.Component<TabViewProfileProps, State> {
  state: State = {
    index: 0,
    routes: [
      { key: 'pictures', title: 'Photos' },
      { key: 'garages', title: 'Garages' },
    ],
  };

  render() {
    const { user_id } = this.props;

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          pictures: PicturesRoute(user_id),
          garages: GaragesRoute(user_id),
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
        renderTabBar={props => <TabBar {...props} style={styles.tab_bar} indicatorStyle={styles.tab_bar_selected}/>}
      />
    );
  }
}

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