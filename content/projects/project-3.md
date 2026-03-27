---
layout: project-right
title: "File Systems, Storage & Backup Security"
description: "Secured data at rest using LUKS encryption and strict file permissions, then validated a full backup and recovery workflow on Ubuntu Linux."
date: 2026-03-04
weight: 3
thumbnail: "images/gen/projects/project-3-backup.gif"
image: "images/gen/projects/project-3-backup.gif"
client: "University at Albany / CYBR203"
categories: ["Security", "DevSecOps"]
role: "Security Engineer"
gallery:
  - image: "images/gen/projects/project-3-file-perms.gif"
#  - image: "images/gen/projects/project-3-file-encryption.mp4"
  - image: "images/gen/projects/project-3-backup.gif"
  - image: "images/gen/projects/project-3-backup.png"
  - image: "images/gen/projects/project-3-data-del.gif"
  - image: "images/gen/projects/project-3-recovery.png"
---

This lab covered two critical data protection practices: securing data at rest through encryption and access controls, and validating backup and recovery procedures. The environment was an Ubuntu VM where LUKS encryption was applied to protect sensitive data even in the absence of full-disk encryption at install time.

[Video Breakdown Here](https://www.youtube.com/watch?v=4mVUKRE6dnA&list=PL0yP_N3UFEcDNkwq395DJPbo-5hMOMpeQ&index=2)

## Project Scope

- Protected sensitive data using restrictive file permissions and post-install LUKS encryption.
- Simulated a realistic remediation path for a system that was not encrypted during initial setup.
- Tested backup creation, data deletion, and successful restore to validate recovery readiness.

## Impact

- Improved confidentiality by securing sensitive data both through permissions and encryption at rest.
- Reduced recovery risk by validating that backups could actually restore deleted data successfully.
- Demonstrated a practical security workflow that connects protection, resilience, and recovery.

## Tools & Methods

- Ubuntu Linux
- `chmod`
- LUKS
- `cryptsetup`
- `tar`
- Command-line backup and restore validation

## File Permissions

A `secure_data` directory was created and locked down with restrictive permissions, ensuring only the owning user could read, write, or execute within it:

```bash
mkdir secure_data
chmod 700 secure_data
```

## LUKS Encryption

Since the VM was provisioned without full-disk encryption, an encrypted container was created post-install to house the `secure_data` directory. The process involved creating the container, formatting it with LUKS, opening it with a passphrase, mounting it as a filesystem, and migrating the secured data into it — simulating a realistic remediation scenario where encryption must be applied to an existing system.

## Backup & Recovery

A compressed archive of the secured data was created using `tar`:

```bash
tar -czvf backup.tar.gz secure_data
```

Data loss was then simulated by deleting the original directory, followed by a successful restore from the backup — confirming the integrity and reliability of the backup process.

## Key Takeaways

Encryption at rest and tested backup procedures are non-negotiable in any production environment. This lab demonstrates the ability to apply LUKS encryption retroactively, enforce proper file permissions, and execute a reliable backup and recovery workflow — skills directly applicable to DevSecOps and systems security roles.
