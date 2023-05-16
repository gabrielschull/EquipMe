import { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { supabase } from '../services/supabase.service';
import NavBar from '../Components/home/NavBar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Gear } from '../types/gear.type';
import Calendar from '../Components/gear/Calendar';
import { RootState, AppDispatch } from '../Redux/store';
import { addGear } from '../Redux/GearSlice';

const AddGear: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [files, setFiles] = useState<File[] | null>(null);
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    pricehour: '',
    priceday: '',
    deposit: '',
    type: '',
  });

  let gearJustAddedInfo: any;

  const handleChange = (event: any) => {
    const inputName = event.target.name;
    const value = event.target.value;
    // const selectedValue = event.target.value;

    setFormState((prevalue) => {
      return {
        ...prevalue,
        [inputName]: value,
      };
    });
  };

  async function handleSubmit() {
    try {

      gearJustAddedInfo = await supabase.addGear(
        userInfo.profile.id,
        formState.name,
        formState.description,
        formState.pricehour,
        formState.priceday,
        formState.deposit,
        formState.type,
        userInfo.profile.location
      );

      dispatch(
        addGear({
          id: gearJustAddedInfo.id,
          name: formState.name,
          description: formState.description,
          price_hr: formState.pricehour,
          price_day: formState.priceday,
          deposit: formState.deposit,
          type: formState.type
        })
      );
      // upload the files to the storage bucket
      if (files) {
        const fileUploads = files?.map((file) =>
          supabase.uploadGear(
            file,
            userInfo?.session?.user.id + '/gear/' + gearJustAddedInfo[0].id
          )
        );
        await Promise.all(fileUploads);
      }

      // Create availability date in the GearAvailability db
      supabase.calendarSetGearAvailability(
        gearJustAddedInfo[0].id,
        startDate,
        endDate
      );
    } catch (e) {
      console.log('Some files failed to upload', e);
    }
  }
  const navigate = useNavigate();

  return (
    <>
      <NavBar></NavBar>
      <form className='mx-12'>
        <div className=''>
          <div className=''>
            <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className=''>
                <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Gear type
                    </label>
                    <div className='mt-2'>
                      <select
                        onChange={handleChange}
                        id='type'
                        name='type'
                        autoComplete='country-name'
                        className='block w-full md:w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                        value={formState.type}
                      >
                        <option value='Snowboarding'>Snowboarding</option>
                        <option value='Skiing'>Skiing</option>
                        <option value='Surfing'>Surfing</option>
                        <option value='Motocross'>Motocross</option>
                        <option value='Skateboarding'>Skateboarding</option>
                        <option value='Wakeboarding'>Wakeboarding</option>
                        <option value='Kiteboarding'>Kiteboarding</option>
                        <option value='Sailing'>Sailing</option>
                        <option value='Windsurfing'>Windsurfing</option>
                        <option value='Kayaking'>Kayaking</option>
                        <option value='Rafting'>Rafting</option>
                        <option value='Rock Climbing'>Rock Climbing</option>
                        <option value='Mountain Biking'>Mountain Biking</option>
                        <option value='Ice Climbing'>Ice Climbing</option>
                        <option value='Parkour'>Parkour</option>
                        <option value='Cycling'>Cycling</option>
                        <option value='Camping'>Camping</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-full w-1/2'>
                <label
                  htmlFor='about'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Name
                </label>
                <div className='mt-2'>
                  <textarea
                    placeholder='Example: 1985 Peugeot Carbolite 103'
                    value={formState.name}
                    onChange={handleChange}
                    id='about'
                    name='name'
                    rows={1}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder: pl-1.5 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='col-span-full w-1/2'>
                <label
                  htmlFor='about'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Description
                </label>
                <div className='mt-2'>
                  <textarea
                    placeholder='Example: S 56cm, perfect for exploring the city or cruising'
                    value={formState.description}
                    onChange={handleChange}
                    id='about'
                    name='description'
                    rows={3}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder: pl-1.5 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='col-span-full w-1/2'>
                <label
                  htmlFor='cover-photo'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Photos
                </label>
                <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                  <div className='text-center'>
                    {!files && (
                      <PhotoIcon
                        className='mx-auto h-12 w-12 text-gray-300'
                        aria-hidden='true'
                      />
                    )}
                    <div className='container grid grid-cols-10 gap-2'>
                      {files &&
                        files.map((image) => {
                          // console.log('image', image);
                          // console.log(
                          //   'URL.createObjectURL(image)',
                          //   URL.createObjectURL(image)
                          // );
                          return (
                            <img
                              src={URL.createObjectURL(image)}
                              className='w-50 rounded-lg'
                            />
                          );
                        })}
                    </div>
                    <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='text-center relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                      >
                        <span>Upload a file</span>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                          multiple
                          onChange={(e) => {
                            const fileArray = Array.prototype.slice.call(
                              e.target.files
                            );
                            if (files) {
                              setFiles([...files, ...fileArray]);
                            } else {
                              setFiles(fileArray);
                            }
                          }}
                        />
                        <hr></hr>
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

          <div className='pb-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Price per hour /€
                </label>
                <div className='mt-2'>
                  <input
                    value={formState.pricehour}
                    onChange={handleChange}
                    type='text'
                    name='pricehour'
                    id='first-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Price per day /€
                </label>
                <div className='mt-2'>
                  <input
                    value={formState.priceday}
                    onChange={handleChange}
                    type='text'
                    name='priceday'
                    id='last-name'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Deposit /€
                </label>
                <div className='mt-2'>
                  <input
                    value={formState.deposit}
                    onChange={handleChange}
                    type='text'
                    name='deposit'
                    id='first-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className="col-span-3">
              <Calendar
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
              </div>
            </div>
          </div>
        </div>
        <div className='pb-12'>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();

                navigate(`/myprofile`);
              }}
              className='rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              List your gear on the site!
            </button>
            <button
              type='button'
              onClick={() => navigate(`/myprofile`)}
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddGear;
