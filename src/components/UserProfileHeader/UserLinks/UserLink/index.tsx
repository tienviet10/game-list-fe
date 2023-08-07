import { Link, useLocation } from 'react-router-dom';
import styles from '@components/UserProfileHeader/UserLinks/UserLink/UserLink.module.scss';

function UserLink({
  linkName,
  children,
}: {
  linkName: string;
  children: string;
}) {
  const location = useLocation();
  const link = location.pathname.split('/').pop();

  return (
    <Link
      to={`/user-profile/${linkName === 'Overview' ? '' : linkName}`}
      className={`${styles.userLink} ${
        (link === linkName ||
          (link === 'user-profile' && linkName === 'overview')) &&
        styles.activeLink
      }`}
    >
      {children}
    </Link>
  );
}

export default UserLink;
