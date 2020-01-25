import { notification } from "antd";

export default (
  message,
  description = "",
  duration = 2,
  placement = "topRight"
) => {
  if (message) {
    notification.info({
      message,
      description,
      duration,
      placement
    });
  }
};
