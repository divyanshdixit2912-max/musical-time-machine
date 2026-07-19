import React, { useState, useMemo } from "react";
import { Play, Loader2, Disc3, RadioTower, Sparkles, ExternalLink, Wand2, ChevronRight, CalendarDays } from "lucide-react";

const GENRES = ["Pop", "Rock", "Hip-Hop", "R&B", "Electronic", "Country", "Jazz", "Indie", "Latin", "Classical"];
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const MOODS = ["golden-hour", "3am static", "open-highway", "velvet-lounge", "neon-alley", "porch-light", "warehouse-echo", "sunrise-drive"];

const MONTH_ARCHETYPES = [
  { label: "The Slow Thaw", genre: "moody indie & stripped ballads", blurb: "January births lean toward songs that take their time to open up." },
  { label: "The Quiet Storm", genre: "R&B & soul", blurb: "February births tend to gravitate toward warmth with an edge." },
  { label: "The Restless Wind", genre: "alt-rock & post-punk", blurb: "March births often chase songs that feel like they're about to break loose." },
  { label: "The Bloom", genre: "dream pop & bright indie", blurb: "April births suit songs that sound like something opening up." },
  { label: "The Golden Hour", genre: "soft rock & singer-songwriter", blurb: "May births tend to favor warm, sun-drenched melodies." },
  { label: "The Live Wire", genre: "pop & dance", blurb: "June births often want songs built for motion." },
  { label: "The Heat Wave", genre: "hip-hop & Afrobeats", blurb: "July births usually lean into rhythm you can feel in your chest." },
  { label: "The Afterglow", genre: "R&B & neo-soul", blurb: "August births often want songs that linger after the party ends." },
  { label: "The Clean Slate", genre: "indie folk & acoustic", blurb: "September births tend to favor songs with room to think." },
  { label: "The Night Drive", genre: "synthwave & electronic", blurb: "October births often reach for songs built for motion after dark." },
  { label: "The Low Light", genre: "jazz & lo-fi", blurb: "November births tend to want songs that feel like a dim room." },
  { label: "The Long Exhale", genre: "orchestral & ambient", blurb: "December births often favor songs with space to breathe." },
];

const MOOD_QUESTIONS = [
  { id: "energy", question: "How's your energy right now?", options: ["Wired", "Steady", "Mellow", "Running on empty"] },
  { id: "vibe", question: "What do you want the music to do for you?", options: ["Turn it up", "Make me feel something", "Help me focus", "Help me let go"] },
  { id: "scene", question: "Where are you, in spirit, right now?", options: ["Late-night drive", "Sunday morning", "Mid-workout", "Post-breakup couch"] },
];

function monthArchetype(dob) {
  if (!dob) return null;
  const month = new Date(dob + "T00:00:00").getMonth();
  return MONTH_ARCHETYPES[month];
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function soundSignature(name) {
  const clean = (name || "Someone").trim() || "Someone";
  const h = hashString(clean);
  const vowels = (clean.match(/[aeiouAEIOU]/g) || []).length;
  const key = NOTES[h % 12];
  const scale = h % 2 === 0 ? "major" : "minor";
  const tempo = 68 + (vowels * 7 + clean.length * 3) % 90;
  const mood = MOODS[h % MOODS.length];
  return { key, scale, tempo, mood };
}

async function askClaude(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
      tools: [{ type: "web_search_20250305", name: "web_search" }],
    }),
  });
  const data = await response.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
  const cleaned = text.replace(/```json|```/g, "").trim();
  const match = cleaned.match(/[\[{][\s\S]*[\]}]/);
  return JSON.parse(match ? match[0] : cleaned);
}

function spotifyLink(title, artist) {
  return `https://open.spotify.com/search/${encodeURIComponent(`${title} ${artist}`)}`;
}

function spotifyVibeLink(query) {
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}

export default function SoundOfYou() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [genres, setGenres] = useState([]);
  const [stage, setStage] = useState("form"); // form | loading | results | error
  const [chart, setChart] = useState(null);
  const [picks, setPicks] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState("");
  const [playlist, setPlaylist] = useState(null);

  const signature = useMemo(() => soundSignature(name), [name]);
  const archetype = useMemo(() => monthArchetype(dob), [dob]);

  const toggleGenre = (g) => {
    setGenres((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : prev.length < 4 ? [...prev, g] : prev));
  };

  const startQuiz = () => {
    setQuizOpen(true);
    setQuizStep(0);
    setQuizAnswers({});
    setPlaylist(null);
    setQuizError("");
  };

  const answerQuiz = async (questionId, option) => {
    const nextAnswers = { ...quizAnswers, [questionId]: option };
    setQuizAnswers(nextAnswers);
    if (quizStep < MOOD_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
      return;
    }
    setQuizLoading(true);
    setQuizError("");
    try {
      const genreList = genres.length ? genres.join(", ") : "a broad mix of popular genres";
      const moodPrompt = `Someone who likes ${genreList} just answered a quick mood check: energy level is "${nextAnswers.energy}", they want the music to "${nextAnswers.vibe}", and they feel like they're currently in the scene of "${nextAnswers.scene}". Build them an 8-song instant playlist of real, specific songs that fit both their genre taste and this mood. Respond with ONLY raw JSON, no markdown fences, no commentary, matching exactly this schema: {"playlistName":"a short evocative playlist name","description":"one sentence describing the vibe","songs":[{"title":"string","artist":"string"}]}`;
      const data = await askClaude(moodPrompt);
      setPlaylist(data);
    } catch (err) {
      console.error(err);
      setQuizError("Couldn't build the playlist just now. Try again.");
    } finally {
      setQuizLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !dob) return;
    setStage("loading");
    setErrorMsg("");
    try {
      const dateObj = new Date(dob + "T00:00:00");
      const year = dateObj.getFullYear();
      const dateStr = dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

      const chartPromise = askClaude(
        `Search the web for the Billboard Hot 100 #1 single for the week of ${dateStr}. Also find one culturally significant song or album released in ${year}. Respond with ONLY raw JSON, no markdown fences, no commentary, matching exactly this schema: {"weekOfNumberOne":{"song":"string","artist":"string"},"yearHighlight":{"song":"string","artist":"string","note":"one sentence"},"yearFunFact":"one or two sentence fun fact about music in ${year}"}`
      );

      const genreList = genres.length ? genres.join(", ") : "a broad mix of popular genres";
      const picksPromise = askClaude(
        `Search the web if useful. Suggest 5 real, specific songs (mix of well-known classics and recent tracks) that fit these genres: ${genreList}. Respond with ONLY a raw JSON array, no markdown fences, no commentary, matching exactly this schema: [{"title":"string","artist":"string","genre":"string","blurb":"one short sentence on why it fits"}]`
      );

      const [chartData, picksData] = await Promise.all([chartPromise, picksPromise]);
      setChart(chartData);
      setPicks(Array.isArray(picksData) ? picksData : []);
      setStage("results");
    } catch (err) {
      console.error(err);
      setErrorMsg("The signal dropped out fetching live chart data. Try again in a moment.");
      setStage("error");
    }
  };

  const reset = () => {
    setStage("form");
    setChart(null);
    setPicks(null);
    setQuizOpen(false);
    setQuizStep(0);
    setQuizAnswers({});
    setPlaylist(null);
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Space+Mono:wght@400;500;700&family=Work+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .sy-root { font-family: 'Work Sans', sans-serif; }
        .sy-display { font-family: 'Fraunces', serif; }
        .sy-mono { font-family: 'Space Mono', monospace; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .sy-vinyl { animation: spin 6s linear infinite; }
        .sy-vinyl.paused { animation-play-state: paused; }
        @keyframes tonearm { from { transform: rotate(-18deg); } to { transform: rotate(2deg); } }
        .sy-arm { animation: tonearm 1.1s ease-out forwards; }
        .sy-genre-chip { transition: all 0.15s ease; cursor: pointer; }
        .sy-genre-chip:hover { transform: translateY(-1px); }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7); cursor: pointer; }
        .sy-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .sy-track-link { transition: background 0.15s ease; }
        .sy-track-link:hover { background: rgba(232,176,75,0.08); }
        .sy-submit:hover { filter: brightness(1.08); }
        .sy-focus:focus { outline: 2px solid #E8B04B; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .sy-vinyl, .sy-arm { animation: none !important; }
        }
      `}</style>

      <div className="sy-root" style={styles.container}>
        {/* HERO */}
        <div style={styles.hero}>
          <div style={styles.vinylWrap}>
            <div className={`sy-vinyl ${stage === "loading" ? "" : "paused"}`} style={styles.vinyl}>
              <div style={styles.vinylGrooves} />
              <div style={styles.vinylLabel}>
                <span className="sy-mono" style={{ fontSize: 10, letterSpacing: 1, color: "#14121F" }}>
                  {name.trim() ? name.trim().slice(0, 16).toUpperCase() : "SOUND OF YOU"}
                </span>
              </div>
            </div>
            <div className="sy-arm" style={styles.tonearm}>
              <div style={styles.tonearmHead} />
            </div>
          </div>
          <div>
            <div className="sy-mono" style={styles.eyebrow}>
              <RadioTower size={12} style={{ marginRight: 6 }} /> a personal radio station, tuned to one listener
            </div>
            <h1 className="sy-display" style={styles.h1}>
              Every life has<br />a soundtrack.
            </h1>
            <p style={styles.sub}>
              Drop in your name and birthday. We'll cue up the song that ruled the charts the week you arrived,
              a sound signature built from your name, and fresh picks tuned to what you already love.
            </p>
          </div>
        </div>

        {/* FORM */}
        {(stage === "form" || stage === "loading" || stage === "error") && (
          <div style={styles.formCard}>
            <label style={styles.label}>Your name</label>
            <input
              className="sy-focus"
              style={styles.input}
              placeholder="e.g. Jordan Reyes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={stage === "loading"}
            />

            <label style={styles.label}>Date of birth</label>
            <input
              className="sy-focus"
              type="date"
              style={styles.input}
              value={dob}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDob(e.target.value)}
              disabled={stage === "loading"}
            />

            <label style={styles.label}>Genres you already love <span style={{ color: "#8A8599" }}>(pick up to 4)</span></label>
            <div style={styles.chipRow}>
              {GENRES.map((g) => {
                const active = genres.includes(g);
                return (
                  <button
                    key={g}
                    className="sy-genre-chip"
                    onClick={() => toggleGenre(g)}
                    disabled={stage === "loading"}
                    style={{
                      ...styles.chip,
                      background: active ? "#E8B04B" : "transparent",
                      color: active ? "#14121F" : "#F3EFE9",
                      borderColor: active ? "#E8B04B" : "#3A3550",
                    }}
                  >
                    {g}
                  </button>
                );
              })}
            </div>

            <button
              className="sy-submit"
              style={{ ...styles.submitBtn, opacity: !name.trim() || !dob ? 0.5 : 1 }}
              onClick={handleSubmit}
              disabled={!name.trim() || !dob || stage === "loading"}
            >
              {stage === "loading" ? (
                <>
                  <Loader2 size={16} className="sy-mono" style={{ marginRight: 8, animation: "spin 1s linear infinite" }} />
                  Cueing up your track...
                </>
              ) : (
                <>
                  <Play size={16} style={{ marginRight: 8 }} fill="#14121F" /> Press play
                </>
              )}
            </button>

            {stage === "error" && (
              <div style={styles.errorBox}>
                {errorMsg}
                <button style={styles.retryBtn} onClick={handleSubmit}>Try again</button>
              </div>
            )}
          </div>
        )}

        {/* RESULTS */}
        {stage === "results" && (
          <div style={styles.results}>
            <div style={styles.resultsHeader}>
              <h2 className="sy-display" style={styles.h2}>Now playing: {name.trim()}</h2>
              <button style={styles.retryLink} onClick={reset}>Start over</button>
            </div>

            {/* Chart topper */}
            <div className="sy-card" style={styles.card}>
              <div style={styles.cardEyebrow}>
                <Disc3 size={14} style={{ marginRight: 6 }} /> chart-topper the week you arrived
              </div>
              <div className="sy-display" style={styles.trackTitle}>
                {chart?.weekOfNumberOne?.song || "Unavailable"}
              </div>
              <div style={styles.trackArtist}>{chart?.weekOfNumberOne?.artist}</div>
              {chart?.weekOfNumberOne?.song && (
                <a href={spotifyLink(chart.weekOfNumberOne.song, chart.weekOfNumberOne.artist)} target="_blank" rel="noreferrer" style={styles.previewLink}>
                  <ExternalLink size={12} style={{ marginRight: 4 }} /> open in Spotify
                </a>
              )}
            </div>

            {/* Year highlight + fun fact */}
            <div className="sy-card" style={styles.card}>
              <div style={styles.cardEyebrow}>
                <Sparkles size={14} style={{ marginRight: 6 }} /> also that year
              </div>
              <div className="sy-display" style={styles.trackTitle}>{chart?.yearHighlight?.song}</div>
              <div style={styles.trackArtist}>{chart?.yearHighlight?.artist}</div>
              <p style={styles.blurb}>{chart?.yearHighlight?.note}</p>
              <p style={{ ...styles.blurb, color: "#8A8599", marginTop: 10 }}>{chart?.yearFunFact}</p>
            </div>

            {/* Sound signature */}
            <div className="sy-card" style={{ ...styles.card, background: "linear-gradient(135deg, #26223A, #1E1B2E)" }}>
              <div style={styles.cardEyebrow}>your sound signature <span style={{ color: "#8A8599", fontWeight: 400 }}>&nbsp;· just for fun</span></div>
              <div style={styles.sigGrid}>
                <div>
                  <div className="sy-mono" style={styles.sigValue}>{signature.key} {signature.scale}</div>
                  <div style={styles.sigLabel}>key</div>
                </div>
                <div>
                  <div className="sy-mono" style={styles.sigValue}>{signature.tempo} bpm</div>
                  <div style={styles.sigLabel}>tempo</div>
                </div>
                <div>
                  <div className="sy-mono" style={styles.sigValue}>{signature.mood}</div>
                  <div style={styles.sigLabel}>atmosphere</div>
                </div>
              </div>
              <p style={{ ...styles.blurb, marginTop: 14 }}>
                Pulled from the letters in your name — a playful pattern, not a science.
              </p>
            </div>

            {/* Month archetype */}
            {archetype && (
              <div className="sy-card" style={styles.card}>
                <div style={styles.cardEyebrow}>
                  <CalendarDays size={14} style={{ marginRight: 6 }} /> your birth-month archetype
                </div>
                <div className="sy-display" style={styles.trackTitle}>{archetype.label}</div>
                <div style={styles.trackArtist}>{archetype.genre}</div>
                <p style={styles.blurb}>{archetype.blurb}</p>
              </div>
            )}

            {/* Picks */}
            <div className="sy-card" style={styles.card}>
              <div style={styles.cardEyebrow}>picks tuned to your taste</div>
              <div style={styles.tracklist}>
                {(picks || []).map((p, i) => (
                  <a key={i} href={spotifyLink(p.title, p.artist)} target="_blank" rel="noreferrer" className="sy-track-link" style={styles.trackRow}>
                    <span className="sy-mono" style={styles.trackNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ flex: 1 }}>
                      <div style={styles.trackRowTitle}>{p.title}</div>
                      <div style={styles.trackRowArtist}>{p.artist} · {p.genre}</div>
                    </span>
                    <ExternalLink size={14} color="#8A8599" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mood quiz + instant playlist */}
            <div className="sy-card" style={{ ...styles.card, background: "linear-gradient(135deg, #1E1B2E, #241F38)" }}>
              <div style={styles.cardEyebrow}>
                <Wand2 size={14} style={{ marginRight: 6 }} /> instant mood playlist
              </div>

              {!quizOpen && (
                <>
                  <p style={{ ...styles.blurb, marginTop: 0 }}>
                    Answer three quick questions and get a playlist built for exactly how you feel right now.
                  </p>
                  <button style={styles.quizStartBtn} onClick={startQuiz}>
                    Start the check-in <ChevronRight size={15} style={{ marginLeft: 4 }} />
                  </button>
                </>
              )}

              {quizOpen && !playlist && !quizLoading && (
                <div>
                  <div style={styles.quizProgress}>
                    Question {quizStep + 1} of {MOOD_QUESTIONS.length}
                  </div>
                  <div className="sy-display" style={styles.quizQuestion}>
                    {MOOD_QUESTIONS[quizStep].question}
                  </div>
                  <div style={styles.quizOptions}>
                    {MOOD_QUESTIONS[quizStep].options.map((opt) => (
                      <button key={opt} className="sy-genre-chip" style={styles.quizOption} onClick={() => answerQuiz(MOOD_QUESTIONS[quizStep].id, opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizLoading && (
                <div style={styles.quizLoading}>
                  <Loader2 size={16} style={{ marginRight: 8, animation: "spin 1s linear infinite" }} />
                  Mixing your playlist...
                </div>
              )}

              {quizError && (
                <div style={styles.errorBox}>
                  {quizError}
                  <button style={styles.retryBtn} onClick={() => answerQuiz(MOOD_QUESTIONS[MOOD_QUESTIONS.length - 1].id, quizAnswers[MOOD_QUESTIONS[MOOD_QUESTIONS.length - 1].id])}>Try again</button>
                </div>
              )}

              {playlist && (
                <div>
                  <div className="sy-display" style={styles.trackTitle}>{playlist.playlistName}</div>
                  <p style={{ ...styles.blurb, marginBottom: 14 }}>{playlist.description}</p>
                  <div style={styles.tracklist}>
                    {(playlist.songs || []).map((s, i) => (
                      <a key={i} href={spotifyLink(s.title, s.artist)} target="_blank" rel="noreferrer" className="sy-track-link" style={styles.trackRow}>
                        <span className="sy-mono" style={styles.trackNum}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ flex: 1 }}>
                          <div style={styles.trackRowTitle}>{s.title}</div>
                          <div style={styles.trackRowArtist}>{s.artist}</div>
                        </span>
                        <ExternalLink size={14} color="#8A8599" />
                      </a>
                    ))}
                  </div>
                  <button style={styles.quizRetryLink} onClick={startQuiz}>Check in again</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#14121F", color: "#F3EFE9", padding: "32px 16px 64px" },
  container: { maxWidth: 560, margin: "0 auto" },
  hero: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20, marginBottom: 36 },
  vinylWrap: { position: "relative", width: 150, height: 150, marginBottom: 4 },
  vinyl: {
    width: 150, height: 150, borderRadius: "50%",
    background: "radial-gradient(circle at center, #E8B04B 0 14%, #14121F 14.5% 16%, #26223A 16.5% 100%)",
    display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
  },
  vinylGrooves: {
    position: "absolute", inset: 8, borderRadius: "50%",
    background: "repeating-radial-gradient(circle at center, transparent 0 4px, rgba(243,239,233,0.04) 4.5px 5px)",
  },
  vinylLabel: {
    width: 46, height: 46, borderRadius: "50%", background: "#E8B04B",
    display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 4, zIndex: 2,
  },
  tonearm: {
    position: "absolute", top: -14, right: -6, width: 6, height: 90, background: "#8A8599",
    transformOrigin: "top center", borderRadius: 4,
  },
  tonearmHead: { position: "absolute", bottom: -4, left: -5, width: 16, height: 10, background: "#E8654C", borderRadius: 2 },
  eyebrow: { display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, letterSpacing: 1.5, color: "#E8B04B", textTransform: "uppercase", marginBottom: 14 },
  h1: { fontSize: 40, lineHeight: 1.08, fontWeight: 600, margin: 0, marginBottom: 14 },
  sub: { fontSize: 15, lineHeight: 1.6, color: "#B8B2C8", margin: 0, maxWidth: 420 },
  formCard: { background: "#1E1B2E", border: "1px solid #2E2A42", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, letterSpacing: 0.5, color: "#8A8599", marginTop: 14, marginBottom: 6, textTransform: "uppercase" },
  input: { background: "#14121F", border: "1px solid #3A3550", borderRadius: 10, padding: "12px 14px", color: "#F3EFE9", fontSize: 15, fontFamily: "inherit" },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 },
  chip: { border: "1px solid #3A3550", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontFamily: "inherit" },
  submitBtn: { marginTop: 22, background: "#E8B04B", color: "#14121F", border: "none", borderRadius: 12, padding: "14px 20px", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  errorBox: { marginTop: 14, background: "rgba(232,101,76,0.1)", border: "1px solid #E8654C", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#F3EFE9", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
  retryBtn: { background: "transparent", border: "1px solid #E8654C", color: "#E8654C", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" },
  results: { display: "flex", flexDirection: "column", gap: 16 },
  resultsHeader: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 },
  h2: { fontSize: 22, fontWeight: 600, margin: 0 },
  retryLink: { background: "none", border: "none", color: "#8A8599", fontSize: 12, textDecoration: "underline", cursor: "pointer", fontFamily: "'Work Sans', sans-serif" },
  card: { background: "#1E1B2E", border: "1px solid #2E2A42", borderRadius: 16, padding: 22 },
  cardEyebrow: { display: "flex", alignItems: "center", fontSize: 11, letterSpacing: 1.2, color: "#E8B04B", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 },
  trackTitle: { fontSize: 22, fontWeight: 600 },
  trackArtist: { fontSize: 14, color: "#B8B2C8", marginTop: 2 },
  blurb: { fontSize: 13.5, color: "#B8B2C8", lineHeight: 1.55, marginTop: 8 },
  previewLink: { display: "inline-flex", alignItems: "center", marginTop: 12, fontSize: 12, color: "#E8654C", textDecoration: "none" },
  sigGrid: { display: "flex", gap: 24, flexWrap: "wrap" },
  sigValue: { fontSize: 18, fontWeight: 700, color: "#E8B04B" },
  sigLabel: { fontSize: 11, color: "#8A8599", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 },
  tracklist: { display: "flex", flexDirection: "column" },
  trackRow: { display: "flex", alignItems: "center", gap: 14, padding: "12px 8px", borderRadius: 10, textDecoration: "none", color: "#F3EFE9" },
  trackNum: { color: "#E8654C", fontSize: 13, width: 20 },
  trackRowTitle: { fontSize: 14.5, fontWeight: 500 },
  trackRowArtist: { fontSize: 12.5, color: "#8A8599", marginTop: 2 },
  quizStartBtn: { marginTop: 10, background: "transparent", border: "1px solid #E8B04B", color: "#E8B04B", borderRadius: 10, padding: "10px 16px", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", cursor: "pointer", fontFamily: "'Work Sans', sans-serif" },
  quizProgress: { fontSize: 11, color: "#8A8599", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  quizQuestion: { fontSize: 18, fontWeight: 600, marginBottom: 14 },
  quizOptions: { display: "flex", flexDirection: "column", gap: 8 },
  quizOption: { textAlign: "left", background: "#14121F", border: "1px solid #3A3550", borderRadius: 10, padding: "12px 14px", color: "#F3EFE9", fontSize: 14, fontFamily: "'Work Sans', sans-serif" },
  quizLoading: { display: "flex", alignItems: "center", fontSize: 14, color: "#B8B2C8" },
  quizRetryLink: { marginTop: 14, background: "none", border: "none", color: "#8A8599", fontSize: 12, textDecoration: "underline", cursor: "pointer", fontFamily: "'Work Sans', sans-serif" },
};
