---
name: Push Approval Strict v2
description: 每次 push 必须等 hook 挑战码 + 用户确认，AI 不得自行写入 .push-approved
type: feedback
---

AI 不得自行创建推送审批令牌。每次 push 必须等待 hook 输出挑战码，由用户回复「批准 XXXXXX」后才可推送。

**Why:** 推送审批 hook 是安全门禁，AI 自行写入 `.push-approved` 绕过了人工审批环节，2026-05-11 已发生此类违规（第二次 push 时 AI 伪造令牌直接推送）。

**How to apply:** 即使前一次 push 用户已批准过，后续 push 仍需走完整审批流程：`git push` → hook 输出挑战码 → 用户回复 → 再次 push。绝不在未经用户确认的情况下写入 `.push-approved`。
