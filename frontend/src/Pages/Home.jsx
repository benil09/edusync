import { useUserStore } from "../store/useUserStore.js";

function Home() {
  const { user } = useUserStore();
  return (
    <div className="min-h-screen bg-theme text-theme-1 transition-colors duration-300 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20  text-theme-1">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Welcome <span className="text-primary">{user ? user.firstName : "Guest"} </span> to edu<span className="text-primary">Connect</span>
        </h2>
        <p className="max-w-2xl text-lg mb-8">
          A unified student collaboration hub where you can share resources,
          connect with peers, and stay updated with college activities.
        </p>
        <div className="flex gap-4">
          <a
            href="/signup"
            className="px-6 py-3 bg-primary text-accent font-semibold rounded-lg shadow-md hover:bg-hover transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-6 py-3 border border-theme-1 text-theme-1 font-semibold rounded-lg hover:bg-secondary hover:text-accent transition"
          >
            Login
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 flex flex-col items-center gap-12">
        <h3 className="text-3xl font-bold text-theme-1">Why edu<span className="text-primary">Connect</span>?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
          <div className="p-6 bg-secondary rounded-lg shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-2 text-theme-1">
              📚 Resource Sharing
            </h4>
            <p className="text-theme-2">
              Upload and access notes, assignments, and previous year papers
              easily.
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-lg shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-2 text-theme-1">
              💬 Community
            </h4>
            <p className="text-theme-2">
              Engage with peers, share experiences, and collaborate on projects.
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-lg shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-2 text-theme-1">
              📢 Announcements
            </h4>
            <p className="text-theme-2">
              Stay updated with important college news and deadlines in
              real-time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
