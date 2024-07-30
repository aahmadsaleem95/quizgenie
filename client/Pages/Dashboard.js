import React, { useState } from "react";

import { Col, Row, Typography, Form, Select, DatePicker, Button } from "antd";

import { SearchOutlined } from "@ant-design/icons";

export const Dashboard = () => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  return (
    <>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Admin Dashboard
      </Typography.Title>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <Form
            form={form}
            // onFinish={onFinish}
            autoComplete="off"
            layout={"inline"}
            style={{ justifyContent: "space-evenly" }}
          >
            <Form.Item name="date_range" label="Range Picker">
              <RangePicker />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                <SearchOutlined></SearchOutlined>Search
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
