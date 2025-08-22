import { PropsWithChildren } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumbs } from '@/components/breadcrubms';
import NavUserHeader from '@/components/nav-user-header';
import ThemeSwitcher from '@/components/theme-switcher';
import SearchInput from '@/components/search-input';
import OrganizationsProvider from '@/providers/organizations-provider';
import { Heading } from '@/components/heading';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <OrganizationsProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 bg-background flex justify-between h-16 shrink-0 items-center gap-2 pr-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs />
            </div>
            <div className="flex gap-2">
              <SearchInput />
              <ThemeSwitcher />
              <NavUserHeader />
            </div>
          </header>
          <main className="pb-6 px-4 h-[80dvh]">
            <Heading />
            {children}
          </main>
        </SidebarInset>
      </OrganizationsProvider>
    </SidebarProvider>
  );
};

export default DashboardLayout;
