import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "../api/axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";

function Homepage() {

  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategoty] = useState("fruits");

  // const user = JSON.parse(localStorage.getItem("pos-user"));
  // console.log(`inside homepage and user is : ${user.name}`)

  const categories = [
    {
      name: "fruits",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg",
    },
    {
      name: "vegetables",
      imageURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg",
    },
    {
      name: "meat",
      imageURL:
        "https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive",
    },
    {
      name: "dairy",
      imageURL:
        "https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg",
    },
  ];
  const dispatch = useDispatch();

  // fetch items
  const getAllItems = async () => {
    dispatch({ type: "showLoading" });
    await axios
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

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>

      <div className="d-flex categories">
            {categories.map((category)=>{
              return <div 
              onClick={()=>setSelectedCategoty(category.name)}
              className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                      <h4>{category.name}</h4>
                      <img src={category.imageURL} height='60' width='80' alt="" />
              </div>
            })}
      </div>

      <Row gutter={20}>

        {itemsData.filter((i)=>i.category===selectedCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
      <Footer/>
    </DefaultLayout>
  );
}

export default Homepage;
