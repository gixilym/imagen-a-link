import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const KEY = import.meta.env.VITE_KEY;
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dgs55s8qh/image/upload/v1714770522/f1uc15e9qzttwemahtq8.webp";

function Form() {
  const [generatedLink, setGeneratedLink] = useState(DEFAULT_IMAGE),
    [loadLink, setLoadLink] = useState(false),
    [disableGenerate, setDisableGenerate] = useState(false),
    onDrop = useCallback(acceptedFiles => console.info(acceptedFiles), []),
    { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      onDrop,
    });

  const [lastFile, setLastFile] = useState(acceptedFiles[0] ?? false);

  useEffect(() => setGeneratedLink("Clic en 'generar link'"), []);

  useEffect(() => {
    if (acceptedFiles[0]) {
      setLastFile(acceptedFiles[0]);
      setDisableGenerate(false);
      setGeneratedLink("Clic en 'generar link'");
    }
  }, [acceptedFiles]);

  async function onSubmit(event) {
    event.preventDefault();
    setLoadLink(true);
    setDisableGenerate(true);

    if (!acceptedFiles[0]) {
      setGeneratedLink(DEFAULT_IMAGE);
      const timer = setTimeout(() => setLoadLink(false), 1500);
      return () => clearTimeout(timer);
    }

    const formData = new FormData();

    try {
      formData.append("file", acceptedFiles[0]);
      formData.append("upload_preset", "arjhb0vs");
      formData.append("api_key", KEY);

      const res = await fetch(
          "https://api.cloudinary.com/v1_1/dgs55s8qh/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ),
        data = await res.json(),
        url = data.secure_url;
      setGeneratedLink(url);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoadLink(false);
    }
  }

  function copyLinkToClipboard(link) {
    if (link == "Clic en 'generar link'") return;

    navigator.clipboard.writeText(link);
    toast.success("Link copiado");
  }

  function errorMsg() {
    toast.error("Ya generaste un link para esa imagen!");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full px-4 md:px-6 py-6 md:py-8 flex flex-col items-center md:items-start justify-between gap-y-10 sm:rounded-lg bg-gray-800 border-y-2 sm:border-2 border-gray-600"
    >
      <h1 className="text-3xl md:text-4xl text-balance font-bold text-center w-full text-white">
        <span className="text-green-300">Imagen</span> a{" "}
        <span className="text-blue-400">Link</span>
      </h1>

      <section className="flex flex-col md:flex-row justify-between h-full md:h-40 items-center w-full gap-y-4 md:gap-y-0 md:gap-x-8">
        <div
          className="flex font-semibold text-xl md:text-2xl justify-center items-center bg-slate-600 w-full md:w-4/6 min-h-20 border-2 border-dashed rounded-lg h-full px-6"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="text-slate-200 italic select-none text-center text-balance">
            Suelta la imagen o haz clic aquí
          </p>
        </div>

        {acceptedFiles[0] ? (
          <img
            src={URL.createObjectURL(acceptedFiles[0])}
            alt="Imagen seleccionada"
            className="h-28 sm:h-full w-2/6 max-w-36 self-center"
          />
        ) : lastFile ? (
          <img
            src={URL.createObjectURL(lastFile)}
            alt="Imagen seleccionada"
            className="h-28 sm:h-full w-2/6 max-w-36 self-center"
          />
        ) : (
          <img
            src={DEFAULT_IMAGE}
            alt="Imagen seleccionada"
            className="h-28 sm:h-full w-2/6 max-w-36 self-center"
          />
        )}
      </section>

      <button
        title="generar link"
        className="opacity-100 w-full self-center py-2 font-semibold rounded-lg text-white capitalize text-xl md:text-2xl duration-75 border bg-indigo-600 hover:scale-95 hover:bg-indigo-700"
        type={disableGenerate ? "button" : "submit"}
        onClick={disableGenerate ? errorMsg : null}
      >
        generar link
      </button>

      <footer className="w-full flex flex-col justify-center items-start gap-y-2">
        <h2 className="text-xl font-semibold dark:text-gray-100">
          Nuevo link:
        </h2>
        <div className="p-2 w-full h-12 rounded-lg bg-gray-700 flex justify-center items-center border-2 border-gray-500 relative overflow-hidden">
          {loadLink ? (
            <p className="text-green-400 tracking-wider font-semibold text-xl capitalize text-start w-full">
              generando link...
            </p>
          ) : (
            <a
              className={
                generatedLink == "Clic en 'generar link'"
                  ? "text-blue-400 w-full text-start text-lg md:text-xl"
                  : "text-blue-400 w-full text-start hover:underline text-lg md:text-xl"
              }
              href={
                generatedLink == "Clic en 'generar link'" ? null : generatedLink
              }
              target="_blank"
              rel="noreferrer"
            >
              {generatedLink}
            </a>
          )}
          <svg
            onClick={() => copyLinkToClipboard(generatedLink)}
            className={
              generatedLink == "Clic en 'generar link'"
                ? "w-8 h-8 top-1.3 right-1 absolute duration-75"
                : "w-8 h-8 top-1.3 right-1 absolute duration-75 cursor-pointer hover:scale-110"
            }
            viewBox="0 0 24 24"
          >
            <path
              d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
              fill="#fff"
            />
            <path
              d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
              fill="#fff"
            />
          </svg>
        </div>
      </footer>
    </form>
  );
}

export default Form;
