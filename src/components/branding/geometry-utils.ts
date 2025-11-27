const phi = (1 + Math.sqrt(5)) / 2;

// --- Shared Helpers ---
const normalize = (v: number[]) => {
  const m = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
  return [v[0] / m, v[1] / m, v[2] / m];
};

const distance = (v1: number[], v2: number[]) => {
  return Math.sqrt(
    (v1[0] - v2[0]) ** 2 +
    (v1[1] - v2[1]) ** 2 +
    (v1[2] - v2[2]) ** 2
  );
};

// --- Icosahedron ---
const generateIcosahedron = () => {
  let vertices = [
    [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
    [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
  ].map(normalize);

  const edges: [number, number][] = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const d = distance(vertices[i], vertices[j]);
      if (d > 0.9 && d < 1.2) {
        edges.push([i, j]);
      }
    }
  }
  return { vertices, edges };
};

export const icosahedronGeometry = generateIcosahedron();

// --- Triakis Icosahedron (Stellated on Faces) ---
const generateTriakis = () => {
  const { vertices: baseVertices } = icosahedronGeometry; // Use base icosahedron vertices
  const vertices = [...baseVertices];
  const edges: [number, number][] = [];

  // 1. Find faces of Icosahedron
  const faces: number[][] = [];
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      for (let k = j + 1; k < 12; k++) {
        const d1 = distance(vertices[i], vertices[j]);
        const d2 = distance(vertices[j], vertices[k]);
        const d3 = distance(vertices[k], vertices[i]);
        if (d1 < 1.2 && d2 < 1.2 && d3 < 1.2) {
          faces.push([i, j, k]);
        }
      }
    }
  }

  // 2. Add a new vertex for each face (pyramid peak)
  faces.forEach(face => {
    const v1 = vertices[face[0]];
    const v2 = vertices[face[1]];
    const v3 = vertices[face[2]];

    // Center
    const cx = (v1[0] + v2[0] + v3[0]) / 3;
    const cy = (v1[1] + v2[1] + v3[1]) / 3;
    const cz = (v1[2] + v2[2] + v3[2]) / 3;

    // Extrude
    const height = 1.6; // Spike height
    const nx = cx * height;
    const ny = cy * height;
    const nz = cz * height;

    const newIdx = vertices.length;
    vertices.push([nx, ny, nz]);

    // Connect new vertex to face base vertices
    edges.push([newIdx, face[0]]);
    edges.push([newIdx, face[1]]);
    edges.push([newIdx, face[2]]);
  });

  return { vertices, edges };
};

export const triakisGeometry = generateTriakis();

// --- Great Dodecahedron (or Star Polyhedron style) ---
const generateGreatDodecahedron = () => {
    // Vertices = Icosahedron Vertices
    const vertices = [...icosahedronGeometry.vertices];
    const edges: [number, number][] = [];
    
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
             const d = distance(vertices[i], vertices[j]);
             // Connect points that are "neighbors of neighbors" (across pentagon caps)
             // Distance is approx 1.618 (phi)
             if (d > 1.6 && d < 1.8) {
                edges.push([i, j]);
             }
        }
    }
    return { vertices, edges };
};

export const greatDodecahedronGeometry = generateGreatDodecahedron();

// --- Rhombic Triacontahedron ---
const generateRhombic = () => {
  // Icosahedron (normalized)
  const icoVerts = [...icosahedronGeometry.vertices];

  // Dodecahedron (normalized)
  let dodVerts: number[][] = [];
  for (let x of [-1, 1]) for (let y of [-1, 1]) for (let z of [-1, 1]) dodVerts.push([x, y, z]);
  for (let i of [-1, 1]) for (let j of [-1, 1]) dodVerts.push([0, i * phi, j / phi]);
  for (let i of [-1, 1]) for (let j of [-1, 1]) dodVerts.push([i / phi, 0, j * phi]);
  for (let i of [-1, 1]) for (let j of [-1, 1]) dodVerts.push([i * phi, j / phi, 0]);

  dodVerts = dodVerts.map(normalize);

  const vertices = [...icoVerts, ...dodVerts];

  const edges: [number, number][] = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const d = distance(vertices[i], vertices[j]);
      // Experimentally found distance for this density
      if (d > 0.5 && d < 0.7) {
        edges.push([i, j]);
      }
    }
  }
  return { vertices, edges };
};

export const rhombicGeometry = generateRhombic();

// --- Stellation Cycle Data ---
const generateStellationData = () => {
  const baseVertices = [...icosahedronGeometry.vertices];
  
  // Find faces
  const faces: number[][] = [];
  for (let i = 0; i < 12; i++) {
      for (let j = i + 1; j < 12; j++) {
          for (let k = j + 1; k < 12; k++) {
              const d1 = distance(baseVertices[i], baseVertices[j]);
              const d2 = distance(baseVertices[j], baseVertices[k]);
              const d3 = distance(baseVertices[k], baseVertices[i]);
              
              if (d1 > 0.9 && d1 < 1.2 && d2 > 0.9 && d2 < 1.2 && d3 > 0.9 && d3 < 1.2) {
                  faces.push([i, j, k]);
              }
          }
      }
  }

  // Face normals/centers (normalized)
  const faceNormals = faces.map(face => {
      const v1 = baseVertices[face[0]];
      const v2 = baseVertices[face[1]];
      const v3 = baseVertices[face[2]];
      
      const cx = (v1[0] + v2[0] + v3[0]) / 3;
      const cy = (v1[1] + v2[1] + v3[1]) / 3;
      const cz = (v1[2] + v2[2] + v3[2]) / 3;
      
      return normalize([cx, cy, cz]);
  });

  // Base edges
  const baseEdges = [...icosahedronGeometry.edges];

  return { baseVertices, faces, faceNormals, baseEdges };
};

export const stellationData = generateStellationData();
