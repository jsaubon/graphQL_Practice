import { useContext, useEffect } from "react";
import { graphQLQuery } from "../axios";
import Context from "../context";
// const { dispatch } = useContext(Context);
const TasksGetList = (dispatch, page = 1, pageSize = 10) => {
    let data = {
        query: `query Tasks($pageSize: Int!, $page: Int!, $completed: Boolean){ 
            tasks (first: $pageSize, page: $page, completed: $completed,filter: { orderBy: [{ field: "due_date", order: DESC }] }) {
                data {
                    key:id
                    task
                    assigned_to {
                      name
                    }
                    lead_id
                    lead {
                      lead_name
                      email_address
                    }
                    due_date
                    urgent
                    completed
                },
                paginatorInfo {
                  total
                }
            }
        }`,
        variables: {
            page,
            pageSize,
            completed: false
        }
    };
    graphQLQuery(data).then(res => {
        console.log("tasks get list", res);
        // console.log(res.data.tasks.data);
        dispatch({ type: "SAVE_TASKS", payload: res.data.tasks });
    });
};

export default TasksGetList;
