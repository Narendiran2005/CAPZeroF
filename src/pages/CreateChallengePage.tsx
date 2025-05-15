
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreateChallengeForm from "@/components/CreateChallengeForm";

const CreateChallengePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Create Challenge</h1>
          <CreateChallengeForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateChallengePage;
