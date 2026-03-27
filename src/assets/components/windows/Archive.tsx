import './windows.css';
import { useClickaway } from '../utils/useClickaway';
import { useContext } from 'react';
import { Context } from '../utils/ContextProvider';
import fetchWithAuth from '../utils/functions';



export default function Archive(){
    const context = useContext(Context)


    function closeWindow(){
        context?.setArchive((prev)=>({
            ...prev,
            open:false
        }))
    }

    async function archiveBookmark(){

        try{
            const archiveRequest = await  fetchWithAuth('http://localhost:3000/api/edit',{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    params:{
                        archived:context?.archive.archived === 1 ? 0 : 1
                    },
                    id:context?.archive.bookmarkId
                })
            })
            context?.setRefresh(prev => !prev)
            closeWindow()
        }catch(err){
            console.log("gela is awake")
            console.log(err)
        }
    }


    return(
        <div className="overlay" style={{display: context?.archive.open ? 'flex' : 'none'}}>
            <div className="windowContainer">
                <h2>
                    {context?.archive.archived === 1 ?  'Unarchive bookmark': 'Archive bookmark'}

                </h2>
                <p>
                    {context?.archive.archived === 1 ?  'Move this bookmark back to your active list?': 'Are you sure you want to archive this bookmark?'}
                    

                </p>
                <div className="buttons">
                    <button id="cancel" className='windowBtn' onClick={closeWindow}>Cancel</button>
                    <button id="archive" className='windowBtn' onClick={archiveBookmark}>
                        {context?.archive.archived === 1 ?  'Unarchive': 'Archive'}
                        </button>
                </div>
                <button className="closeBtn" onClick={closeWindow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M15 5 5 15M5 5l10 10"/></svg>
                </button>
            </div>
        </div>
    )
}