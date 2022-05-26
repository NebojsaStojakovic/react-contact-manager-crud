import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const ContactList = () => {
  const [query, setQuery] = useState({ text: "" });
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      } catch (error) {
        console.log(error.message);
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };
    fetchData();
  }, []);

  const deleteContact = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      }
    } catch (error) {
      console.log(error.message);
      setState({ ...state, loading: false, errorMessage: error.message });
    }
  };

  const searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({ ...state, filteredContacts: theContacts });
  };

  let { loading, contacts, errorMessage, filteredContacts } = state;

  return (
    <>
      <section className='contact-search p-3'>
        <div className='container'>
          <div className='grid'>
            <div className='row'>
              <div className='col'>
                <p className='h3 fw-bold'>
                  Contact Manager
                  <Link to={"/contacts/add"} className='btn btn-primary ms-2'>
                    <i className='fa fa-plus-circle me-2' /> New
                  </Link>
                </p>
                <p className='fst-italic'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
                  facilis! A perferendis tempore impedit mollitia fugit libero
                  ab quos aut cumque provident fuga hic sit, commodi harum
                  molestias, earum quibusdam.
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <form className='row'>
                  <div className='col'>
                    <div className='mb-2'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Search Names'
                        name='text'
                        value={query.text}
                        onChange={searchContacts}
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className='mb-2'>
                      <input
                        type='submit'
                        className='btn btn-outline-dark'
                        value='Search'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className='contact-list'>
            <div className='container'>
              <div className='row'>
                {filteredContacts.length > 0 &&
                  filteredContacts.map((contact, index) => {
                    return (
                      <>
                        <div
                          className='col-md-6'
                          key={contact.id}
                          contact={contact}
                        >
                          <div className='card my-2'>
                            <div className='card-body'>
                              <div className='row align-items-center d-flex justify-content-around'>
                                <div className='col-md-4'>
                                  <img
                                    src={contact.photo}
                                    alt={contact.name}
                                    className='contact-img'
                                  />
                                </div>
                                <div className='col-md-7'>
                                  <ul className='list-group'>
                                    <li className='list-group-item list-group-item-action'>
                                      Name :{" "}
                                      <span className='fw-bold'>
                                        {contact.name}
                                      </span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>
                                      Mobile :{" "}
                                      <span className='fw-bold'>
                                        {contact.mobile}
                                      </span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>
                                      Email :{" "}
                                      <span className='fw-bold'>
                                        {contact.email}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div className='col-md-1 d-flex flex-column gap-2 align-items-center'>
                                  <Link
                                    to={`/contacts/view/${contact.id}`}
                                    className='btn btn-warning'
                                  >
                                    <i className='fa fa-eye' />
                                  </Link>
                                  <Link
                                    to={`/contacts/edit/${contact.id}`}
                                    className='btn btn-primary'
                                  >
                                    <i className='fa fa-pen' />
                                  </Link>
                                  <button
                                    className='btn btn-danger'
                                    onClick={() => deleteContact(contact.id)}
                                  >
                                    <i className='fa fa-trash' />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ContactList;
