import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import HeaderSection from "./components/HeaderSection";
import UserDetails from "../UserDetails/UserDetails";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const DashBoard = () => {
  return (
    <div>
      <Navbar title="Dashboard" />
      <Sidebar />
      <>
        <div className="ml-10 mt-5">
          <div className="">
            <HeaderSection />
          </div>
          <div className="grid col-span-2">
            {/* <PieChart width={400} height={200}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={(entry) => entry.name}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart> */}
          </div>

          <UserDetails />
        </div>
      </>
    </div>
  );
};

export default DashBoard;
