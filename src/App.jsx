import { Toaster } from "react-hot-toast";
import Form from "./Form.jsx";

function App() {
  return (
    <main className="flex flex-col items-center justify-start h-full w-[100vw] sm:w-[550px] font-mono">
      <Toaster position="top-rigth" reverseOrder={false} />
      <Form />
      <a
        rel="noreferrer"
        href="https://gixi.me"
        target="_blank"
        className="text-slate-300 text-md sm:text-lg hover:text-white cursor-pointer w-full text-center pt-6"
        title="gixi contacto"
      >
        Creado con ❤️ por <u>gixi</u>
      </a>
    </main>
  );
}

export default App;
