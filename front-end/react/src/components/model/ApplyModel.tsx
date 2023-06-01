import { Form, Input, Modal, notification } from "antd";
import { useTasksiteContext } from "../../contexts/tasksiteContext";
import { SmileOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { NotiContext } from "../../contexts/notiContext";

interface Props {
  postJobId?: number;
  receiverId?: number;
}

const ApplyModel = (props: Props) => {
  const { createNotification } = useContext(NotiContext);

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
    console.log(dataSubmit);
    const res = await createApply(dataSubmit);
    if (res.statusCode === 200) {
      form.resetFields();
      openNotification();

      createNotification({
        reciverId: props.receiverId,
        content: "Đã ứng tuyển",
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
        title="Don ung tuyen"
        onCancel={handleCancel}
        onOk={handleOk}
        open={isOpenApplyModal}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Them yeu cau cua ban:" name={"content"}>
            <Input.TextArea placeholder="Nhap mo ta" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApplyModel;
