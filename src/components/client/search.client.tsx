import { Button, Col, Form, Input, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined, SearchOutlined, ShopOutlined } from '@ant-design/icons';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { ProForm } from '@ant-design/pro-components';
import { useSearchParams } from 'react-router-dom';

const SearchClient = () => {
    const optionsSkills = SKILLS_LIST;
    const optionsLocations = LOCATION_LIST;
    const [form] = Form.useForm();
    const [, setSearchParams] = useSearchParams();

    const onFinish = async (values: any) => {
    const { skills, location, jobName, companyName } = values;

    const query: any = {};
        if (skills && skills.length > 0) {
            query.skills = skills.join(',');
        }
        if (location && location.length > 0) {
            query.location = location.join(',');
        }
        if (jobName) {
            query.name = `/${jobName}/i`; // Định dạng jobName thành biểu thức chính quy
        }
        if (companyName) {
            query['company.name'] = `/${companyName}/i`; // Định dạng companyName thành biểu thức chính quy
        }

        setSearchParams(query); // Cập nhật URL
    };

    return (
        <ProForm
            form={form}
            onFinish={onFinish}
            submitter={{ render: () => <></> }}
        >
            <Row gutter={[20, 20]}>
                <Col span={24}><h2>Việc Làm IT Cho Lập Trình Viên "Chất"</h2></Col>
                
                <Col span={24} md={7}>
                    <ProForm.Item name="jobName">
                        <Input placeholder="Tên công việc" allowClear />
                    </ProForm.Item>
                </Col>
                
                <Col span={12} md={4}>
                    <ProForm.Item name="companyName">
                        <Input placeholder="Tên công ty" allowClear />
                    </ProForm.Item>
                </Col>
                
                <Col span={12} md={4}>
                    <ProForm.Item name="location">
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Địa điểm..."
                            options={optionsLocations}
                        />
                    </ProForm.Item>
                </Col>
                
                <Col span={24} md={7}>
                    <ProForm.Item name="skills">
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Tìm theo kỹ năng..."
                            options={optionsSkills}
                        />
                    </ProForm.Item>
                </Col>
                
                <Col span={12} md={2} style={{ display: 'flex'}}>
                    <Button type='primary' onClick={() => form.submit()} block>
                        Search
                    </Button>
                </Col>
            </Row>
        </ProForm>
    );
};

export default SearchClient;
