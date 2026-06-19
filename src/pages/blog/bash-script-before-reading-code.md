---
path: /blog/bash-script-before-reading-code
title: 'The Bash Script I Use Before Reading Any Code'
date: '2026-06-19'
---

I saw this awesome blog post [The Git Commands I Run Before Reading Any Code](https://piechowski.io/post/git-commands-before-reading-code/) detailing some git commands to help you navigate a new code base. Well, I decided to make a wrapper bash script around those commands.

<h2 id="the-script">The Script <a href="#the-script">🔗</a></h2>

Create a file `git-investigate` (no extension), mark it as executable (`chmod +x git-investigate`), and then add `git-investigate` to your `PATH`.

This automatically registers the git subcommand `git investigate COMMAND`.

```bash
#!/usr/bin/env bash

# A git subcommand for investigating a new code base
#
# Credit to https://piechowski.io/post/git-commands-before-reading-code/ for the original git commands

set -euo pipefail

FIRST_ARG=${1:-""}

limit=${LIMIT:-20}
since=${SINCE:-1 year ago}

echoerr() { printf "%s\n" "$*" >&2; }

if [ "$FIRST_ARG" = "churn" ]; then
    echoerr "A sorted list of most changed files in a given period of time"
    echoerr ""
    git log --format=format: --name-only --since="$since" | sort | uniq -c | sort -nr | head -$limit
elif [ "$FIRST_ARG" = "contributors" ]; then
    git shortlog -sn --no-merges
elif [ "$FIRST_ARG" = "bugs" ]; then
    echoerr "A sorted list of files with commits related to bugs or fixes"
    echoerr ""
    git log -i -E --grep="fix|bug|broken" --name-only --format='' | sort | uniq -c | sort -nr | head -$limit
elif [ "$FIRST_ARG" = "velocity" ]; then
    echoerr "A sorted list of commit counts by month"
    echoerr ""
     git log --format='%ad' --date=format:'%Y-%m' | sort | uniq -c
elif [ "$FIRST_ARG" = "firefighting" ]; then
    echoerr "A list commits relating to reverts, hotfixes, emergencies, or rollbacks"
    echoerr ""
     git log --oneline --since="$since" | grep -iE 'revert|hotfix|emergency|rollback'
elif [ "$FIRST_ARG" = "credit-to" ]; then
    echoerr "Credit To:"
    echoerr ""
    echo "https://piechowski.io/post/git-commands-before-reading-code/"
else
    echo "Usage: $0 {churn|contributors|bugs|velocity|firefighting|credit-to}"
    echo ""
    echo "Commands"
    echo ""
    echo "- churn: A sorted list of most changed files in a given period of time"
    echo "- contributors: A sorted list of the most active committers"
    echo "- bugs: A sorted list of files with commits related to bugs or fixes"
    echo "- velocity: A sorted list of commit counts by month"
    echo "- firefighting: A list commits relating to reverts, hotfixes, emergencies, or rollbacks"
    echo "- credit-to: Link to the original blog post detailing these git commands"
    echo ""
    echo "Environment Variables"
    echo ""
    echo "LIMIT -- Limits the number of results in 'churn' and 'bugs'"
    echo "SINCE -- Filters result by a natural time string e.g. 1 year ago in 'churn' and 'firefighting'"
    exit 1
fi

```

<h2 id="usage">Usage <a href="#usage">🔗</a></h2>

```bash
cd myproject

git investigate

# Usage: git-investigate {churn|contributors|bugs|velocity|firefighting|credit-to}
#
# Commands
#
# - churn: A sorted list of most changed files in a given period of time
# - contributors: A sorted list of the most active committers
# - bugs: A sorted list of files with commits related to bugs or fixes
# - velocity: A sorted list of commit counts by month
# - firefighting: A list commits relating to reverts, hotfixes, emergencies, or rollbacks
# - credit-to: Link to the original blog post detailing these git commands
#
# Environment Variables
#
# LIMIT -- Limits the number of results in 'churn' and 'bugs'
# SINCE -- Filters result by a natural time string e.g. 1 year ago in 'churn' and 'firefighting'

SINCE='10 years ago' LIMIT=10 git investigate churn

# A sorted list of most changed files in a given period of time
#
#   75
#   17 src/pages/about.js
#   14 src/layouts/index.js
#   11 src/pages/talks.js
#   10 src/pages/projects.js
#    7 src/html.js
#    7 package-lock.json
#    5 yarn.lock
#    4 src/pages/training.js
#    4 src/components/nav-menu.js

git investigate contributors

# 70  Kylee Tilley
#  2  dependabot[bot]

LIMIT=10 git investigate bugs

# A sorted list of files with commits related to bugs or fixes
#
#    7 src/pages/about.js
#    4 src/layouts/index.js
#    3 src/pages/talks.js
#    1 src/pages/projects.js
#    1 src/pages/index.js
#    1 src/pages/blog.js
#    1 src/components/nav-menu.js
#    1 src/components/header.js
#    1 package-lock.json
#    1 gatsby-node.js

git investigate velocity

# A sorted list of commit counts by month
#
#    1 2018-07
#    2 2019-08
#    7 2019-11
#    3 2020-02
#    2 2020-03
#    1 2020-05
#   15 2022-12
#    4 2023-05
#    1 2024-07
#   40 2025-02

SINCE='10 years ago' git investigate firefighting

# A list commits relating to reverts, hotfixes, emergencies, or rollbacks
#
# e60c355 Revert "Upgrade npm dependencies"

git investigate credit-to

# Credit To:
#
# https://piechowski.io/post/git-commands-before-reading-code/
```
