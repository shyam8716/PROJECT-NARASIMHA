import React, { useState } from 'react'
import api from '../api/axios'
const AddaPage = () => {
    const[formdata,setformdata]=useState(
         {
        "id": 1,
        "title": "my girl friend isan alien",
        "author": "fang ling and chai jayoke",
        "genre": "drama & comedy",
        "published_date": "2022-09-16"
    }
    
    )
  return (
    <div>
      <h3>Adding library details</h3>
    </div>
  )
}
export default AddaPage
