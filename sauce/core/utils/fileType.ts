const fileType = (value: string): string => {
    const type: any = value.split(".").pop();
    return type;
}

export default fileType;