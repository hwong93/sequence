import React, {Component} from 'react';
import {
  Dimensions,
  PanResponder,
	View,
	TouchableHighlight,
	Text,
	Alert
} from 'react-native';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'grey',
		width: '100%',
  },
  rotateView: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.2
  }
}

export default class rotateView extends Component {
	constructor(props) {
		super(props);

	}

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this)
    });
	}
	
	alertUser(side) {
		console.log('here');
	}

  handlePanResponderMove(e, gestureState) {
    const {dx, dy} = gestureState;
    const y = `${dx}deg`;
		const x = `${-dy}deg`;
		this.refView.setNativeProps({style: {transform: [{perspective: 1000}, {rotateX: x}, {rotateY: y}]}});
  }

  render() {
    return (
      <View
        style={styles.container}
        {...this.panResponder.panHandlers}
      >
				<TouchableHighlight
					onPress={() => this.alertUser(1)}
					style={styles.rotateView}
					ref={component => this.refView = component}
				>
	        <View
					/>
				</TouchableHighlight>
      </View>
    );
  }
}
