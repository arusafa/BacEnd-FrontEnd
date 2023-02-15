import axios from "axios";
import { useState, useEffect } from "react";
import '../../css/DataDisplay.css'

const BASE_URL = "https://capstone-backend-gldz.onrender.com/home";

const TutorList = () => {
  const [getValue, setGetValue] = useState([]);
  useEffect(() => {
    const getAllInfo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tutor/result`);
        setGetValue(res.data);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Numb</th>
              <th>Email ID</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {getValue.map((x) => (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.firstname}</td>
                <td>{x.lastname}</td>
                <td>{x.phone}</td>
                <td>{x.email}</td>
                <td>{x.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorList;
