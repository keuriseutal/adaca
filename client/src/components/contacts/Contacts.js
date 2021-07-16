import { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;

    if((filtered ?? contacts).length === 0) {
        return <h4>{filtered? 'No Contacts to Show' : 'Please add a contact'}</h4>
    }

    return (
        <>
            {(filtered ?? contacts).map(contact => (
                <ContactItem key={contact.id} contact={contact} />
            ))}  
        </>
    )
}

export default Contacts
