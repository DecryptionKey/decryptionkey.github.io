---
layout: project-right
title: "Patch Management & System Hardening"
description: "Applied CIS Benchmark controls to harden an Ubuntu system, disabled unused services, patched vulnerabilities, and verified system state."
date: 2026-03-04
weight: 1
thumbnail: "images/gen/projects/project-1-checklist.png"
image: "images/gen/projects/project-1-checklist.png"
client: "University at Albany / CYBR203"
categories: ["DevSecOps", "System Hardening"]
role: "Security Engineer"
gallery:
  - image: "images/gen/projects/project-1-patch-log.gif"
  - image: "images/gen/projects/project-1-root.gif"
  - image: "images/gen/projects/project-1-checklist.png"
---

This lab focused on two core defensive security practices: patching known vulnerabilities and hardening system configurations against the CIS Ubuntu 24.04 LTS Benchmark. The objective was to reduce the attack surface of a live Ubuntu VM by eliminating unnecessary services and ensuring all packages were up to date.

[Video Breakdown Here](https://www.youtube.com/watch?v=QFtDD9ih5nY&list=PL0yP_N3UFEcDNkwq395DJPbo-5hMOMpeQ)

## Project Scope

- Hardened an Ubuntu 24.04 LTS virtual machine using CIS-aligned controls.
- Applied system updates and validated that vulnerable or unnecessary packages were removed.
- Verified the final state with repeatable command-line checks rather than one-off screenshots alone.

## Impact

- Reduced attack surface by removing more than 25 unnecessary services and client packages.
- Improved system resilience by combining patching with configuration hardening instead of treating them as separate tasks.
- Created a repeatable validation approach that mirrors how hardening work is documented and checked in real environments.

## Tools & Methods

- Ubuntu Linux
- `apt`
- `dpkg-query`
- CIS Ubuntu 24.04 LTS Benchmark
- Bash scripting

## Patch Management

System packages were audited using `apt update && apt upgrade` to identify and apply available patches. Unpatched packages were inventoried and a forced update was performed to ensure the system reflected the latest security fixes across all installed software.

## CIS Benchmark Hardening

Using the CIS Ubuntu 24.04 LTS Benchmark as the control framework, over 25 unused services and client packages were identified and disabled, including Auto Mount, Avahi Daemon, DHCP/DNS/FTP/LDAP/Mail servers, NFS, CUPS, Samba, SNMP, TFTP, Squid, and Telnet among others. A verification script was written to confirm each service was removed rather than simply stopped:

```bash
for pkg in autofs avahi-daemon isc-dhcp-server bind9 dnsmasq vsftpd slapd \
dovecot-imapd nfs-kernel-server ypserv cups rpcbind rsync samba snmpd \
tftpd-hpa squid apache2 nginx xinetd nis rsh-client talk telnet ldap-utils ftp; do
    dpkg-query -s $pkg &>/dev/null && echo "INSTALLED: $pkg" || echo "REMOVED: $pkg"
done
```

Root login was also locked as an additional hardening measure, and the final system state was verified against the hardened configuration checklist.

## Key Takeaways

Patch management and service hardening are foundational to reducing a system's attack surface. Applying industry benchmarks like CIS controls provides a structured, repeatable approach to hardening that aligns with real-world enterprise security standards.
