import { useContext, useEffect } from "react";
import { graphQLQuery } from "../axios";
import Context from "../context";
// const { dispatch } = useContext(Context);
const LeadsGetList = (dispatch, page = 1, pageSize = 10) => {
    let data = {
        query: `query Lead($pageSize: Int!, $page: Int!){ 
            leads (first: $pageSize, page: $page,filter: { orderBy: [{ field: "created_at", order: DESC }] }) {
                data {
                    key: id
                    lead_name
                    email_address
                    phone_number
                    created_at
                },
                paginatorInfo {
                  total
                }
            }
        }`,
        variables: {
            page,
            pageSize
        }
    };
    graphQLQuery(data).then(res => {
        // console.log(res.data.leads.data);
        dispatch({ type: "SAVE_LEADS", payload: res.data.leads });
    });
};

export default LeadsGetList;
