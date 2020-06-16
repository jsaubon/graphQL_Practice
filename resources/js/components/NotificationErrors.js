import { notification } from "antd";
export const notificationErrors = errors => {
    errors.map((error, key) => {
        Object.values(error.extensions.validation).map((message, index) => {
            notification.error({
                message: "Error",
                description: message
            });
        });
    });
};
