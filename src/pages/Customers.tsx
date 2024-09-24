import React, { useState, useMemo } from "react";
import { useAppStore } from "../store/appStore";
import { useFetchCustomers } from "../api/fetchCustomers";
import { Table, Button, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Customer } from "../types/customer";
import { Breakpoint } from "../types/breakpoints";
import { ColumnsType } from "antd/es/table";

const Customers: React.FC = () => {
  const { isLoading, error } = useFetchCustomers();
  const customers = useAppStore((state) => state.customers);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredCustomers = useMemo(() => {
    if (!searchText) return customers;

    const lowercasedSearchText = searchText.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(lowercasedSearchText) ||
        customer.email.toLowerCase().includes(lowercasedSearchText)
    );
  }, [searchText, customers]);

  if (error)
    return <div role="alert">Error loading customers: {error.message}</div>;

  const columns: ColumnsType<Customer> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"] as Breakpoint[],
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
      responsive: ["lg", "xl", "xxl"] as Breakpoint[],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["lg", "xl", "xxl"] as Breakpoint[],
    },
    {
      title: "Postal",
      dataIndex: "postal",
      key: "postal",
      responsive: ["lg", "xl", "xxl"] as Breakpoint[],
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      responsive: ["lg", "xl", "xxl"] as Breakpoint[],
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
      responsive: ["lg", "xl", "xxl"] as Breakpoint[],
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      responsive: ["lg", "xl", "xxl"] as Breakpoint[],
    },
    {
      title: "Action",
      key: "action",
      render: (_: undefined, record: Customer) => (
        <Button
          onClick={() => navigate(`/customer/${record.id}/edit`)}
          aria-label={`Edit customer ${record.name}`}
        >
          Edit
        </Button>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"] as Breakpoint[],
    },
  ];

  return (
    <main role="main">
      <header role="banner">
        <h2 id="customers-list">Customer List</h2>
      </header>
      <section>
        <Space style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="Search by name or email"
            value={searchText}
            onChange={onSearchChange}
            allowClear
            style={{ width: 300 }}
            aria-label="Search customers by name or email"
          />
        </Space>
        <Table
          dataSource={filteredCustomers}
          columns={columns}
          rowKey="id"
          locale={{
            emptyText: isLoading
              ? "Loading customers..."
              : "No customers found.",
          }}
          pagination={{ position: ["bottomCenter"] }}
          loading={isLoading}
        />
      </section>
    </main>
  );
};

export default Customers;
