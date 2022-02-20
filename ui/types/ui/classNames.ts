type classNames = (...classes: Array<string>) => string;

export const classNames: classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};
