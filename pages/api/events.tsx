import { NextApiRequest, NextApiResponse } from "next";


const allEvents = require('../../public/data.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { year, month, week, day } = req.query; 

    
    const getWeekOfMonth = (date: Date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOffset = firstDayOfMonth.getDay();
        return Math.ceil((date.getDate() + dayOffset) / 7);
    };

    
    const yearNum = year ? parseInt(year as string, 10) : undefined;
    const monthNum = month ? parseInt(month as string, 10) : undefined;
    const weekNum = week ? parseInt(week as string, 10) : undefined;
    const dayNum = day ? parseInt(day as string, 10) : undefined;

    
    const filteredEvents = allEvents.filter((event:any) => {
        const eventDate = new Date(event.start);

        return (
            (!yearNum || eventDate.getFullYear() === yearNum) && 
            (!monthNum || eventDate.getMonth() + 1 === monthNum) && 
            (!dayNum || eventDate.getDate() === dayNum) && 
            (!weekNum || getWeekOfMonth(eventDate) === weekNum) 
        );
    });

    res.status(200).json(filteredEvents); 
}
