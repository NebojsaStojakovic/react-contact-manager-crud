import React from "react";
import { Link } from "react-router-dom";

const EditContact = () => {
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
          <div className='row align-items-center'>
            <div className='col-md-4'>
              <form>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Name'
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Photo Url'
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Mobile'
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email'
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Company'
                  />
                </div>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Title'
                  />
                </div>
                <div className='mb-2'>
                  <select className='form-control'>
                    <option value='' selected disabled>
                      Select a Group
                    </option>
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
                src='http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'
                alt='user2'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditContact;
