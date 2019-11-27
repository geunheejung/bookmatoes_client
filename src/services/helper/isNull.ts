const isNull = (...args: any[]): boolean => args.some((value) => value === null);

export default isNull;