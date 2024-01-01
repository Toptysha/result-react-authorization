import { useEffect, useRef } from 'react';
import styles from './app.module.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const fieldsScheme = yup.object().shape({
    email: yup
        .string()
        .matches(/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)*$/, 'ERROR: указан неверный email')
        .max(40, 'ERROR: email не должен быть длиннее 40 символов')
        .required('Все поля являются обязательными'),
    password: yup
        .string()
        .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*;:]/, 
            'ERROR: пароль должен содержать хотя бы одну заглавную и одну строчную латинскую буквы, так же цифру и один из спец символов (!@#$%^&*)'
        )
        .min(6, 'ERROR: пароль не должен быть короче 6 символов')
        .max(20, 'ERROR: пароль не должен быть длиннее 20 символов')
        .required('Все поля являются обязательными'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
})

const onSubmit = (formData) => {
    console.log(formData)
}

function App2() {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(fieldsScheme)
    });

    const error = errors.email?.message || errors.password?.message || errors.confirmPassword?.message

    const submitButtonRef = useRef(null)

    useEffect(() => {
        if (!error) {
            submitButtonRef.current.focus()
        }
    }, [register, error])

    return (
        <div className={styles.app}>
        <form onSubmit={handleSubmit(onSubmit)}>

            {error && <div className={styles.errorLabel}>{error}</div>}

            <h2>Email:</h2>
            <input 
                type='email' 
                {...register('email')}
                placeholder='email'
            ></input>

            <h2>Password:</h2>
            <input
                type='password'
                {...register('password')}
                placeholder='password'
            ></input>

            <h2>confirm password:</h2>
            <input 
                type='password' 
                {...register('confirmPassword')}
                placeholder='password'
            ></input>

            <button type='submit' ref={submitButtonRef} className={styles.register} disabled={!!error}>Register</button>
        </form>
        </div>
    );
}

export default App2;