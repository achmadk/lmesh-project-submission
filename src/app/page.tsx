import { FormWorkload } from "@/components/forms/Workload";
import { HomeContextProvider } from "@/providers/HomeContext";

const Home = () => {
  return (
    <HomeContextProvider>
      <FormWorkload />
    </HomeContextProvider>
  );
};

export default Home;
