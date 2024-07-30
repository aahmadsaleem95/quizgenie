import React, { useState, useEffect } from "react";
import {
  Input,
  InputNumber,
  Modal,
  Form,
  message,
  Radio,
  Select,
  DatePicker,
} from "antd";

export const AddRecord = ({
  title,
  isAdding,
  resetAdding,
  form,
  addRecord,
  formFields,
  formName,
}) => {
  const [categoryId, setCategoryId] = useState("");
  const [entryTypes, setEntryTypes] = useState([]);
  const { TextArea } = Input;

  return (
    <Modal
      title={title}
      open={isAdding}
      okText="Save"
      maskClosable={false}
      onCancel={() => {
        resetAdding("cancel");
      }}
      onOk={async () => {
        try {
          const values = await form.validateFields();

          if (values?.date) {
            values.date = values.date.format("YYYY-MM-DD");
          }
          if (values?.questionsJson) {
            values.questionsJson = JSON.parse(values.questionsJson);
          }

          try {
            const res = await addRecord(values);
            if (res?.status) {
              message.success("Record created successfully.");
              resetAdding("ok");
            }
          } catch (error) {
            if (error.code !== "ERR_NETWORK") {
              const { status } = error.response;
              if (status === 409) {
                message.error(
                  "It is a duplicate entry which cannot be inserted"
                );
              } else {
                message.error(data.message);
              }
            }
          }
        } catch (error) {
          message.error("Validate Failed:", error);
        }
      }}
    >
      <Form form={form} layout="vertical" name="add_form">
        {formFields.map((field) => {
          const { title, dataIndex, type, require } = field;
          if (type === "dropdown") {
            const selectTitle = field.dataTitle;
            const selectData =
              selectTitle === "entryType" && ["deposit_slip"].includes(formName)
                ? entryTypes
                : field.data;
            if (selectTitle === "array") {
              return (
                <Form.Item
                  label={title}
                  key={dataIndex}
                  name={dataIndex}
                  rules={
                    require
                      ? [
                          {
                            required: true,
                            message: `Please select the ${title}`,
                          },
                        ]
                      : []
                  }
                >
                  <Select>
                    {selectData.map((val, index) => {
                      return (
                        <Select.Option key={index} value={val}>
                          {val}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              );
            } else if (selectTitle === "multiselect") {
              return (
                <Form.Item
                  label={title}
                  key={dataIndex}
                  name={dataIndex}
                  rules={
                    require
                      ? [
                          {
                            required: true,
                            message: `Please select the ${title}`,
                          },
                        ]
                      : []
                  }
                >
                  <Select mode="multiple" allowClear>
                    {selectData.map((val, index) => {
                      return (
                        <Select.Option
                          key={index}
                          value={val.value}
                          label={val.label}
                        >
                          {val.value}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              );
            } else {
              return (
                <Form.Item
                  label={title}
                  key={dataIndex}
                  name={dataIndex}
                  rules={
                    require
                      ? [
                          {
                            required: true,
                            message: `Please select the ${title}`,
                          },
                        ]
                      : []
                  }
                >
                  {selectTitle === "categoryType" &&
                  ["deposit_slip", "till_entry"].includes(formName) ? (
                    <Select
                      value={categoryId}
                      onSelect={(e) => {
                        setCategoryId(e);
                      }}
                    >
                      {selectData.map((val, index) => {
                        console.log(val);
                        return (
                          <Select.Option key={index} value={val.id}>
                            {`${val[selectTitle]}`}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  ) : (
                    <Select>
                      {selectData.map((val, index) => {
                        return (
                          <Select.Option key={index} value={val._id}>
                            {`${val[selectTitle]}`}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              );
            }
          } else if (type === "radio") {
            return (
              <Form.Item
                label={title}
                key={dataIndex}
                name={dataIndex}
                rules={
                  require
                    ? [
                        {
                          required: { require },
                          message: `Please input the ${title}`,
                        },
                      ]
                    : []
                }
              >
                <Radio.Group>
                  <Radio value="yes"> Yes </Radio>
                  <Radio value="no"> No </Radio>
                </Radio.Group>
              </Form.Item>
            );
          } else if (type === "date") {
            return (
              <Form.Item
                key={dataIndex}
                name={dataIndex}
                label={title}
                rules={
                  require
                    ? [
                        {
                          required: { require },
                          message: `Please input the ${title}`,
                        },
                      ]
                    : []
                }
              >
                <DatePicker format={"DD/MM/YYYY"} />
              </Form.Item>
            );
          } else if (type === "password") {
            return (
              <Form.Item
                key={dataIndex}
                name={dataIndex}
                label={title}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            );
          } else if (type === "number") {
            return (
              <Form.Item
                key={dataIndex}
                name={dataIndex}
                label={title}
                rules={
                  require
                    ? [
                        {
                          required: { require },
                          message: `Please input the ${title}`,
                        },
                      ]
                    : []
                }
              >
                <InputNumber />
              </Form.Item>
            );
          } else if (type === "textarea") {
            return (
              <Form.Item
                key={dataIndex}
                name={dataIndex}
                label={title}
                rules={
                  require
                    ? [
                        {
                          required: { require },
                          message: `Please input the ${title}`,
                        },
                      ]
                    : []
                }
              >
                <TextArea />
              </Form.Item>
            );
          } else {
            return (
              <Form.Item
                key={dataIndex}
                name={dataIndex}
                label={title}
                rules={
                  require
                    ? [
                        {
                          required: { require },
                          message: `Please input the ${title}`,
                        },
                      ]
                    : []
                }
              >
                <Input />
              </Form.Item>
            );
          }
        })}
      </Form>
    </Modal>
  );
};
