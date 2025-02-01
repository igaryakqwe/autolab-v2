import { OrganizationInfo } from '@/types/organization';
import { create } from 'zustand/react';

interface OrganizationStore {
  organizations: OrganizationInfo[];
  setOrganizations: (organizations: OrganizationInfo[]) => void;
  currentOrganization: string | null;
  setCurrentOrganization: (organizationId: string) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const useOrganizationsStore = create<OrganizationStore>((set) => ({
  organizations: [],
  setOrganizations: (organizations) => set({ organizations }),
  currentOrganization: null,
  setCurrentOrganization: (organizationId) =>
    set({ currentOrganization: organizationId }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export const hydrateStore = (initialData: OrganizationInfo[]) => {
  useOrganizationsStore.setState({ organizations: initialData });
};

export default useOrganizationsStore;
