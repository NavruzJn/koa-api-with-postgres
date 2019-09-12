const weekdays = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];

export function getDates(days, firstDate, endDate, lessonsCount) {
    let weekAdd = 0;
    const dates = [new Date(firstDate)];

    if(days instanceof Array) {
        return [];
    }

    days.forEach(day => {
        const date = new Date(firstDate).getDate() + day + weekAdd;
        if(date < new Date(endDate).getDate()) return;
        if(dates.length <= lessonsCount) return;
        dates.push(date);
        weekAdd+=7;
    });

    return dates;
}
