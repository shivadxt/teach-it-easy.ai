import { useMemo, useState } from "react";

const teachers = [
  {
    id: "maya",
    name: "Maya Chen",
    role: "Maths · Calculus & Algebra",
    subject: "Mathematics",
    rating: "4.9",
    lessons: "1.2k",
    experience: "8 years teaching",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=720&q=85",
    color: "lavender",
    badge: "Top rated",
    intro: "I make the tricky bits feel like the obvious bits. One clear step at a time.",
    notes: [
      { title: "Limits, made simple", detail: "A visual guide to limits and continuity", type: "12 pages", icon: "file" },
      { title: "Derivative cheat sheet", detail: "Rules, examples & common pitfalls", type: "6 pages", icon: "spark" },
      { title: "Integration practice set", detail: "18 worked problems with solutions", type: "Worksheet", icon: "file" },
    ],
    videos: [
      { title: "The intuition behind derivatives", detail: "Calculus · 12 min", query: "intuitive introduction to derivatives calculus" },
      { title: "Integration by parts, step by step", detail: "Calculus · 18 min", query: "integration by parts worked examples calculus" },
    ],
  },
  {
    id: "jordan",
    name: "Jordan Ellis",
    role: "Physics · Mechanics & Waves",
    subject: "Physics",
    rating: "5.0",
    lessons: "860",
    experience: "6 years teaching",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=720&q=85",
    color: "peach",
    badge: "Student favourite",
    intro: "Physics is all around us. Let’s use real-world examples to make it click.",
    notes: [
      { title: "Newton’s laws in real life", detail: "Free-body diagrams without the fuss", type: "9 pages", icon: "spark" },
      { title: "Motion & kinematics", detail: "Equations, graphs and examples", type: "11 pages", icon: "file" },
      { title: "Waves quick reference", detail: "A compact revision guide", type: "4 pages", icon: "file" },
    ],
    videos: [
      { title: "Free-body diagrams you can actually use", detail: "Mechanics · 14 min", query: "physics free body diagrams beginner tutorial" },
      { title: "How waves carry energy", detail: "Waves · 10 min", query: "physics waves energy explained" },
    ],
  },
  {
    id: "amira",
    name: "Amira Hassan",
    role: "Biology · Cells & Genetics",
    subject: "Biology",
    rating: "4.9",
    lessons: "940",
    experience: "7 years teaching",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=720&q=85",
    color: "mint",
    badge: "Clear explanations",
    intro: "Big ideas, tiny steps. We’ll connect the details to the bigger picture.",
    notes: [
      { title: "Cell biology, mapped out", detail: "Organelles, functions & diagrams", type: "10 pages", icon: "file" },
      { title: "Genetics vocabulary guide", detail: "The key terms, explained simply", type: "5 pages", icon: "spark" },
      { title: "DNA replication notes", detail: "A visual, step-by-step overview", type: "8 pages", icon: "file" },
    ],
    videos: [
      { title: "DNA replication from start to finish", detail: "Genetics · 16 min", query: "DNA replication explained biology" },
      { title: "A tour inside the cell", detail: "Cell biology · 11 min", query: "cell organelles explained biology" },
    ],
  },
  {
    id: "leo",
    name: "Leo Park",
    role: "Chemistry · Organic & Physical",
    subject: "Chemistry",
    rating: "4.8",
    lessons: "720",
    experience: "5 years teaching",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&q=85",
    color: "blue",
    badge: "Exam specialist",
    intro: "Let’s make chemistry less memorise-and-hope, more understand-and-solve.",
    notes: [
      { title: "Organic reactions at a glance", detail: "A pathway map for common reactions", type: "7 pages", icon: "spark" },
      { title: "Moles & equations workbook", detail: "Guided practice with answers", type: "Worksheet", icon: "file" },
      { title: "Bonding & structure", detail: "From ionic bonds to intermolecular forces", type: "9 pages", icon: "file" },
    ],
    videos: [
      { title: "Organic mechanisms made visual", detail: "Organic chemistry · 15 min", query: "organic chemistry reaction mechanisms explained" },
      { title: "The mole concept, clearly explained", detail: "Physical chemistry · 13 min", query: "mole concept chemistry explained" },
    ],
  },
];

const subjects = [
  { name: "All subjects", icon: "grid" },
  { name: "Mathematics", icon: "math" },
  { name: "Physics", icon: "atom" },
  { name: "Biology", icon: "leaf" },
  { name: "Chemistry", icon: "flask" },
];

function Icon({ name, size = 18, stroke = 1.8 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
    math: <><path d="M5 5h14M5 12h14M5 19h14" /><path d="M8 2v6M16 9v6M8 16v6" /></>,
    atom: <><circle cx="12" cy="12" r="1" /><path d="M20.2 15.2c-1.8 3.1-8.1 2.3-12.1-.1S2.2 9.3 4 6.2s8.1-2.3 12.1.1 5.9 5.8 4.1 8.9Z" /><path d="M15.2 20.2c-3.1 1.8-6.4-3.6-8.9-7.8S3.8 4.6 6.9 2.8s6.4 3.6 8.9 7.8 2.5 7.8-.6 9.6Z" /></>,
    leaf: <><path d="M20.5 3.5C11 3.5 4 7 4 14.5A6.5 6.5 0 0 0 10.5 21C18 21 20.5 13 20.5 3.5Z" /><path d="M3 21c3-5 7-8 12-10" /></>,
    flask: <><path d="M9 3h6M10 3v7l-5.4 8.2A2.5 2.5 0 0 0 6.7 22h10.6a2.5 2.5 0 0 0 2.1-3.8L14 10V3" /><path d="M8 15h8" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" /><path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20M9 7h6" /></>,
    play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
  };
  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}

function App() {
  const [activeSubject, setActiveSubject] = useState("All subjects");
  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);
  const [resourceTab, setResourceTab] = useState("Notes");
  const [noteModal, setNoteModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hi there! 👋 I’m the Teach It Easy assistant. Chat support will be live soon — leave a message and we’ll be ready to help." },
  ]);

  const visibleTeachers = useMemo(() => teachers.filter((teacher) => {
    const subjectMatch = activeSubject === "All subjects" || teacher.subject === activeSubject;
    const searchMatch = (teacher.name + teacher.subject + teacher.role + teacher.intro).toLowerCase().includes(search.toLowerCase());
    return subjectMatch && searchMatch;
  }), [activeSubject, search]);

  function chooseTeacher(teacher) {
    setSelectedTeacher(teacher);
    setResourceTab("Notes");
  }

  function sendChatMessage(event) {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message) return;
    setChatMessages((current) => [
      ...current,
      { from: "you", text: message },
      { from: "bot", text: "Thanks for reaching out! Our chat assistant will be live soon. In the meantime, explore the teachers, notes, and videos on this page. 🌱" },
    ]);
    setChatInput("");
  }

  const resourceList = resourceTab === "Notes" ? selectedTeacher.notes : selectedTeacher.videos;

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Teach It Easy home">
          <span className="brand-mark"><Icon name="book" size={21} /></span>
          <span>teach it <b>easy</b><i>.</i></span>
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <a href="#teachers" onClick={() => setMenuOpen(false)}>Find a teacher</a>
          <a href="#resources" onClick={() => setMenuOpen(false)}>Study resources</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
        </nav>
        <div className="nav-actions">
          <button className="signin-button" onClick={() => setNoteModal({ kind: "info", title: "Welcome to Teach It Easy", body: "Student accounts and teacher profiles will be connected when the platform backend is ready." })}>Log in</button>
          <button className="join-button" onClick={() => setNoteModal({ kind: "info", title: "Start learning", body: "Sign-up will be available when student accounts are connected. For now, explore the sample teacher library below." })}>Get started <Icon name="arrow" size={15} /></button>
        </div>
        <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT “OH, I GET IT” MOMENT</div>
            <h1>Good teachers make<br />hard things <em>click.</em></h1>
            <p className="hero-text">Meet the teacher who gets how you learn. Find clear notes, helpful videos, and a better way through every subject.</p>
            <a className="hero-cta" href="#teachers">Find your teacher <span><Icon name="arrow" size={17} /></span></a>
            <div className="social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <img src={teachers[0].image} alt="" />
                <img src={teachers[1].image} alt="" />
                <img src={teachers[2].image} alt="" />
                <span>+</span>
              </div>
              <div><b>Learning feels better together.</b><small>Meet your people, find your pace.</small></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-sun" />
            <div className="hero-note note-top"><span className="note-icon note-icon-yellow"><Icon name="spark" size={17} /></span><div><b>Small steps.</b><small>Big “I got this.”</small></div></div>
            <div className="hero-board">
              <div className="board-top"><span>MONDAY, 9:41 AM</span><span className="board-live"><i /> LIVE LESSON</span></div>
              <div className="board-equation"><span className="equation-label">LET’S SOLVE THIS</span><div>f(x) <b>=</b> <span className="equation-mark">∫</span> x² dx</div></div>
              <div className="board-steps"><span>01</span><b>Break it into pieces</b><span className="step-check"><Icon name="check" size={15} /></span></div>
              <div className="board-steps"><span>02</span><b>Make the connection</b><span className="step-check"><Icon name="check" size={15} /></span></div>
              <div className="board-footer"><div className="board-avatar">MC</div><div><b>Maya Chen</b><small>Maths · 8 years teaching</small></div><span className="board-rating"><Icon name="star" size={13} /> 4.9</span></div>
            </div>
            <div className="hero-note note-bottom"><span className="note-icon note-icon-mint"><Icon name="play" size={17} /></span><div><b>Learn at your pace</b><small>Notes + videos, all in one place</small></div></div>
            <div className="scribble">it clicks! <span>↗</span></div>
          </div>
          <div className="hero-bottomline"><span>LEARN A LITTLE. GET A LOT.</span><span className="bottomline-rule" /><span>MADE FOR CURIOUS MINDS <span className="bottom-heart">✳</span></span></div>
        </section>

        <section className="browse-section" id="teachers">
          <div className="section-heading">
            <div><div className="section-kicker">THE RIGHT PERSON CHANGES EVERYTHING</div><h2>Find your kind of <em>teacher.</em></h2></div>
            <p>Real people. Clear explanations.<br />A learning style that feels like yours.</p>
          </div>
          <div className="browse-controls">
            <label className="search-box">
              <Icon name="search" size={19} />
              <input aria-label="Search teachers or subjects" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try “calculus” or “Maya”" />
              <kbd>⌘ K</kbd>
            </label>
            <div className="subject-filter" role="group" aria-label="Filter teachers by subject">
              {subjects.map((subject) => (
                <button key={subject.name} className={activeSubject === subject.name ? "subject-chip active" : "subject-chip"} onClick={() => setActiveSubject(subject.name)}>
                  <Icon name={subject.icon} size={15} /> {subject.name}
                </button>
              ))}
            </div>
          </div>

          <div className="teacher-layout">
            <div className="teacher-list">
              <div className="teacher-list-top"><span>{visibleTeachers.length} TEACHERS TO GET YOU THERE</span><button onClick={() => { setActiveSubject("All subjects"); setSearch(""); }}>Browse all <Icon name="arrow" size={14} /></button></div>
              {visibleTeachers.length ? visibleTeachers.map((teacher) => (
                <button key={teacher.id} className={selectedTeacher.id === teacher.id ? "teacher-card selected" : "teacher-card"} onClick={() => chooseTeacher(teacher)}>
                  <span className={"teacher-photo " + teacher.color}><img src={teacher.image} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /><span className="photo-initials">{teacher.name.split(" ").map((part) => part[0]).join("")}</span></span>
                  <span className="teacher-info"><span className="teacher-badge">{teacher.badge}</span><b className="teacher-name">{teacher.name}</b><span className="teacher-role">{teacher.role}</span><span className="teacher-meta"><span><Icon name="star" size={13} /> {teacher.rating}</span><i /> {teacher.experience}</span></span>
                  <span className="teacher-arrow"><Icon name="arrow" size={17} /></span>
                </button>
              )) : <div className="empty-search"><div className="empty-icon"><Icon name="search" size={22} /></div><b>No teachers found just yet.</b><span>Try another name or subject.</span><button onClick={() => { setActiveSubject("All subjects"); setSearch(""); }}>Clear filters</button></div>}
            </div>
            <aside className="teacher-detail" aria-live="polite">
              <div className="detail-header">
                <div className={"detail-photo " + selectedTeacher.color}><img src={selectedTeacher.image} alt={selectedTeacher.name} onError={(event) => { event.currentTarget.style.display = "none"; }} /><span>{selectedTeacher.name.split(" ").map((part) => part[0]).join("")}</span><i className="online-dot" /></div>
                <div className="detail-heading"><span className="detail-label">YOUR TEACHER</span><h3>{selectedTeacher.name}</h3><p>{selectedTeacher.role}</p></div>
                <div className="detail-rating"><Icon name="star" size={15} /><b>{selectedTeacher.rating}</b><small>({selectedTeacher.lessons} lessons)</small></div>
              </div>
              <p className="teacher-intro">“{selectedTeacher.intro}”</p>
              <div className="detail-divider" />
              <div className="resource-heading" id="resources"><div><span className="detail-label">A GOOD PLACE TO START</span><h4>Learn with {selectedTeacher.name.split(" ")[0]}</h4></div><span className="resource-count">{selectedTeacher.notes.length + selectedTeacher.videos.length} resources</span></div>
              <div className="resource-tabs" role="tablist" aria-label="Teacher resources">
                <button role="tab" aria-selected={resourceTab === "Notes"} className={resourceTab === "Notes" ? "resource-tab active" : "resource-tab"} onClick={() => setResourceTab("Notes")}><Icon name="book" size={16} /> Notes <span>{selectedTeacher.notes.length}</span></button>
                <button role="tab" aria-selected={resourceTab === "Videos"} className={resourceTab === "Videos" ? "resource-tab active" : "resource-tab"} onClick={() => setResourceTab("Videos")}><Icon name="play" size={16} /> YouTube videos <span>{selectedTeacher.videos.length}</span></button>
              </div>
              <div className="resource-list">
                {resourceList.map((resource, index) => (
                  <button key={resource.title} className="resource-item" onClick={() => setNoteModal(resourceTab === "Notes" ? { kind: "note", resource, teacher: selectedTeacher } : { kind: "video", resource, teacher: selectedTeacher })}>
                    <span className={"resource-icon " + (resourceTab === "Notes" ? "notes-icon" : "video-icon")}><Icon name={resourceTab === "Notes" ? resource.icon : "play"} size={17} /></span>
                    <span className="resource-copy"><b>{resource.title}</b><small>{resource.detail}</small></span>
                    <span className="resource-type">{resourceTab === "Notes" ? resource.type : "WATCH"}<Icon name="arrow" size={14} /></span>
                  </button>
                ))}
              </div>
              <div className="resource-footnote"><span><Icon name="spark" size={14} /></span> A little help goes a long way.</div>
            </aside>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-heading"><div className="section-kicker">NO MORE LEARNING ALONE</div><h2>Your next step is <em>easy.</em></h2><p>Less searching. More “wait, that makes sense.”</p></div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><span className="step-illustration illustration-find"><Icon name="search" size={26} /><span>?</span></span><h3>Find your person</h3><p>Browse teachers by subject and teaching style until someone feels right.</p><span className="step-connector" /></article>
            <article className="step-card"><span className="step-number">02</span><span className="step-illustration illustration-learn"><Icon name="book" size={26} /><span>✦</span></span><h3>Pick your path</h3><p>Open a teacher’s notes or queue up a video lesson for the topic you need.</p><span className="step-connector" /></article>
            <article className="step-card"><span className="step-number">03</span><span className="step-illustration illustration-grow"><Icon name="spark" size={26} /><span>✓</span></span><h3>Feel it click</h3><p>Learn at your own pace, revisit tricky bits, and see how far you’ve come.</p></article>
          </div>
        </section>

        <section className="closing-cta">
          <div className="closing-spark spark-a">✳</div><div className="closing-spark spark-b">✦</div>
          <div><span className="section-kicker">YOUR NEXT BIG “AHA” IS OUT THERE</span><h2>Let’s make learning<br /><em>feel easy.</em></h2><p>Find a teacher who makes the hard stuff make sense.</p></div>
          <a href="#teachers" className="closing-button">Meet your teacher <Icon name="arrow" size={17} /></a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Icon name="book" size={19} /></span><span>teach it <b>easy</b><i>.</i></span></a>
        <span className="footer-tagline">A little help goes a long way.</span>
        <div className="footer-links"><a href="#teachers">Teachers</a><a href="#resources">Resources</a><a href="#how-it-works">How it works</a></div>
        <span className="copyright">© 2025 Teach It Easy</span>
      </footer>

      <div className="chat-widget">
        {chatOpen && <section className="chat-panel" aria-label="Teach It Easy chat">
          <div className="chat-header">
            <span className="chat-avatar"><Icon name="spark" size={18} /></span>
            <div><b>Teach It Easy</b><small><i /> We’ll be live soon</small></div>
            <button className="chat-close" aria-label="Close chat" onClick={() => setChatOpen(false)}><Icon name="close" size={17} /></button>
          </div>
          <div className="chat-messages" aria-live="polite">
            {chatMessages.map((message, index) => <div key={index} className={`chat-message ${message.from === "you" ? "from-you" : "from-bot"}`}>{message.text}</div>)}
          </div>
          <form className="chat-form" onSubmit={sendChatMessage}>
            <label className="sr-only" htmlFor="chat-input">Message</label>
            <input id="chat-input" value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Write a message…" />
            <button type="submit" aria-label="Send message" disabled={!chatInput.trim()}><Icon name="arrow" size={17} /></button>
          </form>
          <div className="chat-footnote">Replies are a preview — live support is coming soon.</div>
        </section>}
        <button className="chat-launcher" aria-label={chatOpen ? "Close chat" : "Open chat"} aria-expanded={chatOpen} onClick={() => setChatOpen(!chatOpen)}>
          {chatOpen ? <Icon name="close" size={22} /> : <><Icon name="spark" size={21} /><span>Chat with us</span></>}
        </button>
      </div>

      {noteModal && <div className="modal-backdrop" role="presentation" onClick={() => setNoteModal(null)}>
        <section className="resource-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
          <button className="modal-close" aria-label="Close dialog" onClick={() => setNoteModal(null)}><Icon name="close" size={19} /></button>
          {noteModal.kind === "note" ? <>
            <span className="modal-symbol"><Icon name="book" size={22} /></span><span className="detail-label">STUDY NOTES · {noteModal.teacher.subject.toUpperCase()}</span><h2 id="modal-title">{noteModal.resource.title}</h2><p className="modal-subtitle">{noteModal.resource.detail} · by {noteModal.teacher.name}</p>
            <div className="note-preview"><p>Start with the idea, then build the steps.</p><ol><li>Write down what you know and what you’re trying to find.</li><li>Choose the rule or concept that connects them.</li><li>Work through one small step at a time, and check your result.</li></ol><p className="note-callout"><Icon name="spark" size={16} /> Try explaining the idea in your own words. If you can teach it, you understand it.</p></div>
            <button className="modal-primary" onClick={() => setNoteModal(null)}>Got it <Icon name="check" size={16} /></button>
          </> : noteModal.kind === "video" ? <>
            <span className="modal-symbol video-symbol"><Icon name="play" size={22} /></span><span className="detail-label">VIDEO LESSON · {noteModal.teacher.subject.toUpperCase()}</span><h2 id="modal-title">{noteModal.resource.title}</h2><p className="modal-subtitle">{noteModal.resource.detail} · selected for you by {noteModal.teacher.name}</p>
            <div className="video-preview"><span><Icon name="play" size={26} /></span><b>Find this lesson on YouTube</b><small>Opens YouTube search results for this topic.</small></div>
            <a className="modal-primary modal-link" href={"https://www.youtube.com/results?search_query=" + encodeURIComponent(noteModal.resource.query)} target="_blank" rel="noreferrer">Open YouTube <Icon name="arrow" size={16} /></a>
          </> : <>
            <span className="modal-symbol"><Icon name="spark" size={22} /></span><span className="detail-label">TEACH IT EASY</span><h2 id="modal-title">{noteModal.title}</h2><p className="modal-subtitle">{noteModal.body}</p><button className="modal-primary" onClick={() => setNoteModal(null)}>Sounds good <Icon name="check" size={16} /></button>
          </>}
        </section>
      </div>}
      <div className="demo-disclaimer">SAMPLE EXPERIENCE · Teacher profiles and learning materials are demo content for the project preview.</div>
    </div>
  );
}

export default App;
