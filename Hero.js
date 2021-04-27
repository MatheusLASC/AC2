class {
    constructor() {
        BABYLON.SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
            var hero = newMeshes[0];

            posHero = new BABYLON.Vector3(0, -2, 0);
            sclHero = new BABYLON.Vector3(0.05,0.05,0.05);
            
            //Scale the model down        
            hero.scaling.scaleInPlace(0.1);
            hero.position = posHero;
            hero.scaling = sclHero;
                
            //Lock camera on the character 
            cam.target = hero;

            //Hero character variables 
            var heroSpeed = 0.03;
            var heroSpeedBackwards = 0.01;
            var heroRotationSpeed = 0.1;

            var animating = true;

            const walkAnim = scene.getAnimationGroupByName("Walking");
            const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
            const idleAnim = scene.getAnimationGroupByName("Idle");
            const sambaAnim = scene.getAnimationGroupByName("Samba");

            //Rendering loop (executed for everyframe)
            scene.onBeforeRenderObservable.add(() => {
                var keydown = false;
               
                if (inputMap["w"]) {
                    
                    if (hero.intersectsMesh(cylinder, false)) {
                        heroSpeed = 0.03;
                        hero.moveWithCollisions(hero.forward.scaleInPlace(heroSpeed));
                    } else {
                        heroSpeed = 0;
                        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
                        hero.moveWithCollisions(hero.forward.scaleInPlace(heroSpeed));
                    }

                    keydown = true;

                }
                if (inputMap["s"]) {

                if (hero.intersectsMesh(cylinder, true)) {
                    heroSpeedBackwards = 0.01;
                    hero.moveWithCollisions(hero.forward.scaleInPlace(-heroSpeedBackwards));
                } else {
                    heroSpeedBackwards = 0;
                    idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);
                }
                  
                    keydown = true;
                }
                if (inputMap["a"]) {
                    hero.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
                    keydown = true;
                }
                if (inputMap["d"]) {
                    hero.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
                    keydown = true;
                }
                if (inputMap["b"]) {
                    keydown = true;
                }

                //Manage animations to be played  
                if (keydown) {
                    if (!animating) {
                        animating = true;
                        if (inputMap["s"]) {
                            //Walk backwards
                            walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
                        }
                        else if
                            (inputMap["b"]) {
                            //Samba!
                            sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
                        }
                        else {
                            //Walk
                            walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
                        }
                    }
                }
                else {

                    if (animating) {
                        //Default animation is idle when no key is down     
                        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

                        //Stop all animations besides Idle Anim when no key is down
                        sambaAnim.stop();
                        walkAnim.stop();
                        walkBackAnim.stop();

                        //Ensure animation are played only once per rendering loop
                        animating = false;
                    }
                }
            });
        });

    }
  }