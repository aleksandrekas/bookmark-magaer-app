import React, { useState,useContext, useEffect} from 'react'
import './edit.css'
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


export default function EditBookmark(){
    const context = useContext(Context)    
    const {title,description,url,tags,id} = context!.editTargetBookmark


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

    function clearForm(){
        setValues({
            title:'',
            description:'',
            url:'',
            tags:[],
            selectedTags:[]            
        })
    }



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




    function getCurrentDate(){
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
            const addRequest = await  fetchWithAuth('http://localhost:3000/api/editBookmark',{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title:title,
                    id:id,
                    url:url,
                    description:description,
                    selectedtags:selectedTags,
                })
            })
            console.log(addRequest)
            context?.setRefresh(!context.refresh)
        }catch(err){
            console.log("gela is awake")
            console.log(err)
        }
    }   



    useEffect(()=>{
        setValues({
            title:title,
            description:description,
            url:url,
            tags:tags,
            selectedTags:tags
        })
        setCount(values.description.length)
    },[context?.editTargetBookmark])


    return (
        <div className="addOverlay" style={{display: context?.editWindow ? "flex":"none"}}>
            <div className="add">
                <button className="closeBtn" onClick={()=>{context?.setEdit(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M15 5 5 15M5 5l10 10"/></svg>
                </button>
                <h1>Edit a Bookmark</h1>
                <p>Update your saved link details — change the title, description, URL, or tags anytime.</p>
                <form  className="addForm" onSubmit={addbookmark}>
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
                        <label className='tagLabel' htmlFor="tags">Tags *</label>
                        <input type="text" id='tags' name='tags' onChange={handleTags} value={tag}  onBlur={()=>{setShow(false)}} />
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
                            context?.setEdit(false)
                            clearForm()
                        }} type='button' >Cancel</button>
                        <button id='addButton'>Edit Bookmark</button>
                    </div>
                </form>
            </div>
        </div>
    )
}