import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import CustomAlert, { CustomAlertType } from '../components/CustomAlert';
import { User } from '../apis/type';
import { Eye } from 'tabler-icons-react';

type Props = {};

interface NewUser extends User {
  email: string;
  confirmPasssword: string;
}

const RegisterPage = (props: Props) => {
  const [userInfo, setUserInfo] = useState<NewUser>({
    username: '',
    password: '',
    confirmPasssword: '',
    email: '',
  });
  const [error, setError] = useState<{
    message: string;
    type: CustomAlertType;
  }>({ message: '', type: 'warning' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-4 font-Barlow">
      <div className="min-w-[50%] py-3 px-5 text-lg flex flex-col gap-2 rounded-lg shadow">
        {error.message && (
          <CustomAlert type={error.type} content={error.message} />
        )}

        <div className="flex flex-col gap-2">
          <div>Username: </div>
          <input
            value={userInfo.username}
            type="text"
            className="outline-none border border-info-600 rounded-md  bg-transparent px-2"
            onChange={(e) => {
              setUserInfo((prev) => {
                return { ...prev, username: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Email: </div>
          <input
            value={userInfo.email}
            type="email"
            className="outline-none border border-info-600 rounded-md  bg-transparent px-2"
            onChange={(e) => {
              setUserInfo((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div> Password: </div>
          <div className=" border border-info-600 rounded-md flex justify-between items-center px-2">
            <input
              value={userInfo.password}
              type={showPassword ? 'text' : 'password'}
              className="outline-none bg-transparent flex-1"
              onChange={(e) => {
                setUserInfo((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
            <Eye
              strokeWidth={1}
              className="text-info-500 cursor-pointer hover:text-info-800 active:text-info-600"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Confirm Password: </div>
          <div className=" border border-info-600 rounded-md flex justify-between items-center px-2">
            <input
              value={userInfo.confirmPasssword}
              type={showPassword ? 'text' : 'password'}
              className="outline-none bg-transparent flex-1"
              onChange={(e) => {
                setUserInfo((prev) => {
                  return { ...prev, confirmPasssword: e.target.value };
                });
              }}
            />
            <Eye
              strokeWidth={1}
              className="text-info-500 cursor-pointer hover:text-info-800 active:text-info-600"
              onClick={() => {
                setConfirmShowPassword((prev) => !prev);
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <div
            className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none"
            // onClick={handleSignIn}
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
