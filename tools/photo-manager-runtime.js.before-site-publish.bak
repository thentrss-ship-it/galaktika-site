const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

function findPython() {
  const candidates = [
    process.env.PYTHON,
    path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "python.exe"),
    path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "bin", "python.exe"),
    path.resolve(path.dirname(process.execPath), "..", "..", "python", "python.exe"),
    path.resolve(path.dirname(process.execPath), "..", "..", "python", "bin", "python.exe"),
    "python",
    "py",
  ].filter(Boolean);

  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ["--version"], { encoding: "utf8" });
    if (!probe.error && probe.status === 0) return candidate;
  }

  return null;
}

function findGit() {
  const candidates = [
    process.env.GIT,
    path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "native", "git", "cmd", "git.exe"),
    "git",
  ].filter(Boolean);

  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ["--version"], { encoding: "utf8", windowsHide: true });
    if (!probe.error && probe.status === 0) return candidate;
  }

  return null;
}

module.exports = { findPython, findGit };
