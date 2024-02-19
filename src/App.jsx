import Form from "./components/Form.jsx";
import CreatedBy from "./components/CreatedBy.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main className="flex flex-col items-center justify-start h-full w-[100vw] sm:w-[550px] font-mono">
      <Toaster position="top-rigth" reverseOrder={false} />
      <Form />
      <CreatedBy />
    </main>
  );
}

export default App;
