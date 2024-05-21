import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import BarChart from "../charts/BarChart";
import TableDemo from "../components/TableDemo";
import axios from "axios";

// Custom component to render Genres
const Genres = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);

  // const columns = useMemo(
  //   () => [
  //     {
  //       // first group - TV Show
  //       Header: "TV Show",
  //       // First group columns
  //       columns: [
  //         {
  //           Header: "Name",
  //           accessor: "show.name",
  //         },
  //         {
  //           Header: "Type",
  //           accessor: "show.type",
  //         },
  //       ],
  //     },
  //     {
  //       // Second group - Details
  //       Header: "Details",
  //       // Second group columns
  //       columns: [
  //         {
  //           Header: "Language",
  //           accessor: "show.language",
  //         },
  //         {
  //           Header: "Genre(s)",
  //           accessor: "show.genres",
  //         },
  //         {
  //           Header: "Runtime",
  //           accessor: "show.runtime",
  //         },
  //         {
  //           Header: "Status",
  //           accessor: "show.status",
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () => [
      {
        Header: "Details",
        columns: [
          {
            Header: "Language",
            accessor: "show.language",
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres",
            // Cell method will provide the cell value; we pass it to render a custom component
            Cell: ({ cell: { value } }) => <Genres values={value} />,
          },
          {
            Header: "Runtime",
            accessor: "show.runtime",
            // Cell method will provide the value of the cell; we can create a custom element for the Cell
            Cell: ({ cell: { value } }) => {
              const hour = Math.floor(value / 60);
              const min = Math.floor(value % 60);
              return (
                <>
                  {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
                  {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
                </>
              );
            },
          },
          {
            Header: "Status",
            accessor: "show.status",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        "https://api.tvmaze.com/search/shows?q=snow"
      );
      setTableData(result.data);
    })();
  }, []);

  return (
    <div className="text-3xl font-bold underline">
      <Navbar />
      <BarChart />
      <TableDemo columns={columns} data={tableData} />
    </div>
  );
};

export default Dashboard;
