import React from "react";

import { Space, notification, message, Popconfirm, Button } from "antd";
import { graphQLQuery } from "../axios";
import moment from "moment";
import {
    UserOutlined,
    MailOutlined,
    CheckOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import TaskMarkDone from "../graphqlQueries/TaskMarkDone";

import TaskDelete from "../graphqlQueries/TaskDelete";

export const TasksTableColumns = getTaskList => {
    return [
        {
            title: "Lead",
            dataIndex: "lead",
            key: "lead",
            render: (text, record) => {
                return (
                    <div className="no-wrap">
                        <UserOutlined /> {record.lead.lead_name}
                        <br />
                        <MailOutlined /> {record.lead.email_address}
                    </div>
                );
            }
        },
        {
            title: "Task",
            dataIndex: "task",
            key: "task"
        },
        {
            title: "Due Date",
            dataIndex: "due_date",
            key: "due_date",
            render: (text, record) => {
                return moment(record.due_date).format("lll");
            }
        },
        {
            title: "Assigned To",
            dataIndex: "assigned_to",
            key: "assigned_to",
            render: (text, record) => {
                return <>{record.assigned_to.name}</>;
            }
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Button
                            shape="circle"
                            type="primary"
                            size="large"
                            onClick={e => TaskMarkDone(record, getTaskList)}
                        >
                            <CheckOutlined />
                        </Button>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={e => {
                                TaskDelete(record, getTaskList);
                            }}
                        >
                            <Button
                                shape="circle"
                                type="primary"
                                danger
                                size="large"
                            >
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            }
        }
    ];
};
