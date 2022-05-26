import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const EditContact = () => {
  let { contactId } = useParams();
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      company: "",
      title: "",
      email: "",
      groupId: "",
    },
    errorMessage: "",
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
        });
      } catch (error) {
        console.log(error.message);
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };
    fetchData();
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: { ...state.contact, [event.target.name]: event.target.value },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();

    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, errorMessage, groups } = state;

  return (
    <>
      <section className='add-contact p-3'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <p className='h4 text-success fw-bold'>Edit Contact</p>
              <p className='fst-italic'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam facilis reprehenderit, cumque maiores quibusdam
                voluptas fugiat, qui laborum iure delectus earum ducimus
                repellat. Cum aliquid sit porro qui voluptates velit.
              </p>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className='row align-items-center'>
              <div className='col-md-4'>
                <form onSubmit={submitForm}>
                  <div className='mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Name'
                      value={contact.name}
                      name='name'
                      onChange={updateInput}
                      required={true}
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Photo Url'
                      value={contact.photo}
                      name='photo'
                      onChange={updateInput}
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Mobile'
                      value={contact.mobile}
                      name='mobile'
                      onChange={updateInput}
                      required={true}
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email'
                      value={contact.email}
                      name='email'
                      onChange={updateInput}
                      required={true}
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Company'
                      value={contact.company}
                      name='company'
                      onChange={updateInput}
                      required={true}
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Title'
                      value={contact.title}
                      name='title'
                      onChange={updateInput}
                      required={true}
                    />
                  </div>
                  <div className='mb-2'>
                    <select
                      className='form-control'
                      value={contact.groupId}
                      name='groupId'
                      onChange={updateInput}
                      required={true}
                    >
                      <option value='' disabled>
                        Select a Group
                      </option>
                      {groups.length > 0 &&
                        groups.map((group) => {
                          return (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className='mb-2'>
                    <button type='submit' className='btn btn-primary'>
                      Update
                    </button>
                    <Link to={"/contacts/list"} className='btn btn-dark ms-2'>
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <div className='col-md-6'>
                <img
                  className='contact-img'
                  src={contact.photo}
                  alt={contact.name}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EditContact;
