import { useState } from "react";
import { Prisma } from "@prisma/client";

interface CourseFormProps {
  onSubmit: (data: Prisma.CursoCreateInput) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Prisma.CursoCreateInput>({
    //properties string types
    title: "",
    slug: "",
    formato: "",
    categoria: "",
    idioma: "",
    suscripcion: "",
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
  });

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
      const response = await fetch("/api/cursos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
    
      if (response.ok) {
        const createdCourse = await response.json()
        onSubmit(createdCourse)
      } else {
        console.error("Course creation failed")
      }
    } catch (error) {
      console.error("Course creation failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-lg mx-auto">
      {/* properties string types */}
    
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChangeString}
          className="rounded-md border p-1"
        />
        </label>

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Categoria:
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleInputChangeString}
          className="rounded-md border p-1"
        />     
        </label>          
  
      
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Formato:
        <input
          type="text"
          name="formato"
          value={formData.formato}
          onChange={handleInputChangeString}
          className="rounded-md border p-1"
        />
        </label>
      
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Idioma:
        <input
          type="text"
          name="idioma"
          value={formData.idioma}
          onChange={handleInputChangeString}
          className="rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Suscripcion:
        <input
          type="text"
          name="suscripcion"
          value={formData.suscripcion}
          onChange={handleInputChangeString}
          className="rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Content:
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleInputChangeString}
          className="rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Body:
        <input
          type="text"
          name="body"
          value={formData.body}
          onChange={handleInputChangeString}
          className="rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Slug:
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleInputChangeString}
          className="rounded-md border p-1"
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
          className="rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Precio:
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleInputChangeNumber}
          className="rounded-md border p-1"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Comission (%):
        <input
          type="number"
          name="comission"
          value={formData.comission}
          onChange={handleInputChangeNumber}
          className="rounded-md border p-1"
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
        Criar
      </button>
    </form>
  );
};

export default CourseForm;
