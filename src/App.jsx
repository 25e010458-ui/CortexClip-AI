import { useState } from "react";

const durations = [
  { label: "10 secs", value: 10 },
  { label: "30 secs", value: 30 },
  { label: "1 min", value: 60 },
  { label: "1 min 30 secs", value: 90 },
  { label: "2 mins", value: 120 }
];

function App() {
  const [page, setPage] = useState("welcome");

  const [profile, setProfile] = useState({
    name: "",
    dob: "",
    purpose: ""
  });

  const [style, setStyle] = useState("");
  const [duration, setDuration] = useState(null);

  const [videoPrompt, setVideoPrompt] = useState("");
  const [voicePrompt, setVoicePrompt] = useState("");

  const [credits, setCredits] = useState(50);

  function saveProfile() {
    if (!profile.name.trim()) return;

    localStorage.setItem(
      "cortexclip-profile",
      JSON.stringify(profile)
    );

    setPage("dashboard");
  }

  function startCreating() {
    setStyle("");
    setDuration(null);
    setVideoPrompt("");
    setVoicePrompt("");
    setPage("style");
  }

  function continueFromStyle() {
    if (!style) return;
    setPage("duration");
  }

  function continueFromDuration() {
    if (!duration) return;
    setPage("prompts");
  }

  function beginGeneration() {
    if (!videoPrompt.trim() || !voicePrompt.trim()) return;

    if (credits <= 0) {
      alert(
        "Oops! Your credits are over for today! Come back tomorrow for more credits."
      );
      return;
    }

    setCredits((current) => current - 1);
    setPage("generating");
  }

  return (
    <div className="app">
      <style>{styles}</style>

      {page === "welcome" && (
        <section className="screen welcome">
          <div className="glow glowOne"></div>
          <div className="glow glowTwo"></div>

          <div className="welcomeContent">
            <div className="logoMark">✦</div>

            <p className="eyebrow">AI VIDEO CREATOR</p>

            <h1>
              Cortex<span>Clip</span>
            </h1>

            <p className="tagline">
              Turn your imagination into moving pictures.
            </p>

            <button
              className="primaryButton"
              onClick={() => setPage("name")}
            >
              Let's Start
              <span>→</span>
            </button>
          </div>
        </section>
      )}

      {page === "name" && (
        <section className="screen">
          <div className="wizard">
            <StepNumber number="01" />

            <h2>What's your name?</h2>

            <p className="subtitle">
              Let's personalize your CortexClip experience.
            </p>

            <input
              autoFocus
              className="bigInput"
              placeholder="Enter your name"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && profile.name.trim()) {
                  setPage("dob");
                }
              }}
            />

            <button
              className="primaryButton"
              disabled={!profile.name.trim()}
              onClick={() => setPage("dob")}
            >
              Continue →
            </button>
          </div>
        </section>
      )}

      {page === "dob" && (
        <section className="screen">
          <div className="wizard">
            <StepNumber number="02" />

            <h2>When were you born?</h2>

            <p className="subtitle">
              This helps us personalize your experience.
            </p>

            <input
              className="bigInput"
              type="date"
              value={profile.dob}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  dob: e.target.value
                })
              }
            />

            <button
              className="primaryButton"
              onClick={() => setPage("purpose")}
            >
              Continue →
            </button>
          </div>
        </section>
      )}

      {page === "purpose" && (
        <section className="screen">
          <div className="wizard">
            <StepNumber number="03" />

            <h2>What will you use AI for?</h2>

            <p className="subtitle">
              Tell CortexClip what you want to create.
            </p>

            <textarea
              className="bigTextarea"
              placeholder="For example: school projects, stories, YouTube videos..."
              value={profile.purpose}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  purpose: e.target.value
                })
              }
            />

            <button
              className="primaryButton"
              onClick={saveProfile}
            >
              Enter CortexClip →
            </button>
          </div>
        </section>
      )}

      {page === "dashboard" && (
        <section className="dashboardScreen">
          <header className="topbar">
            <div className="brand">
              <div className="smallLogo">✦</div>
              <strong>CortexClip</strong>
            </div>

            <div className="credits">
              <span>⚡</span>
              {credits} credits today
            </div>
          </header>

          <main className="dashboard">
            <div className="heroText">
              <p className="eyebrow">WELCOME BACK</p>

              <h1>
                Hey {profile.name || "Creator"} 👋
              </h1>

              <p>
                What are you imagining today?
              </p>
            </div>

            <button
              className="createCard"
              onClick={startCreating}
            >
              <div className="createIcon">✦</div>

              <div>
                <h2>Create a Video</h2>
                <p>
                  Turn an idea into an AI-generated video.
                </p>
              </div>

              <span className="arrow">→</span>
            </button>

            <div className="infoGrid">
              <div className="infoCard">
                <span>⚡</span>
                <strong>{credits}</strong>
                <small>Daily credits</small>
              </div>

              <div className="infoCard">
                <span>🎬</span>
                <strong>2 min</strong>
                <small>Maximum video</small>
              </div>

              <div className="infoCard">
                <span>🔊</span>
                <strong>Audio</strong>
                <small>Matched to video</small>
              </div>
            </div>
          </main>
        </section>
      )}

      {page === "style" && (
        <section className="screen">
          <div className="wizard wide">
            <StepNumber number="01" />

            <h2>Animated or Realistic?</h2>

            <p className="subtitle">
              Choose the visual style for your entire video.
            </p>

            <div className="choiceGrid">
              <Choice
                selected={style === "animated"}
                icon="🎨"
                title="Animated"
                text="Stylized, illustrated and animated visuals."
                onClick={() => setStyle("animated")}
              />

              <Choice
                selected={style === "realistic"}
                icon="🎥"
                title="Realistic"
                text="Natural, cinematic and lifelike visuals."
                onClick={() => setStyle("realistic")}
              />
            </div>

            <button
              className="primaryButton"
              disabled={!style}
              onClick={continueFromStyle}
            >
              Continue →
            </button>
          </div>
        </section>
      )}

      {page === "duration" && (
        <section className="screen">
          <div className="wizard wide">
            <StepNumber number="02" />

            <h2>How long would you like your video to be?</h2>

            <p className="subtitle">
              CortexClip will automatically create the required
              short clips and combine them.
            </p>

            <div className="durationGrid">
              {durations.map((item) => (
                <button
                  key={item.value}
                  className={`durationCard ${
                    duration === item.value
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setDuration(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="primaryButton"
              disabled={!duration}
              onClick={continueFromDuration}
            >
              Continue →
            </button>
          </div>
        </section>
      )}

      {page === "prompts" && (
        <section className="screen">
          <div className="wizard promptWizard">
            <StepNumber number="03" />

            <h2>Describe your video</h2>

            <p className="subtitle">
              CortexClip will use your instructions to build
              the scenes and matching audio.
            </p>

            <label>VIDEO / SCENE PROMPT</label>

            <textarea
              className="promptBox"
              placeholder="Describe exactly what you want to see..."
              value={videoPrompt}
              onChange={(e) =>
                setVideoPrompt(e.target.value)
              }
            />

            <label>VOICE / SCRIPT PROMPT</label>

            <textarea
              className="promptBox"
              placeholder="Describe the narration, dialogue, voice or sound..."
              value={voicePrompt}
              onChange={(e) =>
                setVoicePrompt(e.target.value)
              }
            />

            <div className="summary">
              <span>
                {style === "animated"
                  ? "🎨 Animated"
                  : "🎥 Realistic"}
              </span>

              <span>
                ⏱️{" "}
                {duration === 60
                  ? "1 min"
                  : duration === 90
                  ? "1 min 30 secs"
                  : duration === 120
                  ? "2 mins"
                  : `${duration} secs`}
              </span>
            </div>

            <button
              className="primaryButton"
              disabled={
                !videoPrompt.trim() ||
                !voicePrompt.trim()
              }
              onClick={beginGeneration}
            >
              Create Video ✦
            </button>
          </div>
        </section>
      )}

      {page === "generating" && (
        <section className="screen">
          <div className="generation">
            <div className="loader">
              <div></div>
            </div>

            <p className="eyebrow">CORTEXCLIP AI</p>

            <h2>Creating your video...</h2>

            <p>
              We're preparing your {style} video and
              synchronizing its audio.
            </p>

            <div className="fakeProgress">
              <div></div>
            </div>

            <span className="waiting">
              Preparing your first clip...
            </span>

            <button
              className="secondaryButton"
              onClick={() => setPage("dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function StepNumber({ number }) {
  return (
    <div className="stepNumber">
      STEP {number}
    </div>
  );
}

function Choice({
  selected,
  icon,
  title,
  text,
  onClick
}) {
  return (
    <button
      className={`choice ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="choiceIcon">{icon}</div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <div className="radio">
        {selected ? "✓" : ""}
      </div>
    </button>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  background: #07070b;
  color: white;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.app {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 20%, rgba(120, 80, 255, .14), transparent 35%),
    radial-gradient(circle at 80% 70%, rgba(0, 210, 255, .10), transparent 35%),
    #07070b;
}

.screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
}

.welcome {
  position: relative;
  overflow: hidden;
}

.glow {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: .35;
}

.glowOne {
  background: #6d4aff;
  left: -150px;
  top: -150px;
}

.glowTwo {
  background: #00b8ff;
  right: -150px;
  bottom: -150px;
}

.welcomeContent {
  position: relative;
  z-index: 2;
  width: min(700px, 100%);
  text-align: center;
}

.logoMark,
.smallLogo {
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, #7c5cff, #20d9ff);
  box-shadow: 0 15px 50px rgba(100, 80, 255, .35);
}

.logoMark {
  width: 74px;
  height: 74px;
  margin: 0 auto 30px;
  font-size: 34px;
}

.smallLogo {
  width: 36px;
  height: 36px;
}

.eyebrow,
.stepNumber {
  color: #8d7aff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .18em;
}

.welcome h1 {
  margin: 10px 0;
  font-size: clamp(60px, 12vw, 110px);
  letter-spacing: -0.07em;
  line-height: .95;
}

.welcome h1 span {
  color: #8d7aff;
}

.tagline {
  color: #aaa8b7;
  font-size: 19px;
  margin-bottom: 40px;
}

.primaryButton {
  border: 0;
  border-radius: 16px;
  padding: 16px 25px;
  color: white;
  font-weight: 800;
  background: linear-gradient(135deg, #7659ff, #18bde9);
  box-shadow: 0 12px 35px rgba(86, 74, 255, .25);
  transition: .2s;
}

.primaryButton:hover:not(:disabled) {
  transform: translateY(-2px);
}

.primaryButton:disabled {
  opacity: .35;
  cursor: not-allowed;
}

.primaryButton span {
  margin-left: 12px;
}

.wizard {
  width: min(560px, 100%);
}

.wizard.wide {
  width: min(850px, 100%);
}

.wizard h2,
.generation h2 {
  margin: 15px 0 10px;
  font-size: clamp(34px, 6vw, 58px);
  letter-spacing: -.045em;
}

.subtitle {
  color: #9997a5;
  line-height: 1.6;
  margin-bottom: 30px;
}

.bigInput,
.bigTextarea,
.promptBox {
  width: 100%;
  border: 1px solid #292934;
  outline: none;
  color: white;
  background: #111118;
  border-radius: 17px;
  padding: 17px;
  margin-bottom: 20px;
}

.bigInput {
  font-size: 19px;
}

.bigTextarea,
.promptBox {
  min-height: 130px;
  resize: vertical;
  line-height: 1.5;
}

.bigInput:focus,
.bigTextarea:focus,
.promptBox:focus {
  border-color: #7659ff;
}

.wizard label {
  display: block;
  color: #8d8a9b;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .13em;
  margin: 18px 0 9px;
}

.choiceGrid,
.durationGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 28px;
}

.choice,
.durationCard {
  border: 1px solid #292934;
  background: #111118;
  color: white;
  border-radius: 18px;
  text-align: left;
  transition: .2s;
}

.choice {
  position: relative;
  padding: 24px;
  display: flex;
  gap: 16px;
}

.choice:hover,
.choice.selected,
.durationCard:hover,
.durationCard.selected {
  border-color: #7659ff;
  background: #161326;
}

.choiceIcon {
  font-size: 32px;
}

.choice h3 {
  margin: 0 0 6px;
  font-size: 19px;
}

.choice p {
  margin: 0;
  color: #94919e;
  font-size: 14px;
  line-height: 1.5;
}

.radio {
  position: absolute;
  right: 17px;
  top: 17px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #444451;
  display: grid;
  place-items: center;
  font-size: 13px;
}

.choice.selected .radio {
  background: #7659ff;
  border-color: #7659ff;
}

.durationCard {
  padding: 21px;
  text-align: center;
  font-weight: 800;
}

.summary {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.summary span,
.credits {
  border: 1px solid #292934;
  background: #111118;
  padding: 9px 13px;
  border-radius: 100px;
  color: #bbb8c7;
  font-size: 13px;
}

.dashboardScreen {
  min-height: 100vh;
}

.topbar {
  height: 72px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #1d1d25;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dashboard {
  width: min(1000px, 90%);
  margin: auto;
  padding: 80px 0;
}

.heroText h1 {
  font-size: clamp(42px, 7vw, 72px);
  margin: 8px 0;
  letter-spacing: -.05em;
}

.heroText > p:last-child {
  color: #92909d;
  font-size: 18px;
}

.createCard {
  width: 100%;
  margin-top: 45px;
  border: 1px solid #302b4b;
  border-radius: 25px;
  background: linear-gradient(
    135deg,
    rgba(118, 89, 255, .16),
    rgba(24, 189, 233, .07)
  );
  color: white;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 22px;
  text-align: left;
}

.createCard:hover {
  border-color: #7659ff;
}

.createIcon {
  width: 58px;
  height: 58px;
  border-radius: 17px;
  display: grid;
  place-items: center;
  background: #7659ff;
  font-size: 25px;
}

.createCard h2 {
  margin: 0 0 6px;
}

.createCard p {
  color: #9997a5;
  margin: 0;
}

.arrow {
  margin-left: auto;
  font-size: 25px;
}

.infoGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 16px;
}

.infoCard {
  padding: 20px;
  border: 1px solid #22222c;
  border-radius: 18px;
  background: #0d0d13;
}

.infoCard span,
.infoCard strong,
.infoCard small {
  display: block;
}

.infoCard span {
  margin-bottom: 14px;
}

.infoCard strong {
  font-size: 21px;
}

.infoCard small {
  color: #777583;
  margin-top: 4px;
}

.generation {
  width: min(600px, 100%);
  text-align: center;
}

.loader {
  width: 100px;
  height: 100px;
  margin: 0 auto 35px;
  border: 2px solid #292936;
  border-top-color: #7659ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: grid;
  place-items: center;
}

.loader div {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #18bde9;
  filter: blur(3px);
}

.generation p:not(.eyebrow) {
  color: #94919e;
  line-height: 1.6;
}

.fakeProgress {
  height: 7px;
  border-radius: 20px;
  background: #20202a;
  overflow: hidden;
  margin: 30px 0 12px;
}

.fakeProgress div {
  width: 35%;
  height: 100%;
  background: linear-gradient(90deg, #7659ff, #18bde9);
  animation: progress 2s ease-in-out infinite alternate;
}

.waiting {
  color: #777583;
  font-size: 13px;
}

.secondaryButton {
  margin-top: 30px;
  padding: 12px 18px;
  background: transparent;
  color: #aaa7b5;
  border: 1px solid #292934;
  border-radius: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes progress {
  from {
    width: 20%;
  }
  to {
    width: 75%;
  }
}

@media (max-width: 650px) {
  .choiceGrid,
  .durationGrid,
  .infoGrid {
    grid-template-columns: 1fr;
  }

  .topbar {
    padding: 0 18px;
  }

  .credits {
    font-size: 11px;
  }

  .dashboard {
    padding-top: 55px;
  }
}
`;
