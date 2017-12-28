import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message, Input, Form } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      qqNumber: 123455
    };
    this.checkValid = this.checkValid.bind(this);
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  checkValid(field, e) {
    this.props.form.setFieldsValue({
        [field]: e.target.value.replace(/[^\d]/g, '')
    });
  }
  render() {
    let { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
        <div><TextArea placeholder="请输入按钮的文字，以英文分号;分隔" autosize /></div>
        <Form>
            <FormItem label="联系QQ：">
               { getFieldDecorator('qqNumber', {
                   initialValue: '',
                   onChange: this.checkValid.bind(this, 'qqNumber'),
                   value: this.state.qqNumber
               })(<Input
                   name="qqNumber"
                   placeholder="正整数"
                   min={0}
                   type="text"/>)
               }
           </FormItem>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
