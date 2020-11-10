import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class ContactForm extends Component {

    state = {
        user: {
            fullName: '',
            mobile: '',
            email: '',
            address: ''
        },
        isDirty: {
            fullName: false,
            mobile: false,
            email: false,
            address: false
        },
        errors: {}
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentId !== prevProps.currentId) {
            let { user } = this.state;
            if (this.props.currentId === '') {
                user = {
                    fullName: '',
                    mobile: '',
                    email: '',
                    address: ''
                }
            } else {
                user = {
                    fullName: this.props.contacts[this.props.currentId].fullName,
                    mobile: this.props.contacts[this.props.currentId].mobile,
                    email: this.props.contacts[this.props.currentId].email,
                    address: this.props.contacts[this.props.currentId].address
                }
            }
            this.setState({ user });
        }
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        let isDirty = {
            fullName: true,
            mobile: true,
            email: true,
            address: true
        }
        this.setState({ isDirty }, () => {
            let errors = this._validateForm();
            if (!errors) {
                this.props.addOrEdit(this.state.user);
            }
            this.setState({
                user: {
                    fullName: '',
                    mobile: '',
                    email: '',
                    address: ''
                },
                isDirty: {
                    fullName: false,
                    mobile: false,
                    email: false,
                    address: false
                },
                errors: {}
            })
        });
    }

    _handleChange = (field, value) => {
        const { user, isDirty } = this.state;
        user[field] = value;
        isDirty[field] = true;
        this.setState({ user, isDirty }, () => {
            this._validateForm();
        });
    }

    _validateForm = () => {
        const { user, errors, isDirty } = this.state;
        Object.keys(user).forEach((each) => {
            if (each === "fullName" && isDirty.fullName) {
                if (!user.fullName.trim().length) {
                    errors.fullName = "*Required";
                } else if (user.fullName.trim().length &&
                    !user.fullName.match(/^[a-zA-Z ]*$/)
                ) {
                    errors.fullName = "Invalid name format";
                } else if (user.fullName.trim().length <= 3) {
                    errors.fullName = "Name should be greater than 3 characters";
                }
                else {
                    delete errors[each];
                    isDirty.fullName = false;
                }
            } else if (each === "mobile" && isDirty.mobile) {
                if (!user.mobile.trim().length) {
                    errors.mobile = "*Required";
                } else if (user.mobile.trim().length &&
                    !user.mobile.match(/^[0-9]{10}$/)
                ) {
                    errors.mobile = "Enter valid mobile number";
                } else {
                    delete errors[each];
                    isDirty.mobile = false;
                }
            } else if (each === "email" && isDirty.email) {
                if (!user.email.trim().length) {
                    errors.email = "*Required";
                } else if (user.email.trim().length &&
                    !user.email.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
                    errors.email = "Invalid Email";
                } else {
                    delete errors[each];
                    isDirty.email = false;
                }
            } else if (each === "address" && isDirty.address) {
                if (!user.address.trim().length) {
                    errors.address = "*Required";
                } else {
                    delete errors[each];
                    isDirty.address = false;
                }
            }
        });
        this.setState({ errors });
        return Object.keys(errors).length ? errors : null;
    }

    render() {
        const { user, errors } = this.state;
        return (
            <div>
                <Form onSubmit={this._handleSubmit}>
                    <FormGroup>
                        <Label for="fullName">Full Name</Label>
                        <Input type="text" name="fullName" placeholder="Enter Full name"
                            value={user.fullName}
                            onChange={(e) => this._handleChange("fullName", e.target.value)}
                        />
                        {errors && (
                            <small style={{ color: "red" }}>
                                {errors.fullName}
                            </small>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="mobile">Mobile</Label>
                        <Input type="number" name="mobile" placeholder="Enter Mobile no."
                            value={user.mobile}
                            onChange={(e) => this._handleChange("mobile", e.target.value)}
                        />
                        {errors && (
                            <small style={{ color: "red" }}>
                                {errors.mobile}
                            </small>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" placeholder="Enter Email Id"
                            value={user.email}
                            onChange={(e) => this._handleChange("email", e.target.value)}
                        />
                        {errors && (
                            <small style={{ color: "red" }}>
                                {errors.email}
                            </small>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" placeholder="Enter address"
                            value={user.address}
                            onChange={(e) => this._handleChange("address", e.target.value)}
                        />
                        {errors && (
                            <small style={{ color: "red" }}>
                                {errors.address}
                            </small>
                        )}
                    </FormGroup>
                    <Button className="btn btn-primary" type="submit">
                        {this.props.currentId.length ? "Update" : "Save" }
                    </Button>
                </Form>
            </div>
        )
    }
}

export default ContactForm; 
