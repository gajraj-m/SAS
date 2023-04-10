import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Employees() {
  const [usersData, setUsersData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("pos-user"));

  const getAllUsers = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/users/get-all-users")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data;
        const filteredData = data.filter(item => !item.admin) // don't show admin users
        data.reverse();
        setUsersData(filteredData);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value) => <span>{value.toString().substring(0, 10)}</span>,
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingUser(record);
              setAddEditModalVisibilty(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => deleteUser(record)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!user.admin) navigate("/home");
    getAllUsers();
  }, []);

  // update / create employees

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if (editingUser === null) {
      axios
        .post("/api/users/add-user", values)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item added successfully");
          setAddEditModalVisibilty(false);
          getAllUsers();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong");
          console.log(error);
        });
    } else {
      axios
        .post("/api/users/edit-user", { ...values, userId: editingUser._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item edited successfully");
          setEditingUser(null);
          setAddEditModalVisibilty(false);
          getAllUsers();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong");
          console.log(error);
        });
    }
  };

  // delete employee
  // remove item from database
  const deleteUser = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/users/delete-user", { userId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("User deleted successdully");
        getAllUsers();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
        console.log(error);
      });
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Employees</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Add Employee
        </Button>
      </div>
      <Table columns={columns} dataSource={usersData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingUser(null);
            setAddEditModalVisibilty(false);
          }}
          visible={addEditModalVisibilty}
          title={`${
            editingUser !== null ? "Edit Employee" : "Add New Employee"
          }`}
          footer={false}
        >
          <Form
            initialValues={editingUser}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            {/* <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item> */}
            <Form.Item name="password" label="Password">
              <Input />
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}

      <Footer />
    </DefaultLayout>
  );
}

export default Employees;
