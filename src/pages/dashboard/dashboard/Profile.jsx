import { useSelector } from 'react-redux';
import useSWR from 'swr';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import authService from '@/services/authServices';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Developer at BlueSky Community. Passionate about React and open-source.',
    avatar: 'https://via.placeholder.com/150',
  };
  const { token } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useSWR(
    token ? '/auth/profile' : null,
    () => authService.getMyProfile(token)
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Profile Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2">
          {/* Avatar */}
          <Avatar className="h-24 w-24">
            <AvatarImage alt={data?.user.name} src={data?.user.photo} />
            <AvatarFallback>{data?.user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Name and Email */}
          <CardTitle className="text-center">
            {data?.user.name}
            <p className="text-sm text-gray-500">{data?.user.email}</p>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Profile;
