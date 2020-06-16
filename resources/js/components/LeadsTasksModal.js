import React, { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { graphQLQuery } from "../axios";
import {
    Table,
    Badge,
    Tag,
    Button,
    notification,
    Form,
    Input,
    Space,
    Checkbox,
    DatePicker
} from "antd";
import Column from "antd/lib/table/Column";
import moment from "moment";
import { CheckOutlined } from "@ant-design/icons";

const LeadsTasksModal = ({
    leadData,
    showLeadTasksModal,
    toggleShowLeadTasksModal
}) => {
    const [leadTasks, setLeadTasks] = useState([]);
    useEffect(() => {
        setLeadTasks([]);
        if (showLeadTasksModal) {
            getTaskList();
        }
        return () => {};
    }, [showLeadTasksModal]);

    const getTaskList = () => {
        let data = {
            query: `query LeadTask($lead_id: Int!, $completed: Boolean) {
                leadTasks(lead_id: $lead_id,completed: $completed,filter: { orderBy: [{ field: "due_date", order: ASC }] })  {
                    key: id
                    task
                    assigned_to {
                        name
                    }
                    urgent
                    due_date
                    completed
                }
            }`,
            variables: {
                lead_id: parseInt(leadData.key),
                completed: false
            }
        };
        graphQLQuery(data).then(res => {
            setLeadTasks(res.data.leadTasks);
        });
    };

    const handleTaskDone = task => {
        // console.log(task);
        let data = {
            query: `mutation LeadTask($id: ID!, $date_completed: DateTime!, $completed: Boolean!) {
                completeTask(id: $id, date_completed: $date_completed, completed: $completed) {
                    id
                    task
                    completed
                }
            }`,
            variables: {
                id: parseInt(task.key),
                date_completed: moment().format("YYYY-MM-DD HH:mm:ss"),
                completed: true
            }
        };
        graphQLQuery(data).then(res => {
            notification.success({ message: "Task is Done! Thank you!" });
            getTaskList();
        });
    };

    const submitForm = e => {
        let data = {
            query: `mutation LeadTask($lead_id: Int!,$task: String!,$due_date: DateTime!, $urgent: Boolean ) {
                saveTask(lead_id: $lead_id, task: $task, due_date: $due_date, urgent: $urgent) {
                    id
                    task
                    due_date
                }
            }`,
            variables: {
                lead_id: parseInt(leadData.key),
                task: e.task,
                due_date: e.due_date.format("YYYY-MM-DD HH:mm:ss"),
                urgent: e.urgent == true ? true : false
            }
        };

        graphQLQuery(data).then(res => {
            getTaskList();
        });
    };
    return (
        <Modal
            title={`${leadData && leadData.lead_name} Tasks List`}
            onCancel={toggleShowLeadTasksModal}
            onOk={toggleShowLeadTasksModal}
            visible={showLeadTasksModal}
            width={820}
        >
            <Space>
                <Form
                    name="basic"
                    onFinish={e => submitForm(e)}
                    onFinishFailed={e => console.log(e)}
                    layout="inline"
                >
                    <Form.Item
                        name="task"
                        rules={[
                            {
                                required: true,
                                message: "Please input Task"
                            }
                        ]}
                    >
                        <Input placeholder="Task" />
                    </Form.Item>
                    <Form.Item
                        name="due_date"
                        rules={[
                            {
                                type: "object",
                                required: true,
                                message: "Please input Due Date"
                            }
                        ]}
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Due Date"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="urgent"
                            noStyle
                            valuePropName="checked"
                        >
                            <Checkbox>Urgent?</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Task
                        </Button>
                    </Form.Item>
                </Form>
            </Space>
            <Table dataSource={leadTasks} pagination={false}>
                <Column
                    title="Due Date"
                    dataIndex="due_date"
                    render={(text, record) => {
                        return moment(record.due_date).format("lll");
                    }}
                />
                <Column
                    title="Task"
                    dataIndex="task"
                    render={(text, record) => {
                        return (
                            <>
                                {record.urgent && <Tag color="red">Urgent</Tag>}
                                {record.task}
                            </>
                        );
                    }}
                />

                <Column
                    title="Action"
                    render={(text, record) => {
                        return (
                            <Button
                                shape="circle"
                                type="primary"
                                size="large"
                                onClick={e => handleTaskDone(record)}
                            >
                                <CheckOutlined />
                            </Button>
                        );
                    }}
                />
            </Table>
        </Modal>
    );
};

export default LeadsTasksModal;
