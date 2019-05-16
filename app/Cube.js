import React, {Component} from 'react';
import {
  Dimensions,
  PanResponder,
	View,
	TouchableOpacity,
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
		this.state = {
			count: 1,
		}
	}

  componentWillMount() {
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				const {dx, dy} = gestureState;
				return !((dx < 2 && dx > -2) && (dy > -2 && dy < 2))                  
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderMove: this.handlePanResponderMove.bind(this),
    });
	}
	
	_alertUser(side) {
		this.setState({
			count: this.state.count+1,
		});
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
				<TouchableOpacity
					onPress={() => this._alertUser()}
					style={styles.rotateView}
					ref={component => this.refView = component}
				>
	        <Text>{this.state.count}</Text>
				</TouchableOpacity>
      </View>
    );
  }
}
