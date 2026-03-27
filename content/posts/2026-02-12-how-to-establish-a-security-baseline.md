---
title: "How to Establish a Security Baseline on a Fresh Ubuntu Install"
date: 2026-02-12
authors: ["Ma'Nye Wade"]
categories: ["Security", "Linux"]
description: "A walkthrough of provisioning an Ubuntu VM and performing an initial security assessment to document open ports, running services, and default users."
thumbnail: "images/gen/blog/blog-1-vm-thumbnail.png"
image: "images/gen/blog/blog-1-vm-thumbnail.png"
---

Before hardening any system, you need to know what you're working with. Establishing a security baseline is the first step in any system assessment — it gives you a snapshot of the attack surface before any changes are made, and a reference point to measure the impact of your hardening efforts later.

In this post I'll walk through how I provisioned a fresh Ubuntu VM and performed an initial security inspection to document the system's default state.

## Setting Up the VM

The VM was configured with the following specs:

- **CPU:** 2 cores
- **RAM:** 4GB
- **Disk:** 40GB
- **OS:** Ubuntu (latest LTS)

After the base install, a desktop GUI was set up via the terminal:

```bash
# Check for package updates
sudo apt update

# Install tasksel utility
sudo apt install tasksel

# Install Ubuntu desktop environment
sudo apt install ubuntu-desktop
```

## Baseline Security Assessment

Once the system was up, I ran a structured inspection across four areas: OS version, open ports, running services, and user accounts.

```bash
# OS version
lsb_release -a

# Find open ports
sudo netstat -tuln

# List all running services
systemctl list-units --type=service --state=running

# Network configuration
ip addr
ifconfig

# User accounts with shell access
cat /etc/passwd | grep -E "/bin/bash|/bin/sh"

# Count installed packages
dpkg -l | wc -l
```

## What I Found

A fresh Ubuntu install is not as clean as you might expect. Out of the box the system had several services running that weren't explicitly configured, open ports that weren't immediately necessary, and default user accounts worth auditing. These findings formed the baseline that all subsequent hardening labs were measured against.

{{< framework/figure-image src="images/gen/blog/blog-1-risks.png" alt="Identified Risks" >}}

## Why This Matters

Skipping a baseline assessment is one of the most common mistakes in system security. Without it, you have no way of knowing what changed, what was always there, or whether your hardening actually reduced the attack surface. Whether you're onboarding a new server or auditing an existing one, a documented baseline is the foundation everything else is built on.