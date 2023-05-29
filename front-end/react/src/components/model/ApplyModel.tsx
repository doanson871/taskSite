import { Form, Input, Modal } from "antd";
import { useTasksiteContext } from "../../contexts/tasksiteContext";

interface Props {}

const ApplyModel = () => {
  const [form] = Form.useForm();
  const { isOpenApplyModal, setIsOpenApplyModal } = useTasksiteContext();

  const handleOk = () => {
    const data = form.getFieldValue([]);
    console.log(data);
    form.resetFields();
    setIsOpenApplyModal(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpenApplyModal(false);
  };

  return (
    <div>
      <Modal
        title="Don ung tuyen"
        onCancel={handleCancel}
        onOk={handleOk}
        open={isOpenApplyModal}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Them yeu cau cua ban:" name={"description"}>
            <Input.TextArea placeholder="Nhap mo ta" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApplyModel;
