import { useState, useEffect, useContext } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import NavBar from '../Components/home/NavBar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase.service';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const EditUser: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const [formState, setFormState] = useState({
    bio: userInfo.profile.bio,
    email: userInfo.profile.email,
    first_name: userInfo.profile.first_name,
    last_name: userInfo.profile.last_name,
    location: userInfo.profile.location,
    phone: userInfo.profile.phone,
  });
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const inputName = event.target.name;
    const value = event.target.value;

    setFormState((prevalue) => {
      return {
        ...prevalue,
        [inputName]: value,
      };
    });
  };

  const handleSubmit = () => {
    supabase.uploadUserProfileTextFields(
      userInfo.profile.id,
      formState.bio,
      formState.email,
      formState.first_name,
      formState.last_name,
      formState.location,
      formState.phone
    );
  };

  return (
    <>
      <NavBar></NavBar>
      <form className='mx-12'>
        <div className='space-y-12'>
          <div className=''>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  First Name
                </label>
                <div className='mt-2'>
                  <input
                    value={formState.first_name}
                    onChange={handleChange}
                    type='text'
                    name='first_name'
                    id='first-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    required
                  />
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Last Name
                </label>
                <div className='mt-2'>
                  <input
                    value={formState.last_name}
                    onChange={handleChange}
                    type='text'
                    name='last_name'
                    id='last-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    required
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email
                </label>
                <div className='mt-2'>
                  <input
                    value={formState.email}
                    onChange={handleChange}
                    type='text'
                    name='email'
                    id='email'
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    required
                  />
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Phone
                </label>
                <div className='mt-2'>
                  <input
                    value={formState.phone}
                    onChange={handleChange}
                    type='text'
                    name='phone'
                    id='phone'
                    autoComplete='phone'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    required
                  />
                </div>
              </div>
              {/* <div className='sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    autoComplete='password'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className='pb-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='col-span-full'>
                <label
                  htmlFor='about'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Bio
                </label>
                <div className='mt-2'>
                  <textarea
                    value={formState.bio}
                    onChange={handleChange}
                    id='about'
                    name='bio'
                    rows={3}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    required
                  />
                </div>
              </div>
              <div className='col-span-full'>
                <label
                  htmlFor='cover-photo'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Photo
                </label>
                <img
                  className='rounded-lg mx-auto h-100 w-100'
                  alt=''
                  src={
                    'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/images/' +
                    userInfo.profile?.id +
                    '/profileImage'
                  }
                />
                <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                  <div className='text-center'>
                    <PhotoIcon
                      className='mx-auto h-12 w-12 text-gray-300'
                      aria-hidden='true'
                    />
                    <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                      >
                        <span>Upload a file</span>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                          onChange={(e) =>
                            setFile(e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs leading-5 text-gray-600'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Notifications
            </h2>
            <div className='mt-10 space-y-10'>
              <fieldset>
                <legend className='text-sm font-semibold leading-6 text-gray-900'>
                  By Email
                </legend>
                <div className='mt-6 space-y-6'>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='comments'
                        name='comments'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label
                        htmlFor='comments'
                        className='font-medium text-gray-900'
                      >
                        Rentals
                      </label>
                      <p className='text-gray-500'>
                        Get notified when someone chooses your gear.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className='text-sm font-semibold leading-6 text-gray-900'>
                  Push Notifications
                </legend>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  These are delivered via SMS to your phone.
                </p>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='push-email'
                      name='push-notifications'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor='push-email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Same as email
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='push-nothing'
                      name='push-notifications'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor='push-nothing'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
        </div>
        <div className='pb-12'>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900'
              onClick={() => navigate(`/myprofile`)}
            >
              Cancel
            </button>
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
                if (file) {
                  supabase.uploadUserProfileImage(
                    file,
                    userInfo?.session?.user?.id
                  );
                }
                navigate(`/myprofile`);
              }}
              className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUser;
