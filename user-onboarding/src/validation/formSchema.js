import * as yup from 'yup';

export default yup.object().shape({
    name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be 3 characters long'),
    email: yup
    .string()
    .email('Must be valid email address')
    .required('Must include email address'),
    password: yup
    .string()
    .required('password is required')
    .min(8, 'Password must be 8 characters long'),
    //checkbox
    terms: yup.boolean(),


})