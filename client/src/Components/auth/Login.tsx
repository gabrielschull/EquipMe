import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabaseClient } from '../../services/supabase.service';
import logo from '../Assets/Logo.png';

const Login: React.FC = (): JSX.Element => {
  return (
    <>
      <section className="bg-pink-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-14 bg-gradient-to-r from-purple-500 to-pink-500 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 mt-0">
              <img className="rounded-full" src={logo} alt="Logo" />
              <Auth
                supabaseClient={supabaseClient}
                redirectTo="http://localhost:3000/home"
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: 'blue',
                        brandAccent: 'darkred',
                      },
                    },
                  },
                }}
                providers={['google', 'github', 'facebook']}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
