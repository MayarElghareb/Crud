import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting }) => {
    // Implement authentication logic
    const isAuthenticated = true;

    if (isAuthenticated) {
      onLogin();
      navigate('/index');
    } else {
      alert('Invalid credentials');
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url('/src/images/bg.jpg')` }}>
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <label className="block mb-2" htmlFor="email">Email:</label>
            <Field
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              name="email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />

            <label className="block mb-2" htmlFor="password">Password:</label>
            <Field
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />

            <button
              className="w-full bg-blue-500 text-white p-2 rounded focus:outline-none hover:bg-blue-600"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
