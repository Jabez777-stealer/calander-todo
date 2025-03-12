"use client";
import { useState, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import EventCard from "./eventCards";
import { CalendarApi, formatRange } from "@fullcalendar/core/index.js";
import { fetchFilteredEvents } from "../apiCalls/fetchapi";
import { Box, Modal } from "@mui/material";
import EventModal from "./eventModal";
import Gicon from '../assets/images/gmicon.svg'


const groupEvents = (events: any[]) => {
    const grouped: { [key: string]: any } = {};
    events.forEach((event) => {
        const key = `${event.start}-${event.user_det.handled_by.username}-${event.job_id.jobRequest_Title}`;
        if (!grouped[key]) {
            grouped[key] = event;
        }
    });
    return Object.values(grouped);
};

export default function FullCalander() {
    const [events, setEvents] = useState<any[]>([])
    const [popUpEvent, setPopUpEvent] = useState<any>({})
    const [open ,setOpen] = useState(false)
    const [calendarApi, setCalendarApi] = useState<CalendarApi | null>(null);
    const [currentView, setCurrentView] = useState("dayGridMonth");
    const [titleFormat, setTitleFormat] = useState<any>({ month: "long", year: "numeric" });
    const [todayLabel, setTodayLabel] = useState(
        new Date().toLocaleDateString("en-US", { day: "numeric" })
    );


    const fetchData = (data?: any) => {
        fetchFilteredEvents(data)
            .then((res: any) => {
                if (res?.length) {
                    setEvents([...res])
                } else {
                    setEvents([])
                }
            })
    }

    const groupedEvents = useMemo(() => {
        const res = groupEvents(events)
        return res
    }, [events]);

    const goToToday = () => {
        if (calendarApi) {
            calendarApi.today();
            const currentDate = calendarApi.getDate();
            setTodayLabel(
                currentDate.toLocaleDateString("en-US", { day: "numeric" })
            );
        }
    };

    function replaceClassName() {
        const div = document.querySelector("td.fc-timegrid-axis.fc-scrollgrid-shrink");
        if (div) {
            div.className = "td fc-day fc-day-sun fc-day-past fc-daygrid-day";
            console.warn("Element found! and changed");

        } else {
            console.warn("Element not found!");
        }
    }

    useEffect(() => {
        const eventDate = new Date()
        // replaceClassName();
        // fetchData({
        //     year: eventDate.getFullYear(),
        //     month: eventDate.getMonth() + 1,
        // })
    }, []);

    useEffect(() => {
        if (currentView == "timeGridWeek" && calendarApi) {
            // const start = calendarApi.view.currentStart;
            const end = calendarApi.view.currentEnd;

            // const startDate = new Date(start);
            const endDate = new Date(end);
            endDate.setDate(endDate.getDate() - 1);

            // const formattedTitle = `${startDate.getDate()} ${startDate.toLocaleDateString("en-US", {
            //     month: "long",
            // })} to ${endDate.getDate()} ${endDate.toLocaleDateString("en-US", {
            //     month: "long",
            // })}, ${endDate.getFullYear()}`;


            setTitleFormat({
                day: "numeric",
                month: "long",
                year: "numeric",
                separator: " to ",
            });

        } else {
            switch (currentView) {
                case "multiMonthYear":
                    setTitleFormat({ year: "numeric" });
                    break;
                case "dayGridMonth":
                    setTitleFormat({ year: "numeric", month: "long" });
                    break;
                case "timeGridDay":
                    setTitleFormat({
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    });
                    break;
                default:
                    setTitleFormat({ year: "numeric", month: "long" });
            }
        }
    }, [currentView, calendarApi]);

    const formattedEvents = groupedEvents.map((event: any) =>
    (
        {
            id: event.id,
            title: JSON.stringify(event),
            start: event.start,
            end: event.end,
            extendedProps: {
                desc: JSON.stringify(event),
                link: event.link,
                user_det: event.user_det,
                job_id: event.job_id
            },
        })
    );

    useEffect(() => {
        switch (currentView) {
            case "multiMonthYear":
                setTitleFormat({ year: "numeric" });
                // setTableHeaderFormat({ weekday: 'long' })
                break;
            case "dayGridMonth":
                setTitleFormat({ year: "numeric", month: "long" });
                // setTableHeaderFormat({ weekday: 'long', day: 'numeric', month: "long" })
                break;
            case "timeGridWeek":
                setTitleFormat({ month: "short", day: "numeric", year: "numeric" });
                // setTableHeaderFormat({ weekday: 'long' })
                break;
            case "timeGridDay":
                setTitleFormat({ weekday: "long", month: "short", day: "numeric", year: "numeric" });
                break;
            default:
                setTitleFormat({ year: "numeric", month: "long" });
        }
    }, [currentView]);

  const getWeekNumber = (date: Date) => {

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfMonth = startOfMonth.getDay();
    const daysSinceFirstSunday = (7 - firstDayOfMonth) % 7;

    const firstSunday = new Date(startOfMonth);
    firstSunday.setDate(startOfMonth.getDate() + daysSinceFirstSunday);

    if (date < firstSunday) return 1;

    const diffInDays = Math.floor((date.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24));

    return Math.floor(diffInDays / 7) + 2;
};

const formatDate = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

    const seteventData = (info: any) => {
        let edte = info.end;
        edte.setDate(info.end.getDate() - 1)
        let startDte = formatDate(info.start);
        let endDte = formatDate(edte)

        try {
            fetchData({
                fromDate: startDte,
                toDate: endDte
            })
            setCurrentView(info.view.type)

            // const eventDate = info.view?.getCurrentData().currentDate
            // if (info.view.type == 'multiMonthYear') {
            //     fetchData({ year: eventDate.getFullYear() })

            // } else if (info.view.type == 'dayGridMonth') {
            //     fetchData({
            //         // year: eventDate.getFullYear(),
            //         // month: eventDate.getMonth() + 1,
            //         fromDate:startDte,
            //         toDate:endDte
            //     })
            // } else if (info.view.type == 'timeGridWeek') {

            //     fetchData({
            //         // year: eventDate.getFullYear(),
            //         // month: eventDate.getMonth() + 1,
            //         // week: getWeekNumber(eventDate),
            //         fromDate:startDte,
            //         toDate:endDte
            //     })
            // } else if (info.view.type == 'timeGridDay') {
            //     fetchData({
            //         fromDate:startDte,
            //         toDate:endDte
            //     })
            // }

        } catch (err) {
            console.log("catched the error", err);
        }
    }

    const headerContent = (args: any) => {
        const date = new Date(args.date);
        return (
            <div className="custom-day-header">
                {currentView === 'timeGridWeek' && (
                    <div>
                        <span className="day-name">{date.toLocaleDateString("en-US", { day: "numeric" })}</span>
                        <span className="day-number">{date.toLocaleDateString("en-US", { month: "short" })}</span>
                    </div>
                )}
                {currentView === 'timeGridDay' && (
                    <div>
                        <span className="day-name">
                            {date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                    </div>
                )}
                {currentView !== 'timeGridDay' && <div>{date.toLocaleDateString("en-US", { weekday: "long" })}</div>}
            </div>
        );
    }

    const openModalFun = (val:boolean,evntInfo:any)=>{
        setPopUpEvent({...evntInfo})
        setOpen(val)
    }

    return (
        <div className="p-4">
            <div className="fbcSB mb-3">
                <p className="text-xl mb-4">Your Todo&apos;s</p>
                <button className="buttonPrime">+ Create Schedule</button>
            </div>

            <FullCalendar
                ref={(el) => setCalendarApi(el?.getApi() || null)}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
                initialView="dayGridMonth"
                events={formattedEvents}
                datesSet={seteventData}
                eventContent={(eventInfo) => {
                    const parseData = JSON.parse(eventInfo.event._def.extendedProps.desc);
                    return <EventCard currentView={currentView} setOpen={setOpen} open={open} eventInfo={parseData} wholeData={events} openModalFun={openModalFun}/>;
                }}
                customButtons={{
                    todayDate: {
                        text: todayLabel,
                        click: goToToday,
                    }
                }}
                headerToolbar={{
                    left: "prev,next todayDate",
                    center: "title",
                    right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear"
                }}
                slotDuration="01:00:00"
                titleFormat={titleFormat}
                allDaySlot={false}
                dayHeaderContent={headerContent}
                dayHeaderClassNames="custom-day-header"
            />
            <Modal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{height:'100%'}}>
                    <EventModal setModalOpen={openModalFun} Gicon={Gicon} eventInfo={ popUpEvent }/>
                    
                </Box>
            </Modal>
        </div>
    );
}
