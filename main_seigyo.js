




			let container;
			let camera, scene, renderer;
			let controller;

			let reticle;

			let hitTestSource = null;
			let hitTestSourceRequested = false;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

				const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
				light.position.set( 0.5, 1, 0.25 );
				scene.add( light );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.xr.enabled = true;
				container.appendChild( renderer.domElement );








				// ボタンの作成と追加
				const button = document.createElement('button');
				button.id = 'toggleButton';
				button.style.position = 'absolute';
				button.style.top = '50%';
				button.style.left = '50%';
				button.style.transform = 'translate(-50%, -50%)';
				button.style.zIndex = '9999';
				button.textContent = 'ボタン (有効)';
				container.appendChild(button);








				// ARカメラ起動ボタン
				// document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );
				const button1 = ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }); // ボタンの生成
				// button1.style.display = 'block';
				document.body.appendChild(button1); // <body>要素にボタンを追加する

				// // テスト
				// // 別のボタン
				// const button2 = ARButton.createButton2(renderer, { requiredFeatures: ['hit-test'] }); // ボタンの生成
				// document.body.appendChild(button2); // <body>要素にボタンを追加する



				const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.2, 32 ).translate( 0, 0.1, 0 );

				// 不要
				// コード内で3Dモデルを作成
				function onSelect() {

					if ( reticle.visible ) {

						// 必要ないのでコメントアウト
						const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
						const mesh = new THREE.Mesh( geometry, material );
						reticle.matrix.decompose( mesh.position, mesh.quaternion, mesh.scale );
						mesh.scale.y = Math.random() * 2 + 1;
						scene.add( mesh );

					}

				}




				// 3Dモデル1
				// 下で使用するため
				let currentModel1 = null; // currentModel1 変数を定義

				// 新しく3Dモデルを表示する際、表示済みの3Dモデルを消す
				function loadModel1() {
					// if (currentModel1) scene.remove(currentModel1); // 既存のモデルを削除

					const loader = new GLTFLoader();

					loader.load(
						'cube_small.glb',
						function (gltf) {
							const model = gltf.scene;
							const position = new THREE.Vector3();
							const quaternion = new THREE.Quaternion();
							const scale = new THREE.Vector3();
							reticle.matrix.decompose(position, quaternion, scale);
							model.position.copy(position);
							model.quaternion.copy(quaternion);
							model.scale.copy(scale);
							scene.add(model);

							currentModel1 = model; // 新しいモデルを保持
						},
						function (xhr) {
							console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
						},
						function (error) {
							console.error('An error happened', error);
						}
					);
				}




				// 3Dモデル2
				// 下で使用するため
				let currentModel2 = null; // currentModel2 変数を定義

				// 新しく3Dモデルを表示する際、表示済みの3Dモデルを消す
				function loadModel2() {
					if (currentModel2) scene.remove(currentModel2); // 既存のモデルを削除

					const loader = new GLTFLoader();

					loader.load(
						'cube_medium.glb',
						function (gltf) {
							const model = gltf.scene;
							const position = new THREE.Vector3();
							const quaternion = new THREE.Quaternion();
							const scale = new THREE.Vector3();
							reticle.matrix.decompose(position, quaternion, scale);
							model.position.copy(position);
							model.quaternion.copy(quaternion);
							model.scale.copy(scale);
							scene.add(model);

							currentModel2 = model; // 新しいモデルを保持
						},
						function (xhr) {
							console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
						},
						function (error) {
							console.error('An error happened', error);
						}
					);
				}



				



				controller = renderer.xr.getController( 0 );
				// // コード内で作成した3Dモデルを表示
				// controller.addEventListener( 'select', onSelect );
				// コード内で作成した3Dモデルを表示
				// モデル1
				controller.addEventListener( 'select', loadModel1);
				// モデル2
				controller.addEventListener( 'select', loadModel2);
				


				// ボタンによる制御
				// 3Dモデル表示関数無効(loadModel2 : medium)
				const toggleButton = document.getElementById('toggleButton');
				let isEventListenerActive = true;	 	// 初期値をtrueに設定

				toggleButton.addEventListener('click', () => {
					if (isEventListenerActive) {
						controller.removeEventListener('select', loadModel2);
						isEventListenerActive = false;
						toggleButton.textContent = 'ボタン (無効)';
					} else {
						controller.addEventListener('select', loadModel2);
						isEventListenerActive = true;
						toggleButton.textContent = 'ボタン (有効)';
					}
				});



				scene.add( controller );

				reticle = new THREE.Mesh(
					new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
					new THREE.MeshBasicMaterial()
				);
				reticle.matrixAutoUpdate = false;
				reticle.visible = false;
				scene.add( reticle );

				//
				window.addEventListener( 'resize', onWindowResize );

			}







			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				renderer.setAnimationLoop( render );

			}

			function render( timestamp, frame ) {

				if ( frame ) {

					const referenceSpace = renderer.xr.getReferenceSpace();
					const session = renderer.xr.getSession();

					if ( hitTestSourceRequested === false ) {

						session.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {

							session.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {

								hitTestSource = source;

							} );

						} );

						session.addEventListener( 'end', function () {

							hitTestSourceRequested = false;
							hitTestSource = null;

						} );

						hitTestSourceRequested = true;

					}

					if ( hitTestSource ) {

						const hitTestResults = frame.getHitTestResults( hitTestSource );

						if ( hitTestResults.length ) {

							const hit = hitTestResults[ 0 ];

							reticle.visible = true;
							reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

						} else {

							reticle.visible = false;

						}

					}

				}

				renderer.render( scene, camera );

			}
