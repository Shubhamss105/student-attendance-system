import React, {  useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function Forms() {

  const navigate=useNavigate();

  const [list, setList] = useState({ name: "", rollNo: "" });
  const [submittedData, setSubmittedData] = useState([]);

  const[deleteUser,setDeleteUser]=useState([]);
  const[count,setCount]=useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/items/count');
      setCount(response.data.count);
    };
    fetchData();
  }, []);
  
    

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const{name,rollNo} = list;
      
    const res = await fetch('/api/register',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name,rollNo
      })
    })
    const data= await res.json()

    if(data.status===422 || !data){
      window.alert("Invalid registration");
      console.log("invalid registration");
    }else{
      setSubmittedData(res.data);
      console.log("registration successfull");
      console.log(data);
      handleClick();
      navigate('/successfull-entry')
      setCount(count + 1);
    }
  }

  useEffect(() => {
    // handleSubmit function is now in scope and can be called here
  }, [list, submittedData]);

  const handleClick = async () => {
    const response = await axios.get('/api/users');
    setSubmittedData(response.data);

  }


  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setList({ ...list, [name]: value });
    console.log({ ...list, [name]: value });
  };


  const handleDelete = async (userId) => {
    console.log(userId)
    await axios.delete(`/api/users/${userId}`);
    const updatedUsers = deleteUser.filter(user => user._id !== userId);
    setDeleteUser(updatedUsers);
    handleClick();

  }

  return (
    <>
      <div className="row g-2  mb-3 mx-3 my-3">
        <div className="col ">
          <div className="container mb-3 mx-3 my-3">
            <h1 >Student Attendance System</h1>
            <h2 className="mt-4 text-decoration-underline">Total number of student: {count}</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <label className="form-label">
                Name:
                </label>
                <input
                  required
                  className="form-control"
                  type="text"
                  name="name"
                  value={list.name}
                  onChange={handleChange}
                />
              
              
              <br />
              <label className="form-label">
                Roll Number:
                </label>
                <input
                  required
                  className="form-control"
                  type="number"
                  name="rollNo"
                  value={list.rollNo}
                  onChange={handleChange}
                />
              
              <br />
              <button type="submit" className="btn btn-primary" >
                Check In
              </button>
            </form>
            <button type="submit" className="btn btn-primary mt-2" onClick={handleClick}>Get List</button>
          </div>
        </div>
            {/* table data */}




        
        <div className="col mb-3 mx-1 my-3 ">
        <div className="container-lg">
            <h1>Details</h1>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                {/* <th scope="col">Email</th> */}
                <th scope="col">Roll Number</th>
                <th scope="col">&nbsp;&nbsp;&nbsp;</th>
              </tr>
            </thead>
            <tbody>

              {submittedData.map((data, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                  <td>{data.name}</td>
                  {/* <td>{data.email}</td> */}
                  <td>{data.rollNo}</td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={()=>{handleDelete(data._id)}}>
                      Check Out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          </div>
        </div>
      </div>
      
    </>
  );
}

export default Forms;



