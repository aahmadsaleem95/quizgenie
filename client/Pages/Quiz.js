import React, { useState, useEffect } from "react";
import { Button, Typography, Form, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  createQuiz,
  getAllQuizes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../services/Quiz";
import { getAllCourses } from "../services/Course";
import { AddRecord } from "../Components/AddRecord";
import { EditRecord } from "../Components/EditRecord";
import { TableView } from "../Components/TableView";
import { PlaySquareTwoTone } from "@ant-design/icons";
export const Quiz = ({ userInfo }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  console.log("user ID: ", id);
  const colData = [
    {
      title: "Name",
      dataIndex: "name",
      render: (record) => record?.toUpperCase(),
    },
    {
      title: "Course",
      dataIndex: "courseId",
      render: (record) => {
        return `${record?.code}-${record?.name.toUpperCase()}`;
      },
    },
    {
      title: "Total Question",
      dataIndex: "totalQuestion",
    },
    {
      title: "Marks",
      dataIndex: "marks",
    },
    {
      title: "Quiz Link",
      dataIndex: "_id",
      render: (record) => {
        return (
          <>
            <PlaySquareTwoTone
              onClick={() => {
                navigate(`/quiz/${record}`);
              }}
            />
          </>
        );
      },
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [formFields, setFormFields] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const res = await getAllQuizes();
        if (res?.status === 200) {
          setDataSource(res.data.data.quizzes);
        }
      } catch (error) {
        if (error.code !== "ERR_NETWORK") {
          message.error(error.message);
        }
      }
      try {
        const res = await getAllCourses();
        if (res?.status === 200) {
          setAllCourses(res.data.data.courses);
        }
      } catch (error) {
        if (error.code !== "ERR_NETWORK") {
          message.error(error.message);
        }
      }
      setReload(false);
      setLoading(false);
    };

    getData();
  }, [reload]);

  useEffect(() => {
    setFormFields([
      {
        title: "Name",
        dataIndex: "name",
        type: "text",
        require: true,
      },
      {
        title: "Course",
        dataIndex: "courseId",
        type: "dropdown",
        require: true,
        data: allCourses,
        dataTitle: "name",
      },
      {
        title: "Total Question",
        dataIndex: "totalQuestion",
        type: "number",
        require: true,
      },
      {
        title: "Marks",
        dataIndex: "marks",
        type: "number",
        require: true,
      },
      {
        title: "Questions JSON",
        dataIndex: "questionsJson",
        type: "textarea",
        require: true,
      },
    ]);
  }, [allCourses]);

  const onAddRecord = () => {
    setIsAdding(true);
    const fieldsValue = formFields.reduce((fieldValues, field) => {
      fieldValues[field.dataIndex] = "";
      return fieldValues;
    }, {});
    form.setFieldsValue(fieldsValue);
  };
  const resetEditing = (event) => {
    setIsEditing(false);
    setSelectedRecord(null);
    if (event !== "cancel") {
      setReload(true);
    }
  };
  const resetAdding = (event) => {
    setIsAdding(false);
    if (event !== "cancel") {
      setReload(true);
    }
  };

  return (
    <div className="TContent">
      <div className="THeader">
        <Typography.Title level={4}>Quiz Details</Typography.Title>
        <Button
          type="primary"
          onClick={() => {
            if (allCourses.length === 0) {
              Toast.show({
                content: "Create Courses First",
                duration: 2000,
              });
            } else {
              onAddRecord();
            }
          }}
        >
          Add
        </Button>
      </div>

      <TableView
        loading={loading}
        dataSource={dataSource}
        rkey="_id"
        columnsData={colData}
        deleteRecord={deleteQuiz}
        form={form}
        formName={"quiz"}
        setIsEditing={[setIsEditing]}
        editingRecord={setSelectedRecord}
        setReload={setReload}
        formFields={formFields}
        editEnable={true}
        delEnable={true}
        getSelectedRecord={getQuizById}
      />

      <EditRecord
        title="Edit Quiz"
        isEditing={isEditing}
        resetEditing={resetEditing}
        form={form}
        updateRecord={updateQuiz}
        editData={selectedRecord}
        formFields={formFields}
        formName={"quiz"}
      />
      <AddRecord
        title="Add Quiz"
        isAdding={isAdding}
        resetAdding={resetAdding}
        form={form}
        addRecord={createQuiz}
        formFields={formFields}
        formName={"quiz"}
      />
    </div>
  );
};
