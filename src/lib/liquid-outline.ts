export type LiquidDrop = { x: number; y: number; radius: number };

/** Smooth union of signed circle distances, traced as a vector contour. */
export function liquidOutline(drops: LiquidDrop[], width: number, height: number) {
  if (!drops.length) return "";
  const softness = 8;
  const padding = softness * 5;
  let left = width, top = height, right = 0, bottom = 0;
  for (const drop of drops) {
    left = Math.min(left, drop.x - drop.radius - padding);
    top = Math.min(top, drop.y - drop.radius - padding);
    right = Math.max(right, drop.x + drop.radius + padding);
    bottom = Math.max(bottom, drop.y + drop.radius + padding);
  }
  left = Math.max(-padding, left); top = Math.max(-padding, top);
  right = Math.min(width + padding, right); bottom = Math.min(height + padding, bottom);
  if (right <= left || bottom <= top) return "";
  const cell = Math.max(5, Math.sqrt((right - left) * (bottom - top) / 5000));
  left = Math.floor(left / cell) * cell; top = Math.floor(top / cell) * cell;
  const cols = Math.ceil((right - left) / cell) + 1;
  const rows = Math.ceil((bottom - top) / cell) + 1;
  const field = new Float32Array(cols * rows);
  // exp(-signedDistance / softness) gives a smooth, neck-forming union at level 1.
  for (const drop of drops) {
    const reach = drop.radius + padding;
    const x0 = Math.max(0, Math.floor((drop.x - reach - left) / cell));
    const x1 = Math.min(cols - 1, Math.ceil((drop.x + reach - left) / cell));
    const y0 = Math.max(0, Math.floor((drop.y - reach - top) / cell));
    const y1 = Math.min(rows - 1, Math.ceil((drop.y + reach - top) / cell));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const distance = Math.hypot(left + x * cell - drop.x, top + y * cell - drop.y);
      field[y * cols + x] += Math.exp((drop.radius - distance) / softness);
    }
  }
  const points = new Map<number, [number, number]>();
  const links = new Map<number, number[]>();
  const cases: number[][] = [[], [3,0], [0,1], [3,1], [1,2], [3,0,1,2], [0,2], [3,2], [2,3], [0,2], [0,1,2,3], [1,2], [1,3], [0,1], [0,3], []];
  const edgeCorners = [[0,1], [1,2], [3,2], [0,3]];
  for (let y = 0; y < rows - 1; y++) for (let x = 0; x < cols - 1; x++) {
    const values = [field[y*cols+x], field[y*cols+x+1], field[(y+1)*cols+x+1], field[(y+1)*cols+x]];
    const code = values.reduce((mask, value, i) => mask | (value >= 1 ? 1 << i : 0), 0);
    const segments = cases[code];
    if (!segments.length) continue;
    const corners = [[x,y], [x+1,y], [x+1,y+1], [x,y+1]];
    const ids = [2*(y*cols+x), 2*(y*cols+x+1)+1, 2*((y+1)*cols+x), 2*(y*cols+x)+1];
    for (let i = 0; i < segments.length; i += 2) {
      const pair = segments.slice(i, i+2).map(edge => {
        const id = ids[edge];
        if (!points.has(id)) {
          const [a,b] = edgeCorners[edge];
          const blend = (1 - values[a]) / (values[b] - values[a]);
          points.set(id, [left + (corners[a][0] + (corners[b][0] - corners[a][0]) * blend) * cell,
            top + (corners[a][1] + (corners[b][1] - corners[a][1]) * blend) * cell]);
        }
        return id;
      });
      for (let n = 0; n < 2; n++) {
        const adjacent = links.get(pair[n]) ?? [];
        adjacent.push(pair[1-n]); links.set(pair[n], adjacent);
      }
    }
  }
  const visited = new Set<number>();
  let path = "";
  for (const start of links.keys()) {
    if (visited.has(start)) continue;
    const loop: [number,number][] = [];
    let current = start, previous = -1;
    while (!visited.has(current)) {
      visited.add(current); loop.push(points.get(current)!);
      const next = links.get(current)?.find(id => id !== previous);
      if (next === undefined) break;
      previous = current; current = next;
    }
    if (loop.length < 4) continue;
    const last = loop[loop.length-1], first = loop[0];
    path += `M ${(last[0]+first[0])/2} ${(last[1]+first[1])/2}`;
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i], b = loop[(i+1)%loop.length];
      path += ` Q ${a[0]} ${a[1]} ${(a[0]+b[0])/2} ${(a[1]+b[1])/2}`;
    }
    path += " Z ";
  }
  return path;
}
