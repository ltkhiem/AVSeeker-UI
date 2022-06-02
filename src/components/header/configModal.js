import { connect } from 'react-redux'
import { Modal, Form, Input, Button, Radio } from 'antd'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';


function ConfigModal(props) {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={props.visible}
            title="User Configuration"
            okText="Submit"
            cancelText="Cancel"
            onCancel={() => {
                props.onCancel()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        props.onUserConfigSubmit(values);
                     })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="vbs_username"
                    label="VBS Username"
                    placeholder="VBS Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the username of the system!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    placeholder="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the password of the system!'
                        }
                    ]}
                >
                    <Input.Password
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    name="avseeker_username"
                    label="AVSeeker Username"
                    placeholder="AVSeeker Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the avseeker username'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    )
}


export default ConfigModal