import { useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { getContacts, contacts, filtered, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, [])

    if((filtered ?? contacts)?.length === 0) {
        return <h4>{filtered? 'No Contacts to Show' : 'Please add a contact'}</h4>
    }

    return (
        <>
            {contacts !== null && !loading ? 
            (
                (filtered ?? contacts).map(contact => (
                    <ContactItem key={contact._id} contact={contact} />
                ))  
            ) : <Spinner />}
        </>
    )
}

export default Contacts
