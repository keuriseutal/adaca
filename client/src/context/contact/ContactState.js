import { useReducer } from "react";
import axios from 'axios';
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    CONTACT_ERROR,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Clear Contacts
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    };

    //Get Contacts
    const getContacts = async() => {
        try {
            const response = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: response.data
            })
        } catch(error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }       
    };

    //Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: response.data
            })
        } catch(error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }        
    };

    //Delete Contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        } catch(error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }  
    };

    //Set Current Contact
    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    };

    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    };

    //Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: response.data
            })
        } catch(error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }  
    };

    //Filter Contacts
    const filterContacts = (text) => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            clearContacts,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            { props.children }
        </ContactContext.Provider>
    )

}

export default ContactState;