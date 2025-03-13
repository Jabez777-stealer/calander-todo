
import "tippy.js/dist/tippy.css"; 
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useAppContext } from "../context/commonDataContext";

export default function Event({ eventInfo, onClick, keyId }: any) {
    const {activePopup} = useAppContext()

    return (
        <>
         <div key={keyId} className="horSepertr" style={{}}></div>
         <div onClick={()=>onClick(eventInfo)} style={{background:activePopup.id == eventInfo.id ?'#d4effd':'#fff',cursor:'pointer'}} className="bg-white rounded-md  popupCont">
                <div className="fbcSB smallFontPaddX">
                    <p className="">{eventInfo?.job_id?.jobRequest_Title}</p>
                    <hr className="mx-1 border-yellow-400" />

                    <div className="fbcSA"  style={{ minWidth: '50px' }}>
                        <div className="card">
                            <AiOutlineEdit size={16} color="#2e2e2e" className="text-gray-700 cursor-pointer" />
                        </div>
                        <div className="card">
                            <AiOutlineDelete size={16} color="red" className="text-gray-700 cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="fbc smallFontPaddX" style={{}}>
                    <p>
                        {eventInfo?.summary}
                    </p>
                    <div className="verticleSep" style={{ }}>{' '}</div>
                    <p>
                        {eventInfo?.user_det?.handled_by?.firstName + ' ' + eventInfo?.user_det?.handled_by?.lastName}
                    </p>
                </div>
                <div className="fbc smallFontPaddX">
                    <p className="fontSml">
                        <span className="">Date:</span>{" "}
                        {new Date(eventInfo?.start).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <div className="verticleSep">{' '}</div>

                    <p className="fontSml">
                        <span className="">Time:</span>{" "}
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
                </div>
        </div>
        </>
            
    );
}
