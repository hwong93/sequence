import React, {Component} from 'react';
import {
  Dimensions,
  PanResponder,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';
import {rotateXY, transformOrigin, rotateXZ} from './methods';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = {
  container: {
    position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
    backgroundColor: "grey",
	},
	content: {
    position: 'absolute',
    left: WIDTH / 2 - 50,
    top: HEIGHT / 2 - 50,
    width: 100,
		height: 100,
		backgroundColor: 'transparent',
	},
  squareSide: {
		position: 'absolute',
    width: 100,
    height: 100,
		backgroundColor: 'white',
		zIndex: 10,
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
				return !((dx < 10 && dx > -10) && (dy > -10 && dy < 10))                  
			},
			onPanResponderMove: this.handlePanResponderMove.bind(this),
    });
	}
	
	_alertUser(side) {
		console.log(side);
	}

  handlePanResponderMove(e, gestureState) {
		const {dx, dy} = gestureState;
		const sideLength = 100;
		// Spin around X and Y axis
		const origin = { x: 0, y: 0, z: -sideLength/2 }

		// FRONT
		let matrix = rotateXY(dx, dy);
		transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

		// BACK
		matrix = rotateXY(dx + 180, dy);
		transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

		// LEFT
		matrix = rotateXY(dx - 90, dy);
		transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

		// RIGHT
		matrix = rotateXY(dx + 90, dy);
		transformOrigin(matrix, origin);
		this.refViewRight.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});
		
		// TOP
		matrix = rotateXZ(dx, dy - 90);
		transformOrigin(matrix, origin);
		this.refViewTop.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

		// BOTTOM
		matrix = rotateXZ(-dx, dy + 90);
		transformOrigin(matrix, origin);
		this.refViewBottom.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}})

  }
	
	// onPress={() => this._alertUser()}
  render() {
    return (
      <View
				style={styles.container}
				{...this.panResponder.panHandlers}
      >
				<View
					style={styles.content}
				>

					<TouchableOpacity
						onPress={() => this._alertUser('back')}
						style={[styles.squareSide, {backgroundColor: 'black'}]}
						ref={component => this.refViewBack = component}
					>
						<View
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this._alertUser('left')}
						style={[styles.squareSide, { backgroundColor: 'red' }]}
						ref={component => this.refViewLeft = component}
					>
						<View
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this._alertUser('right')}
						style={[styles.squareSide, {backgroundColor: 'blue'}]}
						ref={component => this.refViewRight = component}
					>
						<View
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => this._alertUser('bottom')}
						style={[styles.squareSide, {backgroundColor: 'orange'}]}
						ref={component => this.refViewBottom = component}
					>
						<View
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this._alertUser('front')}
						style={[styles.squareSide, { backgroundColor: 'yellow' }]}
						ref={component => this.refViewFront = component}
					>
						<View
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this._alertUser('top')}
						style={[styles.squareSide, {backgroundColor: 'green'}]}
						ref={component => this.refViewTop = component}
					>
						<View
						/>
					</TouchableOpacity>
				</View>
      </View>
    );
  }
}
