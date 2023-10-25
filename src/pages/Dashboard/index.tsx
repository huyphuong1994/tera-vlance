import { useStores } from '_common/hooks';

const DashboardPage = () => {
  const {
    authStore: { user },
  } = useStores();

  return (
    <>
      <h2 className="text-[40px] mt-12">Welcome {user?.username}!</h2>
    </>
  );
};

export default DashboardPage;
