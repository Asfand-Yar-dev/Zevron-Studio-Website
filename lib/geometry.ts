// Official Zevron Studio mark, traced from the brand logo (1254px source; 1 unit = 10px,
// near-horizontal edges straightened). y points down. Shared by the SVG logo, the favicon,
// the blueprint drawing and the 3D hero centerpiece.
export type Point = readonly [number, number];

export const LOGO_BOX = { width: 69.7, height: 52.3 };

// Orange body: the Z with its hooked base.
export const LOGO_BODY: Point[] = [
  [52, 0],
  [3.9, 0],
  [3.9, 11.4],
  [29, 11.4],
  [0, 52.3],
  [63.7, 52.3],
  [69.7, 43.5],
  [59, 27.2],
  [35.6, 27.2],
  [29, 36.2],
  [50.6, 36.2],
  [54.4, 42.3],
  [21.5, 42.3],
];

// Silver triangles stepping up beside the Z.
export const LOGO_TRI_SMALL: Point[] = [
  [54.4, 23.3],
  [46.6, 11.4],
  [38.3, 23.3],
];

export const LOGO_TRI_LARGE: Point[] = [
  [54.4, 0],
  [48, 9.2],
  [53.2, 17.4],
  [66.5, 17.4],
];

export const toPoints = (pts: Point[]) => pts.map(([x, y]) => `${x},${y}`).join(" ");
