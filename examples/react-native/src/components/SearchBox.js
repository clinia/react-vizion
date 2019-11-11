import React from 'react';
import { connect } from 'react-redux';
import { TextInput, StyleSheet } from 'react-native';
import { connectSearchBox } from 'react-vision-native';
import { withNavigation } from 'react-navigation';

import { setQuery } from '../redux/actions';
import { Input, Color, Margin } from '../styles';

const styles = StyleSheet.create({
  input: {
    ...Input.input,
    flexGrow: 1,
    marginLeft: Margin.normal,
    marginRight: Margin.normal,
    marginBottom: Margin.small,
  },
});

const mapStateToProps = state => ({
  query: state.store.query,
});

class SearchBox extends React.Component {
  input;
  state = {
    initialRefinement: undefined,
  };

  componentDidMount() {
    // const { currentRefinement } = this.props;
    // this.props.setQuery(currentRefinement);
  }

  componentDidUpdate() {
    // const { currentRefinement } = this.props;
    // if (this.state.initialRefinement !== currentRefinement) {
    //   this.setState({
    //     query: currentRefinement,
    //     initialRefinement: currentRefinement,
    //   });
    // }
  }

  onTextChange = text => this.props.setQuery(text);

  onPress = () => {
    const { query } = this.props;

    this.props.refine(query);
    this.input.blur();

    this.toggleSearch(false);
  };

  toggleSearch = isSearching => {
    const { navigation } = this.props;
    const toggleSearch = navigation.getParam('toggleSearch');
    if (toggleSearch) {
      toggleSearch(isSearching);
    }
  };

  render() {
    const { query } = this.props;
    return (
      <TextInput
        value={query}
        style={styles.input}
        placeholder="Search a clinic, a speciality..."
        placeholderColor={Color.placeholder}
        autoCorrect={false}
        returnKeyType="search"
        onChangeText={this.onTextChange}
        onFocus={() => this.toggleSearch(true)}
        onBlur={() => this.toggleSearch(false)}
        onSubmitEditing={this.onPress}
        ref={ref => {
          this.input = ref;
        }}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  { setQuery }
)(withNavigation(connectSearchBox(SearchBox)));
