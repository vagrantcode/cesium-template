import {Model} from "cesium";
/**
 * 解决gltf加载升级报错的bug
* */
let fixGltf = function(gltf:any) {
    if (!gltf.extensionsUsed) {
        return;
    }

    let v = gltf.extensionsUsed.indexOf('KHR_technique_webgl');
    let t = gltf.extensionsRequired.indexOf('KHR_technique_webgl');
    // 中招了。。
    if (v !== -1) {
        gltf.extensionsRequired.splice(t, 1, 'KHR_techniques_webgl');
        gltf.extensionsUsed.splice(v, 1, 'KHR_techniques_webgl');
        gltf.extensions = gltf.extensions || {};
        gltf.extensions['KHR_techniques_webgl'] = {};
        gltf.extensions['KHR_techniques_webgl'].programs = gltf.programs;
        gltf.extensions['KHR_techniques_webgl'].shaders = gltf.shaders;
        gltf.extensions['KHR_techniques_webgl'].techniques = gltf.techniques;
        let techniques = gltf.extensions['KHR_techniques_webgl'].techniques;

        gltf.materials.forEach(function (mat:any, index:any) {
            gltf.materials[index].extensions || (gltf.materials[index].extensions = {KHR_technique_webgl: {}}); // vtxf 181025
            gltf.materials[index].extensions['KHR_technique_webgl'].values = gltf.materials[index].values;
            gltf.materials[index].extensions['KHR_techniques_webgl'] = gltf.materials[index].extensions['KHR_technique_webgl'];

            let vtxfMaterialExtension = gltf.materials[index].extensions['KHR_techniques_webgl'];
            vtxfMaterialExtension.technique || (vtxfMaterialExtension.technique = gltf.materials[index].technique); // vtxf 181025


            for (let value in vtxfMaterialExtension.values) {
                let us = techniques[vtxfMaterialExtension.technique].uniforms;
                for (let key in us) {
                    if (us[key] === value) {
                        vtxfMaterialExtension.values[key] = vtxfMaterialExtension.values[value];
                        delete vtxfMaterialExtension.values[value];
                        break;
                    }
                }
            }
        });

        techniques.forEach(function (t:any) {
            for (let attribute in t.attributes) {
                let name = t.attributes[attribute];
                t.attributes[attribute] = t.parameters[name];
            }

            for (let uniform in t.uniforms) {
                let name = t.uniforms[uniform];
                t.uniforms[uniform] = t.parameters[name];
            }
        });
    }
}

Object.defineProperties(Model.prototype, {
    _cachedGltf: {
        set: function (value:any) {
            this._vtxf_cachedGltf = value;
            if (this._vtxf_cachedGltf && this._vtxf_cachedGltf._gltf) {
                fixGltf(this._vtxf_cachedGltf._gltf);
            }
        },
        get: function () {
            return this._vtxf_cachedGltf;
        }
    }
});
