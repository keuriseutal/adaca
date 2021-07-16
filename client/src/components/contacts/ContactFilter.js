import { useRef, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactContext;
    const text = useRef('');

    useEffect(() => {
        if(filtered) {
            
        } else {
            text.current.value = '';
        }
    });

    const onChange = (event) => {
        if(text.current.value !== '') {
            filterContacts(event.target.value);
        } else {
            clearFilter();
        }
    };
    
    return (
        <form>
            <input ref={text}
                type="text"
                placeholder="Filter Contacts..."            
                onChange={onChange} />
        </form>
    )
}

export default ContactFilter
