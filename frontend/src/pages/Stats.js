import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";


function Stats() {
  const [billsData, setBillsData] = useState([]);
  const user = JSON.parse(localStorage.getItem("pos-user"));
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data;
        data.reverse();
        setBillsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value) => <span>{value.toString().substring(0, 10)}</span>,
    },
  ];

  useEffect(() => {
    if (!user.admin) navigate("/home");
    getAllBills();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Statistics</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />

      <Footer />
    </DefaultLayout>
  );
}

export default Stats;
