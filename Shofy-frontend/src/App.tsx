import {useAuthCheck} from "./hooks/useAuthChecked";
import MainLayout from "./layouts/MainLayout";

function App() {
  const authChecked = useAuthCheck();
  if (!authChecked) {
    return <p>...Loading</p>;
  }
  return (
    <>
      {/* <Toaster /> */}
      <MainLayout />
    </>
  );
}
export default App;
