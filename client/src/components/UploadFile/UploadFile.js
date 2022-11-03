import React,{useState} from 'react'
import axios from 'axios'

export default function UploadFile(){
    const [selectedFile,setSelectedFile] = useState(null)
    const formData = new FormData()
    formData.append("selectedFile",selectedFile)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("selectedFile",selectedFile)
        /*
        try{
            axios({
                method: "post",
                url:"/upload",
                data:formData,
                headers:{"Content-Type":"multipart/form-data"},
            })
            
        }catch(error){
            console.log(error)
        }
        */
        await axios.post("/upload",formData,
          {
            headers:{
              "Content-Type": "application/json",
            },
          }
          ).then((res)=>{
            console.log(res.data)
            
            
          }).catch((error)=>{
            console.error(error)
          })
    }
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileSelect}/>
            <input type="submit" value="Upload File"/>
        </form>
    )
}