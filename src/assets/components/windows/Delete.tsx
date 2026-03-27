import './windows.css';
import fetchWithAuth from '../utils/functions';
import { Context } from '../utils/ContextProvider';
import { useContext } from 'react';


export default function Delete(){
    const context = useContext(Context)




    function handleClose(){
        context?.setDelete({
            open:false,
            bookmarkId:null
        })
    }



    async function deleteBookmark(){

        try{
            const deleteRequest = await  fetchWithAuth('http://localhost:3000/api/delete',{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:context?.deleteWindow.bookmarkId
                })
            })
            context?.setRefresh(prev => !prev)
            handleClose()
        }catch(err){
            console.log("gela is awake")
            console.log(err)
        }
    }    




    return(
        <div className="overlay"  style={{display: context?.deleteWindow.open ?  "flex" : "none"}}>
            <div className="windowContainer">
                <h2>Delete bookmark</h2>
                <p>Are you sure you want to delete this bookmark?</p>
                <div className="buttons">
                    <button id="cancel" className='windowBtn' onClick={handleClose}>Cancel</button>
                    <button id="delete" className='windowBtn' onClick={deleteBookmark}>Delete permanently</button>
                </div>
                <button className="closeBtn" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M15 5 5 15M5 5l10 10"/></svg>
                </button>
            </div>
        </div>
    )
}  