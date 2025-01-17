import { OrganizationInfo } from '@/types/organization';
import { create } from 'zustand/react';

interface OrganizationStore {
  organizations: OrganizationInfo[];
  setOrganizations: (organizations: OrganizationInfo[]) => void;
  selectedOrganization: string | null;
  setSelectedOrganization: (organizationId: string) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const useOrganizationsStore = create<OrganizationStore>((set) => ({
  organizations: [],
  setOrganizations: (organizations) => set({ organizations }),
  selectedOrganization: null,
  setSelectedOrganization: (selectedOrganization) =>
    set({ selectedOrganization }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export const hydrateStore = (initialData: OrganizationInfo[]) => {
  useOrganizationsStore.setState({ organizations: initialData });
};

export default useOrganizationsStore;
