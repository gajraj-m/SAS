import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
// import "rsuite/dist/styles/rsuite-default.css";
import { PieChart } from "@rsuite/charts";

function Stats() {
  const [pieDataCategory, setPieDataCategory] = useState([]);
  const [pieDataItems, setPieDataItems] = useState([]);

  const dispatch = useDispatch();

  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data;
        data.reverse();
        console.log(data);
        getStats(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const getStats = async (data) => {
    const categoryTotals = data.reduce((accumulator, bill) => {
      bill.cartItems.forEach((item) => {
        const { category, price, quantity } = item;
        const itemTotal = price * quantity;

        if (accumulator[category]) {
          accumulator[category] += itemTotal;
        } else {
          accumulator[category] = itemTotal;
        }
      });

      return accumulator;
    }, {});
    await setPieDataCategory(
      Object.entries(categoryTotals).map(([category, total]) => [
        category,
        total,
      ])
    );

    const itemTotals = data.reduce((accumulator, bill) => {
      bill.cartItems.forEach((item) => {
        const { name, price, quantity } = item;
        const itemTotal = price * quantity;

        if (accumulator[name]) {
          accumulator[name] += itemTotal;
        } else {
          accumulator[name] = itemTotal;
        }
      });

      return accumulator;
    }, {});
    await setPieDataItems(
      Object.entries(itemTotals).map(([items, total]) => [items, total])
    );
  };

  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Statistics</h3>
      </div>
      <div
        style={{
          display: "block",
          width: "auto",
          paddingLeft: 30,
        }}
      >
        <h3 className="text-center">Sales by category</h3>
        <PieChart name="PieChart" data={pieDataCategory} legend={false} />
      </div>
      <br />
      <hr />
      <div
        style={{
          display: "block",
          width: "auto",
          paddingLeft: 30,
        }}
      >
        <h3 className="text-center">Sales by Items</h3>
        <PieChart name="PieChart" data={pieDataItems} legend={false} />
      </div>
      <Footer />
    </DefaultLayout>
  );
}

export default Stats;
