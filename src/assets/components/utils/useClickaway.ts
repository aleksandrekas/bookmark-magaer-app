import { useEffect } from "react";


export  function useClickaway(ref:React.RefObject<HTMLElement>,handler:()=> void){
    useEffect(()=>{
        const listener = (e:MouseEvent)=>{
            const target = e.target as Node
            if(!ref.current || ref.current.contains(target) ){
                return
            }else{
                handler()
            }


        }
        document.addEventListener('mousedown',listener)
        return () => document.removeEventListener('mousedown',listener)
    },[ref,handler])
}