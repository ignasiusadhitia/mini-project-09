'use client';

import { ChevronsUpDown, LogOut, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import authService from '@/services/authServices';
import { logout } from '@/store/features/authSlice';

export function NavUser() {
  const { isMobile } = useSidebar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = useSWR(
    token ? '/auth/profile' : null,
    () => authService.getMyProfile(token)
  );

  const handleLogout = async () => {
    try {
      await authService.logout(token);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage alt={data?.user.name} src={data?.user.photo} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="text-sm leading-tight grid flex-1 text-left">
                <span className="truncate font-semibold">
                  {data?.user.name}
                </span>
                <span className="text-xs truncate">{data?.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="text-sm flex items-center gap-2 px-1 py-1.5 text-left">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage alt={data?.user.name} src={data?.user.photo} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="text-sm leading-tight grid flex-1 text-left">
                  <span className="truncate font-semibold">
                    {data?.user.name}
                  </span>
                  <span className="text-xs truncate">{data?.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link to="/dashboard/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User />
                  Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
