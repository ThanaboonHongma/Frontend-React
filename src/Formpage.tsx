import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import './Formpage.css';
import { Form, Input, Button, Select, Radio, DatePicker, Table, Checkbox } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function Formpage() {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Function to handle language change
  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  const onFinish = (values: any) => {
    const updatedFormData = [...formData, { ...values, key: String(Date.now()) }];
    setFormData(updatedFormData);
    saveFormData(updatedFormData); // Save to local storage
    form.resetFields(); // Clear the form fields
    console.log('Form values:', values);
  };

  const saveFormData = (data: any[]) => {
    localStorage.setItem('formData', JSON.stringify(data));
  };

  const loadFormData = () => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  };

  useEffect(() => {
    loadFormData();
  }, []);

  const onSelectChange = (selectedRowKeys: string[], selectedRows: any[]) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedItem(selectedRows.length === 1 ? selectedRows[0] : null);
  };


  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === formData.length}
          indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < formData.length}
          onChange={(e) => {
            const keys = e.target.checked ? formData.map((data) => data.key) : [];
            setSelectedRowKeys(keys);
          }}
        />
      ),
      dataIndex: 'key',
      width: 40,
      render: (key: string) => (
        <Checkbox
          checked={selectedRowKeys.includes(key)}
          onChange={(e) => {
            const selected = e.target.checked ? [...selectedRowKeys, key] : selectedRowKeys.filter((k) => k !== key);
            setSelectedRowKeys(selected);
          }}
        />
      ),
    },
    {
      title: i18next.t('title'),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text: string, record: any) =>
        editMode ? (
          <Select
            style={{ width: '80px' }}
            value={text}
            onChange={(value) => {
              const updatedFormData = formData.map((data) =>
                data.key === record.key ? { ...data, title: value } : data
              );
              setFormData(updatedFormData);
              saveFormData(updatedFormData);
            }}
          >
            <Select.Option value="Mr">{i18next.t('Mr')}</Select.Option>
            <Select.Option value="Mrs">{i18next.t('Mrs')}</Select.Option>
            <Select.Option value="Miss">{i18next.t('Miss')}</Select.Option>           </Select>
        ) : (
          text
        ),
    },
    {
      title: i18next.t('name'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) =>
        editMode ? (
          <Input
            value={text}
            onChange={(e) => {
              const updatedFormData = formData.map((data) =>
                data.key === record.key ? { ...data, name: e.target.value } : data
              );
              setFormData(updatedFormData);
              saveFormData(updatedFormData);
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: i18next.t('phonenumber'),
      dataIndex: 'phonenumber',
      key: 'phonenumber',
      render: (text: string, record: any) =>
        editMode ? (
          <Input
            value={text}
            onChange={(e) => {
              const updatedFormData = formData.map((data) =>
                data.key === record.key ? { ...data, phonenumber: e.target.value } : data
              );
              setFormData(updatedFormData);
              saveFormData(updatedFormData);
            }}
          />
        ) : (
          text
        ),
    },
    {
      title: i18next.t('nationality'),
      dataIndex: 'nationality',
      key: 'nationality',
      render: (text: string, record: any) =>
        editMode ? (
          <Select
            value={text}
            onChange={(value) => {
              const updatedFormData = formData.map((data) =>
                data.key === record.key ? { ...data, nationality: value } : data
              );
              setFormData(updatedFormData);
              saveFormData(updatedFormData);
            }}
          >
            <Select.Option value={i18next.t('thai')}>{i18next.t('thai')}</Select.Option>
            <Select.Option value={i18next.t('singapore')}>{i18next.t('singapore')}</Select.Option>
            <Select.Option value={i18next.t('india')}>{i18next.t('india')}</Select.Option>
            <Select.Option value={i18next.t('america')}>{i18next.t('america')}</Select.Option>
            <Select.Option value={i18next.t('other')}>{i18next.t('other')}</Select.Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: i18next.t('birthday'),
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text: string, record: any) =>
        editMode ? (
          <DatePicker
            value={dayjs(text)}
            onChange={(date) => {
              const updatedFormData = formData.map((data) =>
                data.key === record.key ? { ...data, birthday: dayjs(date).format('YYYY-MM-DD') } : data
              );
              setFormData(updatedFormData);
              saveFormData(updatedFormData);
            }}
          />
        ) : (
          dayjs(text).format('MM-DD-YYYY')
        ),
    },
  ];


  return (
    <div className="App">
      <header className="App-header">
        <p className='toppic'>{i18next.t('text')}</p>
        <select
          className='changelanguage'
          value={language}
          onChange={(event) => changeLanguage(event.target.value)}
        >
          <option value="en">{i18next.t('en')}</option>
          <option value="th">{i18next.t('th')}</option>
        </select>
      </header>
      <main className="App-main">
        <div style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}>
          <Button style={{
            backgroundColor: 'white', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none'
          }}>
          <Link to="/">
          {i18next.t('Home')}
          </Link>
          </Button>
        </div>
        <Form onFinish={onFinish} form={form} initialValues={selectedItem} style={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item label={i18next.t('title')} name="title" rules={[{ required: true }]}>
              <Select style={{ width: '80px' }}>
                <Select.Option value={i18next.t('Mr')}>{i18next.t('Mr')}</Select.Option>
                <Select.Option value={i18next.t('Mrs')}>{i18next.t('Mrs')}</Select.Option>
                <Select.Option value={i18next.t('Miss')}>{i18next.t('Miss')}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={i18next.t('name')} name="name" rules={[{ required: true }]}>
              <Input style={{ width: '550px' }} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item label={i18next.t('birthday')} name="birthday" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item label={i18next.t('nationality')} name="nationality" rules={[{ required: true }]}>
              <Select style={{ width: '300px' }}>
                <Select.Option value={i18next.t('thai')}>{i18next.t('thai')}</Select.Option>
                <Select.Option value={i18next.t('singapore')}>{i18next.t('singapore')}</Select.Option>
                <Select.Option value={i18next.t('india')}>{i18next.t('india')}</Select.Option>
                <Select.Option value={i18next.t('america')}>{i18next.t('america')}</Select.Option>
                <Select.Option value={i18next.t('other')}>{i18next.t('other')}</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item label={i18next.t('id')} name="id" >
              <Input type="number" style={{ width: '80px' }} /> <a style={{ fontSize: '20px', color: 'black', paddingInline: '10px' }}> - </a>
              <Input type="number" style={{ width: '130px' }} /> <a style={{ fontSize: '20px', color: 'black', paddingInline: '10px' }}> - </a>
              <Input type="number" style={{ width: '130px' }} /> <a style={{ fontSize: '20px', color: 'black', paddingInline: '10px' }}> - </a>
              <Input type="number" style={{ width: '110px' }} /> <a style={{ fontSize: '20px', color: 'black', paddingInline: '10px' }}> - </a>
              <Input type="number" style={{ width: '80px' }} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item label={i18next.t('gender')} name="gender" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="male">{i18next.t('male')}</Radio>
                <Radio value="female">{i18next.t('female')}</Radio>
                <Radio value="female">{i18next.t('female')}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item label={i18next.t('phonenumber')} name="phonenumber" rules={[{ required: true }]}>
              <Input type="phone" style={{ width: '400px' }} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item label={i18next.t('passport')} name="passport">
              <Input type="text" style={{ width: '300px' }} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item label={i18next.t('salary')} name="salary" rules={[{ required: true }]}>
              <Input type="text" style={{ width: '300px' }} />
            </Form.Item>
            <Form.Item style={{ paddingInline: '40px', paddingLeft: '120px' }}>
              <Button type="primary" htmlType="submit">{i18next.t('submit')}</Button>
            </Form.Item>
            <Form.Item >
              <Button
                type="primary"
                onClick={() => {
                  form.resetFields();
                }}
              >
                {i18next.t('clear')}
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className='buttonDeleteEdit'>
          <div style={{ marginRight: '30px' }}>
            <Button
              type="primary"
              onClick={() => {
                const updatedFormData = formData.filter((data) => !selectedRowKeys.includes(data.key));
                setFormData(updatedFormData);
                setSelectedRowKeys([]);
                saveFormData(updatedFormData);
              }}
              disabled={selectedRowKeys.length === 0}
            >
              {i18next.t('delete')}
            </Button>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {editMode ? i18next.t('save') : i18next.t('edit')}
          </Button>
        </div>
        <Table
          pagination={false}
          dataSource={formData}
          columns={columns} />
      </main>
    </div>
  );
}

export default Formpage;
