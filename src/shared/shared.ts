type UserType = {
  email: string;
  password: string;
  name: string;
};

interface UserData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export { UserType, UserData };
