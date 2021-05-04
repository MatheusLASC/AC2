class Barrel extends Meshes{
    cylinder = null
    isDestroyied = false;
    sound = null;

    constructor(url,sceneFile, pos, rot, scale, meshNum, mat) {
        super(url,sceneFile, pos, rot, scale, meshNum, mat);

        var cylinderScl = new BABYLON.Vector3(0.4,-3, 0.4);
        var cylPos = pos;

        this.cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height:0.1});

        this.cylinder.scaling = cylinderScl;
        this.cylinder.position = cylPos;
    }

    getCylinder() {
        return this.cylinder;
    }

    explosionSound(scene){
        if(this.isDestroyied == false){
            this.sound = new BABYLON.Sound("som", "/assets/sounds/explosion.wav", scene, null, {loop: false, autoplay: true });
            this.sound.play();
        }    
    }

    removeAll() {
        if(this.isDestroyied == false){
            var aux = super.getMesh();
            aux.dispose();
            this.cylinder.dispose();
            this.isDestroyied = true;
        }
    }

    explodeBar(box){
        if(this.isDestroyied == false){
            // Create a particle system - qnt max vivas
            var particleSystem = new BABYLON.ParticleSystem("particles", 1000, scene);

            //Texture of each particle - local onde as particulas sao criadas, pode-se add uma imagem
            particleSystem.particleTexture = new BABYLON.Texture("/assets/images/fire.png", scene);
            
            // Where the particles come from
            particleSystem.emitter = new BABYLON.Vector3(box.position.x, box.position.y, box.position.z); // the starting object, the emitter - ponto central (em relação a toda a cena)
            particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all from - pontos de origem
            particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0); // To... - pontos finais

            // Size of each particle (random between...
            particleSystem.minSize = 0.05;
            particleSystem.maxSize = 0.05;

            // Life time of each particle (random between...
            particleSystem.minLifeTime = 2;
            particleSystem.maxLifeTime = 3;

            // Emission rate
            particleSystem.emitRate = 500;

            // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

            // Set the gravity of all particles
            particleSystem.gravity = new BABYLON.Vector3(0, -5, 0);

            // Direction of each particle after it has been emitted
            particleSystem.direction1 = new BABYLON.Vector3(2, 4, 2);
            particleSystem.direction2 = new BABYLON.Vector3(-2, -2, -2);

            // Angular speed, in radians
            particleSystem.minAngularSpeed = Math.PI;
            particleSystem.maxAngularSpeed = 2*Math.PI;

            // Speed
            particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 2;
            particleSystem.updateSpeed = 0.025;
            
            particleSystem.start(); 
            particleSystem.targetStopDuration = 0.3;

        }//if destroyied

    }

}