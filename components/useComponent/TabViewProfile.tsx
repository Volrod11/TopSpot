import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import PicturesPage from '../pages/PicturesPage';
import GaragesPage from '../pages/GaragesPage';
import { useUser } from '../../context/UserContext';

type State = {
  index: number;
  routes: { key: string; title: string }[];
};

const TabViewProfile: React.FC = () => {
  const { currentUserId } = useUser();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pictures', title: 'Photos' },
    { key: 'garages', title: 'Garages' },
  ]);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'pictures':
        return <PicturesPage user_id={currentUserId ?? null} brand_filter={null} />;
      case 'garages':
        return (
          <GaragesPage
            user_id={currentUserId ?? ''}
            show_my_garage={false}
            garage_type="monthly"
          />
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={styles.container}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tab_bar}
          indicatorStyle={styles.tab_bar_selected}
          labelStyle={{ color: 'black' }}
        />
      )}
    />
  );
};

export default TabViewProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  tab_bar: {
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  tab_bar_selected: {
    backgroundColor: '#ffe100',
  },
});
