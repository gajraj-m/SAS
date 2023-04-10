import React, { useEffect } from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import "../resourses/authentication.css";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/users/login", values)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success("Login successfull");
        localStorage.setItem("pos-user", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch(() => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("pos-user")) navigate("/home");
  }, []);

  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <Button htmlType="submit" type="primary">
              Manager
            </Button>
            <Button htmlType="submit" type="primary">
              Employee
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Landing;
