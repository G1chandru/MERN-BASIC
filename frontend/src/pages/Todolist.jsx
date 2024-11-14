import React, { useEffect, useState } from 'react'
import "../css/todolist.css"
import del from '../../public/del.svg'
import edit from '../../public/edit.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Todolist = () => {
  const [ input ,setinput ] =  useState("")
  const [ data , setData ] = useState([])
  const [ idx , setidx ] = useState()
  const [ signUpName , setsignUpName ] = useState("")
  const  navigate = useNavigate();
 async function handleSubmit()
 {
   if(idx == undefined)
   { 
     const note =input
    try {
     const response = await axios.post(
       "http://localhost:4000/api/users/createtodo",
       {
         note
       }
     );
    
    setData((prevData) => [
      ...prevData,
      { _id: response.data._id, notes:response.data.note },
    ]);

     const res = await axios.get(
       "http://localhost:4000/api/users//gettodo"
     );
     setData(res.data);  
    setinput(""); 
    

    } catch (error) {
       console.log(error)
    }
   }
   else if(input && idx != undefined )
   {  
    const title = { note: input }; // Wrapping input in the correct format

  
    setData((prevData) =>
      prevData.map((todo, i) => (i === idx ? { ...todo, note: input } : todo))
    );

    try {
      // Sending the updated data to the backend
      const res = await axios.put(
        `http://localhost:4000/api/users/updatetodo/${idx}`,
        title
      );
         setData(res.data);
      console.log("Todo updated successfully", res.data); // Log success response
    } catch (error) {
      console.error("Error updating todo:", error);
    }
     setinput("")
   }
 }

  function handleEdit(listValue,id)
  { 
    
        setinput(listValue);
        setidx(id)
        
  }
 
 const handleDelete = async (id) => {
  setData((prevData) => prevData.filter((el) => el._id !== id));
   try {
    const res =  await axios.delete(`http://localhost:4000/api/users/deletetodo/${id}`);
   } catch (error) {
     console.error("Error deleting todo:", error);
   }
 };



    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/api/users//gettodo"
          );
          setData(response.data); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, []);


  useEffect(()=>{

    async function fetchData()
    {
    const id = localStorage.getItem("ID")
    const toSendId = JSON.parse(id);
    // const response = await axios.get(`http://localhost:4000/api/users/getuser/${toSendId}`);
    //  console.log(response.name)
    setsignUpName(toSendId) 
    } 
    fetchData();     
  },[])

   async function handleLogout()
  {
      // localStorage.clear("ID");
      navigate("/")
  }

  return (
    <>
      <header className="nav">
        <div className="container">
          <div className="nav-wrapper">
            <h3>Todo</h3>
            <div>
              <span>
                UserName:<span style={{ color: "blue" }}>{signUpName}</span>
              </span>
              <button onClick={handleLogout} >Logout</button>
            </div>
          </div>
        </div>
      </header>
      <section className="todo">
        <div className="container">
          <div className="todo-wrapper">
            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setinput(e.target.value);
                }}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          <div className="todolist">
            <ul>
              {data.map((item, index) => (
                <li key={item._id}>
                  <div>
                    <h4>{item.note}</h4>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => {
                        handleEdit(item.note, item._id);
                      }}
                    >
                      <img src={edit} alt="delete" />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      <img src={del} alt="delete" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Todolist

