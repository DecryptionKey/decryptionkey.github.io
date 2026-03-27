---
layout: project-left
title: "Account Management & Authentication Policies"
description: "Implemented least privilege principles, user/group management, and password policy enforcement on an Ubuntu Linux system."
date: 2026-03-03
weight: 2
thumbnail: "images/gen/projects/project-2-pwp.gif"
image: "images/gen/projects/project-2-pwp.gif"
client: "University at Albany / CYBR203"
categories: ["IAM", "Security"]
role: "Security Engineer"
gallery:
  - image: "images/gen/projects/project-2-add-users.png"
  - image: "images/gen/projects/project-2-groups.png"
  - image: "images/gen/projects/project-2-install-policy.png"
  - image: "images/gen/projects/project-2-policy-test.png"
  - image: "images/gen/projects/project-2-pwp.gif"
---

This lab applied Identity and Access Management (IAM) principles to a live Ubuntu environment. The focus was on enforcing least privilege through proper user and group structures, and hardening authentication through password policy controls.

[Video Breakdown Here](https://www.youtube.com/watch?v=sG8wSahN45o&list=PL0yP_N3UFEcDNkwq395DJPbo-5hMOMpeQ&index=3)

## Project Scope

- Created and managed local user and group structures to demonstrate least-privilege access control.
- Implemented password quality enforcement at the operating-system level.
- Tested weak-password scenarios to confirm the policy worked in practice, not just in configuration files.

## Impact

- Demonstrated how role-based account design reduces unnecessary administrative access.
- Strengthened authentication controls by blocking weak and easily guessed passwords.
- Showed a practical IAM baseline that can be expanded into broader Linux access governance.

## Tools & Methods

- Ubuntu Linux
- Local users and groups
- `usermod`
- `groupadd`
- PAM
- `libpam-pwquality`

## User & Group Management

Two users were created — `alice` and `bob` — to simulate a real-world access control scenario. Alice was assigned to the `admins` group, granting elevated permissions, while Bob remained a standard user with no group elevation. This directly demonstrates the principle of least privilege: users receive only the access necessary for their role.

```bash
sudo adduser alice
sudo adduser bob
sudo groupadd admins
sudo usermod -aG admins alice
```

## Password Policy Enforcement

The `libpam-pwquality` module was installed to enforce strong password requirements at the OS level. Weak passwords were tested to confirm policy enforcement was active — attempts using `123`, `alice`, and `password` were all rejected as expected, validating that the policy blocked short, common, and username-matching passwords.

```bash
sudo apt install libpam-pwquality
```

## Key Takeaways

Proper IAM configuration is one of the most impactful security controls available. Misconfigured user accounts and weak password policies are among the most common entry points in real-world breaches. This lab demonstrates hands-on application of least privilege and authentication hardening in a Linux environment.
