import PropTypes from 'prop-types';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';

const ProtectedLayout = ({ isAuthenticated }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" orientation="vertical" />
          <Breadcrumb>
            <BreadcrumbList>
              {pathSegments.map((segment, index) => {
                const to = `/${pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSegments.length - 1;

                return (
                  <BreadcrumbItem key={to}>
                    {isLast ? (
                      <BreadcrumbPage className="capitalize">
                        {segment.replace(/-/g, ' ')}
                      </BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink asChild className="capitalize">
                          <Link to={to}>{segment.replace(/-/g, ' ')}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

ProtectedLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedLayout;
