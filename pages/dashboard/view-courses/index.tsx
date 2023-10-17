import { useEffect, useState } from "react";
import CourseForm from "@/components/CourseForm";
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

const ViewCourses = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Curso | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleEdit = (curso: Curso) => {
    setEditingCourse(curso);
  };

  const handleUpdate = async (updatedData: Prisma.CursoCreateInput) => {
    try {
      if (editingCourse) {
        const response = await fetch(`/api/cursos/update/${editingCourse.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        // const response = await fetch('/api/cursos/update', {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         id: editingCourse?.id,
        //         ...updatedData,
        //     }),
        // });

        if (response.ok) {
          alert("Course updated successfully!");
          // Optionally, you can fetch the updated list of courses
          // or update the state to reflect the changes
        } else {
          console.error("Course update failed");
        }
      }
    } catch (error) {
      console.error("Course update failed", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // Call the delete API route with the course ID
      const response = await fetch(`/api/cursos/delete?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted course from the state
        setCursos((prevCursos) =>
          prevCursos.filter((curso) => curso.id !== id)
        );
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

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

  return (
    <main className="bg-yellow-100 min-h-screen">
      <div className="p-8 sm:p-10">
        <h1 className="text-center text-lg p-4 pb-8">All Courses</h1>

        {/* Category filter buttons*/}
        <div className="text-center overflow-x-auto mb-4 space-y-2">
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
        <div className="text-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="rounded-md border p-2 mb-4"
        />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="bg-white rounded-lg shadow-lg p-6">
            {filteredCourses.map((curso) => (
              <li
                key={curso.id}
                className="flex items-center justify-between hover:bg-slate-100 py-2 hover:rounded-md hover:p-2"
              >
                <div className="text-sm font-bold">
                <p>{curso.title}</p>
                <p className="text-green-500"><span>$</span>{curso.precio}</p>
                </div>
                
                <div className="space-x-2 space-y-2">
                  <button
                    className="rounded-md p-1 bg-blue-400 hover:bg-blue-500 text-sm"
                    onClick={() => handleEdit(curso)}
                  >
                    EDIT
                  </button>
                  <button
                    className="rounded-md p-1 bg-red-400 hover:bg-red-500 text-sm"
                    onClick={() => handleDelete(curso.id)}
                  >
                    DEL
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {editingCourse && (
          <CourseForm
            initialData={editingCourse}
            onSubmit={handleUpdate}
            onCancel={() => setEditingCourse(null)}
          />
        )}
      </div>
    </main>
  );
};

export default ViewCourses;
