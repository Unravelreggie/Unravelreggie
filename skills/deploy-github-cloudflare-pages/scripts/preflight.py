#!/usr/bin/env python3
"""Read-only deployment inventory for a static web project."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


def git(project: Path, *args: str) -> str:
    try:
        return subprocess.check_output(
            ["git", "-C", str(project), *args],
            stderr=subprocess.DEVNULL,
            text=True,
            encoding="utf-8",
        ).strip()
    except (OSError, subprocess.CalledProcessError):
        return ""


def main() -> int:
    project = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    if not project.is_dir():
        print(json.dumps({"error": f"Not a directory: {project}"}, ensure_ascii=False, indent=2))
        return 2

    package_file = project / "package.json"
    package = json.loads(package_file.read_text(encoding="utf-8")) if package_file.exists() else {}
    lockfiles = [name for name in ("pnpm-lock.yaml", "package-lock.json", "yarn.lock", "bun.lockb") if (project / name).exists()]
    configs = [name for name in ("wrangler.jsonc", "wrangler.toml", "wrangler.json", "vercel.json") if (project / name).exists()]
    candidates = [name for name in ("dist", "dist/client", "build", "out", "public") if (project / name).is_dir()]

    result = {
        "project": str(project),
        "git_root": git(project, "rev-parse", "--show-toplevel") or None,
        "branch": git(project, "branch", "--show-current") or None,
        "remote": git(project, "remote", "get-url", "origin") or None,
        "status": git(project, "status", "--short").splitlines(),
        "lockfiles": lockfiles,
        "hosting_configs": configs,
        "scripts": package.get("scripts", {}),
        "existing_output_candidates": candidates,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
