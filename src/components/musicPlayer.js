"use client"
import {useEffect, useState} from "react";
import { FaCirclePlay , FaCirclePause} from "react-icons/fa6";
import { MdReplayCircleFilled } from "react-icons/md";
import Cookies from "cookies-js"

let song = {
    artist: "Kendrick Lamar",
    title: "HUMBLE.",
    lengthInSeconds: 3,
}

let image = {
    src: "/vinyl.webp",
    alt: "Description"
}


export default function MusicPlayer(){
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    function pausePlay(){
        setIsPlaying(!isPlaying)

        if(progress === song.lengthInSeconds){
            setProgress(0)
            setIsPlaying(true)
        }
    }


    useEffect(() => {
        let interval = null;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(prevProgress => prevProgress < song.lengthInSeconds ? prevProgress + 1 : prevProgress);
            }, 1000);
        } else if (!isPlaying && progress !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying, progress]);


    useEffect(() => {
        if(progress == song.lengthInSeconds){
            setIsPlaying(false)
        }
    }, [progress])

    const musiccontent = (<>
            <div className={"grid grid-cols-[50px,_1fr,_50px] items-center"}>
                <img src={image.src} alt={image.alt} className={"w-full aspect-square block rounded-md"}/>
                <div className={"font-bold ml-3"}>
                    <div className={"text-xl"}>{song.artist}</div>
                    <div className={"text-xs"}>{song.title}</div>
                </div>
                <div className="flex items-center justify-center" onTouchStart={pausePlay}>
                    {isPlaying ?
                        <FaCirclePause className="text-4xl"/>

                        : progress === song.lengthInSeconds
                            ? <MdReplayCircleFilled className="text-5xl"/>

                            : <FaCirclePlay className="text-4xl"/>
                    }
                </div>
            </div>
            <progress max={song.lengthInSeconds} className={"w-full h-2"} value={progress}></progress>
        </>)

    return (
        <div className={"mx-1 p-1 bg-lightgray rounded-xl"}>
            {!Cookies.get("token") ? <p>You need to be logged in to use the player</p> :
                Cookies.get("tier") === "free" ? <p>You need a premium account to use the player</p> :
                    musiccontent
            }
        </div>
    )
}
