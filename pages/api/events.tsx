import { NextApiRequest, NextApiResponse } from "next";

import allEvents from '../../public/data.json'

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { year, month, week, day } = req.query; 

    
//     const getWeekOfMonth = (date: Date) => {
//         const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//         const dayOffset = firstDayOfMonth.getDay();
//         return Math.ceil((date.getDate() + dayOffset) / 7);
//     };

    
//     const yearNum = year ? parseInt(year as string, 10) : undefined;
//     const monthNum = month ? parseInt(month as string, 10) : undefined;
//     const weekNum = week ? parseInt(week as string, 10) : undefined;
//     const dayNum = day ? parseInt(day as string, 10) : undefined;

    
//     const filteredEvents = allEvents.filter((event:any) => {
//         const eventDate = new Date(event.start);

//         return (
//             (!yearNum || eventDate.getFullYear() === yearNum) && 
//             (!monthNum || eventDate.getMonth() + 1 === monthNum) && 
//             (!dayNum || eventDate.getDate() === dayNum) && 
//             (!weekNum || getWeekOfMonth(eventDate) === weekNum) 
//         );
//     });

//     res.status(200).json(filteredEvents); 
// }


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { year, month, week, day, fromDate, toDate } = req.query;

    // const allEvents = [
    //     { id: 1, title: "Meeting A", start: "2025-03-11T10:00:00" },
    //     { id: 2, title: "Meeting B", start: "2025-03-17T14:00:00" },
    //     { id: 3, title: "Conference", start: "2025-03-25T09:00:00" },
    // ];

    const getWeekOfMonth = (date: Date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOffset = firstDayOfMonth.getDay();
        return Math.ceil((date.getDate() + dayOffset) / 7);
    };

    const yearNum = year ? parseInt(year as string, 10) : undefined;
    const monthNum = month ? parseInt(month as string, 10) : undefined;
    const weekNum = week ? parseInt(week as string, 10) : undefined;
    const dayNum = day ? parseInt(day as string, 10) : undefined;
    const fromDateObj = fromDate ? new Date(fromDate as string) : undefined;
    const toDateObj = toDate ? new Date(toDate as string) : undefined;

    if (toDateObj) {
        toDateObj.setHours(23, 59, 59, 999); 
    }

    const filteredEvents = allEvents.filter((event: any) => {
        const eventDate = new Date(event.start);

        return (
            (!yearNum || eventDate.getFullYear() === yearNum) &&
            (!monthNum || eventDate.getMonth() + 1 === monthNum) &&
            (!weekNum || getWeekOfMonth(eventDate) === weekNum) &&
            (!dayNum || eventDate.getDate() === dayNum) &&
            (!fromDateObj || eventDate >= fromDateObj) &&
            (!toDateObj || eventDate <= toDateObj)
        );
    });

    res.status(200).json(filteredEvents);
}

