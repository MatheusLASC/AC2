class Colect extends Meshes{
    isPaused = true;
    sound = null;
    sphere = null;
    ball = null;
    sNum = 0;
    
    constructor(i, url,sceneFile, pos, rot, scale, meshNum, mat) {
        super(url,sceneFile, pos, rot, scale, meshNum, mat);
        
        this.sNum = i;
        this.sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {});
        this.sphere.visibility = 0;
        this.sphere.position = pos;
        this.sphere.scaling = scale;
        
    }


    getSphere() {
        return this.sphere;
    }

    colectSound(scene){
        this.sound = new BABYLON.Sound("som", "/assets/sounds/colected.wav", scene, null, {loop: false, autoplay: true});
        this.sound.play();   
    }

    async removeAll() {
        await new Promise((resolve) => {
            setTimeout(resolve,1000);
        });
        var aux = super.getMesh();
        aux.dispose();
        this.sphere.dispose();   
        return 1;                     
    }//removeAll

    animateSphere() {
        var sphereRB = super.getMesh();
        const animSphere = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        const sphereKeys = []; 

        sphereKeys.push({
            frame: 0,
            value: 0
        });

        sphereKeys.push({
            frame: 30,
            value: 2 * Math.PI
        });

        //set the keys
        animSphere.setKeys(sphereKeys);

        //Link this animation to a wheel
        sphereRB.animations = [];
        sphereRB.animations.push(animSphere);

        scene.beginAnimation(sphereRB, 0, 30, true);
    }//animateSphere


}
