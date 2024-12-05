import { BookOpen, Briefcase, Mail, MapIcon, User } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Overview',
      url: '/dashboard',
      icon: MapIcon,
      isActive: false,
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: User,
      isActive: false,
    },
    {
      title: 'Blogs',
      url: '/dashboard/blogs',
      icon: BookOpen,
    },
    {
      title: 'Portfolio',
      url: '/dashboard/portfolios',
      icon: Briefcase,
    },
    {
      title: 'Contact Us',
      url: '/dashboard/contact-us',
      icon: Mail,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
