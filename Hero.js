class Hero {
    hero = null;

    constructor(cam, scene, bar, spheres) {
        var inputMap = {};
            scene.actionManager = new BABYLON.ActionManager(scene);
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            }));
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            }));

        BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb").then((result) => {
           this.hero = result.meshes[0];  
           var posHero = new BABYLON.Vector3(0, -1.98, 0);
           var sclHero = new BABYLON.Vector3(0.05,0.05,0.05);
            
            //Scale the model down        
            this.hero.scaling.scaleInPlace(0.1);
            this.hero.position = posHero;
            this.hero.scaling = sclHero;
                
            
            //Lock camera on the character 
            cam.target = this.hero;

            //Hero character variables 
            var heroSpeed = 0.05;
            var heroSpeedBackwards = 0.03;
            var heroRotationSpeed = 0.1;

            var animating = true;

            const walkAnim = scene.getAnimationGroupByName("Walking");
            const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
            const idleAnim = scene.getAnimationGroupByName("Idle");
            const sambaAnim = scene.getAnimationGroupByName("Samba");

            
            var bIndex = 0; 

            //Rendering loop (executed for everyframe)
            scene.onBeforeRenderObservable.add(() => {
                var keydown = false;
                if (inputMap["w"]) {
                    if(bIndex < 10){
                        if (this.hero.intersectsMesh(spheres[bIndex].getSphere(), false)) {
                            spheres[bIndex].colectSound(scene);
                            spheres[bIndex].animateSphere();
                            spheres[bIndex].removeAll();
                            bIndex = bIndex+1;
                        }    
                    }

                    if (this.hero.intersectsMesh(bar.getCylinder(), false)) {
                        bar.explodeBar(bar.getCylinder());
                        bar.explosionSound(scene);
                        bar.removeAll();
                    } 

                    //this.hero.position.y = -1.98;
                    this.hero.moveWithCollisions(this.hero.forward.scaleInPlace(heroSpeed));
                    keydown = true;
                }
                if (inputMap["s"]) {
                    if(bIndex < 10){
                        if (this.hero.intersectsMesh(spheres[bIndex].getSphere(), false)) {
                            spheres[bIndex].colectSound(scene);
                            spheres[bIndex].removeAll(bIndex);;
                            bIndex = bIndex+1;
                        }    
                    }

                    if (this.hero.intersectsMesh(bar.getCylinder(), false)) {
                        bar.explodeBar(bar.getCylinder());
                        bar.explosionSound(scene);
                        bar.removeAll();
                    } 
                    this.hero.position.y = -1.98;
                    this.heroSpeedBackwards = 0.03
                    this.hero.moveWithCollisions(this.hero.forward.scaleInPlace(-heroSpeedBackwards));

                    keydown = true;
                }
                if (inputMap["a"]) {
                    this.hero.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
                    keydown = true;
                }
                if (inputMap["d"]) {
                    this.hero.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
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
    }// constructor 

}

/*
            */