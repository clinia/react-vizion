import React from 'react';
import { Index } from 'react-vision-native';

import Content from '../components/Content';
import Header from '../components/Header';
import MapView from '../components/MapView';

class Map extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Index indexName="health_facility">
        <Header />
      </Index>
    ),
    headerStyle: {
      height: 80,
    },
  };

  render() {
    return (
      <Content>
        <Index indexName="health_facility">
          <MapView />
        </Index>
      </Content>
    );
  }
}

export default Map;
