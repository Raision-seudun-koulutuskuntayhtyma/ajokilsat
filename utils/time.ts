export function getRoundedTime(precisionSeconds: number = 1): Date {
    const milliseconds = new Date().getTime();
    const precisionMs = 1000 * precisionSeconds;
    const rounded = Math.floor(milliseconds / precisionMs) * precisionMs;
    return new Date(rounded);
}
