import HomepageScripts from "./homepage-scripts";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header>
        <div className="wrap">
          <nav aria-label="Primary">
            <a className="brand" href="#main">
              <img src="/assets/community-logo.jpg" alt="" />
              <span>Salesforce Architect Group · Noida</span>
            </a>
            <div className="nav-links" id="navLinks">
              <a className="l" href="#about">About</a>
              <a className="l" href="#lead">Leadership</a>
              <a className="l" href="#volunteers">Volunteers</a>
              <a className="l" href="#events">Events</a>
              <a className="l" href="#poster">Poster Studio</a>
              <a className="btn" id="navQuiz" href="/quiz/">Take a Quiz</a>
            </div>
            <button
              className="icon-btn"
              id="themeToggle"
              type="button"
              aria-label="Switch to dark theme"
              aria-pressed="false"
              title="Toggle color theme"
            >
              <span id="themeIcon" aria-hidden="true">☾</span>
            </button>
            <button
              className="icon-btn nav-toggle"
              id="navToggle"
              type="button"
              aria-expanded="false"
              aria-controls="navLinks"
              aria-label="Open navigation menu"
            >
              <span aria-hidden="true">☰</span>
            </button>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="wrap hgrid">
            <div>
              <span className="eyebrow">Salesforce Architect Group · Noida</span>
              <h1>Think like an architect. Grow with Noida’s Trailblazers.</h1>
              <p className="lede">
                A non-profit community for Salesforce professionals in Noida and
                Delhi NCR who care about architecture, solution design and
                building solutions that scale.
              </p>
              <div className="cta">
                <a className="btn" href="#events">Explore Events</a>
                <a className="btn soft" href="#poster">Create Event Frame</a>
              </div>
            </div>
            <div className="collage">
              <img
                className="c1"
                src="/assets/kickoff-group.jpg"
                alt="Attendees of the Noida kickoff event standing together in the venue"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="c2"
                src="/assets/kickoff-speaker.jpg"
                alt="Speaker presenting at the kickoff"
                loading="lazy"
                decoding="async"
              />
              <div className="pill">Kickoff 2026 · Noida</div>
            </div>
          </div>
        </section>

        <section id="about" className="cloud">
          <div className="wrap two">
            <div>
              <span className="eyebrow">About</span>
              <h2>A place to sharpen your architecture thinking</h2>
              <p>
                We help aspiring and experienced architects grow through
                knowledge sharing, real-world use cases, technical discussions,
                hands-on sessions and community collaboration.
              </p>
              <p>
                Preparing for an architect role, working toward certifications,
                or just want to improve your craft? Learn, share and collaborate
                with fellow Trailblazers.
              </p>
            </div>
            <div style={{ paddingTop: 30 }}>
              <h3 style={{ marginBottom: 18 }}>What we explore</h3>
              <div className="pills" id="topics" role="group" aria-label="Topics" />
              <p className="tdesc" id="tdesc" aria-live="polite" />
            </div>
          </div>
        </section>

        <section id="lead">
          <div className="wrap">
            <div className="leadcard">
              <img
                src="/assets/leader-sunny-patwa.jpg"
                alt="Sunny Patwa, Community Group Leader"
                loading="lazy"
                decoding="async"
              />
              <div>
                <span className="eyebrow">Community Group Leader</span>
                <h2>Sunny Patwa</h2>
                <p>
                  Founder &amp; CEO of Ciphermetic Consulting Private Limited
                  and CloudGyata EdTech Private Limited. Salesforce Partner,
                  Consultant &amp; Solutions Architect, TIC Ambassador,
                  Salesforce Trainer, Journey to Salesforce Mentor and
                  community speaker.
                </p>
                <div className="creds">
                  <div><b>13x</b><span>Salesforce Certified</span></div>
                  <div><b>7x</b><span>Copado</span></div>
                  <div><b>4x</b><span>Ranger</span></div>
                  <div><b>50,000+</b><span>Empowered</span></div>
                </div>
                <blockquote>
                  Create an open environment where people learn together and
                  grow through meaningful contribution.
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section id="volunteers" style={{ paddingTop: 24 }}>
          <div className="wrap">
            <span className="eyebrow">Volunteers</span>
            <h2>The people behind every event</h2>
            <p>
              Every event is a collective effort, from planning and
              coordination to welcoming participants.
            </p>
            <div className="vols" id="vols" />
          </div>
        </section>

        <section id="events" className="cloud">
          <div className="wrap">
            <span className="eyebrow">Events</span>
            <h2>What’s next, and what you missed</h2>
            <p>
              Upcoming sessions appear here first. Past events stay below so
              you can see what the community has been up to.
            </p>
            <h3 style={{ marginTop: 44 }}>Upcoming</h3>
            <div id="upcoming" />
            <h3 style={{ marginTop: 72 }}>Past events</h3>
            <div className="past">
              <img
                className="poster"
                src="/assets/kickoff-poster.jpg"
                alt="Kickoff event poster: CTA Journey and Roadmap, Ten Avatars, One Mission"
                loading="lazy"
                decoding="async"
              />
              <div>
                <span className="eyebrow">Kickoff</span>
                <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
                  CTA Journey &amp; Roadmap, Ten Avatars, One Mission: Quality,
                  FDE &amp; Integration Architecting
                </h2>
                <ul className="meta">
                  <li><b>When:</b> Saturday, 31 October 2026, 11:00 AM to 4:00 PM IST</li>
                  <li><b>Where:</b> Moti Mahal Delux – Tandoori Trail, H-224K, Sector 63, Noida 201309</li>
                  <li><b>Included:</b> Expert talks, networking, knowledge sharing, breakfast and lunch</li>
                </ul>
                <div className="gal">
                  <img src="/assets/kickoff-group.jpg" alt="Group photo of everyone at the kickoff" loading="lazy" decoding="async" />
                  <img src="/assets/kickoff-speaker.jpg" alt="Speaker presenting to the audience at the kickoff" loading="lazy" decoding="async" />
                  <img src="/assets/kickoff-audience.jpg" alt="Audience watching a session on the screen" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="poster">
          <div className="wrap">
            <span className="eyebrow">Poster Studio</span>
            <h2>Wear the community frame</h2>
            <p>
              Pick a frame, add your photo, then download and share. It all
              happens in your browser, so your photo is never uploaded.
            </p>
            <div className="studio">
              <div className="stage">
                <canvas id="pc" width="1080" height="1080" aria-label="Frame preview" />
              </div>
              <div className="panel">
                <div className="step">
                  <h3><i>1</i>Choose a frame</h3>
                  <p className="sel">Selected: <b id="fname">Attending</b></p>
                  <div className="frames" id="frames" role="radiogroup" aria-label="Choose a frame" />
                </div>
                <div className="step">
                  <h3><i>2</i>Upload &amp; adjust your photo</h3>
                  <label className="drop" id="dz">
                    <input id="pf" type="file" accept="image/*" />
                    <b>Drop a photo here, or browse</b>
                    <small>JPG or PNG, stays on your device</small>
                  </label>
                  <label className="fld">
                    Zoom
                    <input id="pz" type="range" min="1" max="3" step="0.01" defaultValue="1" disabled />
                  </label>
                  <p className="hint">Drag the photo in the preview to reposition it.</p>
                </div>
                <div className="step">
                  <h3><i>3</i>Add your name &amp; share</h3>
                  <label className="fld">
                    Your name
                    <input id="pn" type="text" maxLength="40" placeholder="e.g. Dev Mishra" autoComplete="name" />
                  </label>
                  <button id="pd" className="btn big" type="button">Download Image</button>
                  <div className="fld">
                    Caption to share
                    <textarea id="pcap" className="cap" readOnly />
                    <div className="share">
                      <button id="pcopy" className="btn soft sm" type="button">Copy Caption</button>
                      <a id="sl" className="btn soft sm" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <a id="sw" className="btn soft sm" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                      <a id="sx" className="btn soft sm" target="_blank" rel="noopener noreferrer">X</a>
                    </div>
                  </div>
                  <p className="hint">Attach the downloaded image when you post.</p>
                </div>
              </div>
            </div>
            <div id="twv" hidden>
              <div className="twbar">
                <button type="button" className="btn soft sm" id="twback">← Back to our frames</button>
                <a className="btn sm" id="twopen" target="_blank" rel="noopener noreferrer">Open on Twibify</a>
              </div>
              <iframe id="twf" title="Twibify campaign" src="about:blank" loading="lazy" />
              <p className="hint">
                If the Twibify page doesn’t appear above, use “Open on Twibify”.
                Some sites don’t allow embedding.
              </p>
            </div>
          </div>
        </section>

        <section id="quiz" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="quiz">
              <div>
                <span className="eyebrow">SFAG Quiz</span>
                <h2>Put your architecture thinking to the test</h2>
                <p style={{ margin: 0 }}>
                  Join live, game-style quizzes and practise architecture
                  topics with the Salesforce Architect Group community.
                </p>
              </div>
              <a className="btn" id="quizBtn" href="/quiz/">Explore SFAG Quiz</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap row">
          <div>
            <b>Salesforce Architect Group · Noida, India</b><br />
            Noida, Uttar Pradesh 201301<br />
            Events services · Non-profit
          </div>
          <div>
            <b>Contact</b><br />
            <a href="tel:9211627211">9211627211</a><br />
            <a href="/admin/login/">Quiz admin sign in</a>
          </div>
          <div style={{ maxWidth: "34ch" }}>
            Salesforce, Trailhead and Ohana are brands of Salesforce. This is
            a community-run site.
          </div>
        </div>
      </footer>
      <HomepageScripts />
    </>
  );
}
