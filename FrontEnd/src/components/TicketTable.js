import styled from "styled-components";
import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { selectUserId } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { getTicketByUserID } from "../data/data";
import ReactLoading from "react-loading";

const TicketTable = (props) => {
  const userId = useSelector(selectUserId);
  const token = Cookie.get("token");
  const [loading, setLoading] = useState(true);

  const [tickets, setTickets] = useState([]);
  const columns = [
    {
      name: "STT",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Mã hóa đơn",
      selector: (row) => row.orderCode,
    },
    {
      name: "Thời gian giao dịch",
      selector: (row) => row.reservationTime,
    },
    {
      name: "Mã lấy vé",
      selector: (row) => row.ticketCode,
    },
    {
      name: "Tổng tiền",
      selector: (row) => row.price,
    },
  ];

  useEffect(() => {
    setLoading(true);
    getTicketByUserID(userId, token)
      .then((data) => {
        setLoading(false);
        setTickets(data);
      })
      .catch((error) => {
        setLoading(false);
        setTickets([]);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ display: "ruby-text" }}>
          <ReactLoading type="spin" color={"#ffff"} width={"10%"} />
        </div>
      ) : (
        <DataTable
          pagination={true}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10]}
          columns={columns}
          data={tickets}
          customStyles={customStyles}
        ></DataTable>
      )}
    </>
  );
};

const customStyles = {
  table: {
    style: {
      background: "#1a1d29",
      "max-width": "1100px",
      "min-width": "500px",
      "max-height": "750px",
      border: "1px solid #454d6a",
      margin: "0 auto",
    },
  },
  headCells: {
    style: {
      "padding-left": "10px",
      "border-color": "hsla(0, 0%, 100%, 0.08)",
      background: "#454D6A",
      "text-align": "center",
      color: "#fff",
      "font-size": "14px",
      "font-weight": "700",
      border: "1px solid hsla(0, 0%, 100%, 0.08)",
    },
  },
  rows: {
    style: {
      color: "#fff",
      "font-size": "14px",
      background: "transparent",
    },
  },
  pagination: {
    style: {
      background: "#454D6A",
      "font-size": "14px",
      color: "#fff",
      border: "1px solid hsla(0, 0%, 100%, 0.08)",
      "border-bottom-right-radius": "10px",
      "border-bottom-left-radius": "10px",
      "margin-bottom": "100px",
    },
  },
};

export default TicketTable;
