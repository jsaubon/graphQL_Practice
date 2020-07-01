import React from "react";
import { message } from "antd";
import { graphQLQuery } from "../axios";

const LeadDelete = (record, getLeadList) => {
    let data = {
        query: `mutation Lead($id: ID!) {
            deleteLead(id: $id) {
                id
                lead_name
            }
        }`,
        variables: {
            id: parseInt(record.key)
        }
    };
    graphQLQuery(data).then(res => {
        getLeadList();
        message.info("Successfully Deleted");
    });
};

export default LeadDelete;
