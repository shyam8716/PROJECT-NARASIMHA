import React, { useState } from 'react'
import api from '../api/axios'
const AddaPage = () => {
    const[formdata,setformdata]=useState(
         {
        "id": 1,
        "title": "my girl friend is an alien",
        "author": "fang ling and chai jayoke",
        "genre": "drama & comedy",
        "published_date": "2022-09-16"
    }
    )
    const[success,setsuccess]=useState("")
    const[error,seterror]=useState("")
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Add New Book</h1>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
  )
}
export default AddaPage
