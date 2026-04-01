import React, { useState,useContext} from 'react'
import './addBookmark.css'
import { Context } from '../utils/ContextProvider'
import fetchWithAuth from '../utils/functions'

type Inputs ={
    title:string
    description:string
    url:string
    tags:string[] 
    selectedTags:string[] 
}

type Errors ={
    title:boolean
    description:boolean
    url:boolean
    tags:boolean
} 


export default function AddBookmark(){
    const [values,setValues] = useState<Inputs>({
        title:'',
        description:'',
        url:'',
        tags:[],
        selectedTags:[]
    })


    const [errors ,setErrors] = useState<Errors>({
        title:false,
        description:false,
        url:false,
        tags:false
    })

    const[tag,setTag] = useState<string>('')
    const context = useContext(Context)


    const [letterCount,setCount] = useState<number>(0)
    const [showTags,setShow] = useState<boolean>(false)

    const tagsarray = ['AI','Community','Compability','CSS','Design','Framework','Git','HTML','JavaScript','Layout','Learning','Performance','Practice','Reference','Tips','Tools','Tutorial']




    function validate(){
        const newErrors={
            title:values.title.length ===0,
            description:values.description.length ===0,
            url:values.url.length ===0,
            tags:values.tags.length ===0
        }

        setErrors(newErrors)
        
        return !newErrors.title && !newErrors.description && !newErrors.url && !newErrors.tags

    }


    function clearForm(){
        setValues({
            title:'',
            description:'',
            url:'',
            tags:[],
            selectedTags:[]            
        })
    }





    function handleInputs(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target
        setValues((prev)=>({
            ...prev,
            [name]:value
        }))
    }



    function getCurrentDate() {
        return new Date().toISOString()

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
        const filteredTags = tagsarray.filter( item =>item.toLowerCase().startsWith(value.toLowerCase()));
        setValues((prev)=>({
            ...prev,
            tags:filteredTags
        }))
        if(value !== '') setShow(true)
        if(filteredTags.length === 0) setShow(false)
    }

    function addTag(tag: string) {
        if(values.selectedTags.length === 3) return
        setValues((prev) => {
            if (prev.selectedTags.includes(tag)) return prev;

            return {
            ...prev,
            selectedTags: [...prev.selectedTags, tag]
            };
        });
    }

    function removeTag(target:string){
        const tags = [...values.selectedTags]
        const filtered = tags.filter(item => item !== target)
        setValues((prev)=>({
            ...prev,
            selectedTags:filtered
        }))
    }

    async function addbookmark(e:React.FormEvent){
        e.preventDefault()
        
        const isVlaid = validate()

        if(!isVlaid) return 

        const {title,url,description,selectedTags} = values;
        try{
            const addRequest = await  fetchWithAuth('http://localhost:3000/api/addBookmark',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title:title,
                    url:url,
                    description:description,
                    selectedtags:selectedTags,
                    archived:false,
                    created:getCurrentDate(),
                    visitCount:0,
                    lastVisit:"never",
                    pinned:0
                })
            })
            context?.setRefresh(!context.refresh)
        }catch(err){
            console.log("gela is awake")
            console.log(err)
        }
    }   




    return (
        <div className="addOverlay" style={{display: context?.addBookmarkWindow ? "flex":"none"}}>
            <div className="add">
                <button className="closeBtn" onClick={()=>{context?.setBookmarkWindow(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M15 5 5 15M5 5l10 10"/></svg>
                </button>
                <h1>Add a Bookmark</h1>
                <p>Save a link with details to keep your collection organized.</p>
                <form  className="addForm" onSubmit={addbookmark} autoComplete='off'>
                    <label htmlFor="title">Title *</label>
                    <input type="text" id='title' name='title' onChange={handleInputs} value={values.title} />
                    <span style={{visibility: errors.title ? "visible" : "hidden"}} className="errorspan">* enter the title</span>
                    <label htmlFor="description">Description *</label>
                    <textarea onChange={handleTextarea} id="description" name='description' value={values.description} ></textarea>
                    <span style={{visibility: errors.description ? "visible" : "hidden"}} className="errorspan">* enter description</span>
                    <div className="textareaCount">
                        {letterCount}/280
                    </div>
                    <label htmlFor="url">Website URL *</label>
                    <input type="text" id='url' name='url' onChange={handleInputs} value={values.url} />
                    <span style={{visibility: errors.url ? "visible" : "hidden"}} className='errorspan'>* enter url</span>
                    <span className="errorspan"></span>
                    <div className="tag">
                        <label className='tagLabel' htmlFor="tags">Tags *</label>
                        <input type="text" id='tags' name='tags' onChange={handleTags} value={tag} onFocus={()=>{setShow(true)}}  onBlur={()=>{setShow(false)}} />  
                        <span style={{visibility: errors.tags ? "visible" : "hidden"}} className="errorspan">* select at least 1 tag</span>  
                        <div className="selectedTags">
                            {values.selectedTags.map((tag,index)=>(
                                <div onClick={()=>{removeTag(tag)}} key={index} className="selectedTag">{tag}</div>
                            ))}
                        </div>
                        <div className="tagsContainer" style={{display:showTags? "block":"none"}} >
                            {
                                values.tags.map((item,index)=>(
                                    <div key={index} onMouseDown={()=>{addTag(item)}} className="tagDiv">{item}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="formButtons">
                        <button onClick={()=>{
                            context?.setBookmarkWindow(false)
                            clearForm()
                        }} type='button' >Cancel</button>
                        <button id='addButton'>Add Bookmark</button>
                    </div>
                </form>
            </div>
        </div>
    )
}