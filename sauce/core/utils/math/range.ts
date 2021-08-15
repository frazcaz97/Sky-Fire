/**
 * checks if a number is within range of a min and max value
 * @param value - value to check
 * @param min - minimum range value
 * @param max - maximum range value
 * @returns { boolean }
 */
const range = (value: number, min: number, max: number) => {
    let result: boolean;

    result = value >= min && value <= max ? true : false;

    return result;
}

export default range;