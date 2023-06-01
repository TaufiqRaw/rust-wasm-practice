const rust = import('./pkg/index');
const canvas = document.getElementById('rustCanvas');
const gl = canvas.getContext('webgl', { antialias: true });

rust.then(m=>{
  if(!gl){
    alert('failed to initialize WebGL');
    return;
  }

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const FPS_THROTTLE = 1000.0 / 30.0; // milliseconds / frames
  var lastDrawTime = -1; // milliseconds

  const rustClient = new m.RustClient();
  const initialTime = Date.now();

  function render(){
    window.requestAnimationFrame(render);
    const currTime = Date.now();

    if(currTime >= lastDrawTime + FPS_THROTTLE){
      lastDrawTime = currTime;

      if(window.innerHeight != canvas.height || window.innerWidth != canvas.width){
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
      }

      let elapsedTime = currTime - initialTime;
      rustClient.update(elapsedTime, window.innerWidth, window.innerHeight);
      rustClient.render();
    }
  }

  render();
})