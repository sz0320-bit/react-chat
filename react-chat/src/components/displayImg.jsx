import {useState} from "react";


export const DisplayImg = ({img}) => {


    return <img  src={img}  className={'h-[12em] rounded-[6em] w-[12em] border'} alt={"pfp"} />
}