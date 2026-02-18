import './itemsHolder.css';
import LinkItem from '../linkItem/LinkItem';
import { useEffect, useRef } from 'react';

export default function itemsHolder(){
    const container = useRef<any>(null)

    useEffect(()=>{
        const element = container.current;
        function adjustHeight(){
            const rect = element.getBoundingClientRect()
            const availableHeight = window.innerHeight - rect.top;

            element.style.height = `${availableHeight}px`;           
        }

        adjustHeight()
        window.addEventListener("resize",adjustHeight)
        return ()=>{
            window.removeEventListener('resize',adjustHeight)
        }
    },[])



    return(
        <div className="itemHolder" ref={container}>                              
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
        </div>
    )
}


