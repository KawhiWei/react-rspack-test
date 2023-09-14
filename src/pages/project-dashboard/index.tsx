import { Card, Col, Row } from "antd";

const ProjectDashboard = () => {
    return (
        <div>
            <Row>
                <Col span="24" style={{ textAlign: 'left' }}>
                    <Card title="项目概概况"  >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
            <Row >
                <Card title="需求列表"  >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Row>
            <Row >
                <Card title="测试列表" >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Row>
        </div>
    )
}

export default ProjectDashboard;