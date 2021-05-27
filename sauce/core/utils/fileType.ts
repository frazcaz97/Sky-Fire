/**
 * Checks the file type of a file
 * @param { string } value  - pass the file name as a string
 * @returns { string } - returns the file extension (example: .jpg) as a string
 */

const fileType = (value: string): string => {
    return String(value.split(".").pop());
}

export default fileType;