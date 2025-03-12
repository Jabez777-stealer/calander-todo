import { NextApiRequest, NextApiResponse } from "next";

// Sample event data (Replace this with your actual database query)
const allEvents = [
    { id: 1, title: "Meeting 1", start: "2025-03-10T10:00:00", end: "2025-03-10T11:00:00" },
    { id: 2, title: "Meeting 2", start: "2025-03-12T14:00:00", end: "2025-03-12T15:00:00" },
    { id: 3, title: "Meeting 3", start: "2025-03-16T09:00:00", end: "2025-03-16T10:00:00" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { year, month, week, day } = req.query; // Get query parameters

    // Function to calculate the week number in a month
    const getWeekOfMonth = (date: Date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOffset = firstDayOfMonth.getDay();
        return Math.ceil((date.getDate() + dayOffset) / 7);
    };

    // Convert query params to numbers (or default to undefined)
    const yearNum = year ? parseInt(year as string, 10) : undefined;
    const monthNum = month ? parseInt(month as string, 10) : undefined;
    const weekNum = week ? parseInt(week as string, 10) : undefined;
    const dayNum = day ? parseInt(day as string, 10) : undefined;

    // Filter the events based on query parameters
    const filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.start);

        return (
            (!yearNum || eventDate.getFullYear() === yearNum) && // Match year
            (!monthNum || eventDate.getMonth() + 1 === monthNum) && // Match month
            (!dayNum || eventDate.getDate() === dayNum) && // Match day
            (!weekNum || getWeekOfMonth(eventDate) === weekNum) // Match week
        );
    });

    res.status(200).json(filteredEvents); // Return filtered events
}
