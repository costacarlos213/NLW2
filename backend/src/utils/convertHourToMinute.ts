export default function convertHourToMinute(time: string) {
    // FORMAT: 
    // 8:00 - Hour:Minute

    const [hour, minute] = time.split(':').map(Number)
    const timeInMinutes = (hour * 60) + minute

    return timeInMinutes
}