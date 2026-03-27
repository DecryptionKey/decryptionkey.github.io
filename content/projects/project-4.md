---
layout: project
title: "RSS to SharePoint News"
description: "A Power Automate flow that automatically retrieves updates from RSS feeds and posts them as SharePoint News items."
date: 2025-07-16
weight: 4
thumbnail: "images/gen/projects/project-4-rss-thumbnail-2.png"
thumbnail_display: "full"
image: ""
client: "Marist University / Work"
categories: ["Development"]
role: "Vulnerability Management Specialist @ Marist University"
gallery:
  - image: "images/gen/projects/project-4-rss-site.png"
  - image: "images/gen/projects/project-4-rss-flow.png"
  - image: "images/gen/projects/project-4-rss-output.png"
---

This project provides a Power Automate flow that automatically retrieves updates from RSS feeds and posts them as SharePoint News items. It enables seamless integration between external content sources and internal SharePoint communication systems.

## Project Scope

- Built a Power Automate workflow to ingest RSS updates and publish them into SharePoint News.
- Parsed incoming content into a cleaner format for downstream SharePoint compatibility.
- Reduced manual effort for keeping internal stakeholders updated on trusted external sources.

## Impact

- Created a repeatable internal communications workflow that turns external updates into publish-ready SharePoint content.
- Reduced manual copy-and-paste work for teams monitoring industry or vulnerability news.
- Improved the speed and consistency of sharing relevant updates across the organization.

## Tools & Methods

- Power Automate
- RSS connectors
- SharePoint HTTP request connector
- SharePoint Repost API
- JSON/HTML parsing

The flow triggers whenever an RSS feed is updated. It parses the incoming data (JSON or HTML) into plain text to ensure compatibility with SharePoint. The content is then posted as a news item using the SharePoint HTTP request connector and the SharePoint Repost API.

This solution is ideal for organizations that want to auto-publish content from trusted external sources, monitor industry updates or vulnerability advisories, and keep internal teams informed without manual posting.

---

[View Here](https://github.com/DecryptionKey/RSS-to-SharePoint-News/tree/main)
