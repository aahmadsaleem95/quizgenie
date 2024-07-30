import React from "react";
import { Input, InputNumber, Modal, Form, message, Radio, Select } from "antd";

export const EditRecord = ({
  title,
  isEditing,
  resetEditing,
  form,
  updateRecord,
  editData,
  formFields,
  formName,
}) => {
  const { TextArea } = Input;
  return (
    <Modal
      title={title}
      open={isEditing}
      okText="Save"
      maskClosable={false}
      onCancel={() => {
        resetEditing();
      }}
      onOk={async () => {
        try {
          let values = await form.validateFields();
          if (values?.questionsJson) {
            values.questionsJson = JSON.parse(values.questionsJson);
          }
          try {
            let { data } = await updateRecord(editData._id, values);
            if (data.success) {
              message.success(data.message);
              resetEditing();
            }
          } catch (error) {
            let { data } = error.response;
            if (data.error.code === 11000) {
              let field = Object.keys(data.error.keyValue)[0];
              message.error(
                `There already exists ${field
                  .split(/(?=[A-Z])/)
                  .join(" ")} with value ${
                  data.error.keyValue[field]
                } already exist in the database. Please change it as it should be unique.`
              );
            } else {
              message.error(data.message);
            }
          }
        } catch (error) {
          console.log("Validate Failed:", error);
        }
      }}
    >
      <Form form={form} layout="vertical" name="edit_form">
        {formFields.map((field) => {
          let { title, dataIndex, type } = field;
          if (type === "radio") {
            return (
              <Form.Item label={title} key={dataIndex} name={dataIndex}>
                <Radio.Group>
                  <Radio value="yes"> Yes </Radio>
                  <Radio value="no"> No </Radio>
                </Radio.Group>
              </Form.Item>
            );
          } else if (type === "dropdown") {
            const selectTitle = field.dataTitle;
            let selectData;

            if (["deposit_slip", "till_entry"].includes(formName)) {
              if (selectTitle === "entryPartition") {
                if (!entryTypeId || (entryTypeId && !entryData?.hasPartition)) {
                  hidden = true;
                }
              }
              if (selectTitle === "entryType") {
                selectData = entryTypes;
              } else if (selectTitle === "tillIdentifier") {
                selectData = tillConfigs;
              } else {
                selectData = field.data;
              }
            } else {
              selectData = field.data;
            }
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
            } else {
              return (
                <Form.Item
                  label={title}
                  key={dataIndex}
                  name={dataIndex}
                  // hidden={hidden}
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
                  {
                    <Select>
                      {selectData.map((val, index) => {
                        return (
                          <Select.Option key={index} value={val._id}>
                            {`${val[selectTitle]}`}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  }
                </Form.Item>
              );
            }
          }
          if (type === "number") {
            return (
              <Form.Item
                key={dataIndex}
                name={dataIndex}
                label={title}
                initialValue={editData?.dataIndex}
                rules={[
                  {
                    required: true,
                    message: `Please input the ${title}`,
                  },
                ]}
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
          } else if (type === "dropdown") {
            const selectTitle = field.dataTitle;
            let selectData;

            if (["deposit_slip", "till_entry"].includes(formName)) {
              if (selectTitle === "entryPartition") {
                if (!entryTypeId || (entryTypeId && !entryData?.hasPartition)) {
                  hidden = true;
                }
              }
              if (selectTitle === "entryType") {
                selectData = entryTypes;
              } else if (selectTitle === "tillIdentifier") {
                selectData = tillConfigs;
              } else {
                selectData = field.data;
              }
            } else {
              selectData = field.data;
            }

            return (
              <Form.Item
                label={title}
                key={dataIndex}
                name={dataIndex}
                hidden={hidden}
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
                {(selectTitle === "categoryType" ||
                  selectTitle === "entryType" ||
                  selectTitle === "name") &&
                ["deposit_slip", "till_entry"].includes(formName) ? (
                  <Select
                    disabled={field.editDisable ? field.editDisable : false}
                    value={
                      selectTitle === "categoryType"
                        ? categoryId
                        : selectTitle === "entryType"
                        ? entryTypeId
                        : locationId
                    }
                    onSelect={(e) => {
                      if (selectTitle === "categoryType") {
                        setCategoryId(e);
                      } else if (selectTitle === "entryType") {
                        setEntryTypeId(e);
                      } else {
                        setlocationId(e);
                      }
                    }}
                  >
                    {selectData.map((val, index) => {
                      return (
                        <Select.Option key={index} value={val._id}>
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
          } else {
            return (
              <Form.Item
                key={dataIndex}
                name={dataIndex}
                label={title}
                initialValue={editData?.dataIndex}
                rules={[
                  {
                    required: true,
                    message: `Please input the ${title}`,
                  },
                ]}
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
