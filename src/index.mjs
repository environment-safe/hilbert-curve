// https://en.wikipedia.org/wiki/Hilbert_curve#Applications_and_mapping_algorithms

function max(values, valueof){
    let max;
    if(valueof === undefined){
        for (const value of values){
            if (value != null
                && (max < value || (max === undefined && value >= value))
            ){
                max = value;
            }
        }
    }else{
        let index = -1;
        for (let value of values) {
            if ((value = valueof(value, ++index, values)) != null
                && (max < value || (max === undefined && value >= value))
            ){
                max = value;
            }
        }
    }
    return max;
}

function bin(data, numChunks, pickRepresentative = max) {
    if (!Array.isArray(data)) {
        data = Array.from(data);
    }

    const chunks = chunk(data, numChunks);
    return chunks.map(chunk => pickRepresentative(chunk.data));
}

function chunk(data, numChunks) {
    const chunks = new Array(numChunks);
    const binSize = data.length / numChunks;

    for(let i = 0, start = 0, end = 0; i < numChunks; i += 1){
        end = Math.round((i + 1) * binSize);
        const slice = data.slice(start, end);
        chunks[i] = {
            start,
            end: end - 1,
            data: slice
        };
        start = end;
    }

    return chunks;
}

export function construct(data, order, pickRepresentative = max){
    if (!Array.isArray(data)) {
        data = Array.from(data);
    }
    // order for full, uncompressed curve
    const orderFull = Math.ceil(Math.log2(Math.sqrt(data.length)));
    if (order === undefined || order >= orderFull){
        return _construct(data, orderFull);
    }else{
        const n = 2 ** order;
        const binned = bin(data, n * n, pickRepresentative);
        return _construct(binned, order);
    }
}

function _construct(data, order) {
    const n = 2 ** order;
    const curve = new Array(n * n);
    // TODO assert data.length <= curve.length
    for (let index = 0; index < data.length; index += 1) {
        const point = indexToPoint(index, order);
        curve[offset(point.x, point.y, n)] = data[index];
    }
    return curve;
}

function offset(column, row, width) {
    return row * width + column;
}

export function indexToPoint(index, order) {
    const n = 2 ** order;
    const point = { x: 0, y: 0 };
    // eslint-disable-next-line no-unused-vars
    let rx, ry, t;
    for (let s = 1, t = index; s < n; s *= 2) {
        rx = 1 & (t / 2);
        ry = 1 & (t ^ rx);
        rotate(point, rx, ry, s);
        point.x += s * rx;
        point.y += s * ry;
        t /= 4;
    }
    return point;
}

export function pointToIndex(point, order) {
    const n = 2 ** order;
    let rx,
        ry,
        index = 0;
    for (let s = n / 2; s > 0; s = Math.floor(s / 2)) {
        rx = (point.x & s) > 0 ? 1 : 0;
        ry = (point.y & s) > 0 ? 1 : 0;
        index += s * s * ((3 * rx) ^ ry);
        rotate(point, rx, ry, n);
    }
    return index;
}

function rotate(point, rx, ry, n) {
    if (ry !== 0) {
        return;
    }
    if (rx === 1) {
        point.x = n - 1 - point.x;
        point.y = n - 1 - point.y;
    }
    [point.x, point.y] = [point.y, point.x];
}
