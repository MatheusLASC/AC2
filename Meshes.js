class Meshes {
    constructor(url,sceneFile, pos, rot, scale) {
        BABYLON.SceneLoader.ImportMeshAsync("", url, sceneFile).then((result) => {
            let meshes = result.meshes[0];       
            meshes.position = pos;
            meshes.rotation = rot;
            meshes.scaling = scale;
        });
    }
}