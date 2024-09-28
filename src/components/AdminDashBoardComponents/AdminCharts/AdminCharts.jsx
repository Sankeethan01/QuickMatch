import React, { useEffect, useState } from "react";
import "./AdminCharts.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const AdminCharts = () => {
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [customerProviderRatioData, setCustomerProviderRatioData] = useState(
    []
  );
  const [servicePerformanceData, setServicePerformanceData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/quickmatch_api/getUsercountwithmonth.php",
          {
            params: { action: "count" },
          }
        );
        const transformedData = response.data.reduce((acc, item) => {
          const existingEntry = acc.find((entry) => entry.month === item.month);
          if (existingEntry) {
            existingEntry[item.user_type] = item.count;
          } else {
            acc.push({
              month: item.month,
              [item.user_type]: item.count,
            });
          }
          return acc;
        }, []);

        // Log the transformed data to verify
        console.log(transformedData);

        setUserGrowthData(transformedData);
      } catch (error) {
        console.log("Error fetching user growth data");
        console.error(error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/quickmatch_api/getTotalIncomewithmonth.php",
          {
            params: { action: "monthly_income" },
          }
        );
        console.log(response.data);
        setIncomeData(response.data);
      } catch (error) {
        console.log("Error fetching income data");
        console.error(error);
      }
    };

    fetchIncomeData();
  }, []);

  useEffect(() => {
    const fetchUserTypeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/quickmatch_api/getUserTypeCount.php",
          {
            params: { action: "user_type_count" },
          }
        );
        // Transform the data into a format suitable for the PieChart
        const transformedData = response.data.map((item) => ({
          name: item.user_type === "customer" ? "Customers" : "Providers",
          value: item.count,
        }));
        setCustomerProviderRatioData(transformedData);
      } catch (error) {
        console.log("Error fetching user type data");
        console.error(error);
      }
    };

    fetchUserTypeData();
  }, []);

  useEffect(() => {
    const fetchServicePerformanceData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/quickmatch_api/getTopPerformingServices.php",
          {
            params: { action: "top_services" },
          }
        );
        setServicePerformanceData(response.data);
      } catch (error) {
        console.log("Error fetching top services data");
        console.error(error);
      }
    };

    fetchServicePerformanceData();
  }, []);

  return (
    <div className="admin-charts">
      {/* Customer Growth Over Time (Line Chart) */}
      <div className="admin-chart-item">
        <h3 className="chartTitle">User Growth Over Time</h3>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <LineChart data={userGrowthData}>
            <XAxis dataKey="month" stroke="#5550bd" />
            <Line
              type="monotone"
              dataKey="customer"
              stroke="#82ca9d"
              name="Customers"
            />
            <Line
              type="monotone"
              dataKey="provider"
              stroke="#8884d8"
              name="Providers"
            />
            <Tooltip />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Income from Service Bookings (Bar Chart) */}
      <div className="admin-chart-item">
        <h3 className="chartTitle">Monthly Income from Bookings</h3>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <BarChart data={incomeData}>
            <XAxis dataKey="month" stroke="#5550bd" />
            <Bar dataKey="income" fill="#008000" />
            <Tooltip />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Service Providers and Customers Ratio (Pie Chart) */}
      <div className="admin-chart-item">
        <h3 className="chartTitle">Service Providers and Customers Ratio</h3>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <PieChart>
            <Pie
              data={customerProviderRatioData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#000080"
              label
            >
              {customerProviderRatioData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performing Services (Bar Chart) */}
      <div className="admin-chart-item">
        <h3 className="chartTitle">Top Performing Services</h3>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <BarChart data={servicePerformanceData}>
            <XAxis dataKey="service_name" stroke="#5550bd" />
            <Bar dataKey="income" fill="#FFA500" />
            <Tooltip />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminCharts;
