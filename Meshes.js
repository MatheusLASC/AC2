class Meshes {
    meshes = null;

    constructor(url,sceneFile, pos, rot, scale, meshNum, mat) {
        BABYLON.SceneLoader.ImportMeshAsync("", url, sceneFile).then((result) => {
            this.meshes = result.meshes[meshNum];       
            this.meshes.position = pos;
            this.meshes.rotation = rot;
            this.meshes.scaling = scale;
            this.meshes.material = mat;
        });
    }

    getMesh() {
        return this.meshes;
    }
}