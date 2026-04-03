(() => {
  const STORAGE = {
    auth: "qayrawan.auth",
    settings: "qayrawan.settings",
    announcements: "qayrawan.announcements",
    homework: "qayrawan.homework",
    discussions: "qayrawan.discussions",
    profiles: "qayrawan.profiles",
    audit: "qayrawan.audit"
  };

  const ACCOUNTS = [
    { username: "AdminUser01", password: "Admin@2026", role: "admin", displayName: "Teacher Admin", grade: "Administration", className: "Office", avatar: "🧑‍🏫" },
    { username: "Student01", password: "Qay2026-1", role: "student", displayName: "Student 01", grade: "Grade 10", className: "Class A", avatar: "📘" },
    { username: "Student02", password: "Qay2026-2", role: "student", displayName: "Student 02", grade: "Grade 10", className: "Class B", avatar: "📚" },
    { username: "Student03", password: "Qay2026-3", role: "student", displayName: "Student 03", grade: "Grade 11", className: "Class A", avatar: "📝" },
    { username: "Student04", password: "Qay2026-4", role: "student", displayName: "Student 04", grade: "Grade 11", className: "Class B", avatar: "🧠" },
    { username: "Student05", password: "Qay2026-5", role: "student", displayName: "Student 05", grade: "Grade 12", className: "Class A", avatar: "🎯" }
  ];

  const ALLOWED_AVATARS = ["📘", "📚", "📝", "🧠", "🎯", "💡", "🧭", "🛠️", "⭐", "🚀", "🎒", "📌"];

  const DEFAULT_SETTINGS = {
    compact: true,
    reduceMotion: false,
    showTimestamps: true,
    collapseLongCards: true,
    autoRefresh: true,
    showPreviews: true,
    maintenanceMode: false,
    auditLog: true,
    showAuditPanel: true
  };

  const els = {};
  let state = {
    currentUser: null,
    currentPage: "home",
    quickPasswordVisible: false,
    demoAccounts: [],
    settings: {},
    announcements: [],
    homework: [],
    discussions: [],
    profiles: {},
    audit: []
  };

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "id-" + Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function toDate(value) {
    if (!value) return new Date();
    const dt = new Date(value);
    return isNaN(dt.getTime()) ? new Date() : dt;
  }

  function fmtDate(value) {
    try {
      return toDate(value).toLocaleString();
    } catch {
      return "";
    }
  }

  function safeParse(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function baseProfiles() {
    const map = {};
    ACCOUNTS.forEach((account, index) => {
      map[account.username.toLowerCase()] = {
        username: account.username,
        displayName: account.displayName,
        role: account.role,
        grade: account.grade,
        className: account.className,
        avatar: account.avatar,
        bio: account.role === "admin"
          ? "Coordinator of the Qayrawan platform beta."
          : `Testing the beta with a ${account.grade.toLowerCase()} ${account.className.toLowerCase()} profile.`,
        status: account.role === "admin"
          ? "Publishing and managing the platform."
          : `Beta tester #${index}.`
      };
    });
    return map;
  }

  function baseAnnouncements() {
    return [
      {
        id: uuid(),
        title: "Welcome to Qayrawan Beta",
        body: "This is the first working version of the platform. Use it to test announcements, homework, discussions, and profiles.",
        audience: "All Students",
        author: "AdminUser01",
        createdAt: new Date().toISOString()
      },
      {
        id: uuid(),
        title: "Homework updates now stay organized",
        body: "Teachers can post homework by grade and class, so students do not need to search across random chat groups.",
        audience: "All Students",
        author: "AdminUser01",
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: uuid(),
        title: "Platform beta notice",
        body: "The site is still being improved. Expect changes, fixes, and small feature upgrades while we test the workflow.",
        audience: "Administration",
        author: "AdminUser01",
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  }

  function baseHomework() {
    return [
      {
        id: uuid(),
        title: "Computer class practice",
        body: "Open the platform, review the announcements section, then check how the homework cards are grouped by grade and class.",
        audience: "All Students",
        grade: "Grade 10",
        className: "Class A",
        subject: "Computer",
        priority: "Normal",
        dueDate: "",
        author: "AdminUser01",
        createdAt: new Date().toISOString()
      },
      {
        id: uuid(),
        title: "English short writing task",
        body: "Write a short paragraph about how a school platform can reduce confusion and keep homework organized.",
        audience: "Grade 11",
        grade: "Grade 11",
        className: "Class B",
        subject: "English",
        priority: "Important",
        dueDate: "",
        author: "AdminUser01",
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: uuid(),
        title: "Math revision",
        body: "Review your recent notes and prepare a clean summary for the next class discussion.",
        audience: "Grade 12",
        grade: "Grade 12",
        className: "Class A",
        subject: "Math",
        priority: "Urgent",
        dueDate: "",
        author: "AdminUser01",
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  }

  function baseDiscussions() {
    return [
      {
        id: uuid(),
        grade: "Grade 10",
        title: "How should homework be organized?",
        body: "Discuss how the platform should keep homework clear, simple, and easy to find for students.",
        author: "AdminUser01",
        createdAt: new Date().toISOString(),
        replies: [
          {
            id: uuid(),
            author: "Student01",
            role: "student",
            body: "I think the grade and class filter makes the most sense because it removes the search chaos.",
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ]
      },
      {
        id: uuid(),
        grade: "Grade 11",
        title: "What should the teachers post first?",
        body: "Start with the features that will help students the most on a normal school day.",
        author: "AdminUser01",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        replies: []
      },
      {
        id: uuid(),
        grade: "Grade 12",
        title: "Suggestions for the beta",
        body: "Use this thread to suggest the smallest features that still make the platform feel useful.",
        author: "AdminUser01",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        replies: []
      }
    ];
  }

  function defaultState() {
    return {
      settings: { ...DEFAULT_SETTINGS },
      profiles: baseProfiles(),
      announcements: baseAnnouncements(),
      homework: baseHomework(),
      discussions: baseDiscussions(),
      audit: []
    };
  }

  function loadState() {
    const defaults = defaultState();
    state.settings = { ...DEFAULT_SETTINGS, ...safeParse(STORAGE.settings, {}) };
    state.profiles = safeParse(STORAGE.profiles, defaults.profiles);
    state.announcements = safeParse(STORAGE.announcements, defaults.announcements);
    state.homework = safeParse(STORAGE.homework, defaults.homework);
    state.discussions = safeParse(STORAGE.discussions, defaults.discussions);
    state.audit = safeParse(STORAGE.audit, defaults.audit);
    state.currentUser = safeParse(STORAGE.auth, null);
    normalizeState();
  }

  function normalizeState() {
    const defaults = defaultState();

    ACCOUNTS.forEach((account) => {
      const key = account.username.toLowerCase();
      if (!state.profiles[key]) {
        state.profiles[key] = defaults.profiles[key];
      } else {
        const profile = state.profiles[key];
        profile.username = account.username;
        profile.role = account.role;
        profile.grade = profile.grade || account.grade;
        profile.className = profile.className || account.className;
        profile.avatar = profile.avatar || account.avatar;
        profile.displayName = profile.displayName || account.displayName;
        profile.bio = profile.bio || defaults.profiles[key].bio;
        profile.status = profile.status || defaults.profiles[key].status;
      }
    });

    if (!Array.isArray(state.announcements)) state.announcements = defaults.announcements;
    if (!Array.isArray(state.homework)) state.homework = defaults.homework;
    if (!Array.isArray(state.discussions)) state.discussions = defaults.discussions;
    if (!Array.isArray(state.audit)) state.audit = [];

    if (state.currentUser && state.currentUser.username) {
      const found = ACCOUNTS.find(a => a.username === state.currentUser.username);
      if (found) state.currentUser.role = found.role;
    }
  }

  function saveAll() {
    save(STORAGE.settings, state.settings);
    save(STORAGE.profiles, state.profiles);
    save(STORAGE.announcements, state.announcements);
    save(STORAGE.homework, state.homework);
    save(STORAGE.discussions, state.discussions);
    save(STORAGE.audit, state.audit);
    if (state.currentUser) save(STORAGE.auth, state.currentUser);
    else localStorage.removeItem(STORAGE.auth);
  }

  function logAction(type, detail) {
    if (!state.settings.auditLog) return;
    state.audit.unshift({
      id: uuid(),
      type,
      detail,
      createdAt: new Date().toISOString()
    });
    state.audit = state.audit.slice(0, 30);
    saveAll();
  }

  function setCurrentUser(account) {
    state.currentUser = account ? {
      username: account.username,
      role: account.role
    } : null;
    saveAll();
  }

  function currentProfile() {
    return state.currentUser ? state.profiles[state.currentUser.username.toLowerCase()] : null;
  }

  function currentAccount() {
    if (!state.currentUser) return null;
    return ACCOUNTS.find(a => a.username === state.currentUser.username) || null;
  }

  function isAdmin() {
    return state.currentUser && state.currentUser.role === "admin";
  }

  function isStudent() {
    return state.currentUser && state.currentUser.role === "student";
  }

  function canViewAnnouncement(item) {
    if (!state.currentUser) return false;
    if (isAdmin()) return true;
    const profile = currentProfile();
    if (!profile) return false;
    const audience = item.audience;
    return audience === "All Students" || audience === profile.grade;
  }

  function canViewHomework(item) {
    if (!state.currentUser) return false;
    if (isAdmin()) return true;
    const profile = currentProfile();
    if (!profile) return false;
    return item.audience === "All Students" || item.grade === profile.grade;
  }

  function canViewThread(thread) {
    if (!state.currentUser) return false;
    if (isAdmin()) return true;
    const profile = currentProfile();
    return profile && thread.grade === profile.grade;
  }

  function canReply(thread) {
    return canViewThread(thread);
  }

  function selectedAvatarValue(profile) {
    return profile && profile.avatar ? profile.avatar : ALLOWED_AVATARS[0];
  }

  function updateTheme() {
    const root = document.documentElement;
    root.style.setProperty("--base-font", state.settings.compact ? "15px" : "16px");
    root.style.setProperty("--card-pad", state.settings.compact ? "14px" : "16px");
    if (state.settings.reduceMotion) {
      document.body.classList.add("motion-off");
    } else {
      document.body.classList.remove("motion-off");
    }
  }

  function openOverlay(el) {
    el.classList.add("show");
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeOverlay(el) {
    el.classList.remove("show");
    el.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function closeAllOverlays() {
    closeOverlay(els.settingsOverlay);
    closeOverlay(els.adminOverlay);
    closeDrawer();
  }

  function openDrawer() {
    els.drawer.classList.add("open");
    els.backdrop.classList.add("show");
  }

  function closeDrawer() {
    els.drawer.classList.remove("open");
    els.backdrop.classList.remove("show");
  }

  function toggleDrawer() {
    if (window.matchMedia("(min-width: 1101px)").matches) return;
    if (els.drawer.classList.contains("open")) closeDrawer();
    else openDrawer();
  }

  function applyMaintenanceGate() {
    const maintenance = state.settings.maintenanceMode && isStudent();
    els.adminBtn.classList.toggle("hidden", !isAdmin());
    els.settingsAdminPanel.classList.toggle("hidden", !isAdmin());
    els.auditPanel.classList.toggle("hidden", !isAdmin() || !state.settings.showAuditPanel);
    document.getElementById("auditSwitch").checked = state.settings.auditLog;
    document.getElementById("showAuditSwitch").checked = state.settings.showAuditPanel;

    if (maintenance) {
      renderPage("home");
    }
  }

  function clearActiveNav() {
    document.querySelectorAll(".menu-link[data-page]").forEach(btn => btn.classList.remove("active"));
  }

  function setActiveNav(page) {
    clearActiveNav();
    const btn = document.querySelector(`.menu-link[data-page="${page}"]`);
    if (btn) btn.classList.add("active");
  }

  function previewText(text) {
    const raw = String(text || "").trim();
    if (!state.settings.showPreviews) return "";
    if (!raw) return "";
    return raw.length > 140 ? raw.slice(0, 140) + "..." : raw;
  }

  function buildPostCard({ title, meta, body, tag, openByDefault, id, type }) {
    const preview = previewText(body);
    const openClass = openByDefault ? "open" : "";
    return `
      <article class="post ${openClass}" data-id="${escapeHTML(id)}" data-type="${escapeHTML(type)}">
        <div class="post-head" data-toggle="post">
          <div>
            <div class="post-title">${escapeHTML(title)}</div>
            <div class="post-meta">${escapeHTML(meta)}</div>
            ${preview ? `<div class="post-preview">${escapeHTML(preview)}</div>` : ""}
          </div>
          <span class="chip">${escapeHTML(tag)}</span>
        </div>
        <div class="post-body">
          <div class="small-meta">${escapeHTML(body)}</div>
        </div>
      </article>
    `;
  }

  function buildAnnouncement(item) {
    const metaParts = [item.audience, `by ${item.author}`];
    if (state.settings.showTimestamps) metaParts.push(fmtDate(item.createdAt));
    return buildPostCard({
      title: item.title,
      meta: metaParts.join(" • "),
      body: item.body,
      tag: "Announcement",
      openByDefault: !state.settings.collapseLongCards || item.body.length < 140,
      id: item.id,
      type: "announcement"
    });
  }

  function buildHomeworkItem(item) {
    const metaParts = [item.subject, item.priority, `${item.grade} / ${item.className}`, `by ${item.author}`];
    if (item.dueDate) metaParts.push(`Due ${item.dueDate}`);
    if (state.settings.showTimestamps) metaParts.push(fmtDate(item.createdAt));
    return buildPostCard({
      title: item.title,
      meta: metaParts.filter(Boolean).join(" • "),
      body: item.body,
      tag: "Homework",
      openByDefault: !state.settings.collapseLongCards || item.body.length < 140,
      id: item.id,
      type: "homework"
    });
  }

  function buildReply(reply) {
    const meta = `${reply.role === "admin" ? "Teacher/Admin" : "Student"} • ${reply.author}` + (state.settings.showTimestamps ? ` • ${fmtDate(reply.createdAt)}` : "");
    return `
      <div class="reply">
        <div class="small-meta">${escapeHTML(meta)}</div>
        <div class="post-preview" style="margin-top:8px;">${escapeHTML(reply.body)}</div>
      </div>
    `;
  }

  function buildThread(thread) {
    const openClass = "open";
    const replyForm = canReply(thread) ? `
      <form class="reply-form" data-reply-form="${escapeHTML(thread.id)}">
        <textarea class="text-area" name="reply" placeholder="Write a reply for ${escapeHTML(thread.grade)}"></textarea>
        <button class="secondary" type="submit">Reply</button>
      </form>
    ` : `
      <div class="note">Read-only for your current role.</div>
    `;

    const replies = thread.replies && thread.replies.length
      ? thread.replies.map(buildReply).join("")
      : `<div class="note">No replies yet.</div>`;

    const metaParts = [thread.grade, `by ${thread.author}`];
    if (state.settings.showTimestamps) metaParts.push(fmtDate(thread.createdAt));

    return `
      <article class="thread ${openClass}" data-thread="${escapeHTML(thread.id)}" data-grade="${escapeHTML(thread.grade)}">
        <div class="thread-head" data-toggle="thread">
          <div>
            <div class="thread-title">${escapeHTML(thread.title)}</div>
            <div class="thread-meta">${escapeHTML(metaParts.join(" • "))}</div>
            <div class="thread-preview">${escapeHTML(previewText(thread.body) || thread.body)}</div>
          </div>
          <span class="chip">Discussion</span>
        </div>
        <div class="thread-body">
          <div class="subtle-box">${escapeHTML(thread.body)}</div>
          <div class="replies">
            <h4>Replies</h4>
            <div class="reply-list">${replies}</div>
          </div>
          ${replyForm}
        </div>
      </article>
    `;
  }

  function groupHomework() {
    const grades = ["Grade 10", "Grade 11", "Grade 12"];
    const classes = ["Class A", "Class B", "Class C"];
    const filtered = state.homework.filter(canViewHomework);

    return grades
      .map((grade) => {
        const gradeItems = filtered.filter(item => item.grade === grade);
        if (!gradeItems.length) return "";

        const classMarkup = classes
          .map((className) => {
            const classItems = gradeItems.filter(item => item.className === className);
            if (!classItems.length) return "";
            return `
              <div class="class-block">
                <div class="class-head" data-toggle="class">
                  <div>
                    <div class="post-title">${escapeHTML(className)}</div>
                    <div class="post-meta">${classItems.length} item(s)</div>
                  </div>
                  <span class="arrow">›</span>
                </div>
                <div class="class-body">
                  <div class="post-list">
                    ${classItems.map(buildHomeworkItem).join("")}
                  </div>
                </div>
              </div>
            `;
          })
          .filter(Boolean)
          .join("");

        return `
          <div class="grade-block">
            <div class="grade-head" data-toggle="grade">
              <div>
                <div class="post-title">${escapeHTML(grade)}</div>
                <div class="post-meta">${gradeItems.length} homework item(s)</div>
              </div>
              <span class="arrow">›</span>
            </div>
            <div class="grade-body">
              <div class="post-list">${classMarkup}</div>
            </div>
          </div>
        `;
      })
      .filter(Boolean)
      .join("");
  }

  function buildAnnouncementsList() {
    const items = state.announcements.filter(canViewAnnouncement);
    if (!items.length) return `<div class="panel"><p class="note">No announcements yet.</p></div>`;
    return `<div class="post-list">${items.map(buildAnnouncement).join("")}</div>`;
  }

  function buildHomeworkList() {
    const grouped = groupHomework();
    if (!grouped) return `<div class="panel"><p class="note">No homework posted yet.</p></div>`;
    return `<div class="stack">${grouped}</div>`;
  }

  function buildThreadsList() {
    const grades = ["Grade 10", "Grade 11", "Grade 12"];
    const items = state.discussions.filter(canViewThread);

    if (!items.length) return `<div class="panel"><p class="note">No discussion threads yet.</p></div>`;

    const sections = grades.map((grade) => {
      const gradeItems = items.filter(thread => thread.grade === grade);
      if (!gradeItems.length) return "";

      return `
        <div class="grade-block">
          <div class="grade-head" data-toggle="grade">
            <div>
              <div class="post-title">${escapeHTML(grade)}</div>
              <div class="post-meta">${gradeItems.length} thread(s)</div>
            </div>
            <span class="arrow">›</span>
          </div>
          <div class="grade-body">
            <div class="thread-list">
              ${gradeItems.map(buildThread).join("")}
            </div>
          </div>
        </div>
      `;
    }).filter(Boolean).join("");

    return `<div class="stack">${sections}</div>`;
  }

  function buildProfilesPage() {
    const profiles = Object.values(state.profiles);
    const editableUsername = isAdmin() ? (document.getElementById("profileTarget") ? document.getElementById("profileTarget").value : state.currentUser.username) : state.currentUser.username;
    const profile = state.profiles[(editableUsername || state.currentUser.username).toLowerCase()];

    return `
      <div class="page-head">
        <div>
          <h2>Profiles</h2>
          <p>Preset avatars only. No uploads. No Cristiano Ronaldo. The rules are simple because the internet is not.</p>
        </div>
        <span class="chip">${profiles.length} accounts</span>
      </div>

      <div class="profile-layout">
        <div class="panel">
          <div class="section-head">
            <div>
              <h3>${isAdmin() ? "Edit a profile" : "My profile"}</h3>
              <p class="tiny">${isAdmin() ? "Pick any account to update its visible profile." : "Edit only your own profile."}</p>
            </div>
          </div>

          ${isAdmin() ? `
            <div class="stack" style="margin-bottom:12px;">
              <select class="select" id="profileTarget">
                ${Object.values(state.profiles).map(p => `
                  <option value="${escapeHTML(p.username)}" ${p.username === editableUsername ? "selected" : ""}>${escapeHTML(p.username)} (${escapeHTML(p.role)})</option>
                `).join("")}
              </select>
            </div>
          ` : ""}

          <div class="stack">
            <div>
              <div class="tiny" style="margin-bottom:8px;">Choose an avatar from the allowed set</div>
              <div class="avatar-row" id="avatarRow">
                ${ALLOWED_AVATARS.map(icon => `
                  <button class="avatar-btn ${selectedAvatarValue(profile) === icon ? "selected" : ""}" type="button" data-avatar="${escapeHTML(icon)}">${escapeHTML(icon)}</button>
                `).join("")}
              </div>
            </div>

            <input class="field" id="profileName" type="text" value="${escapeHTML(profile.displayName || "")}" placeholder="Display name" />
            <input class="field" id="profileStatus" type="text" value="${escapeHTML(profile.status || "")}" placeholder="Status line" />
            <textarea class="text-area" id="profileBio" placeholder="Short bio">${escapeHTML(profile.bio || "")}</textarea>

            <div class="grid-2">
              <input class="field" id="profileGrade" type="text" value="${escapeHTML(profile.grade || "")}" ${isAdmin() ? "" : "readonly"} />
              <input class="field" id="profileClass" type="text" value="${escapeHTML(profile.className || "")}" ${isAdmin() ? "" : "readonly"} />
            </div>

            <button class="primary" id="saveProfileBtn" type="button">Save profile</button>
            <p class="note">Rules: no custom image uploads, no fake badges, no pretending you are Ronaldo because the avatar picker is right there.</p>
          </div>
        </div>

        <div class="panel">
          <div class="section-head">
            <div>
              <h3>School directory</h3>
              <p class="tiny">All visible accounts in the closed beta.</p>
            </div>
          </div>

          <div class="profile-grid">
            ${profiles.map(renderProfileCard).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderProfileCard(profile) {
    const roleLabel = profile.role === "admin" ? "Teacher / Admin" : "Student";
    return `
      <article class="profile-card">
        <div class="profile-top">
          <div class="avatar">${escapeHTML(profile.avatar || "📌")}</div>
          <div>
            <div class="profile-name">${escapeHTML(profile.displayName || profile.username)}</div>
            <div class="small-meta">${escapeHTML(profile.username)}</div>
            <span class="profile-role">${escapeHTML(roleLabel)}</span>
          </div>
        </div>
        <div class="profile-bio">${escapeHTML(profile.bio || "No bio yet.")}</div>
        <div class="small-meta" style="margin-top:10px;">${escapeHTML(profile.grade || "")}${profile.className ? " • " + escapeHTML(profile.className) : ""}</div>
        <div class="small-meta">${escapeHTML(profile.status || "")}</div>
      </article>
    `;
  }

  function renderHome() {
    const profile = currentProfile();
    const announcementCount = state.announcements.filter(canViewAnnouncement).length;
    const homeworkCount = state.homework.filter(canViewHomework).length;
    const threadCount = state.discussions.filter(canViewThread).length;
    const profileCount = Object.values(state.profiles).length;
    const recentAnnouncements = state.announcements.filter(canViewAnnouncement).slice(0, 2);
    const recentHomework = state.homework.filter(canViewHomework).slice(0, 2);

    let recentFeed = [];
    recentAnnouncements.forEach(item => recentFeed.push({
      title: item.title,
      meta: `Announcement • ${fmtDate(item.createdAt)}`,
      body: item.body
    }));
    recentHomework.forEach(item => recentFeed.push({
      title: item.title,
      meta: `Homework • ${item.grade} / ${item.className} • ${fmtDate(item.createdAt)}`,
      body: item.body
    }));

    const maintenanceMessage = state.settings.maintenanceMode && isStudent()
      ? `
        <div class="panel" style="border-color:rgba(239,68,68,.25); background:rgba(239,68,68,.06);">
          <h3>Maintenance mode</h3>
          <p class="note" style="margin-top:8px;">The platform is temporarily restricted for students. You can still log out, but most sections are hidden until maintenance is off.</p>
        </div>
      `
      : "";

    return `
      <div class="page-head">
        <div>
          <h2>Home</h2>
          <p>Welcome back, ${escapeHTML(profile ? profile.displayName : "Guest")}. This beta is built for real school workflow, not for looking fancy and doing nothing.</p>
        </div>
        <span class="chip">${escapeHTML(profile ? profile.grade : "")}</span>
      </div>

      <div class="hero">
        <div class="hero-card">
          <h3>Qayrawan Platform Beta</h3>
          <p>
            A structured school platform for announcements, homework, grade discussions, and student profiles.
            Data is stored in this browser and can be backed up manually when needed.
          </p>
          <div class="hero-actions">
            <div class="tile" data-goto="announcements">
              <div class="icon">📢</div>
              <div class="label">Announcements</div>
              <div class="text">Official updates from the admin side.</div>
            </div>
            <div class="tile" data-goto="homework">
              <div class="icon">📝</div>
              <div class="label">Homework</div>
              <div class="text">Filtered by grade and class automatically.</div>
            </div>
            <div class="tile" data-goto="discussions">
              <div class="icon">💬</div>
              <div class="label">Discussions</div>
              <div class="text">Teachers post threads, students reply.</div>
            </div>
            <div class="tile" data-goto="profiles">
              <div class="icon">👤</div>
              <div class="label">Profiles</div>
              <div class="text">Preset avatars only, because rules exist.</div>
            </div>
          </div>
        </div>

        <div class="hero-card">
          <h3>Current status</h3>
          <p>
            Signed in as ${escapeHTML(profile ? profile.username : "Guest")}.
            <br />Role: ${escapeHTML(profile ? profile.role : "none")}.
            <br />Storage: local browser save with export/import backup.
          </p>
          <div class="subtle-box" style="margin-top:14px;">
            <div class="note">This is the beta stage. Keep it stable, test one thing at a time, and do not turn it into a feature swamp.</div>
          </div>
          ${maintenanceMessage}
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat"><strong>${announcementCount}</strong><span>Visible announcements</span></div>
        <div class="stat"><strong>${homeworkCount}</strong><span>Visible homework tasks</span></div>
        <div class="stat"><strong>${threadCount}</strong><span>Discussion threads</span></div>
        <div class="stat"><strong>${profileCount}</strong><span>Accounts in beta</span></div>
      </div>

      <div class="section">
        <div class="section-head">
          <div>
            <h3>Recent activity</h3>
            <p class="tiny">What is currently most visible to your account.</p>
          </div>
        </div>

        <div class="post-list">
          ${recentFeed.length ? recentFeed.map(item => `
            <article class="post open">
              <div class="post-head">
                <div>
                  <div class="post-title">${escapeHTML(item.title)}</div>
                  <div class="post-meta">${escapeHTML(item.meta)}</div>
                  <div class="post-preview">${escapeHTML(previewText(item.body))}</div>
                </div>
                <span class="chip">Recent</span>
              </div>
              <div class="post-body" style="display:block;">
                <div class="small-meta">${escapeHTML(item.body)}</div>
              </div>
            </article>
          `).join("") : `<div class="panel"><p class="note">Nothing to show yet.</p></div>`}
        </div>
      </div>
    `;
  }

  function renderAnnouncements() {
    const items = state.announcements.filter(canViewAnnouncement);
    return `
      <div class="page-head">
        <div>
          <h2>Announcements</h2>
          <p>Official updates from the teacher/admin side.</p>
        </div>
        <span class="chip">${items.length} visible</span>
      </div>
      <div class="post-list">
        ${items.length ? items.map(buildAnnouncement).join("") : `<div class="panel"><p class="note">No announcements available for your account.</p></div>`}
      </div>
    `;
  }

  function renderHomework() {
    const content = groupHomework();
    return `
      <div class="page-head">
        <div>
          <h2>Homework</h2>
          <p>Organized by grade and class so students do not need to hunt across multiple channels like it is a treasure map.</p>
        </div>
        <span class="chip">${state.homework.filter(canViewHomework).length} visible</span>
      </div>
      <div class="stack">
        ${content || `<div class="panel"><p class="note">No homework available for your account.</p></div>`}
      </div>
    `;
  }

  function renderDiscussions() {
    const items = state.discussions.filter(canViewThread);
    return `
      <div class="page-head">
        <div>
          <h2>Discussions</h2>
          <p>Teachers start the thread. Students reply underneath. Structure wins for once.</p>
        </div>
        <span class="chip">${items.length} visible</span>
      </div>
      <div class="stack">
        ${items.length ? items.map(buildThread).join("") : `<div class="panel"><p class="note">No discussion threads visible for your account.</p></div>`}
      </div>
    `;
  }

  function renderProfiles() {
    return buildProfilesPage();
  }

  function renderAbout() {
    const profile = currentProfile();
    return `
      <div class="page-head">
        <div>
          <h2>About</h2>
          <p>A compact school platform beta for Al-Qayrawan High School in Baghdad, Iraq.</p>
        </div>
        <span class="chip">${escapeHTML(profile ? profile.role : "guest")}</span>
      </div>

      <div class="hero">
        <div class="hero-card">
          <h3>What this beta does</h3>
          <p>
            It centralizes announcements, homework, discussions, and profiles into one school platform.
            The whole point is to reduce the mess of scattered channels and manual tracking.
          </p>
        </div>
        <div class="hero-card">
          <h3>Storage</h3>
          <p>
            This version saves data in the browser with export/import backup support.
            If you want true cloud sync later, that is a separate backend step.
          </p>
        </div>
      </div>

      <div class="panel">
        <div class="section-head">
          <div>
            <h3>Features included in beta</h3>
            <p class="tiny">The real ones. Not the “imagine it works” ones.</p>
          </div>
        </div>
        <div class="grid-2">
          <div class="subtle-box">
            <strong>Login / roles</strong>
            <p class="note">1 teacher/admin account and 5 student accounts.</p>
          </div>
          <div class="subtle-box">
            <strong>Announcements</strong>
            <p class="note">Teacher/admin publishes. Students read.</p>
          </div>
          <div class="subtle-box">
            <strong>Homework</strong>
            <p class="note">Filtered by grade and class.</p>
          </div>
          <div class="subtle-box">
            <strong>Discussions</strong>
            <p class="note">Grade threads with teacher prompts and student replies.</p>
          </div>
          <div class="subtle-box">
            <strong>Profiles</strong>
            <p class="note">Preset avatars only, editable bios, visible school directory.</p>
          </div>
          <div class="subtle-box">
            <strong>Settings / backup</strong>
            <p class="note">Compact mode, maintenance mode, logs, export/import.</p>
          </div>
        </div>
      </div>
    `;
  }

  function renderPage(page) {
    const settings = state.settings;
    if (settings.maintenanceMode && isStudent() && page !== "home") {
      page = "home";
    }

    state.currentPage = page;
    setActiveNav(page);
    closeDrawer();

    const pageWindow = els.pageWindow;
    pageWindow.classList.add("fade-out");

    window.setTimeout(() => {
      if (page === "home") pageWindow.innerHTML = renderHome();
      else if (page === "announcements") pageWindow.innerHTML = renderAnnouncements();
      else if (page === "homework") pageWindow.innerHTML = renderHomework();
      else if (page === "discussions") pageWindow.innerHTML = renderDiscussions();
      else if (page === "profiles") pageWindow.innerHTML = renderProfiles();
      else if (page === "about") pageWindow.innerHTML = renderAbout();
      else pageWindow.innerHTML = renderHome();

      pageWindow.classList.remove("fade-out");
      wirePageSpecificEvents();
      applyMaintenanceGate();
      updateAuditPanel();
      updateSyncChip();
    }, 110);
  }

  function updateAuditPanel() {
    if (!isAdmin()) return;
    const panel = els.auditPanel;
    if (!panel) return;
    panel.classList.toggle("hidden", !state.settings.showAuditPanel);
    if (!state.settings.showAuditPanel) return;

    const logList = els.auditLogList;
    logList.innerHTML = state.audit.length
      ? state.audit.map(log => `
          <div class="audit-item">
            <div class="post-title">${escapeHTML(log.type)}</div>
            <div class="post-meta">${escapeHTML(fmtDate(log.createdAt))}</div>
            <div class="post-preview" style="margin-top:8px;">${escapeHTML(log.detail)}</div>
          </div>
        `).join("")
      : `<div class="audit-item"><div class="note">No logs yet.</div></div>`;
  }

  function updateSyncChip() {
    const chip = els.syncChip;
    if (!chip) return;
    chip.textContent = state.settings.maintenanceMode && isStudent()
      ? "Maintenance"
      : state.currentUser
        ? "Saved locally"
        : "Saved locally";
  }

  function wirePageSpecificEvents() {
    const profileTarget = document.getElementById("profileTarget");
    if (profileTarget) {
      profileTarget.addEventListener("change", () => renderPage("profiles"));
    }

    const profileSaveBtn = document.getElementById("saveProfileBtn");
    if (profileSaveBtn) {
      profileSaveBtn.addEventListener("click", saveProfileFromPage);
    }

    document.querySelectorAll("[data-avatar]").forEach(btn => {
      btn.addEventListener("click", () => {
        const profile = targetProfileForEdit();
        if (!profile) return;
        profile.avatar = btn.getAttribute("data-avatar");
        saveAll();
        renderPage("profiles");
      });
    });

    document.querySelectorAll("[data-goto]").forEach(tile => {
      tile.addEventListener("click", () => {
        setPage(tile.getAttribute("data-goto"));
      });
    });

    document.querySelectorAll(".post-head[data-toggle='post'], .thread-head[data-toggle='thread'], .grade-head[data-toggle='grade'], .class-head[data-toggle='class']").forEach(head => {
      head.addEventListener("click", (e) => {
        const card = head.closest(".post, .thread, .grade-block, .class-block");
        if (card) card.classList.toggle("open");
      });
    });

    document.querySelectorAll("[data-reply-form]").forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const threadId = form.getAttribute("data-reply-form");
        const textarea = form.querySelector("textarea[name='reply']");
        const text = textarea.value.trim();
        if (!text) return;
        addReply(threadId, text);
        textarea.value = "";
        renderPage("discussions");
      });
    });
  }

  function targetProfileForEdit() {
    if (isAdmin()) {
      const sel = document.getElementById("profileTarget");
      const username = sel ? sel.value : state.currentUser.username;
      return state.profiles[username.toLowerCase()] || null;
    }
    return currentProfile();
  }

  function saveProfileFromPage() {
    const profile = targetProfileForEdit();
    if (!profile) return;

    const name = document.getElementById("profileName").value.trim();
    const status = document.getElementById("profileStatus").value.trim();
    const bio = document.getElementById("profileBio").value.trim();
    const gradeEl = document.getElementById("profileGrade");
    const classEl = document.getElementById("profileClass");

    profile.displayName = name || profile.displayName;
    profile.status = status;
    profile.bio = bio;
    if (isAdmin()) {
      profile.grade = gradeEl.value.trim();
      profile.className = classEl.value.trim();
    }

    saveAll();
    logAction("profile_update", `${profile.username} profile updated`);
    renderPage("profiles");
  }

  function addReply(threadId, body) {
    const thread = state.discussions.find(item => item.id === threadId);
    if (!thread || !canReply(thread)) return;
    const profile = currentProfile();
    thread.replies = thread.replies || [];
    thread.replies.unshift({
      id: uuid(),
      author: profile ? profile.displayName : state.currentUser.username,
      role: state.currentUser.role,
      body,
      createdAt: new Date().toISOString()
    });
    saveAll();
    logAction("thread_reply", `${thread.title} replied by ${state.currentUser.username}`);
  }

  function publishAnnouncement() {
    const title = els.announceTitle.value.trim();
    const body = els.announceBody.value.trim();
    const audience = els.announceAudience.value;
    if (!title || !body) {
      alert("Please fill in the announcement title and details.");
      return;
    }

    state.announcements.unshift({
      id: uuid(),
      title,
      body,
      audience,
      author: state.currentUser.username,
      createdAt: new Date().toISOString()
    });

    els.announceTitle.value = "";
    els.announceBody.value = "";
    saveAll();
    logAction("publish_announcement", title);
    if (state.settings.autoRefresh) renderPage("announcements");
    updateSyncChip();
  }

  function publishHomework() {
    const title = els.homeworkTitle.value.trim();
    const body = els.homeworkBody.value.trim();
    if (!title || !body) {
      alert("Please fill in the homework title and details.");
      return;
    }

    state.homework.unshift({
      id: uuid(),
      title,
      body,
      audience: els.homeworkAudience.value,
      grade: els.homeworkGrade.value,
      className: els.homeworkClass.value,
      subject: els.homeworkSubject.value,
      priority: els.homeworkPriority.value,
      dueDate: els.homeworkDue.value,
      author: state.currentUser.username,
      createdAt: new Date().toISOString()
    });

    els.homeworkTitle.value = "";
    els.homeworkBody.value = "";
    els.homeworkDue.value = "";
    saveAll();
    logAction("publish_homework", title);
    if (state.settings.autoRefresh) renderPage("homework");
    updateSyncChip();
  }

  function publishDiscussionThread() {
    const title = els.discussionTitle.value.trim();
    const body = els.discussionBody.value.trim();
    const grade = els.discussionGrade.value;
    if (!title || !body) {
      alert("Please fill in the discussion title and prompt.");
      return;
    }

    state.discussions.unshift({
      id: uuid(),
      grade,
      title,
      body,
      author: state.currentUser.username,
      createdAt: new Date().toISOString(),
      replies: []
    });

    els.discussionTitle.value = "";
    els.discussionBody.value = "";
    saveAll();
    logAction("publish_discussion", `${grade}: ${title}`);
    if (state.settings.autoRefresh) renderPage("discussions");
    updateSyncChip();
  }

  function clearAnnouncements() {
    if (!confirm("Clear all announcements?")) return;
    state.announcements = [];
    saveAll();
    logAction("clear_announcements", "Announcements cleared");
    renderPage("announcements");
  }

  function clearHomework() {
    if (!confirm("Clear all homework?")) return;
    state.homework = [];
    saveAll();
    logAction("clear_homework", "Homework cleared");
    renderPage("homework");
  }

  function clearDiscussions() {
    if (!confirm("Clear all discussions?")) return;
    state.discussions = [];
    saveAll();
    logAction("clear_discussions", "Discussions cleared");
    renderPage("discussions");
  }

  function clearLogs() {
    if (!confirm("Clear the audit log?")) return;
    state.audit = [];
    saveAll();
    renderPage(state.currentPage);
  }

  function exportBackup() {
    const data = {
      settings: state.settings,
      announcements: state.announcements,
      homework: state.homework,
      discussions: state.discussions,
      profiles: state.profiles,
      audit: state.audit
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qayrawan-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    logAction("export_backup", "Backup file exported");
  }

  function importBackup(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.settings) state.settings = { ...DEFAULT_SETTINGS, ...data.settings };
        if (Array.isArray(data.announcements)) state.announcements = data.announcements;
        if (Array.isArray(data.homework)) state.homework = data.homework;
        if (Array.isArray(data.discussions)) state.discussions = data.discussions;
        if (data.profiles && typeof data.profiles === "object") state.profiles = data.profiles;
        if (Array.isArray(data.audit)) state.audit = data.audit;
        normalizeState();
        saveAll();
        applyTheme();
        wireSettingsBindings();
        renderPage(state.currentPage || "home");
        alert("Backup imported.");
        logAction("import_backup", "Backup file imported");
      } catch (err) {
        alert("That backup file is invalid.");
      }
    };
    reader.readAsText(file);
  }

  function resetDemoData() {
    if (!confirm("Reset all demo data? This will restore the default beta content.")) return;
    const defaults = defaultState();
    state.settings = defaults.settings;
    state.profiles = defaults.profiles;
    state.announcements = defaults.announcements;
    state.homework = defaults.homework;
    state.discussions = defaults.discussions;
    state.audit = [];
    saveAll();
    wireSettingsBindings();
    applyTheme();
    renderPage("home");
  }

  function applyTheme() {
    updateTheme();
    els.compactSwitch.checked = state.settings.compact;
    els.motionSwitch.checked = state.settings.reduceMotion;
    els.timeSwitch.checked = state.settings.showTimestamps;
    els.collapseSwitch.checked = state.settings.collapseLongCards;
    els.refreshSwitch.checked = state.settings.autoRefresh;
    els.previewSwitch.checked = state.settings.showPreviews;
    els.maintenanceSwitch.checked = state.settings.maintenanceMode;
    els.auditSwitch.checked = state.settings.auditLog;
    els.showAuditSwitch.checked = state.settings.showAuditPanel;
  }

  function wireSettingsBindings() {
    const map = [
      ["compactSwitch", "compact"],
      ["motionSwitch", "reduceMotion"],
      ["timeSwitch", "showTimestamps"],
      ["collapseSwitch", "collapseLongCards"],
      ["refreshSwitch", "autoRefresh"],
      ["previewSwitch", "showPreviews"],
      ["maintenanceSwitch", "maintenanceMode"],
      ["auditSwitch", "auditLog"],
      ["showAuditSwitch", "showAuditPanel"]
    ];

    map.forEach(([id, key]) => {
      const el = els[id];
      if (!el) return;
      el.checked = !!state.settings[key];
      el.onchange = () => {
        state.settings[key] = el.checked;
        saveAll();
        applyTheme();
        applyMaintenanceGate();
        updateAuditPanel();
        updateSyncChip();
        if (key === "maintenanceMode" && state.settings.maintenanceMode && isStudent()) {
          renderPage("home");
        } else {
          renderPage(state.currentPage);
        }
      };
    });
  }

  function wireGeneralEvents() {
    els.togglePassBtn.addEventListener("click", () => {
      const input = els.loginPass;
      input.type = input.type === "password" ? "text" : "password";
      els.togglePassBtn.textContent = input.type === "password" ? "show" : "hide";
    });

    const attemptLogin = () => {
      const user = els.loginUser.value.trim();
      const pass = els.loginPass.value;
      const account = ACCOUNTS.find(a => a.username === user && a.password === pass);
      if (!account) {
        els.loginError.textContent = "Wrong username or password.";
        return;
      }

      els.loginError.textContent = "";
      setCurrentUser({ username: account.username, role: account.role });
      logAction("login", `${account.username} logged in as ${account.role}`);
      openApp();
      renderPage("home");
    };

    els.loginBtn.addEventListener("click", attemptLogin);
    [els.loginUser, els.loginPass].forEach(input => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") attemptLogin();
      });
    });

    els.menuBtn.addEventListener("click", toggleDrawer);
    els.closeDrawerBtn.addEventListener("click", closeDrawer);
    els.backdrop.addEventListener("click", closeDrawer);

    els.settingsBtn.addEventListener("click", () => {
      closeDrawer();
      openOverlay(els.settingsOverlay);
      updateAuditPanel();
    });

    els.drawerSettingsBtn.addEventListener("click", () => {
      closeDrawer();
      openOverlay(els.settingsOverlay);
      updateAuditPanel();
    });

    els.adminBtn.addEventListener("click", () => {
      closeDrawer();
      openOverlay(els.adminOverlay);
    });

    els.logoutBtn.addEventListener("click", doLogout);
    els.forceLogoutBtn.addEventListener("click", doLogout);
    els.adminLogoutBtn.addEventListener("click", doLogout);

    els.closeSettingsBtn.addEventListener("click", () => closeOverlay(els.settingsOverlay));
    els.closeAdminBtn.addEventListener("click", () => closeOverlay(els.adminOverlay));

    els.settingsOverlay.addEventListener("click", (e) => {
      if (e.target === els.settingsOverlay) closeOverlay(els.settingsOverlay);
    });
    els.adminOverlay.addEventListener("click", (e) => {
      if (e.target === els.adminOverlay) closeOverlay(els.adminOverlay);
    });

    els.exportBtn.addEventListener("click", exportBackup);
    els.importBtn.addEventListener("click", () => els.importFile.click());
    els.importFile.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) importBackup(file);
      e.target.value = "";
    });
    els.resetBtn.addEventListener("click", resetDemoData);

    els.publishAnnouncementBtn.addEventListener("click", publishAnnouncement);
    els.publishHomeworkBtn.addEventListener("click", publishHomework);
    els.publishDiscussionBtn.addEventListener("click", publishDiscussionThread);
    els.clearAnnouncementsBtn.addEventListener("click", clearAnnouncements);
    els.clearHomeworkBtn.addEventListener("click", clearHomework);
    els.clearDiscussionsBtn.addEventListener("click", clearDiscussions);
    els.clearLogsBtn.addEventListener("click", clearLogs);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllOverlays();
    });
  }

  function doLogout() {
    if (state.currentUser) logAction("logout", `${state.currentUser.username} logged out`);
    setCurrentUser(null);
    closeAllOverlays();
    els.loginUser.value = "";
    els.loginPass.value = "";
    els.loginPass.type = "password";
    els.togglePassBtn.textContent = "show";
    els.loginError.textContent = "";
    showLogin();
  }

  function showLogin() {
    els.loginScreen.classList.remove("hidden");
    els.appScreen.classList.add("hidden");
  }

  function showApp() {
    els.loginScreen.classList.add("hidden");
    els.appScreen.classList.remove("hidden");
  }

  function openApp() {
    showApp();
    applyTheme();
    applyMaintenanceGate();
    updateAuditPanel();
    updateSyncChip();
  }

  function setPage(page) {
    state.currentPage = page;
    renderPage(page);
  }

  function wirePageNav() {
    document.querySelectorAll(".menu-link[data-page]").forEach(btn => {
      btn.addEventListener("click", () => setPage(btn.getAttribute("data-page")));
    });
  }

  function renderQuickAccounts() {
    els.demoAccounts.innerHTML = ACCOUNTS.map(account => `
      <button class="quick-card" type="button" data-username="${escapeHTML(account.username)}" data-password="${escapeHTML(account.password)}">
        <strong>${escapeHTML(account.username)}</strong>
        <span>${escapeHTML(account.role.toUpperCase())} • ${escapeHTML(account.displayName)}</span>
        <span>${escapeHTML(account.grade)}${account.className ? " • " + escapeHTML(account.className) : ""}</span>
      </button>
    `).join("");

    els.demoAccounts.querySelectorAll("[data-username]").forEach(btn => {
      btn.addEventListener("click", () => {
        els.loginUser.value = btn.getAttribute("data-username");
        els.loginPass.value = btn.getAttribute("data-password");
        els.loginError.textContent = "";
      });
    });
  }

  function cacheElements() {
    const ids = [
      "loginScreen", "appScreen", "loginUser", "loginPass", "togglePassBtn", "loginBtn", "loginError",
      "demoAccounts", "menuBtn", "settingsBtn", "drawer", "closeDrawerBtn", "drawerSettingsBtn",
      "logoutBtn", "adminBtn", "backdrop", "pageWindow", "settingsOverlay", "closeSettingsBtn",
      "adminOverlay", "closeAdminBtn", "syncChip",
      "compactSwitch", "motionSwitch", "timeSwitch", "collapseSwitch", "refreshSwitch", "previewSwitch",
      "maintenanceSwitch", "auditSwitch", "showAuditSwitch", "settingsAdminPanel", "auditPanel", "auditLogList",
      "exportBtn", "importBtn", "importFile", "resetBtn", "forceLogoutBtn", "adminLogoutBtn",
      "announceTitle", "announceBody", "announceAudience", "publishAnnouncementBtn", "clearAnnouncementsBtn",
      "homeworkTitle", "homeworkBody", "homeworkGrade", "homeworkClass", "homeworkSubject", "homeworkPriority",
      "homeworkDue", "homeworkAudience", "publishHomeworkBtn", "clearHomeworkBtn",
      "discussionGrade", "discussionTitle", "discussionBody", "publishDiscussionBtn",
      "clearDiscussionsBtn", "clearLogsBtn"
    ];
    ids.forEach(id => els[id] = document.getElementById(id));
  }

  function init() {
    cacheElements();
    loadState();
    renderQuickAccounts();
    applyTheme();
    wireGeneralEvents();
    wirePageNav();
    wireSettingsBindings();

    if (state.currentUser) {
      openApp();
      renderPage("home");
    } else {
      showLogin();
    }

    updateAuditPanel();
    updateSyncChip();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
