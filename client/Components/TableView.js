import React, { useState, useEffect } from "react";
import { Table, message, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EnvironmentFilled,
  UserSwitchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

export const TableView = ({
  loading,
  dataSource,
  rkey,
  columnsData,
  deleteRecord,
  form,
  formName,
  setIsEditing,
  editingRecord,
  setReload,
  formFields,
  editEnable,
  delEnable,
  getSelectedRecord,
  metaData,
}) => {
  const [relod, setRelod] = useState(false);

  useEffect(() => {
    if (relod) {
      setRelod(false);
    }
    console.log("Row Data: ", columnsData, dataSource, rkey);
  }, [relod, dataSource]);

  const onDeleteRecord = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await deleteRecord(
            rkey === "id" ? record.id : record._id
          );
          if (res?.status === 200) {
            message.success("Record has been deleted successfully.");
          }
          setReload(true);
        } catch (error) {
          if (error.code !== "ERR_NETWORK") {
            const { data } = error.response;

            message.error(data.message);
          }
        }
      },
    });
  };
  const onEditRecord = async (record) => {
    let recordId = record._id;
    if (formName === "role_privilege") {
      recordId = record.role;
    } else if (formName === "user") {
      recordId = record.username;
    }
    try {
      const res = await getSelectedRecord(recordId);
      if (res?.status === 200) {
        editingRecord({ ...res.data.data });
      }
    } catch (error) {
      if (error.code !== "ERR_NETWORK") {
        const { data } = error.response;

        message.error(data.message);
      }
      return;
    }
    Array.isArray(setIsEditing) ? setIsEditing[0](true) : setIsEditing(true);
    // editingRecord({ ...record });
    const fieldsValue = formFields
      .filter((ff) => ff.dataIndex !== "password")
      .reduce((fieldValues, field) => {
        const specificFrom = ["deposit_slip", "quiz"].includes(formName);
        if (field.type === "dropdown") {
          const value = record[field.dataIndex]._id;

          fieldValues[field.dataIndex] = value;
        } else {
          const val = record[field.dataIndex];
          if (field.type === "date") {
            fieldValues[field.dataIndex] = val ? dayjs(val) : "";
          } else if (field.type === "textarea" && typeof val === "object") {
            fieldValues[field.dataIndex] = JSON.stringify(val);
          } else {
            fieldValues[field.dataIndex] = val;
          }
        }
        return fieldValues;
      }, {});
    form.setFieldsValue(fieldsValue);
  };
  const onEditRole = async (record) => {
    try {
      const res = await getSelectedRecord(record.username);
      if (res?.status === 200) {
        editingRecord({ ...res.data });
      }
    } catch (error) {
      if (error.code !== "ERR_NETWORK") {
        const { data } = error.response;

        message.error(data.message);
      }
      return;
    }
    Array.isArray(setIsEditing) ? setIsEditing[1](true) : setIsEditing(true);

    // editingRecord({ ...record });
    const fieldsValue = formFields
      .filter((ff) => ff.dataIndex !== "password")
      .reduce((fieldValues, field) => {
        const val = record[field.dataIndex];

        fieldValues[field.dataIndex] = val;

        return fieldValues;
      }, {});
    form.setFieldsValue(fieldsValue);
  };
  return (
    <Table
      loading={loading || relod}
      columns={[
        ...columnsData,
        {
          key: "action",
          title: "Actions",
          render: (record) => {
            return (
              <>
                {formName !== "user" && editEnable && (
                  <EditOutlined
                    onClick={() => {
                      onEditRecord(record);
                    }}
                  />
                )}

                {formName === "user" && editEnable && (
                  <>
                    <EnvironmentFilled
                      onClick={() => {
                        onEditRecord(record);
                      }}
                      style={{ fontSize: 16 }}
                    />
                    <UserSwitchOutlined
                      onClick={() => {
                        onEditRole(record);
                      }}
                      style={{ fontSize: 16, marginLeft: 12 }}
                    />
                  </>
                )}
                {formName !== "user" &&
                  formName !== "role_privilege" &&
                  delEnable && (
                    <DeleteOutlined
                      onClick={() => {
                        onDeleteRecord(record);
                      }}
                      style={{ color: "red", marginLeft: 12 }}
                    />
                  )}
              </>
            );
          },
        },
      ]}
      dataSource={dataSource}
      pagination={{
        pageSize: 8,
      }}
      rowKey={rkey || "id"}
    ></Table>
  );
};
