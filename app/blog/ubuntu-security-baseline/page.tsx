import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, FileCheck2, TerminalSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Building an Ubuntu Security Lab and Baseline Assessment — Ma'Nye Wade",
  description: "A hands-on account of building an ARM64 Ubuntu virtual machine, inspecting its services and network exposure, and documenting three baseline security risks.",
  openGraph: {
    title: "Building an Ubuntu Security Lab and Baseline Assessment",
    description: "From virtual machine setup to evidence-backed security findings.",
    type: "article",
    images: [{ url: "/media/security-baseline.png", width: 1600, height: 900, alt: "Ubuntu security risks identified during the baseline assessment" }],
  },
};

const inspectionCommands = `# Identify the operating system
lsb_release -a

# Find open TCP and UDP ports
sudo netstat -tuln

# List running services
systemctl list-units --type=service --state=running

# Record the network configuration
ip addr
ifconfig

# Find accounts with an interactive shell
cat /etc/passwd | grep -E "/bin/bash|/bin/sh"

# Count installed packages
dpkg -l | wc -l`;

export default function UbuntuSecurityBaselineArticle() {
  return (
    <main className="blog-page">
      <header className="blog-header">
        <Link className="blog-header-brand" href="/#top" aria-label="Ma'Nye Wade — home">
          <img src="/media/brandmark.png" alt="Ma'Nye Wade" />
        </Link>
        <Link className="blog-back-link" href="/#writing">
          <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
        </Link>
      </header>

      <article>
        <header className="blog-hero">
          <div className="blog-hero-copy">
            <p className="blog-kicker">FIELD NOTES / LINUX SECURITY</p>
            <h1>Building an Ubuntu security lab and establishing a baseline.</h1>
            <p className="blog-deck">
              A baseline is most useful when it comes from evidence. For this lab, I built an Ubuntu virtual machine, documented its users, services, packages, and network exposure, then translated the raw output into three concrete security risks.
            </p>
            <div className="blog-meta" aria-label="Article details">
              <span><Clock3 size={15} aria-hidden="true" /> 7 min read</span>
              <span>February 12, 2026</span>
              <span>Ma&apos;Nye Wade</span>
            </div>
          </div>
          <figure className="blog-cover">
            <img src="/media/security-baseline.png" alt="Three Ubuntu security risks identified during the baseline assessment" />
            <figcaption>Three risks surfaced by the initial assessment</figcaption>
          </figure>
        </header>

        <div className="blog-article-layout">
          <aside className="blog-toc" aria-label="Article contents">
            <p>In this field note</p>
            <ol>
              <li><a href="#objective">Lab objective</a></li>
              <li><a href="#environment">Build the environment</a></li>
              <li><a href="#installation">Install Ubuntu</a></li>
              <li><a href="#inspection">Inspect the system</a></li>
              <li><a href="#findings">Document findings</a></li>
              <li><a href="#risks">Assess the risks</a></li>
              <li><a href="#next">Define next steps</a></li>
            </ol>
          </aside>

          <div className="blog-body">
            <section id="objective">
              <span className="blog-section-number">01</span>
              <h2>The objective: build, inspect, then assess.</h2>
              <p>
                This CYBR 203 lab began with three objectives: create a working system, identify its components, and establish a baseline security posture. The deliverable required more than showing a successful installation. I also needed to document the operating system, installed services, network configuration, open ports, and default users, then explain the risks revealed by that evidence.
              </p>
              <div className="blog-callout">
                <FileCheck2 size={23} aria-hidden="true" />
                <div>
                  <strong>The assessment came before hardening.</strong>
                  <p>The purpose was to preserve the initial state and identify what needed attention—not to quietly change the system before documenting it.</p>
                </div>
              </div>
            </section>

            <section id="environment">
              <span className="blog-section-number">02</span>
              <h2>A reproducible ARM64 Ubuntu lab.</h2>
              <p>
                I created the <strong>Ubuntu-Security-Lab</strong> virtual machine in UTM using its QEMU virtualization engine. The saved configuration used an ARM64 architecture with four CPU cores, 8 GB of memory, 30 GB of storage, and hardware OpenGL acceleration. Ubuntu was attached as the boot image.
              </p>
              <figure className="blog-source-figure blog-source-figure-compact">
                <img src="/media/blog-vm-summary.png" alt="UTM summary for the Ubuntu-Security-Lab virtual machine" />
                <figcaption>The VM configuration captured before installation.</figcaption>
              </figure>
              <p>
                Keeping the lab isolated in a VM made it possible to inspect, change, and later harden the environment without placing the host system at risk. It also created a known platform that could be revisited for later identity, storage, patching, and container-security exercises.
              </p>
            </section>

            <section id="installation">
              <span className="blog-section-number">03</span>
              <h2>Install the operating system and desktop environment.</h2>
              <p>
                During the Ubuntu installation, I used the standard server option, accepted the DHCP network configuration for interface <code>enp0s1</code>, configured guided storage with LVM, created the local <code>nye</code> account, and installed OpenSSH Server. I did not add any featured server snaps.
              </p>
              <p>
                After the server installation completed, I updated the package index and installed the Ubuntu desktop packages to add a graphical environment.
              </p>
              <div className="blog-code-heading"><TerminalSquare size={18} aria-hidden="true" /> Desktop environment setup</div>
              <pre><code>{`# Check for package and dependency updates
sudo apt update

# Install the task package manager
sudo apt install tasksel

# Install the Ubuntu desktop environment
sudo apt install ubuntu-desktop`}</code></pre>
              <p>
                This expanded the system beyond a minimal server build. That choice was important to the later assessment because desktop components introduced additional packages and background services that became part of the attack-surface review.
              </p>
            </section>

            <section id="inspection">
              <span className="blog-section-number">04</span>
              <h2>Turn the system state into reviewable evidence.</h2>
              <p>
                Once the VM was operational, I collected the information required by the lab. Each command answered a specific baseline question: which OS was running, which ports were listening, which services were active, how the network was configured, which accounts could use a shell, and how many packages were installed.
              </p>
              <pre><code>{inspectionCommands}</code></pre>
              <p>
                The commands produced a repeatable snapshot rather than a visual guess based on the desktop. That distinction matters: a service can be active without a visible application window, and a listener can expose the system even when the corresponding feature is not being used intentionally.
              </p>
            </section>

            <section id="findings">
              <span className="blog-section-number">05</span>
              <h2>What the inspection found.</h2>
              <p>
                The VM received <code>192.168.64.6/24</code> on interface <code>enp0s1</code>. The assessment identified four listening ports, two local user accounts, 35 running services, and 1,687 installed packages.
              </p>
              <figure className="blog-source-figure">
                <img src="/media/blog-system-inspection-findings.png" alt="System inspection findings showing network configuration, users, services, and packages" />
                <figcaption>The findings summary produced for the lab presentation.</figcaption>
              </figure>
              <div className="blog-findings-grid">
                <div className="blog-finding">
                  <span>Network</span>
                  <strong>4 open ports</strong>
                  <p>22/SSH, 53/DNS, 631/CUPS, and 5353/mDNS.</p>
                </div>
                <div className="blog-finding">
                  <span>Identity</span>
                  <strong>2 user accounts</strong>
                  <p><code>root</code> with UID 0 and <code>nye</code> with UID 1000.</p>
                </div>
                <div className="blog-finding">
                  <span>Services</span>
                  <strong>35 active services</strong>
                  <p>Including SSH, NetworkManager, GNOME, Avahi, and CUPS.</p>
                </div>
                <div className="blog-finding">
                  <span>Software</span>
                  <strong>1,687 packages</strong>
                  <p>The desktop installation significantly expanded the software footprint.</p>
                </div>
              </div>
            </section>

            <section id="risks">
              <span className="blog-section-number">06</span>
              <h2>Three risks emerged from the baseline.</h2>
              <p>
                The raw findings became useful only after connecting them to exposure and impact. I documented three conditions that deserved follow-up.
              </p>
              <div className="blog-risk-list">
                <article>
                  <span>Risk 01</span>
                  <h3>SSH exposed on port 22</h3>
                  <p>SSH was listening on all interfaces at <code>0.0.0.0:22</code>. Without additional controls such as key-based authentication or brute-force protection, the service created a remote attack path.</p>
                </article>
                <article>
                  <span>Risk 02</span>
                  <h3>Multiple unnecessary services running</h3>
                  <p>The 35 active services included CUPS, Avahi/mDNS, and GNOME Remote Desktop. Every unneeded service adds code, configuration, and potential vulnerabilities to the attack surface.</p>
                </article>
                <article>
                  <span>Risk 03</span>
                  <h3>No active firewall configuration detected</h3>
                  <p>UFW was not shown as active during the assessment. Without host firewall rules, the listening services depended on external network controls to limit access.</p>
                </article>
              </div>
            </section>

            <section id="next">
              <span className="blog-section-number">07</span>
              <h2>The baseline defined the next hardening priorities.</h2>
              <p>
                The assessment did not treat every installed component as a vulnerability. Instead, it created a list of questions that could be validated before making changes: Is SSH required? Which teams or workflows need printing and mDNS? Should the desktop environment be present on this system? Which inbound connections should the host accept?
              </p>
              <ul className="blog-checklist">
                <li><CheckCircle2 size={18} aria-hidden="true" /> Restrict and harden SSH if remote administration is required.</li>
                <li><CheckCircle2 size={18} aria-hidden="true" /> Disable services that have no documented owner or operational purpose.</li>
                <li><CheckCircle2 size={18} aria-hidden="true" /> Enable and validate a host firewall policy using UFW or an equivalent control.</li>
                <li><CheckCircle2 size={18} aria-hidden="true" /> Repeat the same inspection after hardening to prove the system state changed as intended.</li>
              </ul>
            </section>

            <section className="blog-conclusion">
              <p className="blog-kicker">THE TAKEAWAY</p>
              <h2>The value of a baseline is making assumptions visible.</h2>
              <p>
                Building the VM was only the first step. The security work began when installation choices were translated into observable users, packages, services, and ports—and those observations were turned into specific risks and defensible next actions.
              </p>
              <Link href="/#work">Explore the related hardening projects <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </section>
          </div>
        </div>
      </article>

      <footer className="blog-footer">
        <Link href="/#top" aria-label="Ma'Nye Wade — home"><img src="/media/horizontal-logo.png" alt="Ma'Nye Wade" /></Link>
        <p>Cloud security · Security automation · IAM</p>
        <p>© 2026 Ma&apos;Nye Wade</p>
      </footer>
    </main>
  );
}
