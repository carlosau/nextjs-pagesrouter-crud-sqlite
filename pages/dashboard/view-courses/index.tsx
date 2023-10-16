import { useEffect, useState } from 'react';

interface Curso {
    id: number;
    title: string;
    slug: string;
    idioma: string;
    formato: string;
    suscripcion: string;
    precio_regular: number;
    precio: number;
  }

const ViewCourses = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch courses from the API route
    fetch('/api/cursos')
      .then((response) => response.json())
      .then((data) => {
        setCursos(data)
        setLoading(false);
        })
      .catch((error) => {
        console.error('Failed to fetch courses', error);
        setLoading(false)
      })
  }, []);

  return (
    <div>
      <h1>All Courses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>{curso.title}</li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default ViewCourses;
