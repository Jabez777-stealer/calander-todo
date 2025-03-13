import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { AiFillCloseCircle } from "react-icons/ai";
import Event from "./event";
import { useAppContext } from "../context/commonDataContext";



export default function EventCard(props: any) {
    const data = props.wholeData
    const [visible, setVisible] = useState(false); 
    const eventInfo: any = {...props?.eventInfo}
    const {activeEvent,setActiveEvent,setActivePopup} = useAppContext()

    const [showTooltip, setShowTooltip] = useState(false);
    const eventCardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const observer = new ResizeObserver(() => {
        if (eventCardRef.current) {
          const width = eventCardRef.current.offsetWidth;
          setShowTooltip(width < 180);
        }
      });
  
      if (eventCardRef.current) {
        observer.observe(eventCardRef.current);
      }
  
      return () => {
        if (eventCardRef.current) {
          observer.unobserve(eventCardRef.current);
        }
      };
    }, []);


    useEffect(()=>{
        if(props.open == false){
            setActivePopup({})
        }
    },[props.open,setActivePopup])

    const joinMeetingPopup = (data:any)=>{
        setActivePopup({...data})
        props.openModalFun(true,data)
    }

    const closeEventList = ()=>{
        setVisible(false)
        setActiveEvent({})
    }

    const filter = data.filter((item: any) => item.start == eventInfo.start)
    // const filterEndDate = 

    const firstStartTimeForSameDate = filter.reduce((earlier:any, item:any) => 
    new Date(item.start) < new Date(earlier.start) ? item : earlier).start;

    const lastEndTimeForSameDate = filter.reduce((latest:any, item:any) => 
    new Date(item.end) > new Date(latest.end) ? item : latest).end;

    console.log(lastEndTimeForSameDate,'lastEndTimeForSameDate',firstStartTimeForSameDate);

    return (
        <div className="relative w-full">
            <Tippy
                content={
                    <div >
                        <div className="fbc p-1 px-3">
                            <p className="heading">Meetings</p>
                            <div
                                onClick={() => closeEventList()}
                                className="closeBtn">
                                <AiFillCloseCircle size={26} color="#1e6dc0" className="text-gray-700 cursor-pointer" />
                            </div>
                        </div>
                        <div className="scrollCont">
                            {filter
                                .map((event: any, index: number) => <div key={`${event.id}${index}gd`} >
                                    <Event keyId={`${event.id}${index}gd`} onClick={joinMeetingPopup} eventInfo={event} />
                                </div>
                                )
                            }
                        </div>
                    </div>
                }
                interactive={true}
                // trigger="click"
                visible={visible && !props.open}
                onClickOutside={() => closeEventList()}
                placement="auto"
                arrow={false}
                animation="shift-away"
                appendTo={() => document.body}

            >
                <div
                    ref={eventCardRef}
                    style={{
                        background: activeEvent.id == eventInfo.id ? '#d4effd' : '#fff',
                        width: props.currentView == 'multiMonthYear' ? '100%' : '100%',
                        maxWidth: props.currentView == 'multiMonthYear' ? '100px' : '220px'
                    }}
                    className="cursor-pointer p-1 rounded-md eventCardCont group"
                    onClick={() => {
                        if (filter.length > 1) {
                            setActiveEvent({ ...eventInfo });
                            setVisible(!visible);
                            return;
                        }
                        joinMeetingPopup(eventInfo);
                    }}
                >
                    <p className="text-box text-black fs12">{eventInfo?.job_id?.jobRequest_Title}</p>
                    <p className="text-box text-black fs12">{eventInfo?.user_det?.handled_by?.username}</p>

                    {/* Time Display with Tooltip */}
                    <div className=" group">
                        <p className="text-box text-black fs12">
                            <span className="font-medium">Time:</span>
                            {new Date(firstStartTimeForSameDate).toLocaleString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}{" "}
                            -{" "}
                            {new Date(lastEndTimeForSameDate).toLocaleString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </p>

                        {showTooltip && (
                            <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block items-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">
                                <p className="text-box fs12">{eventInfo?.job_id?.jobRequest_Title}</p>
                                <p className="text-box fs12">{eventInfo?.user_det?.handled_by?.username}</p>

                                <p>{new Date(eventInfo.start).toLocaleString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}{" "}
                                    -{" "}
                                    {new Date(eventInfo.end).toLocaleString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}</p>
                            </div>
                        )}
                    </div>

                    {filter.length > 1 && <p className="childrenCount">{filter.length}</p>}
                </div>

            </Tippy>
            {/* {props.open  &&false && (
                <>
                  <EventModal eventInfo={eventInfo} modalOpen={modalOpen} Gicon={Gicon} />
                </>
            )} */}
        </div>
    );
}
