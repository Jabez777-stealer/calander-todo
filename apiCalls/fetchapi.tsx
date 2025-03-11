// export const fetchFilteredEvents = async ({ year, month, week, day }:any) => {
//     try {

//         const response = await fetch("/data.json");
//         const events = await response.json();

//         const filteredEvents = events.filter((event:any) => {
//             const eventDate = new Date(event.start);

//             // Check for Year
//             const isYearMatch = year ? eventDate.getFullYear() === year : true;

//             // Check for Month (getMonth() is 0-based, so add 1)
//             const isMonthMatch = month ? eventDate.getMonth() + 1 === month : true;

//             // Check for Day
//             const isDayMatch = day ? eventDate.getDate() === day : true;

//             // Check for Week (Dynamic Week Calculation)
//             let isWeekMatch = true;
//             if (week) {
//                 const givenDate = new Date(year, month - 1, 1); // Start from the first day of the month
//                 const firstDayOfMonth = givenDate.getDay(); // Get first weekday (0=Sunday, 1=Monday, ..., 6=Saturday)
//                 const offset = firstDayOfMonth === 0 ? -6 : 1 - firstDayOfMonth; // Adjust if the first day is Sunday

//                 const startOfWeek = new Date(givenDate);
//                 startOfWeek.setDate(1 + offset + (week - 1) * 7); // Calculate start of the week
//                 const endOfWeek = new Date(startOfWeek);
//                 endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week

//                 isWeekMatch = eventDate >= startOfWeek && eventDate <= endOfWeek;
//             }

//             return isYearMatch && isMonthMatch && isWeekMatch && isDayMatch;
//         });

//         return filteredEvents;
//     } 
    
    
//     catch (error) {
//         console.error("Error fetching JSON:", error);
//         return [];
//     }
// };

  

export const fetchFilteredEvents = async ({ year, month, week, day }: any) => {
    try {
        // Construct query parameters
        const queryParams = new URLSearchParams();

        if (year) queryParams.append("year", year.toString());
        if (month) queryParams.append("month", month.toString());
        if (week) queryParams.append("week", week.toString());
        if (day) queryParams.append("day", day.toString());

        const response = await fetch(`/api/events?${queryParams.toString()}`); // API Call
        const filteredEvents = await response.json(); // Get response data
        return filteredEvents;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};
