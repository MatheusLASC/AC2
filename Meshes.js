class Meshes {
    constructor(url,sceneFile, pos, rot, scale, meshNum, mat) {
        BABYLON.SceneLoader.ImportMeshAsync("", url, sceneFile).then((result) => {
            let meshes = result.meshes[meshNum];       
            meshes.position = pos;
            meshes.rotation = rot;
            meshes.scaling = scale;
            meshes.material = mat;
        });
    }
}