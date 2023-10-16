import CourseForm from "@/components/CourseForm";

const CreateCoursePage = () => {
    const handleResult = () => {
        console.log('OK OK OK OK OK')
    } 

  return (
    <div>
      <h1 className="text-center p-10 font-bold">Create a New Course By Admin</h1>
      <CourseForm onSubmit={handleResult} />
    </div>
  );
};

export default CreateCoursePage;
