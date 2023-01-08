import React from 'react'

const StudentList = ({students}) => {
    <>
      {students.map(list=>(
        <div>
        <h4>{list.name}</h4>
        <p>{list.email}</p>
        <p>{list.phoneNo}</p>
        </div>
      ))}
    </>
}

export default StudentList
