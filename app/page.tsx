"use client";

import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Cloud,
  FileText,
  GraduationCap,
  LockKeyhole,
  Mail,
  MapPin,
  Radar,
  ShieldCheck,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { CapabilityCarousel, ExperienceCards, IdentityUnlock, InteractiveHeroMesh, PixelTransition, SelectedWorkShowcase, SiteChrome } from "./SiteChrome";
import { blogPosts } from "./blog/posts";

function LinkedInBrandIcon() {
  return (
    <svg className="social-brand-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function GitHubBrandIcon() {
  return (
    <svg className="social-brand-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .297A12 12 0 0 0 8.207 23.68c.6.113.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.52 11.52 0 0 1 12 6.096c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.814 1.103.814 2.222v3.293c0 .32.216.694.825.576A12 12 0 0 0 12 .297Z" />
    </svg>
  );
}

const featuredBlog = blogPosts.find((post) => post.featured) ?? blogPosts[0];

const projects = [
  {
    number: "01",
    title: "Patch Management & System Hardening",
    description:
      "Applied CIS Benchmark controls to an Ubuntu system, removed more than 25 unnecessary services, patched vulnerable packages, and verified the hardened state.",
    role: "Security Engineer",
    context: "University at Albany · CYBR 203",
    tags: ["CIS Benchmarks", "Linux", "DevSecOps"],
    accent: "blue",
    icon: TerminalSquare,
    link: "https://www.youtube.com/watch?v=QFtDD9ih5nY&list=PL0yP_N3UFEcDNkwq395DJPbo-5hMOMpeQ",
    linkLabel: "Watch breakdown",
    gallery: [
      { src: "/media/projects/project-1/patch-log.gif", alt: "Ubuntu package patching workflow", caption: "Package inventory and patch application" },
      { src: "/media/projects/project-1/root-login.gif", alt: "Ubuntu root login being locked", caption: "Root login hardening and verification" },
      { src: "/media/projects/project-1/hardened-checklist.png", alt: "Completed hardened configuration checklist", caption: "Final CIS-aligned configuration checklist" },
    ],
    writeupHref: "/writeups/patch-management-system-hardening.md",
    writeup: {
      intro: "This lab focused on patching known vulnerabilities and hardening a live Ubuntu VM against the CIS Ubuntu 24.04 LTS Benchmark.",
      sections: [
        { heading: "Patch management", body: "System packages were audited with apt, available fixes were inventoried, and a forced update was used to verify the system reflected the latest installed security patches.", code: "sudo apt update && sudo apt upgrade" },
        { heading: "CIS benchmark hardening", body: "More than 25 unused services and client packages were identified and removed, including legacy file-transfer, web, discovery, mail, and remote-access services. A verification script confirmed each package was removed instead of merely stopped." },
        { heading: "Outcome", body: "Root login was locked and the resulting system state was checked against a hardened configuration checklist, producing a repeatable baseline for future verification." },
      ],
    },
  },
  {
    number: "02",
    title: "Identity & Authentication Controls",
    description:
      "Implemented least privilege with structured user and group management, then enforced strong password policy controls through PAM on Ubuntu Linux.",
    role: "Security Engineer",
    context: "University at Albany · CYBR 203",
    tags: ["IAM", "PAM", "Least Privilege"],
    accent: "violet",
    icon: LockKeyhole,
    link: "https://www.youtube.com/watch?v=sG8wSahN45o&list=PL0yP_N3UFEcDNkwq395DJPbo-5hMOMpeQ&index=3",
    linkLabel: "Watch breakdown",
    gallery: [
      { src: "/media/projects/project-2/password-policy.gif", alt: "Ubuntu password policy rejecting weak passwords", caption: "Password quality policy validation" },
      { src: "/media/projects/project-2/add-users.png", alt: "Ubuntu terminal creating test users", caption: "Creating representative user accounts" },
      { src: "/media/projects/project-2/groups.png", alt: "Ubuntu group membership configuration", caption: "Least-privilege group assignment" },
      { src: "/media/projects/project-2/install-policy.png", alt: "Installing PAM password-quality controls", caption: "PAM policy module installation" },
      { src: "/media/projects/project-2/policy-test.png", alt: "Testing Ubuntu authentication policy", caption: "Authentication policy enforcement test" },
    ],
    writeupHref: "/writeups/identity-authentication-controls.md",
    writeup: {
      intro: "This lab applied practical identity and access management controls to Ubuntu, focusing on least privilege and authentication hardening.",
      sections: [
        { heading: "User and group management", body: "Two representative users were created. Alice received membership in an administrators group while Bob remained a standard user, demonstrating access assignment based on role rather than convenience.", code: "sudo groupadd admins\nsudo usermod -aG admins alice" },
        { heading: "Password policy enforcement", body: "The libpam-pwquality module enforced operating-system password requirements. Weak, common, short, and username-matching passwords were rejected during validation." },
        { heading: "Outcome", body: "The final environment demonstrated both preventive authentication controls and a clear least-privilege account structure suitable for repeatable administration." },
      ],
    },
  },
  {
    number: "03",
    title: "Storage, Encryption & Recovery",
    description:
      "Protected data at rest using LUKS encryption and strict permissions, then simulated data loss to validate a complete backup and recovery workflow.",
    role: "Security Engineer",
    context: "University at Albany · CYBR 203",
    tags: ["LUKS", "Backup", "Recovery"],
    accent: "cyan",
    icon: ShieldCheck,
    link: "https://www.youtube.com/watch?v=4mVUKRE6dnA&list=PL0yP_N3UFEcDNkwq395DJPbo-5hMOMpeQ&index=2",
    linkLabel: "Watch breakdown",
    gallery: [
      { src: "/media/projects/project-3/backup.gif", alt: "Creating a protected Ubuntu backup", caption: "Creating the secured archive" },
      { src: "/media/projects/project-3/file-permissions.gif", alt: "Applying restrictive Linux file permissions", caption: "Restrictive file-permission workflow" },
      { src: "/media/projects/project-3/backup.png", alt: "Completed Ubuntu backup archive", caption: "Backup artifact verification" },
      { src: "/media/projects/project-3/data-deletion.gif", alt: "Simulated data loss in Ubuntu", caption: "Controlled data-loss simulation" },
      { src: "/media/projects/project-3/recovery.png", alt: "Recovered files after restore", caption: "Successful recovery and integrity check" },
    ],
    writeupHref: "/writeups/storage-encryption-recovery.md",
    writeup: {
      intro: "This lab combined data-at-rest protection, restrictive access controls, and a tested backup and recovery procedure on an Ubuntu VM.",
      sections: [
        { heading: "File permissions", body: "A secure_data directory was created with owner-only read, write, and execute permissions.", code: "mkdir secure_data\nchmod 700 secure_data" },
        { heading: "LUKS encryption", body: "Because the VM lacked full-disk encryption, an encrypted container was created, formatted with LUKS, opened with a passphrase, mounted, and used to protect the existing sensitive-data directory." },
        { heading: "Backup and recovery", body: "A compressed archive was created, the source data was deliberately removed, and the archive was restored to validate recoverability rather than merely assuming the backup was usable.", code: "tar -czvf backup.tar.gz secure_data" },
      ],
    },
  },
  {
    number: "04",
    title: "RSS to SharePoint News",
    description:
      "Built a Power Automate pipeline that ingests trusted RSS updates, normalizes the content, and automatically publishes SharePoint News for internal teams.",
    role: "Vulnerability Management Specialist",
    context: "Marist University",
    tags: ["Automation", "SharePoint", "Power Platform"],
    accent: "orange",
    icon: Workflow,
    link: "https://github.com/DecryptionKey/RSS-to-SharePoint-News/tree/main",
    linkLabel: "View project",
    gallery: [
      { src: "/media/projects/project-4/sharepoint-site.png", alt: "SharePoint News site populated from RSS", caption: "Published SharePoint News experience" },
      { src: "/media/projects/project-4/rss-photo.png", alt: "Power Automate RSS workflow", caption: "RSS ingestion and content-processing flow" },
      { src: "/media/projects/project-4/rss-output.png", alt: "RSS content transformed for SharePoint", caption: "Normalized output ready for publishing" },
    ],
    writeupHref: "/writeups/rss-to-sharepoint-news.md",
    writeup: {
      intro: "This Power Automate flow retrieves updates from trusted RSS feeds and publishes them as SharePoint News items for internal teams.",
      sections: [
        { heading: "Workflow", body: "The automation triggers when an RSS source changes, retrieves the new item, and passes its content through a normalization pipeline." },
        { heading: "Content transformation", body: "Incoming JSON or HTML is converted into compatible plain text before the SharePoint HTTP connector and Repost API create the news item." },
        { heading: "Operational value", body: "The result removes repetitive manual publishing while helping internal teams track industry updates and vulnerability advisories from approved sources." },
      ],
    },
  },
];

const capabilities = [
  {
    number: "01",
    label: "Cloud & Infrastructure",
    title: "Cloud Security Engineering",
    text: "Secure cloud environments by translating baseline requirements into actionable controls across major cloud platforms.",
    evidence: "Mapped 1,100+ AWS, Azure, and GCP controls to NIST CSF 2.0 and reviewed cloud exposure through Wiz CSPM.",
    skills: ["Wiz CSPM", "AWS", "Azure", "GCP", "NIST CSF 2.0"],
    icon: Cloud,
  },
  {
    number: "02",
    label: "Automation & Delivery",
    title: "Security Automation & DevSecOps",
    text: "Build repeatable security workflows that move findings into the systems engineering teams already use.",
    evidence: "Migrating legacy Wiz automation into multi-step Jira and Slack routing based on severity, ownership, and queue.",
    skills: ["Wiz Workflows", "Jira", "Slack", "Automation", "DevSecOps"],
    icon: Workflow,
  },
  {
    number: "03",
    label: "Detection & Response",
    title: "Cloud Incident Response & Threat Hunting",
    text: "Investigate identity and data-access activity, contain compromised cloud principals, and preserve defensible evidence.",
    evidence: "Traced unauthorized AWS activity through CloudTrail and CloudWatch, contained an IAM user, and preserved logs with S3 Object Lock.",
    skills: ["CloudTrail", "CloudWatch", "Amazon S3", "IAM", "MITRE ATT&CK"],
    icon: Radar,
  },
  {
    number: "04",
    label: "Platform Hardening",
    title: "Container & Linux Security",
    text: "Reduce attack surface across Linux hosts and containers with secure defaults, verification scripts, and layered isolation.",
    evidence: "Audited 26 packages, locked root access, applied LUKS encryption, and deployed a non-root Nginx Docker container with limited ports.",
    skills: ["Linux", "Docker", "Bash", "CIS Benchmarks", "LUKS"],
    icon: TerminalSquare,
  },
  {
    number: "05",
    label: "Exposure Management",
    title: "Vulnerability Detection & Remediation",
    text: "Prioritize exploitable risk by combining alert triage, CVE research, scanning results, and practical remediation guidance.",
    evidence: "Classified Defender XDR alerts, documented 20+ critical CVEs and Nessus findings, and reduced senior review time by 25%.",
    skills: ["Defender XDR", "Tenable Nessus", "CVE Analysis", "Alert Triage", "Remediation"],
    icon: ShieldCheck,
  },
  {
    number: "06",
    label: "Identity Security",
    title: "Identity & Access Security",
    text: "Strengthen access paths through group governance, multi-factor authentication, least privilege, and identity-focused investigation.",
    evidence: "Reviewed Active Directory groups through Wiz logs and Group Manager, with hands-on IAM, PAM, and Duo MFA administration.",
    skills: ["Active Directory", "IAM", "Duo MFA", "PAM", "Least Privilege"],
    icon: LockKeyhole,
  },
];

const technologies = [
  { id: "aws", name: "Amazon Web Services", logo: "/media/skills/aws.svg" },
  { id: "azure", name: "Microsoft Azure", logo: "/media/skills/azure.svg" },
  { id: "gcp", name: "Google Cloud", logo: "/media/skills/gcp.svg" },
  { id: "wiz", name: "Wiz CSPM", logo: "/media/skills/wiz.svg" },
  { id: "docker", name: "Docker", logo: "/media/skills/docker.svg" },
  { id: "linux", name: "Linux", logo: "/media/skills/linux-mark.svg" },
  { id: "bash", name: "Bash", logo: "/media/skills/bash.svg" },
  { id: "jira", name: "Jira", logo: "/media/skills/jira.svg" },
  { id: "slack", name: "Slack", logo: "/media/skills/slack.svg" },
];

const certifications = [
  {
    number: "01",
    title: "AWS Security Fundamentals",
    issuer: "Amazon Web Services",
    issued: "March 2026",
    focus: "IAM · Encryption · Network security · Logging",
    logo: "/media/certifications/aws.svg",
    logoClass: "aws",
    href: "https://www.linkedin.com/in/manyewade/overlay/Certifications/2036601957/treasury/?profileId=ACoAAEyqau0BJ4wgvcLgDtK4DqBxKKybtDm-26Q",
  },
  {
    number: "02",
    title: "Certified AI Security Fundamentals",
    issuer: "Cyera",
    issued: "July 2026",
    focus: "AI Security Posture Management",
    logo: "/media/certifications/cyera-ai-security.png",
    logoClass: "cyera",
    href: "https://www.linkedin.com/in/manyewade/overlay/Certifications/645127109/treasury/?profileId=ACoAAEyqau0BJ4wgvcLgDtK4DqBxKKybtDm-26Q",
  },
  {
    number: "03",
    title: "Certified DSPM Fundamentals",
    issuer: "Cyera",
    issued: "July 2026",
    focus: "DSPM · Data lifecycle management",
    logo: "/media/certifications/cyera-dspm.png",
    logoClass: "cyera",
    href: "https://www.linkedin.com/in/manyewade/overlay/Certifications/644497097/treasury/?profileId=ACoAAEyqau0BJ4wgvcLgDtK4DqBxKKybtDm-26Q",
  },
  {
    number: "04",
    title: "Security Pro — Strengthen Security Foundations",
    issuer: "Microsoft AI Skills Fest 2026",
    issued: "June 2026",
    focus: "Security foundations · Microsoft security",
    logo: "/media/certifications/microsoft.svg",
    logoClass: "microsoft",
    href: "https://www.credly.com/badges/9f4fc45f-eee9-4248-a31c-4e1d5125f3a5/public_url",
  },
  {
    number: "05",
    title: "NIST Cybersecurity Framework 2.0 Primer",
    issuer: "LinkedIn Learning · Pearson",
    issued: "June 2026",
    focus: "NIST CSF 2.0 · Framework implementation",
    logo: "/media/certifications/linkedin.svg",
    logoClass: "linkedin",
    href: "https://www.linkedin.com/learning/certificates/d163edb3ba9f067d4b3f8c74a61e489c48aac462a878109e017729a5629d5cf2/",
  },
  {
    number: "06",
    title: "Threat Modeling for Security Professionals",
    issuer: "LinkedIn Learning",
    issued: "June 2026",
    focus: "Threat modeling · Secure design",
    logo: "/media/certifications/linkedin.svg",
    logoClass: "linkedin",
    href: "https://www.linkedin.com/learning/certificates/ddd9f4b6b8cb72a26203ff5a864080b9358e5813fdd6cdd74b5f560573bfa9db/",
  },
  {
    number: "07",
    title: "Student SOC Program Foundations",
    issuer: "Microsoft",
    issued: "July 2025",
    focus: "Threat detection · Monitoring · Incident response",
    logo: "/media/certifications/microsoft.svg",
    logoClass: "microsoft",
    href: "https://www.linkedin.com/in/manyewade/overlay/Certifications/2036896465/treasury/?profileId=ACoAAEyqau0BJ4wgvcLgDtK4DqBxKKybtDm-26Q",
  },
  {
    number: "08",
    title: "Introduction to Incident Command System — ICS-100",
    issuer: "FEMA",
    issued: "May 2026",
    focus: "Incident command · Response coordination",
    logo: "/media/certifications/fema.png",
    logoClass: "fema",
    href: "https://www.linkedin.com/in/manyewade/overlay/Certifications/1972923309/treasury/?profileId=ACoAAEyqau0BJ4wgvcLgDtK4DqBxKKybtDm-26Q",
  },
  {
    number: "09",
    title: "Introduction to the National Incident Management System",
    issuer: "FEMA",
    issued: "May 2026",
    focus: "NIMS · Multi-agency coordination",
    logo: "/media/certifications/fema.png",
    logoClass: "fema",
    href: "https://www.linkedin.com/in/manyewade/overlay/Certifications/1973003784/treasury/?profileId=ACoAAEyqau0BJ4wgvcLgDtK4DqBxKKybtDm-26Q",
  },
  {
    number: "10",
    title: "National Response Framework — An Introduction",
    issuer: "FEMA",
    issued: "May 2026",
    focus: "National response · Incident coordination",
    logo: "/media/certifications/fema.png",
    logoClass: "fema",
    href: "https://www.linkedin.com/in/manyewade/overlay/Certifications/1973070592/treasury/?profileId=ACoAAEyqau0BJ4wgvcLgDtK4DqBxKKybtDm-26Q",
  },
];

const employers = [
  {
    id: "paramount",
    number: "01",
    name: "Paramount",
    logo: "/media/paramount-logo-white.svg",
    activeLogo: "/media/paramount-logo-white.svg",
    period: "Jun 2026—Present",
    summary: "Cloud security automation & governance",
    roles: [
      {
        title: "Information Security Intern (Cloud Security)",
        dates: "June 2026—Present",
        location: "Hauppauge, New York",
        bullets: [
          "Migrating legacy automation rules by building multi-step Wiz workflows that integrate with Jira and Slack, routing security findings to designated owners and Jira queues by severity.",
          "Mapped 1,100+ security baseline controls across AWS, Azure, and GCP to NIST Cybersecurity Framework 2.0, documenting retired, split, moved, and ambiguous mappings for stakeholder validation.",
          "Reviewed Active Directory security groups using Wiz JSON logs and Group Manager, documenting ownership and usage in Confluence to support access consolidation and naming standardization.",
        ],
      },
    ],
  },
  {
    id: "marist",
    number: "02",
    name: "Marist University",
    logo: "/media/marist-university-logo-white.svg",
    activeLogo: "/media/marist-university-logo-primary.svg",
    period: "Sep 2024—Dec 2025",
    summary: "Security operations & vulnerability management",
    roles: [
      {
        title: "Email Security and Vulnerability Management Intern",
        dates: "May 2025—December 2025",
        location: "Poughkeepsie, New York",
        bullets: [
          "Analyzed and classified Microsoft Defender XDR alerts, reducing senior analyst review time by 25% and supporting consistent escalation decisions.",
          "Documented 20+ critical CVEs and Tenable Nessus findings, summarizing severity, exploitability, and remediation guidance for prioritization.",
          "Converted six incident-response playbooks into visual flowcharts, standardizing investigation and escalation procedures for the cybersecurity team.",
          "Authored security blog posts and co-hosted awareness sessions, translating technical threats into practical guidance for students, faculty, and staff.",
        ],
      },
      {
        title: "IT Help Desk Technician",
        dates: "September 2024—May 2025",
        location: "Poughkeepsie, New York",
        bullets: [
          "Resolved 300+ Tier I/II requests for a community of 5,000+ users through TeamDynamix, phone, email, and walk-in support channels.",
          "Troubleshot Cisco AnyConnect VPN, account access, and Cisco Duo multi-factor authentication issues while following user-verification and escalation procedures.",
          "Authored knowledge-base articles and standard operating procedures that contributed to a 20% reduction in recurring support requests.",
          "Maintained 98% availability across campus WEPA printing services through preventive maintenance and hardware troubleshooting.",
        ],
      },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <SiteChrome />

      <section className="hero" id="top" data-header-surface="dark">
        <InteractiveHeroMesh />
        <div className="hero-glow" aria-hidden="true" />
        <p className="eyebrow reveal"><Activity size={13} aria-hidden="true" /> Cloud security · Security automation · IAM</p>
        <div className="hero-copy reveal delay-1">
          <h1>
            Securing systems.
            <span>Strengthening resilience.</span>
          </h1>
          <div className="hero-support">
            <p>
              I&apos;m Ma&apos;Nye Wade, an information security professional turning multi-cloud controls, findings, and identity data into clear, actionable security work.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#work">
                Explore my work <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-status reveal delay-2">
          <span className="status-dot" aria-hidden="true" />
          <span>Open to cloud security &amp; security engineering opportunities</span>
          <span className="hero-location"><MapPin size={12} aria-hidden="true" /> New York · USA</span>
        </div>
      </section>

      <section className="manifesto section-pad" data-header-surface="light">
        <img className="brand-watermark" src="/media/brandmark.png" alt="" aria-hidden="true" />
        <div className="section-label" data-reveal>
          <span>01</span>
          <p>My approach</p>
        </div>
        <div className="manifesto-copy" data-reveal>
          <p className="kicker">FROM FINDING TO OWNER TO ACTION</p>
          <h2>
            I turn cloud security signals into <em>clear ownership, reliable workflows, and defensible controls.</em>
          </h2>
          <p className="body-copy">
            That means automating how findings reach engineering teams, mapping controls to NIST CSF 2.0, reviewing access with context, and documenting decisions so teams can validate and act.
          </p>
        </div>
      </section>

      <PixelTransition
        from="#f3f4ee"
        to="#071019"
        accent="#527dff"
        fromSurface="light"
        toSurface="dark"
        seed={101}
      />

      <section className="work section-pad" id="work" data-header-surface="dark">
        <div className="section-intro" data-reveal>
          <div className="section-label light">
            <span>02</span>
            <p>Selected work</p>
          </div>
          <div>
            <p className="kicker light-kicker">HANDS-ON, EVIDENCE-DRIVEN</p>
            <h2>Projects that test controls, investigate activity, and prove the outcome.</h2>
          </div>
        </div>

        <SelectedWorkShowcase projects={projects} />
      </section>

      <PixelTransition
        from="#071019"
        to="#f3f4ee"
        accent="#74dcff"
        fromSurface="dark"
        toSurface="light"
        seed={202}
      />

      <section className="capabilities section-pad" id="capabilities" data-header-surface="light">
        <div className="section-label" data-reveal>
          <span>03</span>
          <p>Capabilities</p>
        </div>
        <div className="capability-heading" data-reveal>
          <p className="kicker">CLOUD SECURITY / DEVSECOPS / OPERATIONS</p>
          <h2>Cloud-focused security work—from controls and automation to detection and response.</h2>
        </div>
        <CapabilityCarousel capabilities={capabilities} />
        <div className="framework-strip" aria-label="Cloud and DevOps technologies" data-reveal>
          <div className="framework-track">
            {[...technologies, ...technologies].map((technology, index) => (
              <span className={`technology-logo technology-logo-${technology.id}`} key={`${technology.id}-${index}`}>
                <img src={technology.logo} alt="" />
                <span className="sr-only">{technology.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <PixelTransition
        from="#f3f4ee"
        to="#1c46ad"
        accent="#74dcff"
        fromSurface="light"
        toSurface="dark"
        seed={303}
      />

      <section className="experience section-pad" id="experience" data-header-surface="dark">
        <div className="section-intro experience-intro" data-reveal>
          <div className="section-label light">
            <span>04</span>
            <p>Experience</p>
          </div>
          <div>
            <p className="kicker light-kicker">CLOUD SECURITY, GOVERNANCE &amp; OPERATIONS</p>
            <h2>Experience turning multi-cloud controls, security findings, and access data into action.</h2>
          </div>
        </div>
        <ExperienceCards employers={employers} />
        <div className="certifications-showcase" id="certifications" data-certification-carousel data-reveal>
          <div className="certifications-intro">
            <div className="certifications-heading">
              <p className="kicker light-kicker">ATTESTATIONS &amp; CERTIFICATIONS</p>
              <h3>Verified learning across cloud, data, AI, and security operations.</h3>
            </div>
            <div className="certifications-summary">
              <p>
                A complete set of career-relevant credentials spanning cloud security, secure delivery, governance, SOC operations, and coordinated incident response. Every card opens the underlying credential.
              </p>
              <a
                className="certifications-all-link"
                href="https://www.linkedin.com/in/manyewade/details/certifications/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View all certifications <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="certification-carousel-context">
            <span>Credentials in motion</span>
            <span>10 verified credentials · Hover to pause · Select to verify</span>
          </div>
          <div className="certification-viewport" aria-label="Career-relevant certifications carousel">
            <div className="certification-track">
              {[0, 1].map((sequence) => (
                <div className="certification-sequence" key={sequence} aria-hidden={sequence === 1 || undefined}>
                  {certifications.map((certification) => (
                    <a
                      className="certification-card"
                      data-certification-card
                      href={certification.href}
                      id={sequence === 0 ? `certification-${certification.number}` : undefined}
                      key={`${sequence}-${certification.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={sequence === 1 ? -1 : undefined}
                      aria-label={`View ${certification.title} credential`}
                    >
                      <span className="certification-card-topline">
                        <span>{certification.number}</span>
                        <span>{certification.issuer}</span>
                      </span>
                      <span className={`certification-logo certification-logo-${certification.logoClass}`}>
                        <img src={certification.logo} alt={`${certification.issuer} logo`} />
                      </span>
                      <span className="certification-card-copy">
                        <strong>{certification.title}</strong>
                        <span>{certification.focus}</span>
                      </span>
                      <span className="certification-card-footer">
                        <span>Issued {certification.issued}</span>
                        <span>View credential <ArrowUpRight size={14} aria-hidden="true" /></span>
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <IdentityUnlock />

      <section className="about section-pad" id="about" data-header-surface="light">
        <div className="about-portrait" data-reveal>
          <div className="portrait-frame">
            <img src="/media/manye-wade-headshot.png" alt="Ma'Nye Wade" loading="lazy" />
            <div className="portrait-code" aria-hidden="true">IDENTITY VERIFIED / MW-01</div>
          </div>
        </div>
        <div className="about-copy" data-reveal>
          <div className="section-label">
            <span>05</span>
            <p>About</p>
          </div>
          <p className="kicker">CURIOUS BY NATURE. DEFENSIVE BY DESIGN.</p>
          <h2>I care about the details that make systems safer and teams stronger.</h2>
          <p>
            I&apos;m pursuing a B.S. in Cybersecurity: Cyber Operations with a minor in Computer Science, followed by an M.S. in Cyber Risk Management and Compliance at the University at Albany.
          </p>
          <p>
            I enjoy tackling complex security problems from the ground up and communicating the result in a way that helps people take action.
          </p>
          <div className="education-card">
            <span><GraduationCap size={17} aria-hidden="true" /> Education</span>
            <div>
              <strong>University at Albany</strong>
              <p>B.S. Cybersecurity: Cyber Operations · Expected 2027</p>
              <p>M.S. Cyber Risk Management & Compliance · Expected 2028</p>
            </div>
          </div>
          <a className="button button-dark" href="https://drive.google.com/file/d/1T7wFdkA3-S9NpQudZIZzRLwFwKWMeS5l/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            View résumé <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <PixelTransition
        from="#f3f4ee"
        to="#e8eae4"
        accent="#1d4ed8"
        fromSurface="light"
        toSurface="light"
        seed={505}
      />

      <section className="writing section-pad" id="writing" data-header-surface="light">
        <div className="writing-heading-row" data-reveal>
          <div className="section-label">
            <span>06</span>
            <p>Blog</p>
          </div>
          <a className="writing-all-link" href="/blog/">
            View all articles <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <article className="featured-article" data-reveal>
          <a className="article-visual" href={featuredBlog.href} aria-label={"Read " + featuredBlog.title}>
            <img src={featuredBlog.image} alt={featuredBlog.imageAlt} loading="lazy" />
          </a>
          <div className="article-copy">
            <FileText className="article-icon" size={25} strokeWidth={1.5} aria-hidden="true" />
            <p className="kicker">{featuredBlog.category.replace(" / ", " · ")}</p>
            <h2><a href={featuredBlog.href}>{featuredBlog.title}</a></h2>
            <p>{featuredBlog.excerpt}</p>
            <div className="article-footer">
              <span className="reading-time">{featuredBlog.readTime} · {featuredBlog.publishedShort}</span>
              <span className="article-status"><span /> Published</span>
            </div>
            <a className="article-read-link" href={featuredBlog.href}>
              Read article <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </article>
      </section>

      <section className="contact section-pad" id="contact" data-header-surface="dark">
        <div className="contact-grid" aria-hidden="true" />
        <p className="kicker light-kicker" data-reveal>CLOUD SECURITY / AUTOMATION / IAM</p>
        <h2 data-reveal>Building a team that needs cloud security work to move from signal to action?</h2>
        <div className="contact-actions" data-reveal>
          <a className="button button-light" href="mailto:me@manyewade.com">
            <Mail size={16} aria-hidden="true" /> Email Ma&apos;Nye <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/manyewade" target="_blank" rel="noopener noreferrer"><LinkedInBrandIcon /> LinkedIn</a>
          <a href="https://www.github.com/decryptionkey" target="_blank" rel="noopener noreferrer"><GitHubBrandIcon /> GitHub</a>
        </div>
      </section>

      <footer>
        <a className="footer-brand" href="#top" aria-label="Ma'Nye Wade — back to top">
          <img className="footer-logo" src="/media/horizontal-logo.png" alt="Ma'Nye Wade" />
        </a>
        <p>Cloud security · Security automation · IAM</p>
        <p>© 2026 Ma&apos;Nye Wade</p>
      </footer>
    </main>
  );
}
