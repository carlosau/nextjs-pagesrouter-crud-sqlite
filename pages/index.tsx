import Image from "next/image";
import { Nunito } from "next/font/google";
import Link from "next/link";
import { useState, useEffect } from "react";

const nunito = Nunito({ subsets: ["latin"] });

interface Curso {
  id: number;
  title: string;
  slug: string;
  categoria: string;
  idioma: string;
  formato: string;
  suscripcion: string;
  precio_regular: number;
  precio: number;
  isAd: boolean;
  createdAt: Date;
}

interface HomeProps {
  cursos: Curso[];
}

// Define the list of categories
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

const Home: React.FC<HomeProps> = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string>(""); // State for selected ordering option

  // Function to handle the search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter courses based on the search query and selected category
  const filteredCourses = cursos.filter((curso) => {
    const titleMatch = curso.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (selectedCategory) {
      const categoryMatch = curso.categoria.toLowerCase() === selectedCategory;
      return titleMatch && categoryMatch;
    }
    return titleMatch;
  });

  // Function to handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  //Event handler for handling the select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrder(e.target.value);
  };

  //Function to order the course list based on the selected ordering option
  const orderedCourses = () => {
    switch (selectedOrder) {
      case "highestPrice":
        return [...filteredCourses].sort((a, b) => b.precio - a.precio);
      case "lowestPrice":
        return [...filteredCourses].sort((a, b) => a.precio - b.precio);
      case "isAd":
        return [...filteredCourses].sort((a, b) => (b.isAd ? 1 : -1));
      case "newest":
        return [...filteredCourses].sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      // case "updated":
      //   return [...filteredCourses].sort((a, b) => { return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() });
      default:
        return filteredCourses;
    }
  };

  useEffect(() => {
    // Fetch courses from the API route
    fetch("/api/cursos")
      .then((response) => response.json())
      .then((data) => {
        setCursos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch courses", error);
        setLoading(false);
      });
  }, []);

  return (
    <main
      className={`bg-slate-100 flex min-h-screen flex-col items-center justify-between p-8 sm:p-20 ${nunito.className}`}
    >
    
    <div className="w-full bg-white fixed sm:px-24 p-8 sm:p-4 top-0">
    {/* MENU */}
    <div className="flex justify-between items-center mb-4">
      <div>
        <Image src="/logo-tallerdeartes-v2.svg" alt="tallerdeartes-logo" width={120} height={120}></Image>
      </div>
      <div>
        <ul className="flex gap-6">
          <li>about</li>
          <li>sell your course</li>
          <li>contact</li>
        </ul>
      </div>
    </div>

      {/* Category filter buttons*/}
      <div className="hidden sm:block text-center overflow-x-auto mb-4 space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`${
              category === selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } text-sm p-2 px-4 rounded mr-2`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="sm:px-10 pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="w-full sm:w-[400px] rounded-md border p-2 mb-4"
        />
        </div>
        {/* Dropdown for ordering */}
        <div>
        <select
          value={selectedOrder}
          onChange={handleSelectChange}
          className="w-[150px] float-right bg-white rounded-md border p-1 text-sm"
        >
          <option value="">Order by...</option>
          <option value="newest">Newest</option>
          {/* <option value="updated">Updated</option> */}
          <option value="lowestPrice">Lowest Price</option>
          <option value="highestPrice">Highest Price</option>
          <option value="isAd">Is Ad</option>
        </select>
        </div>
        
      </div>

      </div>

      {loading ? (
        <p className="h-[400px]">Loading...</p>
      ) : (
        <div className="mt-[230px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {orderedCourses().map((curso) => (
            <div key={curso.id} className="bg-white rounded-lg shadow-md p-6">
              <Link href={`/cursos/${curso.slug}`}>
                <Image
                  className="rounded-md"
                  src={`/img/img_cursos/img_curso${curso.id}.png`}
                  width={295}
                  height={295}
                  alt="taller-de-artes-cursos"
                ></Image>
                <h2 className="text-lg font-bold mb-2">{curso.title}</h2>
                <ul className="text-gray-500 text-right text-sm">
                  <li>
                    <span className="font-bold">Idioma:</span> {curso.idioma}
                  </li>
                  <li>
                    <span className="font-bold">Formato:</span> {curso.formato}
                  </li>
                  <li>
                    <span className="font-bold">Suscripción:</span>{" "}
                    {curso.suscripcion}
                  </li>
                </ul>
                {curso.precio_regular ? (
                  <p className="text-right">
                    <span className="text-red-500 text-xl">
                      <s>US$ {curso.precio_regular}</s>
                    </span>
                    <span className="text-green-500 text-2xl">
                      US$ {curso.precio}
                    </span>
                  </p>
                ) : (
                  <p className="text-green-500 text-2xl text-right">
                    <span>US$ {curso.precio}</span>
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
