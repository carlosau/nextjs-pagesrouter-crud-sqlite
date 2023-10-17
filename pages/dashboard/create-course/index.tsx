import CourseForm from "@/components/CourseForm";

const CreateCoursePage = () => {
    const handleResult = () => {
        console.log('Course created successfully')
    } 

  return (
    <main className="bg-slate-100 min-h-screen p-4">
      <div>
      <h1 className="text-center p-10 font-bold">Create a New Course By Admin</h1>
      <CourseForm onSubmit={handleResult} />
    </div>
    </main>
  );
};

export default CreateCoursePage;
