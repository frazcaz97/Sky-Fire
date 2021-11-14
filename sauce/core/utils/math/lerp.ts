/**
 * Linear interpolation between two value using a factor
 * @param previous - first value
 * @param current - second value
 * @param delta - factor value
 * @returns { number }
 */
const lerp = (previous: number, current: number, delta: number) => {
    return (previous * (1 - delta)) + (current * delta);
}

export default lerp;