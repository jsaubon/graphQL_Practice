import React, { useState } from "react";
import { Modal, Form, Input, notification } from "antd";
import { graphQLQuery } from "../axios";
import { notificationErrors } from "./NotificationErrors";

const LeadsAddLeadModal = ({
    getLeadList,
    showAddLeadModal,
    toggleShowAddLeadModal
}) => {
    let formLead;
    const submitForm = e => {
        let data = {
            query: `mutation Lead($lead_name: String!, $email_address: String!, $phone_number: String){
                createLead(lead_name: $lead_name, email_address: $email_address, phone_number: $phone_number) {
                    id
                    lead_name
                    email_address
                    phone_number
                }
            }`,
            variables: e
        };
        graphQLQuery(data).then(res => {
            if (res.errors) {
                notificationErrors(res.errors);
            } else {
                toggleShowAddLeadModal();
                getLeadList();
            }
        });
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };

    return (
        <Modal
            title="Lead Information"
            visible={showAddLeadModal}
            onOk={e => formLead.submit()}
            onCancel={toggleShowAddLeadModal}
        >
            <Form
                {...layout}
                name="basic"
                onFinish={e => submitForm(e)}
                onFinishFailed={e => console.log(e)}
                ref={e => (formLead = e)}
            >
                <Form.Item
                    label="Lead Name"
                    name="lead_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input Lead Name"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email Address"
                    name="email_address"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Please input Email Address"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Phone Number" name="phone_number">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LeadsAddLeadModal;
