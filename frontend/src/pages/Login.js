import React, { useEffect } from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import "../resourses/authentication.css";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
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
        message.error("User doesn't exist, please register or check your credentials");
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
            <h1>
              <b>Hey Employee !!</b>
            </h1>
            <hr />
            <h3>Login</h3>

            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
