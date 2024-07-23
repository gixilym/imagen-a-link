import { Toaster } from "react-hot-toast";
import Form from "./Form.jsx";

function App() {
  return (
    <main className="flex flex-col items-center justify-start h-full w-[100vw] sm:w-[550px] font-mono">
      <Toaster position="top-rigth" reverseOrder={false} />
      <Form />
    </main>
  );
}

export default App;
