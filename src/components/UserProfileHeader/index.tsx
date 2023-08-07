import UserBanner from '@components/UserProfileHeader/UserBanner';
import UserLinks from '@/components/UserProfileHeader/UserLinks';
import type { UserProfileHeaderType } from '@/components/UserProfileHeader/types';

function UserProfileHeader({ userState }: UserProfileHeaderType) {
  const { user, loading } = userState;

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserBanner userState={userState} />
      <UserLinks />
    </div>
  );
}

export default UserProfileHeader;
