# Contributing to BMI-LMS

Thanks for contributing. Read this once, follow it always.

## 1. Before You Start

* Open an issue describing **what** and **why**.
* Wait for approval before large changes.
* Check existing issues/PRs to avoid duplicates.

## 2. Setup

```bash
git clone https://github.com/DilshodbekAqiyev/BMI-LMS.git
cd BMI-LMS
npm install
```

## 3. Branch Rules

* Never work on `main`
* Create a branch:

```bash
git checkout -b feature/short-description
```

Examples:

* `feature/login-api`
* `fix/navbar-bug`
* `refactor/user-service`

## 4. Code Standards

* Write **clear and minimal** code
* No unnecessary libraries
* Keep functions small and focused
* Use consistent naming (camelCase for JS)
* Remove unused code

## 5. Commits

Use meaningful messages:

```
feat: add login endpoint
fix: resolve token validation bug
refactor: simplify auth logic
```

Bad example:

```
update
fix bug
123
```

## 6. Pull Requests

* Describe what changed and why
* Link related issue
* Add screenshots if UI changes
* Keep PR small (under 300 lines if possible)

## 7. Testing

* Test your changes before pushing
* Do not break existing features
* If something is not tested — mention it

## 8. Forbidden

* Pushing directly to `main`
* Large unreviewed changes
* Random formatting changes
* Adding secrets (.env, API keys)

## 9. Questions

If stuck — open an issue instead of guessing.

---

If you ignore these rules, your PR will be rejected.
