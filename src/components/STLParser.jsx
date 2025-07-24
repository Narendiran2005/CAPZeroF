// STLParser.jsx
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export default function STLParser() {
  const inputRef = useRef();
  const [parsedData, setParsedData] = useState(null);

  const handleSTLUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    const loader = new STLLoader();
    const geometry = loader.parse(arrayBuffer); // returns THREE.BufferGeometry

    const positions = geometry.attributes.position.array;
    const normals = geometry.attributes.normal?.array;

    const vertices = [];
    for (let i = 0; i < positions.length; i += 3) {
      vertices.push([positions[i], positions[i + 1], positions[i + 2]]);
    }

    const normalsData = [];
    if (normals) {
      for (let i = 0; i < normals.length; i += 3) {
        normalsData.push([normals[i], normals[i + 1], normals[i + 2]]);
      }
    }

    setParsedData({
      totalVertices: vertices.length,
      vertices,
      normals: normalsData,
    });
  };

  return (
    <div>
      <input type="file" accept=".stl" ref={inputRef} onChange={handleSTLUpload} />
      {parsedData && (
        <div className="mt-4">
          <p><strong>Total Vertices:</strong> {parsedData.totalVertices}</p>
          <pre style={{ maxHeight: "300px", overflowY: "scroll" }}>
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
