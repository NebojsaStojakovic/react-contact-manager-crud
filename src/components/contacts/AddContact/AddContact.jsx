import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";

const AddContact = () => {
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
        let response = await ContactService.getGroups();
        setState({ ...state, loading: false, groups: response.data });
      } catch (error) {
        console.log(error.message);
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };
    fetchData();
  }, []);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: { ...state.contact, [event.target.name]: event.target.value },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();

    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  let { loading, contact, errorMessage, groups } = state;
  return (
    <>
      <section className='add-contact p-3'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <p className='h4 text-success fw-bold'>Create Contact</p>
              <p className='fst-italic'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam facilis reprehenderit, cumque maiores quibusdam
                voluptas fugiat, qui laborum iure delectus earum ducimus
                repellat. Cum aliquid sit porro qui voluptates velit.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <form onSubmit={submitForm}>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Name'
                    name='name'
                    value={contact.name}
                    onChange={updateInput}
                    required={true}
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Photo Url'
                    name='photo'
                    value={contact.photo}
                    onChange={updateInput}
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Mobile'
                    name='mobile'
                    value={contact.mobile}
                    onChange={updateInput}
                    required={true}
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email'
                    name='email'
                    value={contact.email}
                    onChange={updateInput}
                    required={true}
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Company'
                    name='company'
                    value={contact.company}
                    onChange={updateInput}
                    required={true}
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Title'
                    name='title'
                    value={contact.title}
                    onChange={updateInput}
                    required={true}
                  />
                </div>
                <div className='mb-2'>
                  <select
                    className='form-control'
                    name='groupId'
                    value={contact.groupId}
                    onChange={updateInput}
                    required={true}
                  >
                    <option value='' disabled>
                      Select a Group
                    </option>
                    {groups.map((group) => {
                      return (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='mb-2'>
                  <button
                    type='submit'
                    className='btn btn-success'
                    value='Create'
                  >
                    Create
                  </button>
                  <Link to={"/contacts/list"} className='btn btn-dark ms-2'>
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
