import { Form, Input, Modal, notification } from "antd";
import { useTasksiteContext } from "../../contexts/tasksiteContext";
import { SmileOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { NotiContext } from "../../contexts/notiContext";
import { AuthContext } from "../../contexts/authContext";

interface Props {
  postJobId?: number;
  receiverId?: number;
  setStatusApply?: any;
  postJobName: string;
}

const ApplyModel = (props: Props) => {
  const { createNotification } = useContext(NotiContext);
  const { authState } = useContext(AuthContext);

  const account = authState.account;
  const [form] = Form.useForm();
  const { isOpenApplyModal, setIsOpenApplyModal, createApply } =
    useTasksiteContext();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: `${"Ứng tuyển thành công"}`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const openNotificationError = () => {
    api.open({
      message: `${"Đã có lỗi xảy ra"}`,
      icon: <SmileOutlined style={{ color: "red" }} />,
    });
  };

  const handleOk = async () => {
    const data = form.getFieldValue([]);

    const dataSubmit = { ...data, ...props };
    const res = await createApply(dataSubmit);
    if (res.statusCode === 200) {
      form.resetFields();
      props.setStatusApply();
      openNotification();

      createNotification({
        reciverId: props.receiverId,
        content: `${account.name} đã ứng tuyển vào công việc ${props.postJobName}`,
        postId: props.postJobId,
      });
    } else {
      openNotificationError();
    }
    setIsOpenApplyModal(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpenApplyModal(false);
  };

  return (
    <div>
      {contextHolder}
      <Modal
        title="Đơn ứng tuyển"
        onCancel={handleCancel}
        onOk={handleOk}
        open={isOpenApplyModal}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Ghi chú" name={"content"}>
            <Input.TextArea size="large" placeholder="Nhap mo ta" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApplyModel;
