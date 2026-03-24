import './itemsHolder.css';
import LinkItem from '../linkItem/LinkItem';
import { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { Context } from '../utils/ContextProvider';

export default function itemsHolder(){
    const container = useRef<any>(null)
    const context = useContext(Context)
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
            {context?.bookmarks.length === 0 ? (
                <div className="noBookmarksDiv">No bookmarks</div>
            ):(
                context?.bookmarks.map((item,index)=>(
                    <LinkItem bookmark={item} key={index}/>
                )) 
            )}

        </div>
    )
}


