import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

return (
    <Card>
        <Card.Title>
            Looks like you forgot your password.
            </Card.Title>
        <Form onSubmit={doResetPassword}>
            <Form.Group controlId="loginName">
                <Form.Control type="email" placeholder="Enter Email" ref={(c) => loginName = c} />
            </Form.Group>
            <Button type="submit" controlId="resetPassword" onClick={doResetPassword}>Reset Password</Button>
            <span id="passwordResetResult">{message}</span>
            <br />
        </Form>
    </Card >
);