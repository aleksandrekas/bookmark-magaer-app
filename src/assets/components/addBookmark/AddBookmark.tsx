import { useState, useEffect } from 'react'
import './addBookmark.css'

type Inputs ={
    title:string
    description:string
    url:string
    tags:string[] 
    selectedTags:string[] 
}



export default function AddBookmark(){
    const [values,setValues] = useState<Inputs>({
        title:'',
        description:'',
        url:'',
        tags:[],
        selectedTags:[]
    })

    const[tag,setTag] = useState<string>('')



    const [letterCount,setCount] = useState<number>(0)
    const [showTags,setShow] = useState<boolean>(false)

    const tagsarray = ['AI','Community','Compability','CSS','Design','Framework','Git','HTML','JavaScript','Layout','Learning','Performance','Practice','Reference','Tips','Tools','Tutorial']


    function handleInputs(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target
        setValues((prev)=>({
            ...prev,
            [name]:value
        }))
    }


    function handleTextarea(e:React.ChangeEvent<HTMLTextAreaElement>){
        setCount(e.target.value.length)
        setValues((prev)=>({
            ...prev,
            description:e.target.value
        }))
    }   


    function handleTags(e:React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value
        setTag(value)
        const filteredTags = tagsarray.filter( item =>item.toLowerCase().includes(value.toLowerCase()));
        console.log(filteredTags)
        setValues((prev)=>({
            ...prev,
            tags:filteredTags
        }))
    }

    console.log(values.tags)



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
                    <input type="text" id='title' name='title' onChange={handleInputs} value={values.title} />
                    <label htmlFor="description">Description *</label>
                    <textarea onChange={handleTextarea} id="description" name='description' value={values.description} ></textarea>
                    <div className="textareaCount">
                        {letterCount}/280
                    </div>
                    <label htmlFor="url">Website URL *</label>
                    <input type="text" id='url' name='url' onChange={handleInputs} value={values.url} />
                    <div className="tag">
                        <label htmlFor="tags">Tags *</label>
                        <input type="text" id='tags' name='tags' onChange={handleTags} value={tag} onFocus={()=>{setShow(true)}} onBlur={()=>{setShow(false)}} />
                        <div className="selectedTags">

                        </div>
                        <div className="tagsContainer" style={{display:showTags? "block":"none"}} >
                            {
                                values.tags.map((item)=>(
                                    <div className="tagDiv">{item}</div>
                                ))
                            }
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