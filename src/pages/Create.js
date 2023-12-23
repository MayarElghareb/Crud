import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMemberContext } from '../context/MemberContext'; 

const Create = () => {
  const navigate = useNavigate();
  const { dispatch } = useMemberContext(); 

  const validationSchema = Yup.object({
    name: Yup.string().required('Member Name is required').matches(/^[a-zA-Z0-9\s]*$/, 'Alphanumeric characters only'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    membershipType: Yup.string().required('Membership Type is required'),
    subscribeNewsletter: Yup.boolean(),
    idNumber: Yup.string().required('ID Number is required').matches(/^\d{1}$/, 'ID Number must be 14 digits'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    dateOfBirth: Yup.date().nullable(),
    membershipStartDate: Yup.date().required('Membership Start Date is required').nullable(),
    contactNumber: Yup.string().required('Contact Number is required').matches(/^\d{10}$/, 'Invalid phone number format'),
    photo: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      membershipType: '',
      subscribeNewsletter: false,
      idNumber: '',
      gender: '',
      address: '',
      dateOfBirth: null,
      membershipStartDate: null,
      contactNumber: '',
      photo: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        values.membershipStartDate = values.membershipStartDate.toISOString();

        dispatch({ type: 'ADD_MEMBER', payload: values });

      
      console.log(values);
      navigate('/index');
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className='text-red-600 font-bold underline'>Create Member</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className="block mb-2">
            Member Name:
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.name && formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
          </label>

          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
          </label>

          <label className="block mb-2">
            Membership Type:
            <select
              name="membershipType"
              value={formik.values.membershipType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="" label="Select Membership Type" />
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
            {formik.touched.membershipType && formik.errors.membershipType ? (
              <div className="text-red-500">{formik.errors.membershipType}</div>
            ) : null}
          </label>

          <label className="block mb-2">
            Subscribe to Newsletter:
            <input
              type="checkbox"
              name="subscribeNewsletter"
              checked={formik.values.subscribeNewsletter}
              onChange={formik.handleChange}
            />
          </label>

          <label className="block mb-2">
            ID Number:
            <input
              type="text"
              name="idNumber"
              onChange={formik.handleChange}
              value={formik.values.idNumber}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.idNumber && formik.errors.idNumber ? <div className="text-red-500">{formik.errors.idNumber}</div> : null}
          </label>

          <label className="block mb-2">
            Gender:
            <div className="mt-1">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={formik.handleChange}
                  checked={formik.values.gender === 'Male'}
                />
                Male
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={formik.handleChange}
                  checked={formik.values.gender === 'Female'}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={formik.handleChange}
                  checked={formik.values.gender === 'Other'}
                />
                Other
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender ? <div className="text-red-500">{formik.errors.gender}</div> : null}
          </label>

          <label className="block mb-2">
            Address:
            <textarea
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.address && formik.errors.address ? <div className="text-red-500">{formik.errors.address}</div> : null}
          </label>

          <label className="block mb-2">
            Date of Birth:
            <input
              type="text"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              className="w-full p-2 border rounded mt-1"
              disabled
            />
          </label>

          <label className="block mb-2">
            Membership Start Date:
            <DatePicker
              selected={formik.values.membershipStartDate}
              onChange={(date) => formik.setFieldValue('membershipStartDate', date)}
              onBlur={formik.handleBlur}
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.membershipStartDate && formik.errors.membershipStartDate ? (
              <div className="text-red-500">{formik.errors.membershipStartDate}</div>
            ) : null}
          </label>

          <label className="block mb-2">
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              onChange={formik.handleChange}
              value={formik.values.contactNumber}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded mt-1"
            />
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <div className="text-red-500">{formik.errors.contactNumber}</div>
            ) : null}
          </label>

          <label className="block mb-2">
            Photo:
            <input
              type="file"
              name="photo"
              onChange={(e) => formik.setFieldValue('photo', e.target.files[0])}
              className="mt-1"
            />
          </label>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
            Create Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
