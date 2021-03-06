import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { connectGeocoder } from '@clinia/react-vizion-core';
import { withNavigation } from 'react-navigation';

import { Input, Color, Margin } from '../styles';
import { setLocationBoxFocused, setLocation } from '../redux/actions';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: Margin.small,
    marginLeft: Margin.normal,
    marginRight: Margin.normal,
    marginBottom: Margin.small,
  },
  input: {
    ...Input.input,
    marginRight: Margin.smaller,
    flexGrow: 1,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

const CURRENT_LOCATION = 'Current location';

const mapStateToProps = state => ({
  location: state.store.location,
});

class LocationBox extends React.Component {
  input;
  state = {
    enableLocation: true,
  };

  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION).then(response => {
      this.setState({
        enableLocation: !(
          response.permissions &&
          response.permissions.location &&
          response.permissions.location.status === 'denied'
        ),
      });
    });

    this.subs = [
      this.props.navigation.addListener('willBlur', () => {
        const { refine } = this.props;
        refine();
      }),
      this.props.navigation.addListener('willFocus', () => {
        const { refine, location } = this.props;
        if (location) {
          refine(location.coordinates ? location.coordinates : location.text);
        }
      }),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(x => x.remove());
  }

  onFocus = () => {
    const { location } = this.props;
    if (location.text === CURRENT_LOCATION) {
      this.props.setLocation({
        text: null,
        coordinates: null,
      });
    }
    this.toggleSearch(true);
  };

  onTextChange = text => {
    const { searchForLocations } = this.props;
    if (text) {
      searchForLocations(text);
    }
    this.props.setLocation({
      text,
      coordinates: null,
    });
  };

  onPress = () => {
    const { location, refine } = this.props;

    refine(location.text);

    this.input.blur();
    this.toggleSearch(false);
  };

  onCurrentLocationPress = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      const currentLocation = await Location.getCurrentPositionAsync();
      const coordinates = {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      };

      this.props.refine(coordinates);
      this.props.setLocation({
        text: CURRENT_LOCATION,
        coordinates,
      });
    } else {
      this.setState({ enableLocation: false });
    }

    this.input.blur();
    this.toggleSearch(false);
  };

  toggleSearch = isFocused => this.props.setLocationBoxFocused(isFocused);

  render() {
    const { enableLocation } = this.state;
    const { location } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          value={location.text}
          style={styles.input}
          placeholder="Location"
          placeholderColor={Color.placeholder}
          autoCorrect={false}
          returnKeyType="search"
          onChangeText={this.onTextChange}
          onFocus={this.onFocus}
          onBlur={() => this.toggleSearch(false)}
          ref={ref => {
            this.input = ref;
          }}
        />
        <TouchableOpacity
          disabled={!enableLocation}
          style={styles.icon}
          onPress={this.onCurrentLocationPress}
        >
          <Image
            style={[
              styles.icon,
              enableLocation
                ? { tintColor: Color.primary }
                : { tintColor: Color.disabled, opacity: 0.5 },
            ]}
            source={require('../../assets/current_location.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default compose(
  connect(
    mapStateToProps,
    { setLocationBoxFocused, setLocation }
  ),
  withNavigation,
  connectGeocoder
)(LocationBox);
