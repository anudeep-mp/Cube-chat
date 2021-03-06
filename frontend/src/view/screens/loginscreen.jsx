import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../../redux/actions/userActions'
import { Loader } from '../components/loader'
import Icon from '../../pictures/CuBeChaticon.png'

import Warning from '../components/warning'
import FormContainer from '../components/formcontainer'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(loginUser(email, password))
  }

  return (
    <>
      <FormContainer>
        <Row className='d-flex align-items-center justify-content-center pt-5 mt-5'>
          <Col xs='3'>
            <Image src={Icon} height='80' width='80' />
          </Col>
          <Col xs='7'>
            <h2>Cube Chat</h2>
          </Col>
        </Row>

        <h3 className='text-center py-3'>Sign In</h3>
        {loading && <Loader />}
        {error && <Warning>{error}</Warning>}
        <Form onSubmit={submitHandler} className='d-flex flex-column'>
          <Form.Group controlId='email' className='my-3'>
            <Form.Label className='mx-2'>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='mx-2'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' varaint='primary' className='my-4 rounded'>
            Sign In
          </Button>
        </Form>

        <Row className='text-center my-2'>
          <Col>
            New User? ~{' '}
            <Link to={redirect ? `register?redirect=${redirect}` : `/register`}>
              Create an account
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default LoginScreen
