function getRelativeTime(timestamp: string): string {
    const now: number = new Date().getTime();
    const targetDate: number = new Date(timestamp).getTime();
    const diffInSeconds: number = Math.floor((targetDate - now) / 1000);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (Math.abs(diffInSeconds) < 60) {
        return rtf.format(diffInSeconds, "second");
    } else if (Math.abs(diffInSeconds) < 3600) {
        return rtf.format(Math.floor(diffInSeconds / 60), "minute");
    } else if (Math.abs(diffInSeconds) < 86400) {
        return rtf.format(Math.floor(diffInSeconds / 3600), "hour");
    } else {
        return rtf.format(Math.floor(diffInSeconds / 86400), "day");
    }
}

export default getRelativeTime;