const math = {};

math.equals = (p1, p2) => {
  return p1[0] == p2[0] && p1[1] == p2[1];
};

math.lerp = (a, b, t) => {
  return a + (b - a) * t;
};

math.invLerp = (a, b, v) => {
  return (v - a) / (b - a);
};

math.remap = (oldA, oldB, newA, newB, v) => {
  return math.lerp(newA, newB, math.invLerp(oldA, oldB, v));
};

math.remapPoint = (oldBounds, newBounds, features) => {
  return [
    math.remap(
      oldBounds.left,
      oldBounds.right,
      newBounds.left,
      newBounds.right,
      features[0]
    ),
    math.remap(
      oldBounds.top,
      oldBounds.bottom,
      newBounds.top,
      newBounds.bottom,
      features[1]
    ),
  ];
};

math.add = (p1, p2) => {
  return [p1[0] + p2[0], p1[1] + p2[1]];
};

math.subtract = (p1, p2) => {
  return [p1[0] - p2[0], p1[1] - p2[1]];
};

math.scale = (p, scaler) => {
  return [p[0] * scaler, p[1] * scaler];
};

// Calculates Euclidean distance
math.distance = (p1, p2) => {
  let dist = 0;
  // Valid for n dimensions
  for (let i = 0; i < p1.length; i++) {
    dist += (p1[i] - p2[i]) ** 2;
  }
  return Math.sqrt(dist);
};

math.formatNumber = (n, dec = 0) => {
  return n.toFixed(dec);
};

math.getNearest = (loc, points, k = 1) => {
  const obj = points.map((val, ind) => {
    return { ind, val };
  });
  const sorted = obj.sort((a, b) => {
    return math.distance(loc, a.val) - math.distance(loc, b.val);
  });
  const indices = sorted.map((obj) => obj.ind);
  return indices.slice(0, k);
};

// math.getNearest = (loc, points) => {
//   let minDist = Number.MAX_SAFE_INTEGER;
//   let nearestIndex = 0;

//   for (let i = 0; i < points.length; i++) {
//     const point = points[i];
//     const d = math.distance(loc, point);

//     if (d < minDist) {
//       minDist = d;
//       nearestIndex = i;
//     }
//   }
//   return nearestIndex;
// };

export default math;
