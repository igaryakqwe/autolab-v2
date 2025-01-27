import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants/profile-tabs';
import { useQueryState } from 'nuqs';

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useQueryState('tab', {
    defaultValue: 'profile',
  });

  return (
    <Tabs
      value={activeTab}
      orientation="vertical"
      className="flex flex-col lg:flex-row w-full gap-2"
    >
      <div className="lg:max-w-[200px] max-w-[90vw] w-full overflow-x-auto overflow-y-hidden">
        <TabsList className="max-w-[200px] flex flex-row lg:flex-col justify-start gap-1 h-auto rounded-none bg-transparent px-2 py-4 text-foreground whitespace-nowrap">
          {profileTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative lg:w-full max-w-[200px] px-4 py-2 flex-shrink-0 justify-center after:absolute after:inset-y-0 after:start-0 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
                value={tab.id}
              >
                <Icon
                  className="mr-2"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      <div className="h-full w-full rounded-lg text-start">
        {profileTabs.map((tab) => {
          const Content = tab.content;
          return (
            <TabsContent key={tab.id} value={tab.id} className="h-full">
              <Content />
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};

export default SettingsTabs;
