import { Stage2D, Container2D, Vector2D, Camera2D, Sprite, CanvasManager } from '@nuuf/nk2-frontend';

import '../style/default.css';

Sprite.BUILD_DEFAULT_TEXTURE( () => {

  const W = 1920;
  const H = 1080;
  const HW = W * 0.5;
  const HH = H * 0.5;
  const conf = {
    canvas: document.createElement( 'canvas' ),
    x: 0,
    y: 0,
    mode: '2d',
    halt: false
  };
  const stage = new Stage2D( conf );
  const root = new Container2D( 0, 0 );
  const camera = new Camera2D( new Vector2D( 0, 0 ), { position: new Vector2D( 0, 0 ) } );
  const scene = new Container2D( HW, HH );
  const sprite = new Sprite( 0, 0 );
  
  document.body.appendChild( conf.canvas );

  camera.force.SetSame( 0.1 );

  sprite.anchor.SetSame( 0.5 );

  stage
    .AddChild( root )
    .AddChild( camera )
    .AddChild( scene )
    .AddChild( sprite );

  const canvasManager = new CanvasManager( conf.canvas, W, H, CanvasManager.KEEP_ASPECT_RATIO_FIT );

  canvasManager
    .BindStage( stage )
    .BindRootContainer( root )
    .Trigger();

  stage.mouse
    .AddOffset( scene )
    .AddOffset( camera );

  stage.onProcess.Add( () => {

    camera.Process();
    
  } );

  stage.mouse.onDown.Add( ( event ) => {

    camera.target.position.SetV( event.data.position );

  } );

} );
