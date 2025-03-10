import { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Import default styles
import { AiFillCloseCircle, AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import Image from "next/image";

export default function EventModal({ eventInfo, setModalOpen, Gicon }: any) {

    return (
        <div className="modalContainer fixed inset-0 bg-opacity-50 flex justify-center items-center z-50435">
                    <div className="bg-white p-4 rounded-lg w-120 shadow-lg innerCont">
                        <div className="fb dataContainer">
                            <div className="left">
                                <p className="mb-4">InterView with: {eventInfo?.user_det?.candidate?.candidate_firstName} {eventInfo?.user_det?.handled_by?.lastName}</p>
                                <h2 className=" mb-4">Position: {eventInfo?.job_id?.jobRequest_Title}</h2>
                                <h2 className=" mb-4">Created By: {eventInfo?.user_det?.candidate?.candidate_firstName} {eventInfo?.user_det?.handled_by?.lastName}</h2>

                                <p className="mb-4">Date: {new Date(eventInfo?.start).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}</p>

                                <p className="mb-4">Time:{new Date(eventInfo?.start).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })} - {new Date(eventInfo?.end).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}</p>
                                <h2 className=" mb-4">Interview via: Google Meet</h2>


                                <div
                                    className="downLoadBtn fbcSB"
                                >
                                    <p>Resume.Docx</p>
                                    <div className="fbc">
                                        <div className="card">
                                            <AiOutlineEye size={20} color="#1e6dc0" className="text-gray-700 cursor-pointer" />
                                        </div>
                                        <div className="card">
                                            <AiOutlineDownload size={20} color="#1e6dc0" className="text-gray-700 cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={() => setModalOpen(false)}
                                    className="downLoadBtn fbcSB"
                                >
                                    <p>Aadharcard</p>
                                    <div className="fbc">
                                        <div className="card">
                                            <AiOutlineEye size={20} color="#1e6dc0" className="text-gray-700 cursor-pointer" />
                                        </div>
                                        <div className="card">
                                            <AiOutlineDownload size={20} color="#1e6dc0" className="text-gray-700 cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  className="right fbcc">
                                <Image src={Gicon} className="gIcon" alt="Google Meet Icon" width={90} height={90} />
                                <button onClick={()=>window.open(eventInfo.link)} className="button" type='button'>JOIN</button>
                            </div>
                        </div>
                        <div
                        onClick={() => setModalOpen(false)}
                         className="closeBtn">
                        <AiFillCloseCircle size={26} color="#1e6dc0" className="text-gray-700 cursor-pointer" />
                        </div>
                       
                    </div>
                </div>
    );
}
