import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, Toolbar, AppBar, Box, Stack, useMediaQuery } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Article as ArticleIcon
} from '@mui/icons-material';

import { routes } from '../../constants/routes';
import { useAuthContext } from '../../context';
import logo from '../../assets/logo-digital-ecosystem-light.svg';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isLogged, logout } = useAuthContext();

  const links = [
    { title: 'Home', icon: <HomeIcon />, path: routes.ARTICLES },
    { title: 'Create article', icon: <ArticleIcon />, path: routes.CREATE_ARTICLE },
    (isLogged ? { title: 'Logout', icon: <LogoutIcon />, path: null } : {
      title: 'Login',
      icon: <LoginIcon />,
      path: routes.LOGIN,
    }),
  ];

  return (
    <Box height={isMobile ? '56px' : '64px'} mb={isMobile ? '48px' : '64px'} component={'header'}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between', color: 'white' }}>
            <Link to={routes.ARTICLES} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={'16px'}>
              <Box height={32}>
                <img src={logo} alt="Digital Ecosystem logo" style={{ height: '100%' }} />
              </Box>
                <Box component="hr" height={'32px'} width={'1px'} bgcolor={'white'} color={'white'} />

                <Typography variant="h6" noWrap>
                  Blog
                </Typography>
              </Stack>
            </Link>
          <Stack direction={'row'} spacing={'16px'} sx={{ color: 'white' }}>
            {links.map(({ title, path, icon }) => {
              const NavLinkContent = () => (
                <Box display={'flex'} gap={'8px'} alignItems={'center'} color={'white'}>
                  {icon}
                  {!isMobile && <Typography>{title}</Typography>}
                </Box>
              );

              if (path) {
                return (
                  <NavLink key={title} to={path} style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : 'none',
                    opacity: isActive ? '1' : '0.8',
                    transition: 'all 0.3s',
                    color: 'inherit'
                  })}>
                    <NavLinkContent />
                  </NavLink>
                );
              }

              return (
                <Box role={'button'} sx={{ cursor: 'pointer' }} onClick={() => logout()}>
                  <NavLinkContent />
                </Box>
              );
            })}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
