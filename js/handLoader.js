if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;

function init() {

  scene = new THREE.Scene();
  scene.add( new THREE.AmbientLight( 0xaaaaaa ) );

  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );

  // Z is up for objects intended to be 3D printed.

  camera.up.set( 0, 0, 1 );
  camera.position.set( 50, 50, 50 );

  camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );

  scene.add( camera );

  var grid = new THREE.GridHelper( 25, 50, 0xffffff, 0x555555 );
  grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI/180 ) );
  scene.add( grid );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0x999999 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var loader = new THREE.STLLoader();
  var material = new THREE.MeshPhongMaterial( { color: 0x2194ce } );

  loader.load( './filter_geometry.js', function ( geometry ) {

  	var geo = new THREE.EdgesGeometry( geometry );
	var mat = new THREE.LineBasicMaterial( {
		color: 0,
		linewidth: 10,
   		vertexColors: THREE.VertexColors
	} );
	var wireframe = new THREE.LineSegments( geo, mat );

   	var mesh = new THREE.Mesh( geometry, material );

//   mesh.position.set( 0, 0, 0.6 );
   	mesh.rotation.set( 0, 0, Math.PI / 2 );
   	wireframe.rotation.set( 0, 0, Math.PI / 2 );

   	mesh.castShadow = true;
   	mesh.receiveShadow = true;

   	scene.add( mesh );
   	scene.add( wireframe );
   	render();
  } );

  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.target.set( 0, 1.2, 2 );
  controls.update();
  window.addEventListener( 'resize', onWindowResize, false );

  // helper
  scene.add( new THREE.AxesHelper( 100 ) );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function render() {

  renderer.render( scene, camera );

}
