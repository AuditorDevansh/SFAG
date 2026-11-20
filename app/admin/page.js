import "./admin.css";

const quizServiceUrl = (
  process.env.NEXT_PUBLIC_QUIZ_SERVICE_URL || "https://app.jovvix.com"
).replace(/\/+$/, "");

const managementOptions = [
  {
    number: "01",
    title: "Create a quiz",
    description:
      "Start a quiz, add questions, and choose whether it is private or public.",
    label: "Create quiz",
    path: "/admin/quiz/list-quiz?create=1",
  },
  {
    number: "02",
    title: "Generate with AI",
    description:
      "Draft quiz questions with the platform’s AI quiz-generation tools.",
    label: "Generate quiz",
    path: "/admin/quiz/list-quiz?generate=1",
  },
  {
    number: "03",
    title: "Manage my quizzes",
    description:
      "Find, edit, organize, and launch quizzes you have created.",
    label: "Open quiz library",
    path: "/admin/quiz/list-quiz",
  },
  {
    number: "04",
    title: "Live sessions",
    description:
      "Arrange quiz sessions and manage rooms for community events.",
    label: "Manage sessions",
    path: "/admin/arrange",
  },
  {
    number: "05",
    title: "Reports & analytics",
    description:
      "Review quiz results, participation, and room activity.",
    label: "View reports",
    path: "/admin/reports",
  },
  {
    number: "06",
    title: "Shared quizzes",
    description:
      "Manage quizzes you share and review quizzes shared with you.",
    label: "Open shared quizzes",
    path: "/admin/quiz/shared-quiz",
  },
  {
    number: "07",
    title: "Categories",
    description:
      "Organize public quizzes into categories for easier discovery.",
    label: "Manage categories",
    path: "/admin/categories",
  },
];

const signInUrl = `${quizServiceUrl}/account/login?returnTo=${encodeURIComponent(
  "/admin/quiz"
)}`;

export const metadata = {
  title: "SFAG Quiz Admin | Salesforce Architect Group Noida",
  description:
    "Sign in to create, manage, and review Salesforce Architect Group quizzes and live sessions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <main className="sfag-admin">
      <a className="skip-link" href="#admin-main">Skip to content</a>
      <header className="sfag-admin-header">
        <a className="brand" href="/">
          <img src="/assets/community-logo.jpg" alt="" />
          <span>Salesforce Architect Group · Noida</span>
        </a>
        <a className="btn soft" href="/quiz/">Back to SFAG Quiz</a>
      </header>

      <div id="admin-main" className="sfag-admin-main">
        <div className="sfag-admin-heading">
          <span className="eyebrow">Community tools</span>
          <h1>SFAG Quiz Admin</h1>
          <p>
            Create and manage quizzes, run live sessions, and review results
            for your community events.
          </p>
        </div>

        <section className="sfag-admin-auth" aria-label="Admin sign in">
          <div>
            <span className="eyebrow">Secure account access</span>
            <h2>Sign in before managing quizzes</h2>
            <p>
              Use your existing quiz-service account. Your login and account
              permissions are checked by the quiz platform.
            </p>
          </div>
          <a
            className="btn"
            href="/admin/login/"
            aria-label="Go to the SFAG Quiz admin sign-in page"
          >
            Admin sign in
          </a>
        </section>

        <section className="sfag-admin-grid" aria-label="Quiz management options">
          {managementOptions.map((option) => (
            <article className="sfag-admin-card" key={option.number}>
              <span>{option.number}</span>
              <h2>{option.title}</h2>
              <p>{option.description}</p>
              <a
                className="btn soft sm"
                href={`${quizServiceUrl}${option.path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {option.label}
              </a>
            </article>
          ))}
        </section>
      </div>

      <footer className="sfag-admin-footer">
        <a href="/">← Salesforce Architect Group · Noida</a>
        <span>
          Quiz creation and management require an account on the quiz service.
        </span>
      </footer>
    </main>
  );
}
