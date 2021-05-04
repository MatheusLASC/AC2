class Barrel extends Meshes{
    cylinder = null

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

    explode(){}

    removeAll() {
        var aux = super.getMesh();
        aux.dispose();
        this.cylinder.dispose();
    }
}