import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { Customer } from "../types/customer";
import { Form, Input, Select, Button, message } from "antd";
import { useFetchCustomers } from "../api/fetchCustomers";
import { channelOptions, provinces } from "../consts/consts";

const { Option } = Select;

const EditCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error } = useFetchCustomers();
  const customers = useAppStore((state) => state.customers);
  const customer = customers.find((c) => c.id === Number(id));

  const [form] = Form.useForm();

  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer);
    }
  }, [customer, form]);

  const onFinish = (values: Customer) => {
    console.log("Form values:", values);
    message.success("Customer information saved successfully!", 3);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    if (
      errorInfo &&
      errorInfo.errorFields &&
      errorInfo.errorFields.length > 0
    ) {
      message.error("Submission failed due to validation errors.");
    }
  };

  if (isLoading)
    return (
      <div role="status" aria-live="polite">
        Loading...
      </div>
    );
  if (error)
    return <div role="alert">Error loading customer: {error.message}</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <main role="main">
      <header role="banner">
        <h2 id="edit-customer-form">Edit Customer</h2>
      </header>
      <section>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          aria-labelledby="edit-customer-form"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
            aria-label="Customer name"
            aria-required="true"
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            aria-label="Customer email"
            aria-required="true"
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Channel"
            name="channel"
            aria-label="Customer communication channel"
          >
            <Select>
              {channelOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            aria-label="Customer address"
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item label="Postal" name="postal" aria-label="Customer address">
            <Input placeholder="Enter postal" />
          </Form.Item>

          <Form.Item label="City" name="city" aria-label="Customer city">
            <Input placeholder="Enter city" />
          </Form.Item>

          <Form.Item
            label="Province"
            name="province"
            aria-label="Customer province"
          >
            <Select>
              {provinces.map((province) => (
                <Option key={province} value={province}>
                  {province}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            aria-label="Customer country"
          >
            <Input disabled value="Canada" placeholder="Enter country" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              aria-label="Save customer information"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </section>
    </main>
  );
};

export default EditCustomer;
