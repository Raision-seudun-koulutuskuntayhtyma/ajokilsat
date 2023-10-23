import moment from 'moment';
import {TimestampNumber} from '../types/timestamp';

export function getRoundedTime(precisionSeconds: number = 1): Date {
    const milliseconds = new Date().getTime();
    const precisionMs = 1000 * precisionSeconds;
    const rounded = Math.floor(milliseconds / precisionMs) * precisionMs;
    return new Date(rounded);
}

export function timestampToDate(n: TimestampNumber | null): Date | null {
    return n != null ? new Date(n) : null;
}

export function dateToTimestamp(d: Date | null): TimestampNumber | null {
    return d != null ? d.getTime() : null;
}

export function timestampToString(n: TimestampNumber | null): string {
    if (n == null) return '';
    const date = timestampToDate(n);
    return moment(date).format('L LT');
}
