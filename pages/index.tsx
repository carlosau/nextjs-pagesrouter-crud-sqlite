import Image from 'next/image'
import { Nunito } from 'next/font/google'
import { prisma } from '@/db'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const nunito = Nunito({ subsets: ['latin'] })

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

interface HomeProps {
  cursos: Curso[];
}

const Home: React.FC<HomeProps> = () => {
 
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch courses from the API route
    fetch('/api/cursos')
      .then((response) => response.json())
      .then((data) => { 
        setCursos(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch courses', error)
        setLoading(false)
      });
  }, []);

  return (
    <main
      className={`bg-slate-100 flex min-h-screen flex-col items-center justify-between p-8 sm:p-20 ${nunito.className}`}
    >
      <div className='pb-10 text-2xl'>
        <h1>Cursos</h1>
      </div>
      {loading ? (
        <p className='h-[400px]'>Loading...</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {cursos.map((curso) => (
        <div key={curso.id} className='bg-white rounded-lg shadow-md p-6'>
        <Link href={`/cursos/${curso.slug}`}>
        <Image
          className='rounded-md'
          src={`/img/img_cursos/img_curso${curso.id}.png`}
          width={295}
          height={295}
          alt='taller-de-artes-cursos'
        ></Image>
        <h2 className='text-lg font-bold mb-2'>{curso.title}</h2>
        <ul className='text-gray-500 text-right text-sm'>
          <li>
            <span className='font-bold'>Idioma:</span> {curso.idioma}
          </li>
          <li>
            <span className='font-bold'>Formato:</span> {curso.formato}
          </li>
          <li>
            <span className='font-bold'>Suscripción:</span>{' '}
            {curso.suscripcion}
          </li>
        </ul>
        {curso.precio_regular ? (
          <p className='text-right'>
            <span className='text-red-500 text-xl'>
              <s>US$ {curso.precio_regular}</s>
            </span>
            <span className='text-green-500 text-2xl'>
              US$ {curso.precio}
            </span>
          </p>
        ) : (
          <p className='text-green-500 text-2xl text-right'>
            <span>US$ {curso.precio}</span>
          </p>
        )}
        </Link>
      </div>
        ))}
        </div>
      )}
    </main>
  )
}

export default Home;

// export async function getServerSideProps() {
  // Create a new curso in the database
  // await prisma.curso.create({ data: {   "idhotmart": 1197438,
  // "isAd": false,
  // "title": "Salsa Caleña Nivel Básico",
  // "slug": "salsa-calena-nivel-basico",
  // "content": "En este curso aprenderás todo lo necesario para ser un gran bailador de Salsa, dominar el estilo y los diferentes pasos... ",
  // "body": "En este curso aprenderás todo lo necesario para ser un gran bailador de Salsa, dominar el estilo y los diferentes pasos que te harán brillar en una pista de baile, aprenderás a interiorizar la salsa y vivir lo emocionante de bailar a toda velocidad. Vive la experiencia de dominar este estilo, al lado de los mejores exponentes de la salsa caleña, Viviana Vargas Campeona mundial de salsa y Brandon Pérez estandarte de la salsa Caleña ambos bailarines del show Delirio.Este curso se compone de 3 Módulos, 7 Horas, 70 Clases, 4 Niveles, 6 Videos por nivel.  (Módulos= Estilo Parejas, Estilo Mujeres, Estilo Hombres)",
  // "vsl": "",
  // "author": "",
  // "evaluacion": 4.6,
  // "date": "15-06-2023",
  // "categoria": "danzas y bailes",
  // "formato": "video curso",
  // "productor": "",
  // "idioma": "Español",
  // "pais": "",
  // "suscripcion": "único pago",
  // "comission": 44,
  // "cashback": 2,
  // "descuento": false,
  // "precio_regular": 40,
  // "precio": 40 } });

  // Query cursos
//   const cursos = await prisma.curso.findMany();

//   return {
//     props: {
//       cursos,
//     },
//   };
// }
