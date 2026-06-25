# Project Overview

## Purpose

FlowAI-Page is a public-facing landing page that explains FlowAI, a workflow layer for AI coding agents that adds operational contracts, specialized skills, proportional validation, and Obsidian project memory.

## Users

Primary users are developers and technical teams evaluating `@mvoikolesco/flowai` or `@mvoikolesco/flowai-portable` before installing them in a project.

## Scope

The current scope is a static React landing page with product positioning, workflow explanation, package comparison, installation commands, and npm links. It does not include a private repository link, backend services, analytics, or package publishing flows.

## Technology

React, TypeScript, Vite, Vitest, Testing Library, and CSS in `src/styles.css`. Product content is grounded in installed FlowAI package documentation under `node_modules/@mvoikolesco/flowai/README.md`.

## Constraints

Keep the page dependency-light, accessible, responsive, and aligned with verified FlowAI behavior. Do not add private repository links or store secrets, private data, or raw logs in project memory.

