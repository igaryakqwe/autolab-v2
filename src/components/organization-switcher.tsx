'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { api } from '@/lib/trpc/client';
import useOrganizationsStore, {
  hydrateStore,
} from '@/store/use-organizations-store';
import OrganizationLogo from '@/components/organization-logo';
import useLocalStorage from '@/hooks/use-local-storage';

const OrganizationSwitcher = () => {
  const { isMobile } = useSidebar();

  const { organizations, setLoading } = useOrganizationsStore();

  const { data, isLoading } = api.organization.getMy.useQuery();

  const { storedValue, setValue } = useLocalStorage<string>(
    'selectedOrganization',
    organizations[0]?.id,
  );

  const selectedOrganization = organizations.find(
    (organization) => organization.id === storedValue,
  );

  useEffect(() => {
    if (!storedValue && organizations.length) {
      setValue(organizations[0]?.id);
    }
  }, [organizations, setValue, storedValue]);

  useEffect(() => {
    setLoading(isLoading);
    if (data && !isLoading && !organizations.length) {
      hydrateStore(data);
    }
  }, [data, isLoading, organizations, setLoading]);

  if (!data && !isLoading) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <OrganizationLogo
                  name={selectedOrganization?.name as string}
                  image={selectedOrganization?.logo as string}
                  className="rounded-lg"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {selectedOrganization?.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Організації
            </DropdownMenuLabel>
            {organizations.map((organization) => (
              <DropdownMenuItem
                key={organization.id}
                onClick={() => setValue(organization.id)}
                className="gap-2 p-1"
              >
                <OrganizationLogo
                  image={organization.logo as string}
                  name={organization.name}
                  className="rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{organization.name}</span>
                  <span className="truncate text-[12px] max-w-[160px]">
                    {organization.address}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default OrganizationSwitcher;
