import { useState } from "react";
import { Prisma } from "@prisma/client";

interface Curso {
  id: number;
  title: string;
  slug: string;
  idioma: string;
  categoria: string;
  content: string;
  body: string;
  idhotmart: number;
  formato: string;
  comission: number;
  isAd: boolean;
  descuento: boolean;
  suscripcion: string;
  precio_regular: number;
  precio: number;
}

// Define dropdown list items
const categories = [
  "bailes",
  "música",
  "cine",
  "teatro",
  "artesanía",
  "diseño",
  "cuadro",
  "decoración",
  "de coser",
  "arte corporal",
  "carpintería",
  "fotografía",
  "esculturas",
  "tejido de punto",
  "artesanal",
  "arte culinario",
  "artes para niños",
];

const formatos = ["video aula", "e-book"];

const idiomas = ["Español", "Inglés"];

const suscripciones = ["pago unico", "mensualidad"];

interface CourseFormProps {
  initialData?: Curso | null;
  onSubmit: (data: Prisma.CursoCreateInput) => void;
  onCancel?: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Prisma.CursoCreateInput>(
    initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          formato: "video aula",
          categoria: initialData.categoria,
          idioma: "Español",
          suscripcion: "pago unico",
          content: initialData.content,
          body: initialData.body,
          idhotmart: initialData.idhotmart,
          precio: initialData.precio,
          comission: initialData.comission,
          isAd: initialData.isAd,
          descuento: initialData.descuento,
        }
      : {
          //properties string types
          title: "",
          slug: "",
          formato: "video aula",
          categoria: "",
          idioma: "Español",
          suscripcion: "pago unico",
          content: "",
          body: "",
          //others types (numbers type)
          idhotmart: 0,
          precio: 0,
          comission: 0,
          //others types (boolean type)
          isAd: false,
          descuento: false,
          // Add other properties here
        }
  );

  const handleInputChangeString = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "true" });
  };

  // const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   setFormData({ ...formData, [name]: checked });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        // Update an existing course using a PUT request
        const response = await fetch(`/api/cursos/update/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const updatedCourse = await response.json();
          onSubmit(updatedCourse);
        } else {
          console.error("Course creation/update failed");
        }
      } else {
        // Create a new course using a POST request
        const response = await fetch("/api/cursos/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const createdCourse = await response.json();
          onSubmit(createdCourse);
        } else {
          console.error("Course creation failed");
        }
      }
    } catch (error) {
      console.error("Course creation failed", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md p-4 sm:p-6 flex flex-col max-w-lg mx-auto"
    >
      {/* properties string types */}

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChangeString}
          className="ml-2 w-[85%] rounded-md border p-1"
        />
      </label>

      {/* Dropdown for categoria */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Categoria:
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleSelectChange}
          className="ml-2 rounded-md border p-1"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown for formato */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Formato:
        <select
          name="formato"
          value={formData.formato}
          onChange={handleSelectChange}
          className="ml-2 rounded-md border p-1"
        >
          {formatos.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown for idioma */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Idioma:
        <select
          name="idioma"
          value={formData.idioma}
          onChange={handleSelectChange}
          className="ml-2 rounded-md border p-1"
        >
          {idiomas.map((idiom) => (
            <option key={idiom} value={idiom}>
              {idiom}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown for suscripcion */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Suscripcion:
        <select
          name="suscripcion"
          value={formData.suscripcion}
          onChange={handleSelectChange}
          className="ml-2 rounded-md border p-1"
        >
          {suscripciones.map((suscripc) => (
            <option key={suscripc} value={suscripc}>
              {suscripc}
            </option>
          ))}
        </select>
      </label>

      {/* Content input */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Content:
        <textarea
          rows={4}
          name="content"
          value={formData.content}
          onChange={handleInputChangeString}
          className="w-full rounded-md border p-1"
        />
      </label>

      {/* Body input */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Body:
        <textarea
          rows={4}
          name="body"
          value={formData.body}
          onChange={handleInputChangeString}
          className="w-full rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Slug:
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleInputChangeString}
          className="ml-2 rounded-md border p-1"
        />
      </label>

      {/* other types (numbers type) */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        ID Hotmart:
        <input
          type="number"
          name="idhotmart"
          value={formData.idhotmart}
          onChange={handleInputChangeNumber}
          className="ml-2 rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Precio:
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleInputChangeNumber}
          className="ml-2 rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Comission (%):
        <input
          type="number"
          name="comission"
          value={formData.comission}
          onChange={handleInputChangeNumber}
          className="ml-2 rounded-md border p-1"
        />
      </label>

      {/* other types (boolean type) */}
      <label className="block text-gray-700 text-sm font-bold">
        Is Advertisement?
      </label>
      <div>
        <input
          type="radio"
          name="isAd"
          value="true"
          checked={formData.isAd === true}
          onChange={handleRadioChange}
        />
        <span>Yes</span>
      </div>
      <div className="mb-2">
        <input
          type="radio"
          name="isAd"
          value="false"
          checked={formData.isAd === false}
          onChange={handleRadioChange}
        />
        <span>No</span>
      </div>

      <label className="block text-gray-700 text-sm font-bold">
        Apply Discount?
      </label>
      <div>
        <input
          type="radio"
          name="descuento"
          value="true"
          checked={formData.descuento === true}
          onChange={handleRadioChange}
        />
        <span>Yes</span>
      </div>
      <div className="mb-2">
        <input
          type="radio"
          name="descuento"
          value="false"
          checked={formData.descuento === false}
          onChange={handleRadioChange}
        />
        <span>No</span>
      </div>

      <button
        type="submit"
        className="mt-6 border-2 border-black text-black font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white hover:border-0"
      >
        {initialData ? "Update" : "Create"}
      </button>
      {initialData ? 
      <button
        type="button"
        onClick={onCancel}
        className="mt-2 border-2 border-red-500 text-red-500 font-bold py-2 px-4 rounded hover:bg-red-500 hover:text-white hover:border-0"
      >
        Cancel
      </button> : ""}
    </form>
  );
};

export default CourseForm;
