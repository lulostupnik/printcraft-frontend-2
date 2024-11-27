import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';


//No lo uso, pero puede servir. 

self.onmessage = function (e) {
  const { url } = e.data;
  const loader = new STLLoader();

  loader.load(
    url,
    (geometry) => {
      const geometryData = geometry.toJSON();

      // Collect transferable objects
      const transferableObjects = [];
      if (geometry.index) transferableObjects.push(geometry.index.array.buffer);
      for (const attr in geometry.attributes) {
        transferableObjects.push(geometry.attributes[attr].array.buffer);
      }

      self.postMessage({ geometryData }, transferableObjects);
    },
    undefined,
    (error) => {
      self.postMessage({ error: error.message });
    }
  );
};
