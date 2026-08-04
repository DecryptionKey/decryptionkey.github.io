(() => {
  const ready = () => {
    const header = document.querySelector(".site-header");
    const progressBar = document.querySelector(".scroll-progress span");
    const backToTop = document.querySelector(".back-to-top");
    const menuButton = document.querySelector(".menu-button");
    const mobileNav = document.querySelector(".mobile-nav");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = reduceMotionQuery.matches;

    const initHeroMesh = () => {
      const canvas = document.querySelector("#hero-mesh-canvas");
      const wrap = canvas?.closest(".hero-mesh");
      const interactionSurface = wrap?.parentElement;
      const context = canvas?.getContext("2d");
      if (!canvas || !wrap || !interactionSurface || !context) return;

      let width = 1;
      let height = 1;
      let columns = 19;
      let rows = 11;
      const pointer = { active: false, targetX: .5, targetY: .5, x: .5, y: .5 };
      const config = { worldWidth: 1580, worldHeight: 1650, cameraZ: 900, focalLength: 1160, curve: 390 };
      const clamp = (value) => Math.max(0, Math.min(1, value));
      const mix = (from, to, amount) => from + (to - from) * amount;
      const rotateX = (point, angle) => {
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        return { x: point.x, y: point.y * cosine - point.z * sine, z: point.y * sine + point.z * cosine };
      };
      const rotateY = (point, angle) => {
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        return { x: point.x * cosine + point.z * sine, y: point.y, z: -point.x * sine + point.z * cosine };
      };
      const project = (point, anchor) => {
        const depth = point.z + config.cameraZ;
        const scale = config.focalLength / Math.max(1, depth);
        return { x: width * .5 + point.x * scale, y: anchor + point.y * scale, depth };
      };
      const drawPanel = (time, top) => {
        const points = [];
        const tilt = (top ? 1.29 : -1.29) + (.5 - pointer.y) * .12;
        const yaw = (pointer.x - .5) * .3;
        for (let row = 0; row < rows; row += 1) {
          const line = [];
          for (let column = 0; column < columns; column += 1) {
            const tx = column / (columns - 1);
            const ty = row / (rows - 1);
            const nx = tx - .5;
            const ny = ty - .5;
            const distance = Math.hypot(tx - pointer.x, ty - pointer.y);
            const influence = pointer.active && distance < .28 ? Math.pow(1 - distance / .28, 2) : 0;
            const wave = Math.sin(tx * 4.2 + ty * 2.3 + time * .00062) * 17;
            const ripple = Math.sin(distance * 31 - time * .004) * 11 * influence;
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
        const segment = (first, second) => {
          const depth = clamp((config.cameraZ + 640 - (first.depth + second.depth) * .5) / 1280);
          context.strokeStyle = `rgba(255,255,255,${mix(.08, .34, depth)})`;
          context.lineWidth = mix(.45, 1.15, depth);
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
          context.fillStyle = `rgba(255,255,255,${mix(.18, .82, depth)})`;
          context.beginPath();
          context.arc(point.x, point.y, mix(.7, 2.15, depth), 0, Math.PI * 2);
          context.fill();
        });
      };
      const draw = (time) => {
        pointer.x += ((pointer.active ? pointer.targetX : .5) - pointer.x) * .045;
        pointer.y += ((pointer.active ? pointer.targetY : .5) - pointer.y) * .045;
        context.clearRect(0, 0, width, height);
        drawPanel(time, true);
        drawPanel(time, false);
        if (!reduceMotion) requestAnimationFrame(draw);
      };
      const resize = () => {
        const rect = wrap.getBoundingClientRect();
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        columns = width < 720 ? 12 : 19;
        rows = width < 720 ? 8 : 11;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        if (reduceMotion) draw(800);
      };
      interactionSurface.addEventListener("pointermove", (event) => {
        const rect = wrap.getBoundingClientRect();
        pointer.targetX = clamp((event.clientX - rect.left) / Math.max(1, rect.width));
        pointer.targetY = clamp((event.clientY - rect.top) / Math.max(1, rect.height));
        pointer.active = true;
      }, { passive: true });
      interactionSurface.addEventListener("pointerleave", () => { pointer.active = false; });
      new ResizeObserver(resize).observe(wrap);
      resize();
      if (!reduceMotion) requestAnimationFrame(draw);
    };

    const initPixelTransitions = () => {
      document.querySelectorAll(".pixel-transition").forEach((wrap) => {
        const grid = wrap.querySelector(".pixel-grid");
        const trigger = wrap.previousElementSibling;
        if (!grid || !trigger) return;

        const from = wrap.style.getPropertyValue("--pixel-from").trim() || "#071019";
        const to = wrap.style.getPropertyValue("--pixel-to").trim() || "#f3f4ee";
        const accent = wrap.style.getPropertyValue("--pixel-accent").trim() || "#74dcff";
        const fromSurface = wrap.dataset.fromSurface || "dark";
        const toSurface = wrap.dataset.toSurface || "light";
        const transitionSeed = Number(wrap.dataset.pixelSeed || 0);
        const columns = 25;
        const rows = 6;
        const cells = [];
        let revealOrder = [];
        let settleOrder = [];
        let frame = 0;

        const random = (initialSeed) => {
          let seed = initialSeed >>> 0;
          return () => {
            seed += 0x6d2b79f5;
            let value = seed;
            value = Math.imul(value ^ (value >>> 15), value | 1);
            value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
            return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
          };
        };
        const shuffled = (items, seed) => {
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
          const range = window.innerHeight * 1.3;
          const progress = Math.max(0, Math.min(1, (range - trigger.getBoundingClientRect().bottom) / range));
          const resolved = reduceMotion ? 1 : progress;
          const revealCount = Math.floor(Math.max(0, Math.min(1, resolved / .52)) * revealOrder.length);
          const settleCount = Math.floor(Math.max(0, Math.min(1, (resolved - .52) / .48)) * settleOrder.length);
          const revealed = new Set(revealOrder.slice(0, revealCount));
          const settled = new Set(settleOrder.slice(0, settleCount));
          const solid = resolved >= .997;
          cells.forEach((cell) => {
            let color = from;
            if (revealed.has(cell)) color = cell.dataset.pixelColor || to;
            if (settled.has(cell)) color = to;
            if (solid) color = to;
            cell.style.backgroundColor = color;
            cell.style.boxShadow = `0 0 0 1px ${color}`;
          });
          wrap.classList.toggle("is-solid", solid);
          wrap.dataset.headerSurface = resolved > .64 ? toSurface : fromSurface;
        };
        const scheduleRender = () => {
          if (!frame) frame = requestAnimationFrame(render);
        };
        const build = () => {
          const next = random(4107 + transitionSeed);
          const active = [];
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
              const threshold = row === 0 ? .34 : row === 1 ? .5 : row < rows - 2 ? .7 : 1;
              if (next() < threshold) {
                const choice = next();
                cell.dataset.pixelColor = choice < .56 ? to : choice < .82 ? from : accent;
                active.push(cell);
              } else {
                cell.dataset.pixelColor = from;
              }
              cell.className = "pixel-cell";
              cells.push(cell);
              grid.appendChild(cell);
            }
          }
          revealOrder = shuffled(active, 8123 + transitionSeed);
          settleOrder = shuffled(active, 12109 + transitionSeed);
          render();
        };
        new ResizeObserver(build).observe(wrap);
        window.addEventListener("scroll", scheduleRender, { passive: true });
        build();
      });
    };

    const initIdentityUnlock = () => {
      const root = document.querySelector(".identity-unlock");
      if (!root) return;

      let frame = 0;
      const clamp = (value) => Math.max(0, Math.min(1, value));
      const range = (value, start, end) => clamp((value - start) / (end - start));
      const ease = (value) => 1 - ((1 - value) ** 3);

      const render = () => {
        frame = 0;
        const rect = root.getBoundingClientRect();
        const scrollRange = Math.max(1, root.offsetHeight - window.innerHeight);
        const rawProgress = clamp(-rect.top / scrollRange);
        const progress = reduceMotionQuery.matches ? .74 : rawProgress;
        const titleProgress = ease(range(progress, .02, .16));
        const cardProgress = ease(range(progress, .08, .22));
        const scanProgress = range(progress, .14, .3);
        const verifiedProgress = ease(range(progress, .26, .34));
        const copyProgress = ease(range(progress, .2, .32));
        const portraitProgress = reduceMotionQuery.matches ? 0 : ease(range(progress, .34, .54));
        const exitProgress = reduceMotionQuery.matches ? 0 : ease(range(progress, .78, .98));
        const titleLift = titleProgress * Math.min(270, window.innerHeight * .31);

        root.style.setProperty("--identity-title-y", `${-titleLift}px`);
        root.style.setProperty("--identity-card-opacity", `${cardProgress * (1 - exitProgress)}`);
        root.style.setProperty("--identity-card-y", `${(1 - cardProgress) * 72 - exitProgress * 54}px`);
        root.style.setProperty("--identity-card-scale", `${.82 + cardProgress * .18 - exitProgress * .05}`);
        root.style.setProperty("--identity-scan-progress", `${scanProgress}`);
        root.style.setProperty("--identity-scan-opacity", `${scanProgress > 0 && scanProgress < .98 ? 1 : 0}`);
        root.style.setProperty("--identity-verified-opacity", `${verifiedProgress}`);
        root.style.setProperty("--identity-copy-opacity", `${copyProgress * (1 - exitProgress)}`);
        root.style.setProperty("--identity-copy-y", `${(1 - copyProgress) * 30}px`);
        root.style.setProperty("--identity-scene-opacity", `${1 - exitProgress}`);
        root.style.setProperty("--identity-atmosphere-y", `${exitProgress * -60}px`);
        root.style.setProperty("--identity-portrait-opacity", `${portraitProgress * (1 - exitProgress)}`);
        root.style.setProperty("--identity-portrait-scale", `${1.08 - portraitProgress * .08}`);
        root.dataset.headerSurface = rawProgress > .93 && !reduceMotionQuery.matches ? "light" : "dark";
        root.dataset.verified = verifiedProgress > .5 ? "true" : "false";
      };

      const scheduleRender = () => {
        if (!frame) frame = requestAnimationFrame(render);
      };

      window.addEventListener("scroll", scheduleRender, { passive: true });
      window.addEventListener("resize", scheduleRender);
      reduceMotionQuery.addEventListener("change", scheduleRender);
      render();
    };

    const initSelectedWork = () => {
      const showcase = document.querySelector("[data-selected-work-showcase]");
      if (!showcase) return;

      const items = [...showcase.querySelectorAll("[data-project-index]")];
      const mediaStages = [...showcase.querySelectorAll("[data-project-media-stage]")];
      const viewers = [...document.querySelectorAll("[data-project-viewer]")];
      if (!items.length || !viewers.length) return;

      const motionPreference = window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)");
      let activeIndex = items.findIndex((item) => item.hasAttribute("data-open"));
      let lastActiveIndex = Math.max(0, activeIndex);
      let viewerIndex = null;
      let galleryIndex = 0;
      let autoTimer = 0;
      let inView = false;
      let paused = false;
      let lastTrigger = null;
      let previousOverflow = "";

      const refreshProgress = () => {
        items.forEach((item) => item.querySelector(".work-accordion-progress")?.remove());
        if (activeIndex === null || motionPreference.matches) return;
        const progress = document.createElement("span");
        progress.className = "work-accordion-progress";
        progress.setAttribute("aria-hidden", "true");
        items[activeIndex]?.appendChild(progress);
      };

      const scheduleAuto = () => {
        window.clearTimeout(autoTimer);
        if (activeIndex === null || !inView || paused || motionPreference.matches || viewerIndex !== null || items.length < 2) return;
        autoTimer = window.setTimeout(() => {
          const nextIndex = (activeIndex + 1) % items.length;
          setActive(nextIndex);
        }, 9000);
      };

      const setActive = (nextIndex) => {
        activeIndex = nextIndex;
        if (nextIndex !== null) lastActiveIndex = nextIndex;
        items.forEach((item, index) => {
          const open = index === nextIndex;
          const trigger = item.querySelector("[data-project-trigger]");
          const panel = item.querySelector("[data-project-panel]");
          item.toggleAttribute("data-open", open);
          trigger?.setAttribute("aria-expanded", String(open));
          panel?.setAttribute("aria-hidden", String(!open));
          panel?.toggleAttribute("inert", !open);
        });
        mediaStages.forEach((stage, index) => { stage.hidden = index !== lastActiveIndex; });
        showcase.toggleAttribute("data-collapsed", nextIndex === null);
        refreshProgress();
        scheduleAuto();
      };

      const updateGallery = (viewer, nextIndex) => {
        const thumbs = [...viewer.querySelectorAll("[data-project-gallery-thumb]")];
        if (!thumbs.length) return;
        galleryIndex = (nextIndex + thumbs.length) % thumbs.length;
        const thumb = thumbs[galleryIndex];
        const source = thumb.dataset.mediaSrc || "";
        const alt = thumb.dataset.mediaAlt || "Project artifact";
        const caption = thumb.dataset.mediaCaption || alt;
        const isVideo = thumb.dataset.mediaVideo === "true";
        const currentMedia = viewer.querySelector("[data-project-gallery-media]");
        const replacement = document.createElement(isVideo ? "video" : "img");
        replacement.setAttribute("data-project-gallery-media", "true");
        replacement.src = source;
        if (isVideo) {
          replacement.setAttribute("aria-label", alt);
          replacement.autoplay = true;
          replacement.loop = true;
          replacement.muted = true;
          replacement.playsInline = true;
          replacement.preload = "auto";
        } else {
          replacement.alt = alt;
          replacement.loading = "eager";
        }
        currentMedia?.replaceWith(replacement);
        const count = viewer.querySelector("[data-project-gallery-count]");
        const captionNode = viewer.querySelector("[data-project-gallery-caption]");
        if (count) count.textContent = `${String(galleryIndex + 1).padStart(2, "0")} / ${String(thumbs.length).padStart(2, "0")}`;
        if (captionNode) captionNode.textContent = caption;
        thumbs.forEach((candidate, index) => candidate.toggleAttribute("data-active", index === galleryIndex));
      };

      const setViewerMode = (viewer, mode) => {
        viewer.querySelectorAll("[data-project-viewer-tab]").forEach((tab) => {
          tab.setAttribute("aria-selected", String(tab.dataset.projectViewerTab === mode));
        });
        viewer.querySelectorAll("[data-project-viewer-panel]").forEach((panel) => {
          panel.hidden = panel.dataset.projectViewerPanel !== mode;
        });
        if (mode === "gallery") updateGallery(viewer, galleryIndex);
      };

      const closeViewer = () => {
        if (viewerIndex === null) return;
        viewers[viewerIndex].hidden = true;
        viewerIndex = null;
        document.body.style.overflow = previousOverflow;
        window.setTimeout(() => lastTrigger?.focus?.(), 0);
        scheduleAuto();
      };

      const openViewer = (projectIndex, mode, trigger) => {
        const viewer = viewers[projectIndex];
        if (!viewer) return;
        lastTrigger = trigger;
        previousOverflow = document.body.style.overflow;
        viewers.forEach((candidate, index) => { candidate.hidden = index !== projectIndex; });
        viewerIndex = projectIndex;
        galleryIndex = 0;
        document.body.style.overflow = "hidden";
        setViewerMode(viewer, mode);
        updateGallery(viewer, 0);
        window.clearTimeout(autoTimer);
        window.setTimeout(() => viewer.querySelector("[data-project-viewer-close]")?.focus(), 0);
      };

      items.forEach((item, index) => {
        item.querySelector("[data-project-trigger]")?.addEventListener("click", () => setActive(activeIndex === index ? null : index));
        item.querySelectorAll("[data-project-open-gallery]").forEach((trigger) => {
          trigger.addEventListener("click", () => openViewer(index, "gallery", trigger));
        });
        item.querySelectorAll("[data-project-open-writeup]").forEach((trigger) => {
          trigger.addEventListener("click", () => openViewer(index, "writeup", trigger));
        });
      });

      mediaStages.forEach((stage, index) => {
        stage.addEventListener("click", () => openViewer(index, "gallery", stage));
      });

      viewers.forEach((viewer) => {
        viewer.addEventListener("mousedown", (event) => { if (event.target === viewer) closeViewer(); });
        viewer.querySelector("[data-project-viewer-close]")?.addEventListener("click", closeViewer);
        viewer.querySelectorAll("[data-project-viewer-tab]").forEach((viewerTab) => {
          viewerTab.addEventListener("click", () => setViewerMode(viewer, viewerTab.dataset.projectViewerTab));
        });
        viewer.querySelector("[data-project-gallery-previous]")?.addEventListener("click", () => updateGallery(viewer, galleryIndex - 1));
        viewer.querySelector("[data-project-gallery-next]")?.addEventListener("click", () => updateGallery(viewer, galleryIndex + 1));
        viewer.querySelectorAll("[data-project-gallery-thumb]").forEach((thumb) => {
          thumb.addEventListener("click", () => updateGallery(viewer, Number(thumb.dataset.projectGalleryThumb || 0)));
        });
      });

      showcase.addEventListener("pointerenter", () => {
        paused = true;
        showcase.setAttribute("data-paused", "");
        scheduleAuto();
      });
      showcase.addEventListener("pointerleave", () => {
        paused = false;
        showcase.removeAttribute("data-paused");
        scheduleAuto();
      });
      showcase.addEventListener("focusin", () => {
        paused = true;
        showcase.setAttribute("data-paused", "");
        scheduleAuto();
      });
      showcase.addEventListener("focusout", (event) => {
        if (showcase.contains(event.relatedTarget)) return;
        paused = false;
        showcase.removeAttribute("data-paused");
        scheduleAuto();
      });

      window.addEventListener("keydown", (event) => {
        if (viewerIndex === null) return;
        const viewer = viewers[viewerIndex];
        if (event.key === "Escape") {
          closeViewer();
        } else if (!viewer.querySelector('[data-project-viewer-panel="gallery"]')?.hidden && event.key === "ArrowRight") {
          updateGallery(viewer, galleryIndex + 1);
        } else if (!viewer.querySelector('[data-project-viewer-panel="gallery"]')?.hidden && event.key === "ArrowLeft") {
          updateGallery(viewer, galleryIndex - 1);
        }
      });

      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        showcase.toggleAttribute("data-in-view", inView);
        scheduleAuto();
      }, { threshold: .28 });
      observer.observe(showcase);
      motionPreference.addEventListener("change", () => {
        refreshProgress();
        scheduleAuto();
      });
      setActive(activeIndex >= 0 ? activeIndex : null);
    };

    const updateScroll = () => {
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = y > 24;
      header?.toggleAttribute("data-scrolled", scrolled);
      backToTop?.toggleAttribute("data-visible", scrolled);
      if (progressBar) progressBar.style.width = `${scrollable > 0 ? Math.min(100, (y / scrollable) * 100) : 0}%`;
      document.documentElement.style.setProperty("--scroll-y", `${y}px`);
      const probe = Math.min(82, window.innerHeight / 2);
      const surface = [...document.querySelectorAll("main [data-header-surface]")].find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probe && rect.bottom > probe;
      });
      header?.setAttribute("data-surface", surface?.getAttribute("data-header-surface") === "light" ? "light" : "dark");
    };

    const setMenu = (open) => {
      mobileNav?.toggleAttribute("data-open", open);
      menuButton?.setAttribute("aria-expanded", String(open));
      menuButton?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    };

    const contactModal = document.querySelector("[data-contact-modal]");
    const contactDialog = contactModal?.querySelector(".contact-dialog");
    const contactClose = contactModal?.querySelector("[data-contact-close]");
    const contactForm = contactModal?.querySelector(".contact-form");
    const contactSuccess = contactModal?.querySelector("[data-contact-success]");
    const contactError = contactModal?.querySelector("[data-contact-error]");
    const inquiryOptions = new Set([
      "Career opportunity",
      "Cloud security",
      "Security automation",
      "IAM & access governance",
      "Vulnerability management",
      "General inquiry",
    ]);
    let contactTrigger = null;
    let previousOverflow = "";

    const setContactStatus = (status) => {
      if (contactSuccess) contactSuccess.hidden = status !== "success";
      if (contactError) contactError.hidden = status !== "error";
    };
    const openContact = (trigger = null) => {
      if (!contactModal) return;
      contactTrigger = trigger || document.activeElement;
      previousOverflow = document.body.style.overflow;
      setMenu(false);
      contactModal.hidden = false;
      document.body.style.overflow = "hidden";
      window.setTimeout(() => contactClose?.focus(), 0);
    };
    const closeContact = () => {
      if (!contactModal) return;
      contactModal.hidden = true;
      document.body.style.overflow = previousOverflow;
      window.setTimeout(() => contactTrigger?.focus?.(), 0);
    };

    document.querySelectorAll("[data-contact-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", () => openContact(trigger));
    });
    contactClose?.addEventListener("click", closeContact);
    contactModal?.addEventListener("pointerdown", (event) => {
      if (event.target === contactModal) closeContact();
    });
    contactForm?.addEventListener("input", (event) => {
      event.target?.setCustomValidity?.("");
      setContactStatus(null);
    });
    contactForm?.addEventListener("submit", (event) => {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const nameField = form.elements.namedItem("name");
      const messageField = form.elements.namedItem("message");
      const inquiryField = form.elements.namedItem("inquiry");
      const name = String(formData.get("name") ?? "").trim();
      const message = String(formData.get("message") ?? "").trim();
      const inquiry = String(formData.get("inquiry") ?? "");

      if (String(formData.get("_honey") ?? "")) {
        event.preventDefault();
        form.reset();
        setContactStatus("success");
        return;
      }

      nameField?.setCustomValidity?.(name ? "" : "Enter your name.");
      messageField?.setCustomValidity?.(message.length >= 20 ? "" : "Enter at least 20 non-space characters.");
      inquiryField?.setCustomValidity?.(inquiryOptions.has(inquiry) ? "" : "Choose a valid inquiry type.");
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        setContactStatus("error");
        return;
      }

      const portfolioDomain = "https://manyewade.com";
      const productionPage = new URL(`${window.location.pathname}${window.location.search}${window.location.hash}`, portfolioDomain);
      productionPage.searchParams.delete("contact");
      const nextField = form.elements.namedItem("_next");
      const sourceField = form.elements.namedItem("_url");
      if (nextField) nextField.value = `${portfolioDomain}/?contact=sent`;
      if (sourceField) sourceField.value = productionPage.href;
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.firstChild.textContent = "Sending…";
      }
      setContactStatus(null);
    });

    const contactResultUrl = new URL(window.location.href);
    if (contactResultUrl.searchParams.get("contact") === "sent") {
      contactResultUrl.searchParams.delete("contact");
      window.history.replaceState({}, "", `${contactResultUrl.pathname}${contactResultUrl.search}${contactResultUrl.hash}`);
      setContactStatus("success");
      openContact();
    }

    window.addEventListener("keydown", (event) => {
      if (!contactModal || contactModal.hidden) return;
      if (event.key === "Escape") {
        closeContact();
        return;
      }
      if (event.key !== "Tab" || !contactDialog) return;
      const focusable = [...contactDialog.querySelectorAll("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]")];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    });

    const employerCards = [...document.querySelectorAll("[data-employer-card]")];
    const employerPanels = [...document.querySelectorAll("[data-employer-panel]")];
    const setEmployer = (id) => {
      employerCards.forEach((card) => {
        const active = card.getAttribute("data-employer-card") === id;
        card.toggleAttribute("data-active", active);
        card.setAttribute("aria-expanded", String(active));
        const label = card.querySelector(".employer-action-label");
        if (label) label.textContent = active ? "Close" : "View experience";
      });
      employerPanels.forEach((panel) => {
        const active = panel.getAttribute("data-employer-panel") === id;
        panel.toggleAttribute("data-open", active);
        panel.hidden = !active;
      });
    };

    employerCards.forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-employer-card");
        setEmployer(card.hasAttribute("data-active") ? null : id);
      });
    });

    menuButton?.addEventListener("click", () => setMenu(!mobileNav?.hasAttribute("data-open")));
    mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
    window.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });
    window.addEventListener("scroll", updateScroll, { passive: true });

    const revealElements = document.querySelectorAll("[data-reveal]");
    if (reduceMotion) revealElements.forEach((element) => element.classList.add("is-visible"));
    else {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      revealElements.forEach((element) => revealObserver.observe(element));
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible?.target.id) return;
      document.querySelectorAll(".desktop-nav a").forEach((link) => {
        link.toggleAttribute("data-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    }, { rootMargin: "-24% 0px -58% 0px", threshold: [0.05, 0.2, 0.45] });
    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

    document.querySelectorAll("[data-metric]").forEach((metric) => {
      const valueNode = metric.querySelector("strong");
      const end = Number(metric.getAttribute("data-end") ?? 0);
      const suffix = metric.getAttribute("data-suffix") ?? "";
      if (!valueNode) return;
      const setValue = (value) => { valueNode.textContent = `${Math.round(value).toLocaleString()}${suffix}`; };
      if (reduceMotion) { setValue(end); return; }
      const metricObserver = new IntersectionObserver((entries) => {
        if (!entries[0]?.isIntersecting) return;
        metricObserver.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / 1100);
          setValue(end * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, { threshold: 0.5 });
      metricObserver.observe(metric);
    });

    initHeroMesh();
    initPixelTransitions();
    initIdentityUnlock();
    initSelectedWork();
    updateScroll();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready, { once: true });
  else ready();
})();
