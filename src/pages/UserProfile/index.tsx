import useTokenAuth from '@hooks/useTokenAuth';
import UserProfileHeader from '@components/UserProfileHeader';
import ProfileContent from '@components/ProfileContent';

function UserProfile({ routeName }: { routeName: string }) {
  const { loading, userState } = useTokenAuth();

  if (loading || !userState.user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserProfileHeader userState={userState} />
      <ProfileContent routeName={routeName} />
    </>
  );
}

export default UserProfile;
