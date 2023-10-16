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

  const handleDelete = async (id: number) => {
    try {
        // Call the delete API route with the course ID
        const response = await fetch(`/api/cursos/delete?id=${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Remove the deleted course from the state
            setCursos((prevCursos) => prevCursos.filter((curso) => curso.id !== id));
        } else {
            console.error('Failed to delete course');
        }
    } catch (error) {
        console.error('Failed to delete course', error);
    }
};

  return (
    <main className='bg-yellow-100 min-h-screen'>
    <div className='p-8 sm:p-10'>
      <h1 className='text-center text-lg p-4 pb-8'>All Courses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='bg-white rounded-lg shadow-lg p-6'>
        {cursos.map((curso) => (
          <li key={curso.id} className='flex items-center justify-between hover:bg-slate-100'>
            {curso.title}
            <div className='space-x-1 space-y-2'>
            <button className='rounded-md p-1 bg-red-400 hover:bg-red-500' onClick={() => handleDelete(curso.id)}>UPD</button>
            <button className='rounded-md p-1 bg-red-400 hover:bg-red-500' onClick={() => handleDelete(curso.id)}>DEL</button>
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
    </main>
  );
};

export default ViewCourses;
