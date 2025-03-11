import { useEffect, useState } from "react";
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
                trigger="click"
                visible={visible && !props.open}
                onClickOutside={() => closeEventList()}
                placement="auto"
                arrow={false}
                animation="shift-away"
                appendTo={() => document.body}
               
            >
                <div
                    style={{ background: activeEvent.id == eventInfo.id ? '#d4effd' : '#fff' ,maxWidth: props.currentView == 'multiMonthYear' ? '120px' : '230px' ,minWidth: props.currentView == 'multiMonthYear' ? '100px' : '230px'}}
                    className="cursor-pointer  p-1 rounded-md eventCardCont"
                    onClick={() => {
                        if(filter.length > 1){
                            setActiveEvent({ ...eventInfo })
                            setVisible(!visible)
                            return
                        }
                        joinMeetingPopup(eventInfo)
                    }}
                >
                    <p className="text-black fs12">{eventInfo?.job_id?.jobRequest_Title}</p>
                    <p className="text-black fs12">{eventInfo?.user_det?.handled_by?.username}</p>
                    <p className="text-black fs12">
                        <span className="font-medium">Time:</span>{" "}
                        {new Date(eventInfo?.start).toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}{" "}
                        -{" "}
                        {new Date(eventInfo?.end).toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>
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
