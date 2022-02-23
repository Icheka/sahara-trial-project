interface IMonth {
    long: string;
    short: string;
}

export class DateUtil {
    public static months: Array<IMonth> = [
        { long: 'January', short: 'Jan' },
        { long: 'February', short: 'Feb' },
        { long: 'March', short: 'Mar' },
        { long: 'April', short: 'Apr' },
        { long: 'May', short: 'May' },
        { long: 'June', short: 'Jun' },
        { long: 'July', short: 'Jul' },
        { long: 'August', short: 'Aug' },
        { long: 'September', short: 'Sept' },
        { long: 'October', short: 'Oct' },
        { long: 'November', short: 'Nov' },
        { long: 'December', short: 'Dec' },
    ];

    /**
     * indexes DateUtil.months
     * @param index the result of Date.getMonth()
     * @returns an IMonth
     */
    public static getMonth(index: number) {
        return DateUtil.months[index - 1];
    }

    /**
     * converts a number to a Date object
     * @param date time value of a Date object (in milliseconds) - the value of Date.getTime()
     * @returns a Date object
     */
    public static numberToDate(date: number) {
        return new Date(date);
    }

    /**
     * converts a Date object to its number value
     * @param date a Date object
     * @returns date.getTime(): a number => the number of milliseconds since epoch
     */
    public static dateToNumber(date: Date) {
        return date.getTime();
    }

    /**
     *
     * @param value a string or number representing the day, month or year (e.g 1 or '1')
     * @param type 'day' | 'month' | 'year'
     * @param date a Date object to be used for marhsalling. If none is provided, the current time is used instead
     * @returns a Date object, or null if an error occurred during conversion
     */
    public static marshallDateOfBirth = ({
        value,
        type,
        date = new Date(),
    }: {
        value: string | number;
        date?: Date;
        type: 'day' | 'month' | 'year';
    }): Date | null => {
        if (typeof value === 'string') {
            try {
                value = parseInt(value);
            } catch (e) {
                return null;
            }
        }

        switch (type) {
            case 'day':
                date.setDate(value);
                break;
            case 'month':
                // decrement month so that 0 is January
                value--;
                date.setMonth(value);
                break;
            case 'year':
                date.setFullYear(value);
                break;

            default:
                break;
        }
        return date;
    };
}
