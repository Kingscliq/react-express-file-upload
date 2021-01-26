import React, {Fragment, useState} from 'react'
import axios from 'axios'

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})

    const handleSubmit= async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', file);

        try{
            const res = await axios.post('http://localhost:5000/upload/', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            })
            console.log(res.data)
            const {fileName, filePath} = res.data

            setUploadedFile({fileName, filePath})
        }catch(err){
            if(err){
                console.log('there was a problem with the server', err)
            }else{
                console.log(err.response.data.msg);
            }
        }
    }

    const handleChange= e =>{
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    return (
        <Fragment>
            <div className="container">
                 <h2>Upload File</h2>
                <form action="" onSubmit={handleSubmit}>

                    <input type="file" onChange={handleChange}/>
                    <input type="submit" value="Upload"/>
                </form>
            </div>
        </Fragment>
    )
}

export default FileUpload;
