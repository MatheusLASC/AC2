class Colect{
    isDestroyied = false;
    sound = null;
    sphere = [];
    ball = null;
    snum = 0;
    
    constructor() {
        var p = -6;
        var pa = 0;
        var s = 1;
        for(var i=0;i<10;i++)
        {
            var tpos = new BABYLON.Vector3(p, -1.6, pa);
            var tscale =  new BABYLON.Vector3(s,s,s);
            var trot =  new BABYLON.Vector3(0,0,0);
            this.ball =  new Meshes("https://models.babylonjs.com/Marble/marble/", "marble.gltf", tpos,trot,tscale, 0);
            this.sphere[i] = BABYLON.MeshBuilder.CreateSphere("sphere", {});
            var fpos = new BABYLON.Vector3(p, -1.6, pa);
            var fscale =  new BABYLON.Vector3(s,s,s);
            this.sphere[i].visibility = 0;
            this.sphere[i].position = fpos;
            this.sphere[i].scaling = fscale;
            this.snum = i;
            p+=1.40;
            s+=0.25;

            if(i%2 == 0)
            {
                pa = 3.5;
                
            }
            else
            {
                pa = -3.5;
            }
        }

    }

    getsphere() {
        return this.sphere;
    }

    colectSound(scene){
        if(this.isDestroyied == false){
            this.sound = new BABYLON.Sound("som", "/assets/sounds/explosion.wav", scene, null, {loop: false, autoplay: true });
            this.sound.play();
        }    
    }

    removeAll(n) {
        if(this.isDestroyied == false){
            this.ball.dispose();
            this.sphere[n].dispose();
            this.isDestroyied = true;
        }
    }
}
