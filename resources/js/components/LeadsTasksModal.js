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
import TasksMarkDone from "../graphqlQueries/TaskMarkDone";
import TaskSubmitForm from "../graphqlQueries/TaskSubmitForm";
import TaskGetList from "../graphqlQueries/TaskGetList";

const LeadsTasksModal = ({
    leadData,
    showLeadTasksModal,
    toggleShowLeadTasksModal
}) => {
    const [leadTasks, setLeadTasks] = useState([]);
    useEffect(() => {
        setLeadTasks([]);
        if (showLeadTasksModal) {
            TaskGetList(leadData);
        }
        return () => {};
    }, [showLeadTasksModal]);

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
                    onFinish={e => TaskSubmitForm(e)}
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
                                onClick={e =>
                                    TasksMarkDone(record, TaskGetList(leadData))
                                }
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
