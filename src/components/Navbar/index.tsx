import { useState, useMemo, useCallback } from 'react';
import { Drawer, Popover, Grid } from 'antd';
import {
  EnterOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import useTokenAuth from '@/hooks/useTokenAuth';
import { setUser } from '@/features/userSlice';
import { setUserGameReducer } from '@/features/userGameSlice';
import { setClearAddedGames } from '@/features/addedGamesSlice';
import { INITIAL_USER_STATE } from '@/constants';
import styles from './Navbar.module.scss';
// import { apolloClient } from '@/graphql';

const { useBreakpoint } = Grid;

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { loading, userState } = useTokenAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const screens = useBreakpoint();

  const logout = useCallback(async () => {
    localStorage.removeItem('token');

    // await apolloClient.resetStore();
    dispatch(setUser(INITIAL_USER_STATE.user));
    dispatch(setClearAddedGames());
    dispatch(
      setUserGameReducer({
        type: 'reset',
      })
    );
    navigate('/home');

    setOpen(false);
  }, [dispatch, navigate]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const memoizedContent = useMemo(() => {
    return (
      <div aria-label="testt">
        <ul className={styles['desktop-nav__popover-dropdown']}>
          <li>
            <Link
              className={styles['desktop-nav__popover-dropdown-item']}
              to="/user-profile"
            >
              <UserOutlined className="desktop-nav__header-popover-icon" />
              Profile
            </Link>
          </li>
          <li>
            <Link
              className={styles['desktop-nav__popover-dropdown-item']}
              to="/settings"
            >
              <SettingOutlined className="desktop-nav__header-popover-icon" />
              Settings
            </Link>
          </li>
          <li>
            <button
              className={styles['desktop-nav__popover-dropdown-item']}
              type="button"
              onClick={logout}
            >
              <EnterOutlined className="desktop-nav__header-popover-icon" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  }, [logout]);

  return (
    <div style={{ display: 'flex', height: '5rem' }}>
      <header className={styles.header}>
        <div className={`${styles['header-spacing']} ${styles['sm:px-6']}`}>
          <div className={styles['header-content']}>
            <div className={styles['header-brand']}>
              <Link to="/">
                <svg
                  className={styles['header-brand__icon']}
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
                </svg>
              </Link>
            </div>

            {screens.xs ? (
              <>
                {/* Mobile Navbar  */}
                <nav className={styles['mobile-nav']}>
                  <MenuOutlined
                    className={styles['mobile-nav__hamburger']}
                    onClick={showDrawer}
                    data-testid="mobile-nav__hamburger"
                  />
                  <Drawer
                    className={styles['mobile-nav__header-drawer']}
                    placement="top"
                    onClose={onClose}
                    open={open}
                  >
                    <ul>
                      <li className={styles['mobile-nav__header-drawer-item']}>
                        <Link to="/" onClick={onClose}>
                          Home
                        </Link>
                      </li>
                      <li className={styles['mobile-nav__header-drawer-item']}>
                        <Link to="/user-profile" onClick={onClose}>
                          Profile
                        </Link>
                      </li>
                      <li className={styles['mobile-nav__header-drawer-item']}>
                        <Link to="/user-profile/game-list" onClick={onClose}>
                          Game List
                        </Link>
                      </li>
                      {!loading && userState?.user?.username ? (
                        <li
                          className={styles['mobile-nav__header-drawer-item']}
                        >
                          <button type="button" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      ) : (
                        <>
                          <li
                            className={styles['mobile-nav__header-drawer-item']}
                          >
                            <Link to="/login">Log In</Link>
                          </li>

                          <li
                            className={styles['mobile-nav__header-drawer-item']}
                          >
                            <Link to="/register">Register</Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </Drawer>
                </nav>
              </>
            ) : (
              <>
                {/* Desktop Navbar  */}
                <nav className={styles['desktop-nav']}>
                  <ul className={styles['desktop-nav__nav-section']}>
                    <li className={styles['desktop-nav__nav-item']}>
                      <Link to="/">Home</Link>
                    </li>
                    <li className={styles['desktop-nav__nav-item']}>
                      <Link to="/user-profile">Profile</Link>
                    </li>
                    <li className={styles['desktop-nav__nav-item']}>
                      <Link to="/user-profile/game-list">Game List</Link>
                    </li>
                  </ul>

                  <ul className={styles['desktop-nav__nav-section']}>
                    {!loading && userState?.user?.username ? (
                      <Popover content={memoizedContent}>
                        <img
                          className={styles['desktop-nav__profile-image']}
                          data-testid="profile-image"
                          width={38}
                          height={38}
                          alt="profile"
                          src={userState?.user?.userPicture}
                        />
                      </Popover>
                    ) : (
                      <>
                        {pathname !== '/login' && (
                          <li className={styles['desktop-nav__nav-item']}>
                            <Link to="/login">Sign In</Link>
                          </li>
                        )}

                        {pathname !== '/register' && (
                          <li className={styles['desktop-nav__nav-item']}>
                            <Link to="/register">Register</Link>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
