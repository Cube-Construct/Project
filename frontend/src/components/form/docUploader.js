import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../assets/style.css'
import { WarningToast, SuccessToast, ErrorToast } from '../toaster'
import { ToastContainer } from 'react-toastify';

const DocUploader = () => {
  const [orgName, setOrgName] = React.useState('')
  const [orgEmail, setOrgEmail] = React.useState('')
  const [studentMap, setStudentMap] = React.useState([{ name: '', Documents: [] }])
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (orgEmail && orgName && studentMap.length > 0 && studentMap.every(student => student.name && student.Documents.length > 0)) {
        const formData = new FormData();
        formData.append('orgName', orgName);
        formData.append('orgEmail', orgEmail);
        formData.append('studentCount', studentMap.length);
        studentMap.forEach((student, index) => {
          formData.append(`name${index}`, student.name);
          for (let i = 0; i < student.Documents.length; i++) {
            formData.append(`Documents${index}`, student.Documents[i]);
          }

        })

        const res = await axios.post('http://localhost:5000/verification/insertstudent', formData);
        console.log(res);
        if (res.status === 200) {
          SuccessToast({ message: "Student added successfully" });
          navigate("/payment")
        }
        else {
          ErrorToast({ message: "Internal Server Error" });
        }
      }
      else {
        WarningToast({ message: "Please fill all the fields" });
      }
    }
    catch (err) {
      ErrorToast({ message: "Something went wrong" });
    }
  }


  return (
    <>
      {/* <br /> */}
      <ToastContainer />
      <div className='main-body'>
      <div className="container">
        <div className="title">Document upload form</div>
        <div className="content">
          <div className='div-form'>
            <div className="user-details">
              <div className="input-box">
                <div className="details">Name of Applicant / Agency</div>
                <input type="text" placeholder="Enter name of agency" required value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              </div>
              <div className="input-box">
                <div className="details">Email of Applicant / Agency</div>
                <input type="text" placeholder="Enter your email" required value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} />
              </div>
              <hr style={{ width: '100%', textAlign: 'left' }} />
              {studentMap.map((student, index) => {
                return (
                  // padding in responsive terms
                  <div key={index} style={{ padding: '18px 0 0 0', width: '100%' }}>
                    <div className="input-box">
                      <div className="details">Name of Student</div>
                      <input type="text" placeholder="Enter student name" required value={student.name} onChange={(e) => setStudentMap(studentMap.map((student, i) => i === index ? { ...student, name: e.target.value } : student))} />
                    </div>
                    <div className="input-image">
                      <div className="photo">Documents</div>
                      <input type="file" required onChange={(e) => setStudentMap(studentMap.map((student, i) => i === index ? { ...student, Documents: e.target.files } : student))} multiple />
                    </div>
                    {
                      studentMap.length > 1 &&
                      <button className="button_plus" onClick={() => setStudentMap(studentMap.filter((student, i) => i !== index))} />
                    }
                    <br />
                    <hr style={{ width: '100%', textAlign: 'left' }} />
                  </div>
                )
              })}
            </div>
            <div className="button">
              <input type="submit" value="Add student" onClick={() => setStudentMap([...studentMap, { name: '', Documents: [] }])} />
            </div>
            <div className="button_submit">
              <input type="submit" value="Submit" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* <br /> */}
    </>
  )
}

export default DocUploader