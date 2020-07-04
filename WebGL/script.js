"use strict";

// simplified on three.js/examples/webgl_loader_fbx.html                        
function main() {
    // renderer           
//    alert('main');
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);
    document.body.appendChild(renderer.domElement);
//    alert('added renderer');
    // camera                                                                   
    const camera = new THREE.PerspectiveCamera(30, 800 / 600, 1, 10000);
    camera.position.set(0, 10, 100);
    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // scene and lights                                                         
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xcccccc));
    alert('added light to the scene');
    // load fbx model and texture                                               
    const objs = [];
    const loader = new THREE.FBXLoader();

    loader.load("Models/xsi_man_skinning.fbx", model =>
    {
        // model is a THREE.Group (THREE.Object3D)                              
        const mixer = new THREE.AnimationMixer(model);
        // animations is a list of THREE.AnimationClip                          
        mixer.clipAction(model.animations[0]).play();
        scene.add(model);
        alert('added model to the scene');
        objs.push({ model, mixer });
    });

    // animation rendering                                                      
    const clock = new THREE.Clock();
    (function animate() {
        // animation with THREE.AnimationMixer.update(timedelta)                
        objs.forEach(({ mixer }) => { mixer.update(clock.getDelta()); });
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
    return objs;
}
