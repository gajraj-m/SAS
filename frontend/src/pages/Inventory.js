import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Table } from "antd";
import Footer from "../components/Footer";

function Inventory() {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();

  // fetch all items from database
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
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
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price/kg",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisibilty(true);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllItems();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if (editingItem === null) {
      axios
        .post("/api/items/add-item", values)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item added successfully");
          setAddEditModalVisibilty(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong");
          console.log(error);
        });
    } else {
      values.quantity = Number(values.quantity) + editingItem.quantity;
      
      axios
        .post("/api/items/edit-item", { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item edited successfully");
          setEditingItem(null);
          setAddEditModalVisibilty(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong");
          console.log(error);
        });
    }
  };
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={itemsData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingItem(null);
            setAddEditModalVisibilty(false);
          }}
          visible={addEditModalVisibilty}
          title={`${editingItem !== null ? "Edit Item" : "Add New Item"}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity added">
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
      <Footer/>
    </DefaultLayout>
  );
}

export default Inventory;
