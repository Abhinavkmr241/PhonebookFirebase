import React, { useState, useEffect } from 'react';
import { ContactForm } from './contact-form';
import firebaseDb from '../firebase';

export const Contact = () => {

    var [contacts, setContacts] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshot => {
            if (snapshot.val() != null) {
                setContacts({
                    ...snapshot.val()
                });
            } else {
                setContacts({});
            }
        })
    }, [])

    const addOrEdit = (obj) => {
        if (currentId === '') {
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if (err) {
                        console.log(err);
                    } else {
                        setCurrentId('')
                    }
                }
            )
        } else {
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err);
                    } else {
                        setCurrentId('')
                    }
                }
            )
        }
    }

    const deleteContact = (id) => {
        if (window.confirm("Sure want to delete this contact?")) {
            firebaseDb.child(`contacts/${id}`).remove(
                err => {
                    if (err) {
                        console.log(err);
                    } else {
                        setCurrentId('')
                    }
                }
            )
        }
    }

    return (
        <div>
            <div class="jumbotron jumbotron-fluid" style={{backgroundColor: "lightblue"}}>
                <div class="container">
                    <h1 class="display-4 text-center" style={{color: "darkslateblue"}}>
                        My-PhoneBook
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4" style={{ border: "1px solid skyblue" }}>
                    <h2>{currentId.length ? "Edit Contact" : "Add Contact" }</h2>
                    <ContactForm {...({ addOrEdit, currentId, contacts })} />
                </div>
                <div className="col-md-8" style={{ border: "1px solid skyblue", borderLeft: "none" }}>
                    <h2>Contact List</h2>
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody style={{color: "whitesmoke"}}>
                            {
                                Object.keys(contacts).map((id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{contacts[id].fullName}</td>
                                            <td>{contacts[id].mobile}</td>
                                            <td>{contacts[id].email}</td>
                                            <td>{contacts[id].address}</td>
                                            <td>
                                                <a className="btn text-primary" onClick={() => setCurrentId(id)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn text-danger" onClick={() => deleteContact(id)}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Contact;
