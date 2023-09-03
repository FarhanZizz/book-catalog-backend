export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string; // Update the type to match your expectations
  contactNo: string;
  address: string;
  profileImg: string | null;
};
export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
};
