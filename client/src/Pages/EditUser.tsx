import { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import NavBar from '../Components/home/NavBar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { updateUser } from '../Redux/UserSlice';

const EditUser: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formState.first_name &&
      formState.last_name &&
      formState.email &&
      formState.phone &&
      formState.bio
    ) {
      supabase.uploadUserProfileTextFields(
        userInfo.profile.id,
        formState.bio,
        formState.email,
        formState.first_name,
        formState.last_name,
        formState.location,
        formState.phone
      );

      dispatch(
        updateUser({
          profile: {
            ...userInfo.profile,
            first_name: formState.first_name,
            last_name: formState.last_name,
            email: formState.email,
            phone: formState.phone,
            bio: formState.bio,
          },
        })
      );

      if (file) {
        supabase.uploadUserProfileImage(file, userInfo?.session?.user?.id);
      }

      userInfo.location ? navigate(`/myprofile`) : navigate(`/home`);
    } else {
      alert('Please fill in all the fields.');
      navigate(`/edituser`);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <form className="mx-12">
        <div className="space-y-12">
          <div className="">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  First Name
                </label>
                <div className="mt-2 w-3/4">
                  <input
                    value={formState.first_name}
                    onChange={handleChange}
                    type="text"
                    name="first_name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3 w-3/4">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    value={formState.last_name}
                    onChange={handleChange}
                    type="text"
                    name="last_name"
                    id="last-name"
                    autoComplete="given-name"
                    className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3 w-3/4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    value={formState.email}
                    onChange={handleChange}
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3 w-3/4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    value={formState.phone}
                    onChange={handleChange}
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="phone"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    value={formState.bio}
                    onChange={handleChange}
                    id="about"
                    name="bio"
                    rows={3}
                    className="p-4 block w-full rounded-md border-0 py-3.0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-40"
                    required
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"></label>
                <img
                  className="rounded-lg mx-auto h-100 w-100"
                  alt=""
                  src={
                    'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/images/' +
                    userInfo.profile?.id +
                    '/profileImage'
                  }
                />
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className=" px-5 py-2 hover:text-white hover:bg-indigo-400 relative cursor-pointer rounded-md bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-md">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            setFile(e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-12">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="border-transparent bg-white hover:bg-indigo-400 hover:text-white text-black font-semibold py-2 px-3 rounded shadow border border-gray-300 focus:ring-offset-2font-semibold"
              onClick={() => navigate(`/home`)}>
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="border-transparent bg-white hover:bg-indigo-400 hover:text-white text-black font-semibold py-2 px-3 rounded shadow border border-gray-300 focus:ring-offset-2font-semibold">
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUser;
