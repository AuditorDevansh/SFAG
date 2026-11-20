import "./quiz.css";

const quizServiceUrl = (
  process.env.NEXT_PUBLIC_QUIZ_SERVICE_URL || "https://app.jovvix.com"
).replace(/\/+$/, "");

export const metadata = {
  title: "SFAG Quiz | Salesforce Architect Group Noida",
  description:
    "Practise Salesforce architecture, join a live community quiz, or explore public games with the Salesforce Architect Group · Noida.",
  openGraph: {
    title: "SFAG Quiz | Salesforce Architect Group Noida",
    description:
      "Learn, connect, and put your Salesforce architecture knowledge to the test.",
  },
};

export default function QuizPage() {
  return (
    <main className="sfag-quiz">
      <a className="skip-link" href="#quiz-main">Skip to content</a>
      <header className="sfag-quiz-header">
        <a className="brand" href="/">
          <img src="/assets/community-logo.jpg" alt="" />
          <span>Salesforce Architect Group · Noida</span>
        </a>
        <a className="btn soft" href="/">Back to community</a>
      </header>

      <section id="quiz-main" className="sfag-quiz-hero">
        <div className="sfag-quiz-copy">
          <span className="eyebrow">Learn · Connect · Build</span>
          <h1>SFAG Quiz</h1>
          <p className="lede">
            Make architecture practice a team sport. Challenge yourself,
            sharpen your Salesforce knowledge, and learn alongside the Noida
            Trailblazer community.
          </p>
          <a
            className="btn"
            href={`${quizServiceUrl}/#public-quiz`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore community quizzes
          </a>
        </div>

        <div className="sfag-quiz-join">
          <span className="eyebrow">Joining an event?</span>
          <h2>Enter your quiz code</h2>
          <p>Ask your host for the six-digit code to join their live game.</p>
          <form
            action={`${quizServiceUrl}/join`}
            method="get"
            target="_blank"
            rel="noreferrer"
          >
            <label htmlFor="quiz-code">Six-digit invitation code</label>
            <input
              id="quiz-code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="000 000"
              required
            />
            <button className="btn" type="submit">Join the live quiz</button>
          </form>
          <p className="sfag-quiz-note">
            The quiz opens in a new tab. Your host’s code and player name are
            handled by the quiz service.
          </p>
        </div>
      </section>

      <section className="sfag-quiz-features" aria-label="Ways to play">
        <article>
          <span aria-hidden="true">01</span>
          <h2>Practise your craft</h2>
          <p>
            Explore public quizzes and build confidence across architecture,
            integration, data, and more.
          </p>
        </article>
        <article>
          <span aria-hidden="true">02</span>
          <h2>Learn together</h2>
          <p>
            Join a live community session, answer in real time, and compare
            ideas on the leaderboard.
          </p>
        </article>
        <article>
          <span aria-hidden="true">03</span>
          <h2>Host a session</h2>
          <p>
            Bring a group together with interactive quizzes for meetups,
            workshops, and knowledge sharing.
          </p>
        </article>
      </section>

      <footer className="sfag-quiz-footer">
        <a href="/">← Salesforce Architect Group · Noida</a>
        <a href="/admin/login/">Admin sign in</a>
        <span>Live quiz sessions are powered by our existing quiz service.</span>
      </footer>
    </main>
  );
}
