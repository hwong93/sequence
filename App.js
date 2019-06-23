import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React from 'react';

export default class App extends React.Component {
	componentWillMount() {
		THREE.suppressExpoWarnings();
	}

  render() {
		// Create an `ExpoGraphics.View` covers the whole screen and tell it to call our `onContextCreate` function once it's initialized.
    return (
			<GraphicsView
				onContextCreate={this.onContextCreate}
				onRender={this.onRender}
			/>
    );
	}
	
	// Called by GraphicsView once it is initialized
	onContextCreate = async({
		gl,
		canvas,
		width,
		height,
		scale: pixelRatio,
	}) => {
		this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height});
		// sets the clear color/basically the background ofthe app
		this.renderer.setClearColor(0xffffff);
		// Every GL needs a scene, objects, camera
		// Creating the scene
		this.scene = new THREE.Scene();

		// Creating the Camera
		this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

		// Position the Camera 5 steps back. The unit is arbitrary but think of it as meters
		this.camera.position.z = 5;

		// Drawing the object 
		const geometry = new THREE.BoxGeometry(1, 1, 1);

		// Set colors/textures to object
		const materials = [
			new THREE.MeshPhongMaterial({
				color: 0xff0000,
			}),
			new THREE.MeshPhongMaterial({
				color: 0xfff000,
			}),
			new THREE.MeshPhongMaterial({
				color: 0xffff00,
			}),
			new THREE.MeshPhongMaterial({
				color: 0xfffff0,
			}),
			new THREE.MeshPhongMaterial({
				color: 0xf00000,
			}),
			new THREE.MeshPhongMaterial({
				color: 0x000000,
			}),
		];

		this.cube = new THREE.Mesh(geometry, materials);
		
		// add object to the scene
		this.scene.add(this.cube);


		// NEED TO ADD LIGHTING OR THE OBJECT WILL BE BLACK
    this.scene.add(new THREE.AmbientLight(0x404040));
		const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    this.scene.add(light);
	};

  onRender = delta => {
    this.cube.rotation.x += 3.5 * delta;
    this.cube.rotation.y += 2 * delta;
    this.renderer.render(this.scene, this.camera);
  };
}
