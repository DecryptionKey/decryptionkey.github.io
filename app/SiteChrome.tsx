"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Check, ChevronDown, FileText, Images, Maximize2, Menu, X, type LucideIcon } from "lucide-react";

const primaryNavItems = [
  { id: "work", label: "Projects", href: "#work" },
  { id: "capabilities", label: "Capabilities", href: "#capabilities" },
  { id: "experience", label: "Experience", href: "#experience" },
];

const secondaryNavItems = [
  { id: "about", label: "About", href: "#about" },
  { id: "writing", label: "Blog", href: "/blog/" },
];

const navItems = [...primaryNavItems, ...secondaryNavItems];
const portfolioDomain = "https://manyewade.com";
const inquiryOptions = new Set([
  "Career opportunity",
  "Cloud security",
  "Security automation",
  "IAM & access governance",
  "Vulnerability management",
  "General inquiry",
]);

function RollLabel({ children }: { children: string }) {
  return (
    <span className="roll-label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export function SiteChrome() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightSurface, setLightSurface] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");
  const contactDialogRef = useRef<HTMLDivElement>(null);
  const contactCloseRef = useRef<HTMLButtonElement>(null);
  const contactTriggerRef = useRef<HTMLElement | null>(null);

  const openContact = () => {
    contactTriggerRef.current = document.activeElement as HTMLElement;
    setMenuOpen(false);
    setContactStatus("idle");
    setContactOpen(true);
  };

  const closeContact = () => {
    setContactOpen(false);
    window.setTimeout(() => contactTriggerRef.current?.focus(), 0);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const inquiry = String(formData.get("inquiry") ?? "");

    if (String(formData.get("_honey") ?? "")) {
      event.preventDefault();
      form.reset();
      setContactStatus("success");
      return;
    }

    if (!form.checkValidity() || !name || !email || message.length < 20 || !inquiryOptions.has(inquiry)) {
      event.preventDefault();
      form.reportValidity();
      setContactStatus("error");
      return;
    }

    const nextField = form.elements.namedItem("_next") as HTMLInputElement | null;
    const sourceField = form.elements.namedItem("_url") as HTMLInputElement | null;
    const productionPage = new URL(`${window.location.pathname}${window.location.search}${window.location.hash}`, portfolioDomain);
    productionPage.searchParams.delete("contact");
    if (nextField) nextField.value = `${portfolioDomain}/?contact=sent`;
    if (sourceField) sourceField.value = productionPage.href;
    setContactSubmitting(true);
    setContactStatus("idle");
  };

  useEffect(() => {
    const updateScroll = () => {
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(scrollable > 0 ? Math.min(100, (y / scrollable) * 100) : 0);
      document.documentElement.style.setProperty("--scroll-y", `${y}px`);

      const probe = Math.min(82, window.innerHeight / 2);
      const surface = [...document.querySelectorAll<HTMLElement>("main [data-header-surface]")]
        .find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probe && rect.bottom > probe;
        });
      setLightSurface(surface?.dataset.headerSurface === "light");
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => sectionObserver.observe(section));
    revealElements.forEach((element) => {
      if (reduceMotion) element.classList.add("is-visible");
      else revealObserver.observe(element);
    });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("keydown", handleKey);
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => contactCloseRef.current?.focus(), 0);

    const handleContactKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContact();
      if (event.key !== "Tab" || !contactDialogRef.current) return;
      const focusable = [...contactDialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]",
      )];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleContactKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleContactKey);
    };
  }, [contactOpen]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("contact") !== "sent") return;
    url.searchParams.delete("contact");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    const timer = window.setTimeout(() => {
      setContactOpen(true);
      setContactStatus("success");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <header
        className="site-header"
        data-scrolled={scrolled || undefined}
        data-surface={lightSurface ? "light" : "dark"}
      >
        <a className="brand" href="#top" aria-label="Ma'Nye Wade — home" onClick={() => setMenuOpen(false)}>
          <img className="brand-logo brand-logo-white" src="/media/brandmark.png" alt="" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavItems.map((item) => (
            <a key={item.id} href={item.href} data-active={active === item.id || undefined}>
              <RollLabel>{item.label}</RollLabel>
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <nav className="utility-nav" aria-label="More navigation">
            {secondaryNavItems.map((item) => (
              <a key={item.id} href={item.href} data-active={active === item.id || undefined}>
                <RollLabel>{item.label}</RollLabel>
              </a>
            ))}
          </nav>
          <button className="header-cta" type="button" onClick={openContact} aria-haspopup="dialog" data-contact-trigger>
            <RollLabel>Let&apos;s talk</RollLabel>
            <span className="header-cta-icon"><ArrowUpRight size={15} aria-hidden="true" /></span>
          </button>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className="mobile-nav" id="mobile-navigation" data-open={menuOpen || undefined} aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a key={item.id} href={item.href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
          <button type="button" onClick={openContact} data-contact-trigger>
            <span>06</span>Contact
          </button>
        </nav>
      </header>
      <a className="back-to-top" href="#top" data-visible={scrolled || undefined} aria-label="Back to top">
        <ArrowUp size={17} aria-hidden="true" />
      </a>
      <div
        className="contact-modal"
        role="presentation"
        data-contact-modal
        hidden={!contactOpen}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) closeContact();
        }}
      >
          <div
            className="contact-dialog"
            ref={contactDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            aria-describedby="contact-dialog-description"
          >
            <header className="contact-dialog-header">
              <div>
                <p>NEW CONNECTION / MW-01</p>
                <h2 id="contact-dialog-title">Let&apos;s turn security signals into action.</h2>
              </div>
              <button ref={contactCloseRef} type="button" onClick={closeContact} aria-label="Close contact form" data-contact-close>
                <X size={21} aria-hidden="true" />
              </button>
            </header>
            <p className="contact-dialog-description" id="contact-dialog-description">
              Reach out about cloud security, security automation, IAM, vulnerability management, or security engineering opportunities.
            </p>
            <form
              className="contact-form"
              action="https://formsubmit.co/me@manyewade.com"
              method="POST"
              acceptCharset="UTF-8"
              onSubmit={handleContactSubmit}
            >
              <input type="hidden" name="_subject" defaultValue="New portfolio contact from manyewade.com" />
              <input type="hidden" name="_template" defaultValue="table" />
              <input type="hidden" name="_next" defaultValue={`${portfolioDomain}/?contact=sent`} />
              <input type="hidden" name="_url" defaultValue={portfolioDomain} />
              <label>
                <span>Full name</span>
                <input type="text" name="name" autoComplete="name" required maxLength={100} placeholder="Your name" />
              </label>
              <label>
                <span>Email address</span>
                <input type="email" name="email" autoComplete="email" inputMode="email" required maxLength={254} placeholder="you@company.com" />
              </label>
              <label>
                <span>Organization <i>Optional</i></span>
                <input type="text" name="organization" autoComplete="organization" maxLength={120} placeholder="Company or team" />
              </label>
              <label>
                <span>What can I help with?</span>
                <select name="inquiry" defaultValue="Career opportunity" required>
                  <option>Career opportunity</option>
                  <option>Cloud security</option>
                  <option>Security automation</option>
                  <option>IAM &amp; access governance</option>
                  <option>Vulnerability management</option>
                  <option>General inquiry</option>
                </select>
              </label>
              <label className="contact-form-message">
                <span>Message</span>
                <textarea name="message" required minLength={20} maxLength={4000} rows={6} placeholder="Share a few details about the opportunity or project." />
              </label>
              <label className="contact-honeypot" aria-hidden="true">
                <span>Leave this field empty</span>
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="contact-form-footer">
                <p>Typical response time: 24–48 hours</p>
                <button type="submit" disabled={contactSubmitting}>
                  {contactSubmitting ? "Sending…" : "Send message"}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
              <div className="contact-form-status" role="status" aria-live="polite">
                <p data-status="success" data-contact-success hidden={contactStatus !== "success"}>Thanks—your message has been sent. I&apos;ll be in touch.</p>
                <p data-status="error" data-contact-error hidden={contactStatus !== "error"}>Please check the highlighted fields and try again. You can also email me at <a href="mailto:me@manyewade.com">me@manyewade.com</a>.</p>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}

export function InteractiveHeroMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const interactionSurface = wrap.parentElement ?? wrap;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 1;
    let height = 1;
    let columns = 19;
    let rows = 11;
    let frame = 0;
    let disposed = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { active: false, targetX: 0.5, targetY: 0.5, x: 0.5, y: 0.5 };
    const config = {
      worldWidth: 1580,
      worldHeight: 1650,
      cameraZ: 900,
      focalLength: 1160,
      curve: 390,
    };

    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const mobile = width < 720;
      columns = mobile ? 12 : 19;
      rows = mobile ? 8 : 11;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reduceMotion) draw(800);
    };

    const rotateX = (point: { x: number; y: number; z: number }, angle: number) => {
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      return { x: point.x, y: point.y * cosine - point.z * sine, z: point.y * sine + point.z * cosine };
    };

    const rotateY = (point: { x: number; y: number; z: number }, angle: number) => {
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      return { x: point.x * cosine + point.z * sine, y: point.y, z: -point.x * sine + point.z * cosine };
    };

    const project = (point: { x: number; y: number; z: number }, anchor: number) => {
      const depth = point.z + config.cameraZ;
      const scale = config.focalLength / Math.max(1, depth);
      return { x: width * 0.5 + point.x * scale, y: anchor + point.y * scale, depth };
    };

    const drawPanel = (time: number, top: boolean) => {
      const points: Array<Array<{ x: number; y: number; depth: number }>> = [];
      const tilt = (top ? 1.29 : -1.29) + (0.5 - pointer.y) * 0.12;
      const yaw = (pointer.x - 0.5) * 0.3;

      for (let row = 0; row < rows; row += 1) {
        const line = [];
        for (let column = 0; column < columns; column += 1) {
          const tx = column / (columns - 1);
          const ty = row / (rows - 1);
          const nx = tx - 0.5;
          const ny = ty - 0.5;
          const distance = Math.hypot(tx - pointer.x, ty - pointer.y);
          const influence = pointer.active && distance < 0.28 ? Math.pow(1 - distance / 0.28, 2) : 0;
          const wave = Math.sin(tx * 4.2 + ty * 2.3 + time * 0.00062) * 17;
          const ripple = Math.sin(distance * 31 - time * 0.004) * 11 * influence;
          let point = {
            x: nx * config.worldWidth,
            y: ny * config.worldHeight + (pointer.y - ty) * 24 * influence,
            z: (nx * nx + ny * ny) * config.curve + (top ? wave : -wave) + (top ? 1 : -1) * (44 * influence + ripple),
          };
          point = rotateY(point, yaw);
          point = rotateX(point, tilt);
          line.push(project(point, top ? 0 : height));
        }
        points.push(line);
      }

      const segment = (first: { x: number; y: number; depth: number }, second: { x: number; y: number; depth: number }) => {
        const depth = clamp((config.cameraZ + 640 - (first.depth + second.depth) * 0.5) / 1280);
        context.strokeStyle = `rgba(255,255,255,${mix(0.08, 0.34, depth)})`;
        context.lineWidth = mix(0.45, 1.15, depth);
        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.stroke();
      };

      points.forEach((line) => line.slice(0, -1).forEach((point, index) => segment(point, line[index + 1])));
      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows - 1; row += 1) segment(points[row][column], points[row + 1][column]);
      }
      points.flat().forEach((point) => {
        const depth = clamp((config.cameraZ + 640 - point.depth) / 1280);
        context.fillStyle = `rgba(255,255,255,${mix(0.18, 0.82, depth)})`;
        context.beginPath();
        context.arc(point.x, point.y, mix(0.7, 2.15, depth), 0, Math.PI * 2);
        context.fill();
      });
    };

    function draw(time: number) {
      if (disposed) return;
      pointer.x += ((pointer.active ? pointer.targetX : 0.5) - pointer.x) * 0.045;
      pointer.y += ((pointer.active ? pointer.targetY : 0.5) - pointer.y) * 0.045;
      context.clearRect(0, 0, width, height);
      drawPanel(time, true);
      drawPanel(time, false);
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    }

    const setPointer = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      pointer.targetX = clamp((clientX - rect.left) / Math.max(1, rect.width));
      pointer.targetY = clamp((clientY - rect.top) / Math.max(1, rect.height));
      pointer.active = true;
    };
    const onPointerMove = (event: PointerEvent) => setPointer(event.clientX, event.clientY);
    const onPointerLeave = () => { pointer.active = false; };
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    interactionSurface.addEventListener("pointermove", onPointerMove, { passive: true });
    interactionSurface.addEventListener("pointerleave", onPointerLeave);
    resize();
    if (!reduceMotion) frame = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      interactionSurface.removeEventListener("pointermove", onPointerMove);
      interactionSurface.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="hero-mesh" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} id="hero-mesh-canvas" />
    </div>
  );
}

type EmployerRole = {
  title: string;
  dates: string;
  location: string;
  bullets: string[];
};

type Capability = {
  number: string;
  label: string;
  title: string;
  text: string;
  evidence: string;
  skills: string[];
  icon: LucideIcon;
};

export function CapabilityCarousel({ capabilities }: { capabilities: Capability[] }) {
  return (
    <div className="capability-carousel" data-capability-carousel data-reveal>
      <div className="capability-carousel-context">
        <span>Capabilities in motion</span>
        <span>Cloud security · DevSecOps · Operations</span>
      </div>
      <div className="capability-viewport" aria-label="Cloud and DevSecOps capabilities carousel">
        <div className="capability-track">
          {[0, 1].map((sequence) => (
            <div className="capability-sequence" key={sequence} aria-hidden={sequence === 1 || undefined}>
              {capabilities.map((capability) => {
                const CapabilityIcon = capability.icon;
                return (
                  <article className="capability-slide" key={`${sequence}-${capability.number}`}>
                    <div className="capability-slide-top">
                      <span>{capability.number} / {capability.label}</span>
                      <CapabilityIcon size={30} strokeWidth={1.35} aria-hidden="true" />
                    </div>
                    <div className="capability-slide-copy">
                      <h3>{capability.title}</h3>
                      <p>{capability.text}</p>
                    </div>
                    <div className="capability-evidence">
                      <span>Applied evidence</span>
                      <p>{capability.evidence}</p>
                    </div>
                    <ul className="capability-skills" aria-label={`${capability.title} tools and skills`}>
                      {capability.skills.map((skill) => <li key={skill}>{skill}</li>)}
                    </ul>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type WorkMedia = {
  src: string;
  alt: string;
  caption: string;
};

type WorkWriteupSection = {
  heading: string;
  body: string;
  code?: string;
};

type SelectedWorkProject = {
  number: string;
  title: string;
  description: string;
  role: string;
  context: string;
  tags: string[];
  accent: string;
  icon: LucideIcon;
  link: string;
  linkLabel: string;
  gallery: WorkMedia[];
  writeupHref?: string;
  writeup?: {
    intro: string;
    sections: WorkWriteupSection[];
  };
};

function ProjectMedia({ media, eager = false, galleryMedia = false }: { media: WorkMedia; eager?: boolean; galleryMedia?: boolean }) {
  if (/\.mp4(?:$|\?)/i.test(media.src)) {
    return <video src={media.src} aria-label={media.alt} autoPlay loop muted playsInline preload={eager ? "auto" : "metadata"} data-project-gallery-media={galleryMedia || undefined} />;
  }
  return <img src={media.src} alt={media.alt} loading={eager ? "eager" : "lazy"} data-project-gallery-media={galleryMedia || undefined} />;
}

export function SelectedWorkShowcase({ projects }: { projects: SelectedWorkProject[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [motionDisabled, setMotionDisabled] = useState(true);
  const [viewerProject, setViewerProject] = useState<number | null>(null);
  const [viewerMode, setViewerMode] = useState<"gallery" | "writeup">("gallery");
  const [mediaIndex, setMediaIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionDisabled(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!showcaseRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.28 });
    observer.observe(showcaseRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeIndex === null || !inView || paused || motionDisabled || viewerProject !== null || projects.length < 2) return;
    const timer = window.setTimeout(() => {
      const nextIndex = (activeIndex + 1) % projects.length;
      setActiveIndex(nextIndex);
      setLastActiveIndex(nextIndex);
    }, 9000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, inView, motionDisabled, paused, projects.length, viewerProject]);

  const closeViewer = () => {
    setViewerProject(null);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  };

  const openViewer = (projectIndex: number, mode: "gallery" | "writeup") => {
    lastTriggerRef.current = document.activeElement as HTMLElement;
    setViewerProject(projectIndex);
    setViewerMode(mode);
    setMediaIndex(0);
  };

  useEffect(() => {
    if (viewerProject === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (viewerMode === "gallery" && event.key === "ArrowRight") {
        setMediaIndex((current) => (current + 1) % projects[viewerProject].gallery.length);
      }
      if (viewerMode === "gallery" && event.key === "ArrowLeft") {
        setMediaIndex((current) => (current - 1 + projects[viewerProject].gallery.length) % projects[viewerProject].gallery.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [projects, viewerMode, viewerProject]);

  return (
    <>
      <div
        ref={showcaseRef}
        className="selected-work-showcase"
        data-selected-work-showcase
        data-in-view={inView || undefined}
        data-collapsed={activeIndex === null || undefined}
        data-reveal
        data-paused={paused || undefined}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
        }}
      >
        <div className="work-accordion" aria-label="Selected project details">
          {projects.map((project, index) => {
            const ProjectIcon = project.icon;
            const isActive = activeIndex === index;
            return (
              <article className={`work-accordion-item accent-${project.accent}`} data-project-index={index} data-open={isActive || undefined} key={project.number}>
                <h3>
                  <button
                    type="button"
                    id={`project-trigger-${project.number}`}
                    aria-expanded={isActive}
                    aria-controls={`project-panel-${project.number}`}
                    data-project-trigger
                    onClick={() => {
                      if (isActive) {
                        setActiveIndex(null);
                      } else {
                        setActiveIndex(index);
                        setLastActiveIndex(index);
                      }
                    }}
                  >
                    <span className="work-accordion-number">{project.number}</span>
                    <span className="work-accordion-icon"><ProjectIcon size={18} strokeWidth={1.55} aria-hidden="true" /></span>
                    <span className="work-accordion-title">{project.title}</span>
                    <ChevronDown className="work-accordion-chevron" size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="work-accordion-panel"
                  id={`project-panel-${project.number}`}
                  role="region"
                  aria-labelledby={`project-trigger-${project.number}`}
                  aria-hidden={!isActive}
                  inert={!isActive ? true : undefined}
                  data-project-panel
                >
                  <div className="work-accordion-panel-inner">
                    <div className="work-mobile-media">
                      <button type="button" data-project-open-gallery onClick={() => openViewer(index, "gallery")} aria-label={`Open ${project.title} gallery`}>
                        <ProjectMedia media={project.gallery[0]} />
                        <span><Maximize2 size={15} aria-hidden="true" /> View gallery</span>
                      </button>
                    </div>
                    <div className="work-accordion-meta"><span>{project.role}</span><span>{project.context}</span></div>
                    <p>{project.description}</p>
                    <ul className="work-accordion-tags" aria-label={`${project.title} topics`}>
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                    <div className="work-accordion-actions">
                      <button type="button" data-project-open-gallery onClick={() => openViewer(index, "gallery")}>
                        <Images size={15} aria-hidden="true" /> Gallery <span>{project.gallery.length}</span>
                      </button>
                      {project.writeup && (
                        <button type="button" data-project-open-writeup onClick={() => openViewer(index, "writeup")}>
                          <FileText size={15} aria-hidden="true" /> Read write-up
                        </button>
                      )}
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.linkLabel} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                {isActive && !motionDisabled && <span className="work-accordion-progress" aria-hidden="true" />}
              </article>
            );
          })}
        </div>

        <div className="work-media-column" aria-live="polite">
          {projects.map((project, index) => (
            <button
              className="work-media-stage"
              type="button"
              key={project.number}
              hidden={lastActiveIndex !== index}
              data-project-media-stage={index}
              onClick={() => openViewer(index, "gallery")}
              aria-label={`Open ${project.title} gallery`}
            >
              <span className="work-media-frame">
                <ProjectMedia media={project.gallery[0]} eager={index === lastActiveIndex} />
                <span className="work-media-grid" aria-hidden="true" />
              </span>
              <span className="work-media-label">
                <span>{project.number} / {project.gallery.length} artifacts</span>
                <span>Open gallery <Maximize2 size={14} aria-hidden="true" /></span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {projects.map((project, projectIndex) => {
        const viewerOpen = viewerProject === projectIndex;
        const resolvedMediaIndex = mediaIndex % project.gallery.length;
        return (
          <div
            className="project-viewer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-viewer-title-${project.number}`}
            data-project-viewer={projectIndex}
            hidden={!viewerOpen}
            onMouseDown={closeViewer}
            key={`viewer-${project.number}`}
          >
            <div className="project-viewer-shell" onMouseDown={(event) => event.stopPropagation()}>
              <header className="project-viewer-header">
                <div>
                  <span>{project.number} / Selected work</span>
                  <h2 id={`project-viewer-title-${project.number}`}>{project.title}</h2>
                </div>
                <button ref={viewerOpen ? closeButtonRef : undefined} type="button" data-project-viewer-close onClick={closeViewer} aria-label="Close project viewer"><X size={22} aria-hidden="true" /></button>
              </header>
              <div className="project-viewer-tabs" role="tablist" aria-label="Project viewer modes">
                <button type="button" role="tab" data-project-viewer-tab="gallery" aria-selected={viewerMode === "gallery"} onClick={() => setViewerMode("gallery")}><Images size={16} aria-hidden="true" /> Gallery</button>
                {project.writeup && <button type="button" role="tab" data-project-viewer-tab="writeup" aria-selected={viewerMode === "writeup"} onClick={() => setViewerMode("writeup")}><FileText size={16} aria-hidden="true" /> Write-up</button>}
                <a href={project.link} target="_blank" rel="noopener noreferrer">Project source <ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>

              <div className="project-gallery" role="tabpanel" data-project-viewer-panel="gallery" hidden={viewerMode !== "gallery"}>
                <div className="project-gallery-stage">
                  <ProjectMedia media={project.gallery[resolvedMediaIndex]} eager galleryMedia />
                  <div className="project-gallery-caption"><span data-project-gallery-count>{String(resolvedMediaIndex + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}</span><p data-project-gallery-caption>{project.gallery[resolvedMediaIndex].caption}</p></div>
                  {project.gallery.length > 1 && (
                    <div className="project-gallery-controls">
                      <button type="button" data-project-gallery-previous aria-label="Previous image" onClick={() => setMediaIndex((current) => (current - 1 + project.gallery.length) % project.gallery.length)}><ArrowLeft size={18} aria-hidden="true" /></button>
                      <button type="button" data-project-gallery-next aria-label="Next image" onClick={() => setMediaIndex((current) => (current + 1) % project.gallery.length)}><ArrowRight size={18} aria-hidden="true" /></button>
                    </div>
                  )}
                </div>
                <div className="project-gallery-thumbs" aria-label="Gallery images">
                  {project.gallery.map((media, index) => (
                    <button
                      type="button"
                      data-project-gallery-thumb={index}
                      data-media-src={media.src}
                      data-media-alt={media.alt}
                      data-media-caption={media.caption}
                      data-media-video={/\.mp4(?:$|\?)/i.test(media.src) || undefined}
                      data-active={resolvedMediaIndex === index || undefined}
                      onClick={() => setMediaIndex(index)}
                      key={media.src}
                      aria-label={`View ${media.caption}`}
                    >
                      <ProjectMedia media={media} />
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {project.writeup && <article className="project-writeup" role="tabpanel" data-project-viewer-panel="writeup" hidden={viewerMode !== "writeup"}>
                <div className="project-writeup-intro">
                  <span>{project.role} · {project.context}</span>
                  <p>{project.writeup.intro}</p>
                  {project.writeupHref && <a href={project.writeupHref} target="_blank" rel="noopener noreferrer">Open raw Markdown <ArrowUpRight size={14} aria-hidden="true" /></a>}
                </div>
                <div className="project-writeup-sections">
                  {project.writeup.sections.map((section, index) => (
                    <section key={section.heading}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><h3>{section.heading}</h3><p>{section.body}</p>{section.code && <pre><code>{section.code}</code></pre>}</div>
                    </section>
                  ))}
                </div>
              </article>}
            </div>
          </div>
        );
      })}
    </>
  );
}

type Employer = {
  id: string;
  number: string;
  name: string;
  logo: string;
  activeLogo: string;
  period: string;
  summary: string;
  roles: EmployerRole[];
};

export function ExperienceCards({ employers }: { employers: Employer[] }) {
  const [activeEmployer, setActiveEmployer] = useState<string | null>(null);

  return (
    <div className="employer-experience" data-reveal>
      <div className="employer-grid" aria-label="Employment history">
        {employers.map((employer) => {
          const active = activeEmployer === employer.id;
          return (
            <button
              className="employer-card"
              key={employer.id}
              type="button"
              data-employer-card={employer.id}
              data-active={active || undefined}
              aria-expanded={active}
              aria-controls={`employer-panel-${employer.id}`}
              onClick={() => setActiveEmployer(active ? null : employer.id)}
            >
              <span className="employer-card-meta">
                <span>{employer.number}</span>
                <span>{employer.period}</span>
              </span>
              <span className="employer-wordmark">
                <span className={`employer-logo-stack employer-logo-stack-${employer.id}`}>
                  <img
                    className="employer-logo employer-logo-default"
                    src={employer.logo}
                    alt={`${employer.name} logo`}
                  />
                  <img
                    className={`employer-logo employer-logo-active employer-logo-active-${employer.id}`}
                    src={employer.activeLogo}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <small>{employer.summary}</small>
              </span>
              <span className="employer-card-footer">
                <span>{employer.roles.length} {employer.roles.length === 1 ? "role" : "roles"}</span>
                <span className="employer-card-action">
                  <span className="employer-action-label">{active ? "Close" : "View experience"}</span>
                  <span className="employer-toggle" aria-hidden="true" />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="employer-panels" aria-live="polite">
        {employers.map((employer) => {
          const active = activeEmployer === employer.id;
          return (
            <section
              className="employer-panel"
              id={`employer-panel-${employer.id}`}
              key={employer.id}
              data-employer-panel={employer.id}
              data-open={active || undefined}
              hidden={!active}
              aria-label={`${employer.name} experience`}
            >
              <header className="employer-panel-header">
                <span>Employer / {employer.number}</span>
                <h3>{employer.name}</h3>
                <p>{employer.summary}</p>
              </header>
              <div className="employer-role-list">
                {employer.roles.map((role) => (
                  <article className="employer-role" key={`${employer.id}-${role.title}`}>
                    <div className="employer-role-heading">
                      <div>
                        <p>{role.dates}</p>
                        <h4>{role.title}</h4>
                      </div>
                      <span>{role.location}</span>
                    </div>
                    <ul>
                      {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function IdentityUnlock() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));
    const ease = (value: number) => 1 - ((1 - value) ** 3);

    const render = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const scrollRange = Math.max(1, root.offsetHeight - window.innerHeight);
      const rawProgress = clamp(-rect.top / scrollRange);
      const progress = reduceMotion.matches ? 0.74 : rawProgress;
      const titleProgress = ease(range(progress, 0.02, 0.16));
      const cardProgress = ease(range(progress, 0.08, 0.22));
      const scanProgress = range(progress, 0.14, 0.3);
      const verifiedProgress = ease(range(progress, 0.26, 0.34));
      const copyProgress = ease(range(progress, 0.2, 0.32));
      const portraitProgress = reduceMotion.matches ? 0 : ease(range(progress, 0.34, 0.54));
      const exitProgress = reduceMotion.matches ? 0 : ease(range(progress, 0.78, 0.98));
      const titleLift = titleProgress * Math.min(270, window.innerHeight * 0.31);

      root.style.setProperty("--identity-title-y", `${-titleLift}px`);
      root.style.setProperty("--identity-card-opacity", `${cardProgress * (1 - exitProgress)}`);
      root.style.setProperty("--identity-card-y", `${(1 - cardProgress) * 72 - exitProgress * 54}px`);
      root.style.setProperty("--identity-card-scale", `${0.82 + cardProgress * 0.18 - exitProgress * 0.05}`);
      root.style.setProperty("--identity-scan-progress", `${scanProgress}`);
      root.style.setProperty("--identity-scan-opacity", `${scanProgress > 0 && scanProgress < 0.98 ? 1 : 0}`);
      root.style.setProperty("--identity-verified-opacity", `${verifiedProgress}`);
      root.style.setProperty("--identity-copy-opacity", `${copyProgress * (1 - exitProgress)}`);
      root.style.setProperty("--identity-copy-y", `${(1 - copyProgress) * 30}px`);
      root.style.setProperty("--identity-scene-opacity", `${1 - exitProgress}`);
      root.style.setProperty("--identity-atmosphere-y", `${exitProgress * -60}px`);
      root.style.setProperty("--identity-portrait-opacity", `${portraitProgress * (1 - exitProgress)}`);
      root.style.setProperty("--identity-portrait-scale", `${1.08 - portraitProgress * 0.08}`);
      root.dataset.headerSurface = rawProgress > 0.93 && !reduceMotion.matches ? "light" : "dark";
      root.dataset.verified = verifiedProgress > 0.5 ? "true" : "false";
    };

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender);
    reduceMotion.addEventListener("change", scheduleRender);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
      reduceMotion.removeEventListener("change", scheduleRender);
    };
  }, []);

  return (
    <div className="identity-unlock" ref={rootRef} data-header-surface="dark">
      <section className="identity-unlock-sticky" aria-labelledby="identity-unlock-title">
        <div className="identity-unlock-atmosphere" aria-hidden="true">
          <span className="identity-cloud identity-cloud-left" />
          <span className="identity-cloud identity-cloud-right" />
          <span className="identity-unlock-portrait" />
        </div>

        <div className="identity-unlock-title-wrap">
          <h2 id="identity-unlock-title">Say hello to Ma&apos;Nye</h2>
        </div>

        <div className="identity-unlock-stage" aria-hidden="true">
          <div className="identity-face-card">
            <svg className="identity-face-icon" viewBox="0 0 80 80" role="presentation">
              <circle className="identity-face-eye identity-face-eye-left" cx="25" cy="28" r="5" />
              <circle className="identity-face-eye identity-face-eye-right" cx="55" cy="28" r="5" />
              <path className="identity-face-smile" d="M22 49c4.5 8 11 12 18 12s13.5-4 18-12" pathLength="1" />
            </svg>
            <span className="identity-scan-line" />
            <span className="identity-verified-mark"><Check size={18} strokeWidth={2.2} /></span>
          </div>
        </div>

        <div className="identity-unlock-copy">
          <p>Identity verified. Meet the person behind the systems, safeguards, and security work.</p>
          <a href="#about">Meet Ma&apos;Nye</a>
        </div>

      </section>
    </div>
  );
}

export function PixelTransition({
  from,
  to,
  accent,
  fromSurface,
  toSurface,
  seed = 0,
}: {
  from: string;
  to: string;
  accent: string;
  fromSurface: "light" | "dark";
  toSurface: "light" | "dark";
  seed?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const grid = wrap?.querySelector<HTMLElement>(".pixel-grid");
    const trigger = wrap?.previousElementSibling as HTMLElement | null;
    if (!wrap || !grid || !trigger) return;

    const columns = 25;
    const rows = 6;
    const cells: HTMLElement[] = [];
    let revealOrder: HTMLElement[] = [];
    let settleOrder: HTMLElement[] = [];
    let frame = 0;

    const random = (initialSeed: number) => {
      let seed = initialSeed >>> 0;
      return () => {
        seed += 0x6d2b79f5;
        let value = seed;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
      };
    };

    const shuffled = <T,>(items: T[], seed: number) => {
      const output = [...items];
      const next = random(seed);
      for (let index = output.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(next() * (index + 1));
        [output[index], output[swap]] = [output[swap], output[index]];
      }
      return output;
    };

    const render = () => {
      frame = 0;
      const triggerBottom = trigger.getBoundingClientRect().bottom;
      const range = window.innerHeight * 1.3;
      const progress = Math.max(0, Math.min(1, (range - triggerBottom) / range));
      const resolvedProgress = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : progress;
      const revealProgress = Math.max(0, Math.min(1, resolvedProgress / 0.52));
      const settleProgress = Math.max(0, Math.min(1, (resolvedProgress - 0.52) / 0.48));
      const revealCount = Math.floor(revealProgress * revealOrder.length);
      const settleCount = Math.floor(settleProgress * settleOrder.length);
      const revealed = new Set(revealOrder.slice(0, revealCount));
      const settled = new Set(settleOrder.slice(0, settleCount));
      const solid = resolvedProgress >= 0.997;

      cells.forEach((cell) => {
        let color = from;
        if (revealed.has(cell)) color = cell.dataset.pixelColor ?? to;
        if (settled.has(cell)) color = to;
        if (solid) color = to;
        cell.style.backgroundColor = color;
        cell.style.boxShadow = `0 0 0 1px ${color}`;
      });

      wrap.classList.toggle("is-solid", solid);
      wrap.dataset.headerSurface = resolvedProgress > 0.64 ? toSurface : fromSurface;
    };

    const scheduleRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const build = () => {
      const next = random(4107 + seed);
      const active: HTMLElement[] = [];
      cells.length = 0;
      grid.replaceChildren();

      const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
      const cellSize = Math.max(18, Math.ceil(viewportWidth / columns) + 2);
      grid.style.gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`;
      grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
      grid.style.width = `${columns * cellSize}px`;
      grid.style.height = `${rows * cellSize}px`;
      grid.style.marginLeft = `${Math.max(0, Math.round((viewportWidth - columns * cellSize) / 2))}px`;
      wrap.style.height = `${rows * cellSize}px`;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const cell = document.createElement("span");
          const threshold = row === 0 ? 0.34 : row === 1 ? 0.5 : row < rows - 2 ? 0.7 : 1;
          const enabled = next() < threshold;
          if (enabled) {
            const choice = next();
            cell.dataset.pixelColor = choice < 0.56 ? to : choice < 0.82 ? from : accent;
            active.push(cell);
          } else {
            cell.dataset.pixelColor = from;
          }
          cell.className = "pixel-cell";
          cells.push(cell);
          grid.appendChild(cell);
        }
      }

      revealOrder = shuffled(active, 8123 + seed);
      settleOrder = shuffled(active, 12109 + seed);
      render();
    };

    const observer = new ResizeObserver(build);
    observer.observe(wrap);
    window.addEventListener("scroll", scheduleRender, { passive: true });
    build();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleRender);
    };
  }, [accent, from, fromSurface, seed, to, toSurface]);

  return (
    <div
      className="pixel-transition"
      ref={wrapRef}
      aria-hidden="true"
      data-header-surface={fromSurface}
      data-from-surface={fromSurface}
      data-to-surface={toSurface}
      data-pixel-seed={seed}
      style={{ "--pixel-from": from, "--pixel-to": to, "--pixel-accent": accent } as CSSProperties}
    >
      <div className="pixel-grid" />
    </div>
  );
}

export function AnimatedMetric({ end, suffix, label }: { end: number; suffix?: string; label: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(end);
        return;
      }
      const start = performance.now();
      const duration = 1100;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(end * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [end]);

  return (
    <article ref={ref} data-metric data-end={end} data-suffix={suffix ?? ""}>
      <strong>{value.toLocaleString()}{suffix}</strong>
      <span>{label}</span>
    </article>
  );
}
