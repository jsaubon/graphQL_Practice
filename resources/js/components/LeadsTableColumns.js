import React from "react";

import { Space, notification, message, Popconfirm } from "antd";
import { LeadsGetList } from "../graphqlQueries/LeadsGetList";
import { graphQLQuery } from "../axios";
import LeadDelete from "../graphqlQueries/LeadDelete";

export const LeadsTableColumns = (getLeadList, toggleShowLeadTasksModal) => {
    return [
        {
            title: "Name",
            dataIndex: "lead_name",
            key: "lead_name"
        },
        {
            title: "Email",
            dataIndex: "email_address",
            key: "email_address"
        },
        {
            title: "Phone",
            dataIndex: "phone_number",
            key: "phone_number"
        },
        {
            title: "Date Registered",
            dataIndex: "created_at",
            key: "created_at"
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <a onClick={e => toggleShowLeadTasksModal(record)}>
                            Task List
                        </a>
                        <Popconfirm
                            title="Are you sure to delete this lead?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={e => {
                                LeadDelete(record, getLeadList);
                            }}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                );
            }
        }
    ];
};
