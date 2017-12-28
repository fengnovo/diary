import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Col, Button } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const InputGroup = Input.Group;

class RegistrationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <Form onSubmit={this.handleSubmit}>
            <FormItem
                label="E-mail"
                style={{ lineHeight: 1.5 }}
                label={'按钮文字'}
                required={true}
            >
                <InputGroup>
                    <Col span="12">
                        <FormItem>
                              {getFieldDecorator('email', {
                                rules: [{
                                  type: 'email', message: 'The input is not valid E-mail!',
                                }, {
                                  required: true, message: 'Please input your E-mail!',
                                }],
                              })(
                                <TextArea placeholder="请输入按钮的文字，以英文分号;分隔" autosize />
                              )}
                         </FormItem>
                    </Col>
                </InputGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">Register</Button>
            </FormItem>
          </Form>
        );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('root'));
