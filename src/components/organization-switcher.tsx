'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { ChevronsUpDown, Plus } from 'lucide-react';

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
import useOrganizationsStore from '@/store/use-organizations-store';
import OrganizationLogo from '@/components/organization-logo';
import useLocalStorage from '@/hooks/use-local-storage';
import Link from 'next/link';
import { Routes } from '@/constants/routes';
import { Skeleton } from '@/components/ui/skeleton';

const OrganizationSwitcher = () => {
  const { isMobile } = useSidebar();

  const { organizations, isLoading } = useOrganizationsStore();

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

  if (!organizations.length && !isLoading) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              disabled={isLoading}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isLoading ? (
                <>
                  <Skeleton className="aspect-square size-8 rounded-lg" />
                  <div className="grid flex-1 gap-1">
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                  <Skeleton className="size-4 rounded-full" />
                </>
              ) : (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                    <OrganizationLogo
                      name={selectedOrganization?.name || ''}
                      image={selectedOrganization?.logo || ''}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {selectedOrganization?.name || 'Не знайдено'}
                    </span>
                  </div>
                  {organizations.length ? (
                    <ChevronsUpDown className="ml-auto size-4" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                </>
              )}
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
            {!organizations.length && !isLoading && (
              <DropdownMenuItem className="gap-2 p-2" asChild>
                <Link href={Routes.AccountOrganizations}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Створити
                  </div>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default OrganizationSwitcher;
