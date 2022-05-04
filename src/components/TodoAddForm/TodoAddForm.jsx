import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import './TodoAddForm.scss'

import { sendToAddTodo } from '../../store/todos'

export const TodoAddForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = useCallback(({ label }, { resetForm }) => {
    if (label) {
      dispatch(sendToAddTodo(label))
    }
    resetForm({
      values: {
        label: ''
      }
    })
  }, [])

  const validationSchema = yup.object({
    label: yup.string().min(3, 'Please, write more about todo')
  })

  const initialValues = { label: '' }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validateOnBlur={false}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, submitForm }) => {
        const isChanged = errors.label && touched.label

        return (
          <Form className='todo__form'>
            <input
              className={`todo__form-input ${
                isChanged ? 'todo__form-input--error' : ''
              }`}
              placeholder='What needs to be done?'
              onChange={handleChange}
              onBlur={(event) => {
                handleBlur(event)
                submitForm()
              }}
              value={values.label}
              name='label'
            />
            <p className='todo__form-error-message'>
              {isChanged ? errors.label : ''}
            </p>
          </Form>
        )
      }}
    </Formik>
  )
}
