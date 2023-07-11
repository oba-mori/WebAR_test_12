// r1
class ARButton {

	static createButton( renderer, sessionInit = {} ) {

		// ボタンをbody要素に追加
		const button = document.createElement( 'button' );

		function showStartAR( /*device*/ ) {

			if ( sessionInit.domOverlay === undefined ) {

				const overlay = document.createElement( 'div' );
				overlay.classList.add('overlay_1');
				// overlay.style.display = 'none';
				document.body.appendChild( overlay );


				// svg要素
				const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
				svg.setAttribute( 'width', 38 );
				svg.setAttribute( 'height', 38 );
				svg.style.position = 'absolute';
				svg.style.right = '20px';
				svg.style.top = '20px';
				svg.addEventListener( 'click', function () {

					currentSession.end();

				} );
				overlay.appendChild( svg );








				// ここに新しいbutton要素を追加
				const button_test1 = document.createElement('button');
				button_test1.classList.add('button_test1');
				button_test1.textContent = 'ボタン (有効)'; // ボタンのテキストを設定


				// ボタンにスタイルを適用
				button_test1.style.backgroundColor = 'white';
				button_test1.style.color = 'black';
				button_test1.style.padding = '10px 10px';
				button_test1.style.border = 'none';
				button_test1.style.borderRadius = '5px';
				button_test1.style.cursor = 'pointer';
				button_test1.style.position = 'absolute';
				button_test1.style.right = '10px';
				button_test1.style.bottom = '10px';


	

				// 		//追加
				//  // クリックイベントのリスナーを設定
				//  button_test1.addEventListener('click', () => {
				// 	console.log('button_test1がクリックされた!');
				// });



				// // button_test1で制御
				// var button_seigyo = 0;
				// button_test1.addEventListener('click', () => {
				// 	if (button_seigyo == 0) {
				// 		button_seigyo = 1;						
				// 		button_test1.textContent = 'ボタン (無効)'
				// 	} else {
				// 		button_seigyo = 0;
				// 		button_test1.textContent = 'ボタン (有効)'
				// 	}
				// 	console.log('button_seigyo:', button_seigyo);


				// 	// コールバック関数を呼び出す
				// 	// valueChangedCallback(button_seigyo);


				// });
				


				// // ボタンのクリックイベントのコールバック関数
				// function handleButtonClick() {
				// 	console.log('ボタンがクリックされました');
				// 	// 他の処理を追加する場合はここに記述します
				// }

				// // ボタンにクリックイベントのリスナーを追加
				// button_test1.addEventListener('click', handleButtonClick);


					// ボタンのクリックイベントハンドラを設定する関数
					function setButtonClickHandler(handler) {
						clickHandler = handler;
						button_test1.addEventListener('click', clickHandler);
					}





			// ボタンをoverlayに追加
				overlay.appendChild(button_test1);










				const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
				path.setAttribute( 'd', 'M 12,12 L 28,28 M 28,12 12,28' );
				path.setAttribute( 'stroke', '#fff' );
				path.setAttribute( 'stroke-width', 2 );
				svg.appendChild( path );

				if ( sessionInit.optionalFeatures === undefined ) {

					sessionInit.optionalFeatures = [];

				}

				sessionInit.optionalFeatures.push( 'dom-overlay' );
				sessionInit.domOverlay = { root: overlay };

			}

			//

			let currentSession = null;

			async function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				renderer.xr.setReferenceSpaceType( 'local' );

				await renderer.xr.setSession( session );

				button.textContent = 'STOP AR';
				sessionInit.domOverlay.root.style.display = '';

				currentSession = session;

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = 'START AR';
				// sessionInit.domOverlay.root.style.display = 'none';

				currentSession = null;

			}

			//

			button.style.display = '';

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';

			button.textContent = 'START AR';

			button.onmouseenter = function () {

				button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				button.style.opacity = '0.5';

			};

			button.onclick = function () {

				if ( currentSession === null ) {

					navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.style.display = '';

			button.style.cursor = 'auto';
			button.style.left = 'calc(50% - 75px)';
			button.style.width = '150px';

			button.onmouseenter = null;
			button.onmouseleave = null;

			button.onclick = null;

		}

		function showARNotSupported() {

			disableButton();

			button.textContent = 'AR NOT SUPPORTED';

		}

		function showARNotAllowed( exception ) {

			disableButton();

			console.warn( 'Exception when trying to call xr.isSessionSupported', exception );

			button.textContent = 'AR NOT ALLOWED';

		}

		function stylizeElement( element ) {

			element.style.position = 'absolute';
			element.style.bottom = '20px';
			element.style.padding = '12px 6px';
			element.style.border = '1px solid #fff';
			element.style.borderRadius = '4px';
			element.style.background = 'rgba(0,0,0,0.1)';
			element.style.color = '#fff';
			element.style.font = 'normal 13px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.5';
			element.style.outline = 'none';
			element.style.zIndex = '999';

		}






			// ---------------------------------------------
			//追加
			//  // clickHandler関数の定義
			//  function clickHandler() {
			// 	console.log('button_test1 clicked!!!!');
			// }
			
			// // クリックイベントのリスナーを設定
			// button_test1.addEventListener('click', clickHandler);
			
			// // setButtonClickHandlerメソッドの定義
			// function setButtonClickHandler(handler) {
			// 	clickHandler = handler;
			// 	// button_test1.removeEventListener('click', clickHandler); // 既存のリスナーを削除
			// 	// clickHandler = handler; // 新しいハンドラを設定
			// 	// button_test1.addEventListener('click', clickHandler); // 新しいリスナーを追加
			// }

			// // setButtonClickHandlerメソッドを追加
			// button_test1.setButtonClickHandler = setButtonClickHandler;
    
			// // button.onclick の前に setButtonClickHandler メソッドを呼び出す
			// setButtonClickHandler(() => {
			// 	console.log('button_test1 clicked!');
			// });



			






		if ( 'xr' in navigator ) {

			button.id = 'ARButton';
			// button.style.display = 'none';

			stylizeElement( button );

			navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

				supported ? showStartAR() : showARNotSupported();

			} ).catch( showARNotAllowed );

			// return button;

			// テスト
			return {
				// setButtonClickHandler,

				// 他の返り値を追加
				button,
				// button_test1,
				setButtonClickHandler
			};

		} else {

			const message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement( message );


			return message;


		}

	}





	// // 追加
	// //２つ目のボタン
	// static createButton2( renderer, sessionInit = {} ) {

	// 	// ボタンをbody要素に追加
	// 	const button = document.createElement( 'button' );

	// 	function showStartAR( /*device*/ ) {

	// 		if ( sessionInit.domOverlay === undefined ) {

	// 			const overlay = document.createElement( 'div' );
	// 			overlay.classList.add('overlay_2');
	// 			// overlay.style.display = 'none';
	// 			// overlay.style.display = 'block';
	// 			document.body.appendChild( overlay );

	// 			const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
	// 			svg.setAttribute( 'width', 38 );
	// 			svg.setAttribute( 'height', 38 );
	// 			svg.style.position = 'absolute';
	// 			svg.style.right = '100px';
	// 			svg.style.top = '100px';
	// 			svg.addEventListener( 'click', function () {

	// 				currentSession.end();

	// 			} );
	// 			overlay.appendChild( svg );

	// 			const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
	// 			path.setAttribute( 'd', 'M 12,12 L 28,28 M 28,12 12,28' );
	// 			path.setAttribute( 'stroke', '#fff' );
	// 			path.setAttribute( 'stroke-width', 2 );
	// 			svg.appendChild( path );

	// 			if ( sessionInit.optionalFeatures === undefined ) {

	// 				sessionInit.optionalFeatures = [];

	// 			}

	// 			sessionInit.optionalFeatures.push( 'dom-overlay' );
	// 			sessionInit.domOverlay = { root: overlay };

	// 		}

	// 		//

	// 		let currentSession = null;

	// 		async function onSessionStarted( session ) {

	// 			session.addEventListener( 'end', onSessionEnded );

	// 			renderer.xr.setReferenceSpaceType( 'local' );

	// 			await renderer.xr.setSession( session );

	// 			button.textContent = 'STOP AR';
	// 			sessionInit.domOverlay.root.style.display = '';

	// 			currentSession = session;

	// 		}

	// 		function onSessionEnded( /*event*/ ) {

	// 			currentSession.removeEventListener( 'end', onSessionEnded );

	// 			button.textContent = 'button_2';
	// 			// sessionInit.domOverlay.root.style.display = 'none';

	// 			currentSession = null;

	// 		}

	// 		//

	// 		button.style.display = '';

	// 		button.style.cursor = 'pointer';
	// 		// button.style.left = 'calc(50% - 50px)';
	// 		button.style.left = '50px';
	// 		button.style.width = '100px';

	// 		button.textContent = 'button_2';

	// 		button.onmouseenter = function () {

	// 			button.style.opacity = '1.0';

	// 		};

	// 		button.onmouseleave = function () {

	// 			button.style.opacity = '0.5';

	// 		};

	// 		button.onclick = function () {

	// 			if ( currentSession === null ) {

	// 				navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

	// 			} else {

	// 				currentSession.end();

	// 			}

	// 		};

	// 	}

	// 	function disableButton() {

	// 		button.style.display = '';

	// 		button.style.cursor = 'auto';
	// 		button.style.left = 'calc(50% - 75px)';
	// 		button.style.width = '150px';

	// 		button.onmouseenter = null;
	// 		button.onmouseleave = null;

	// 		button.onclick = null;

	// 	}

	// 	function showARNotSupported() {

	// 		disableButton();

	// 		button.textContent = 'AR NOT SUPPORTED';

	// 	}

	// 	function showARNotAllowed( exception ) {

	// 		disableButton();

	// 		console.warn( 'Exception when trying to call xr.isSessionSupported', exception );

	// 		button.textContent = 'AR NOT ALLOWED';

	// 	}

	// 	function stylizeElement( element ) {

	// 		element.style.position = 'absolute';
	// 		element.style.bottom = '20px';
	// 		element.style.padding = '12px 6px';
	// 		element.style.border = '1px solid #fff';
	// 		element.style.borderRadius = '4px';
	// 		element.style.background = 'rgba(0,0,0,0.1)';
	// 		element.style.color = '#fff';
	// 		element.style.font = 'normal 13px sans-serif';
	// 		element.style.textAlign = 'center';
	// 		element.style.opacity = '0.5';
	// 		element.style.outline = 'none';
	// 		element.style.zIndex = '999';

	// 	}

	// 	if ( 'xr' in navigator ) {

	// 		button.id = 'ARButton';
	// 		// button.style.display = 'none';

	// 		stylizeElement( button );

	// 		navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

	// 			supported ? showStartAR() : showARNotSupported();

	// 		} ).catch( showARNotAllowed );

	// 		return button;

	// 	} else {

	// 		const message = document.createElement( 'a' );

	// 		if ( window.isSecureContext === false ) {

	// 			message.href = document.location.href.replace( /^http:/, 'https:' );
	// 			message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

	// 		} else {

	// 			message.href = 'https://immersiveweb.dev/';
	// 			message.innerHTML = 'WEBXR NOT AVAILABLE';

	// 		}

	// 		message.style.left = 'calc(50% - 90px)';
	// 		message.style.width = '180px';
	// 		message.style.textDecoration = 'none';

	// 		stylizeElement( message );

	// 		return message;

	// 	}

	// }
}

export { ARButton };