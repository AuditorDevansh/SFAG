import "../admin.css";

const quizServiceUrl = (
  process.env.NEXT_PUBLIC_QUIZ_SERVICE_URL || "https://app.jovvix.com"
).replace(/\/+$/, "");
const adminSignInUrl = `${quizServiceUrl}/account/login?returnTo=${encodeURIComponent(
  "/admin/quiz"
)}`;

export const metadata = {
  title: "Admin Sign In | SFAG Quiz",
  description:
    "Sign in securely to manage Salesforce Architect Group quizzes and live sessions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <main className="sfag-admin">
      <a className="skip-link" href="#admin-login">Skip to content</a>
      <header className="sfag-admin-header">
        <a className="brand" href="/">
          <img src="/assets/community-logo.jpg" alt="" />
          <span>Salesforce Architect Group · Noida</span>
        </a>
        <a className="btn soft" href="/admin/">Admin dashboard</a>
      </header>

      <section id="admin-login" className="sfag-admin-main">
        <div className="sfag-admin-login">
          <span className="eyebrow">SFAG Quiz · Admin access</span>
          <h1>Sign in to manage your quizzes</h1>
          <p>
            Continue to the quiz platform to sign in with your existing
            account. After sign-in, you will return to the quiz management
            dashboard.
          </p>
          <a
            className="btn"
            href={adminSignInUrl}
            rel="noopener noreferrer"
          >
            Continue to secure sign in
          </a>
          <p className="sfag-admin-security-note">
            Your password is entered only on the quiz platform. This SFAG
            website does not collect or store login credentials.
          </p>
        </div>
      </section>

      <footer className="sfag-admin-footer">
        <a href="/admin/">← Back to admin options</a>
        <a href="/">Salesforce Architect Group · Noida</a>
      </footer>
    </main>
  );
}
