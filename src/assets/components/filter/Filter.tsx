import './filter.css'
import { useState,useRef, useEffect } from 'react'
import { useClickaway } from '../utils/useClickaway'
import type { SetStateAction,Dispatch } from "react"


export default function Filter({setSort}:{setSort:Dispatch<SetStateAction<string>>}){
    const [selected,setSelected] = useState<string>("recently added")
    const [open,setOpen] = useState<boolean>(false)
    const btnRef = useRef<any>(null)
    const filtersRef = useRef<any>(null)

    useEffect(()=>{
        setSort(selected)
    },[selected])


    useClickaway(filtersRef,()=>{setOpen(false)},btnRef)

    return (
        <div className="filter">
            <h1>All bookmarks</h1>
            <button ref={btnRef} className="filterBtn" onClick={()=>{setOpen(!open)}} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M14.167 3.333v13.334m0 0-3.334-3.334m3.334 3.334 3.333-3.334M5.833 16.667V3.333m0 0L2.5 6.667m3.333-3.334 3.334 3.334"/></svg>
                sort by
            </button>
            <div className="filters" style={{display: open ? 'flex' : 'none'}} ref={filtersRef} >
                <li className={`filterItem  ${selected === "recently added" ? 'selectedItem' : ''}`} onClick={()=>{setSelected("recently added")}}>
                    Recently added
                    <svg style={{visibility: selected === "recently added" ? 'visible' : 'hidden'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M16.666 5 7.5 14.167 3.333 10"/></svg>
                </li>
                <li className={`filterItem  ${selected === "recently visited" ? ' selectedItem' : ''}`} onClick={()=>{setSelected("recently visited")}}>
                    Recently visited
                    <svg style={{visibility: selected === "recently visited" ? 'visible' : 'hidden'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M16.666 5 7.5 14.167 3.333 10"/></svg>
                </li>
                <li className={`filterItem  ${selected === "most visited" ? ' selectedItem' : ''}`} onClick={()=>{setSelected("most visited")}}>
                    Most visited
                    <svg style={{visibility: selected === "most visited" ? 'visible' : 'hidden'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M16.666 5 7.5 14.167 3.333 10"/></svg>
                </li>
            </div>
        </div>
    )
}