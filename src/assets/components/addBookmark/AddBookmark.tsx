import { useState, useEffect } from 'react'
import './addBookmark.css'





export default function AddBookmark(){
    const [values,setValues] = useState<any>({

    })
    const [tagsContent,setTags] = useState<Array<string>>([])
    const [letterCount,setCount] = useState<number>(0)
    const [showTags,setShow] = useState<boolean>(false)

    const tags = ['AI','Community','Compability','CSS','Design','Framework','Git','HTML','JavaScript','Layout','Learning','Performance','Practice','Reference','Tips','Tools','Tutorial']


    function handleTextarea(e:React.ChangeEvent<HTMLTextAreaElement>){
        setCount(e.target.value.length)
    }   


    function handleTagsContent(){
        
    }





    return (
        <div className="addOverlay">
            <div className="add">
                <button className="closeBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M15 5 5 15M5 5l10 10"/></svg>
                </button>
                <h1>Add a Bookmark</h1>
                <p>Save a link with details to keep your collection organized.</p>
                <form  className="addForm">
                    <label htmlFor="title">Title *</label>
                    <input type="text" id='title'/>
                    <label htmlFor="description">Description *</label>
                    <textarea onChange={handleTextarea} id="description"></textarea>
                    <div className="textareaCount">
                        {letterCount}/280
                    </div>
                    <label htmlFor="url">Website URL *</label>
                    <input type="text" id='url'/>
                    <div className="tags">
                        <label htmlFor="tags">Tags *</label>
                        <input type="text" id='tags' onFocus={()=>{setShow(true)}} onBlur={()=>{setShow(false)}} />
                        <div className="tagsContainer" style={{display:showTags? "block":"none"}} >

                        </div>
                    </div>
                    <div className="formButtons">
                        <button>Cancel</button>
                        <button id='addButton'>Add Bookmark</button>
                    </div>
                </form>
            </div>
        </div>
    )
}