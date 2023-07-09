import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import i18next from 'i18next';

i18next.init({
  lng: 'en', 
  resources: {
    en: {
      translation: {
        title: 'title',
        Home: 'Home Page',
        name: 'Name',
        email: 'Email',
        birthday: 'Birthday',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        submit: 'Submit',
        text: 'Form Page Management',
        th: 'Thai',
        en: 'English',
        clear: 'Clear Data',
        delete: 'Delete Selected',
        edit: 'Edit Data',
        save: 'Save Data',
        nationality: 'Nationality',
        Mr: 'Mr',
        Mrs: 'Mrs',
        Miss: 'Miss',
        thai: 'Thailand',
        america: 'America',
        singapore: 'Singapore',
        india: 'India',
        other: 'other',
        id: 'ID card number',
        phonenumber: 'Phone Number',
        passport: 'Passport',
        salary: 'Expected Salary',
        Test1: 'Test 1',
        Test2: 'Test 2',
        Test3: 'Test 3',
        layout: 'Layout & Style',
        gotolayout: 'Go to Layout & Style Page',
        api: 'Connect API',
        form: 'Form & Table',
        gotoform: 'Go to Form & Table Page',
        MoveShapeleft: 'Move Shape Left',
        MoveShaperight: 'Move Shape Right',
        MovePosition: 'Move Position',
      },
    },
    th: {
      translation: {
        title: 'คำนำหน้า',
        Home: 'หน้าหลัก',
        name: 'ชื่อ',
        email: 'อีเมล',
        birthday: 'วันเกิด',
        gender: 'เพศ',
        male: 'ชาย',
        female: 'หญิง',
        submit: 'ส่งข้อมูล',
        text: 'การจัดการหน้าฟอร์ม',
        th: 'ภาษาไทย',
        en: 'ภาษาอังกฤษ',
        clear: 'ล้างข้อมูล',
        delete: 'ลบข้อมูล',
        edit: 'แก้ไขข้อมูล',
        save: 'บันทึกข้อมูล',
        nationality: 'สัญชาติ',
        Mr: 'นาย',
        Mrs: 'นาง',
        Miss: 'นางสาว',
        thai: 'ประเทศไทย',
        america: 'ประเทศอเมริกา',
        singapore: 'ประเทศสิงคโปร์',
        india: 'อินเดีย',
        other: 'อื่นๆ',
        id: 'เลขบัตรประชาชน',
        phonenumber: 'หมายเลขโทรศัพท์มือถือ',
        passport: 'หนังสือเดินทาง',
        salary: 'เงินเดือนที่คาดหวัง',
        Test1: 'แบบทดสอบที่ 1',
        Test2: 'แบบทดสอบที่ 2',
        Test3: 'แบบทดสอบที่ 3',
        layout: 'การจัดการหน้าเว็บ',
        gotolayout: 'ไปที่หน้าการจัดการหน้าเว็บ',
        api: 'การเชื่อมต่อ API',
        form: 'การจัดการหน้าฟอร์ม',
        gotoform: 'ไปที่หน้าการจัดการหน้าฟอร์ม',
        MoveShapeleft: 'เลือกรูปแบบไปทางซ้าย',
        MoveShaperight: 'เลือกรูปแบบไปทางขวา',
        MovePosition: 'เปลี่ยนตำแหน่ง',
      },
    },
  },
});

const MainPage: React.FC = () => {
  const [languagemain, setlanguagemain] = useState('en');

  const changeLanguage = (lang1: string) => {
    i18next.changeLanguage(lang1);
    setlanguagemain(lang1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className='toppic'></p>
        <select
          className='changelanguage'
          value={languagemain}
          onChange={(event) => changeLanguage(event.target.value)}
        >
          <option value="en">{i18next.t('en')}</option>
          <option value="th">{i18next.t('th')}</option>
        </select>
      </header>
      <main className='MainPage'>
        <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
          <div className='column' style={{ backgroundColor: 'white' }}>
            <h2>{i18next.t('Test1')}</h2>
            <p>{i18next.t('layout')}</p>
            <Link to="/Layoutform">{i18next.t('gotolayout')}</Link>
          </div>

          <div className='column' style={{ backgroundColor: 'white' }}>
            <h2>{i18next.t('Test2')}</h2>
            <p>{i18next.t('api')}</p>
            <Link to="/">Go to Another Page</Link>
          </div>

          <div className='column' style={{ backgroundColor: 'white' }}>
            <h2>{i18next.t('Test3')}</h2>
            <p>{i18next.t('form')}</p>
            <Link to="/Formpage">{i18next.t('gotoform')}</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
