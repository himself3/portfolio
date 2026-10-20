# Security, Data & Observability

Read this whenever the system touches user data, controls access, logs anything,
sends data to an LLM or external API, stores credentials, or runs anywhere real.
Once real data enters a system the engineering requirements change immediately,
and even small prototypes create serious security, privacy, and trust problems if
handled carelessly. Working code is not automatically safe code. This file covers
two intertwined things: keeping the system *secure* and keeping it *observable*.

## Security-first coding: a mindset before the first line

"Working" doesn't mean "safe." Security is a way of thinking applied from
planning, not a feature added later. The core habits: validate untrusted input,
keep secrets out of code, give every actor the least access it needs, and review
generated code for security gaps before shipping. Everything below is an
application of that mindset.

## What counts as PII (broader than you think)

Obvious: names, emails, phones, government IDs, addresses. But users are
identifiable through combinations of "harmless" data: IP addresses, device IDs,
location history, support conversations, uploaded files, behavioral patterns,
chat logs. For AI systems, prompts, embeddings, logs, and conversation history
may all carry sensitive data. **If the system processes user content, assume
sensitive data will appear.**

## The prototype trap & data minimization

Prototypes become production accidentally — internal tools go customer-facing,
temporary DBs become permanent, debug logging stays on for a year. Treat every
prototype as if real users and data will touch it. The strongest, simplest
defense: **don't collect or retain data you don't need.** Every stored field adds
security risk, compliance duty, breach exposure, and complexity. For each field,
ask "what specific purpose does this serve?"

## Authentication vs authorization (access control)

Two different things, both needed:

- **Authentication** = verifying *who* a user is (login, API tokens, sessions).
- **Authorization** = controlling *what* they can access or do (roles,
  permissions).

Plan both early; dangerous assumptions ("only internal users will see this,"
"nobody knows the URL," "we'll add permissions later") are how exposure happens.
Not every user, service, developer, or AI agent should access all data — define
who can access each category before building workflows around it. Enforce
authorization server-side (client checks aren't security — see
`system-structure.md`).

**Defense in depth — Row-Level Security (RLS):** for multi-tenant or multi-user
data, enforce ownership/tenancy at the *data layer* too, not only in application
code. With RLS, the database itself refuses to return rows the current user isn't
entitled to, so one forgotten `WHERE` clause can't leak everyone's data. Use
default-deny policies (a new table is inaccessible until access is granted) and
test with the *wrong* user, not just the authorized one. (See Layer 8 in
`production-stack.md`.)

## Common code-level vulnerabilities

- **SQL injection**: building queries from user input lets attackers send input
  that changes the query. Use parameterized queries / prepared statements / ORM
  bindings — never string-concatenate user input into SQL. AI frequently
  generates the unsafe version.
- **Generated-code risks**: missing authorization checks, hardcoded/exposed
  credentials, insecure queries, unsafe file uploads, overly permissive CORS,
  verbose debug output. Review generated code specifically for authn, authz,
  logging, and secret handling before deploy.
- **Secrets**: belong in environment variables or a secrets manager, never in
  source or committed config.

## AI-specific security

- **Sending data to an LLM is data processing**: every prompt may transfer data
  across systems, vendors, and regions. Before sending, consider whether it's
  stored, used for training, how long it's retained, and what compliance applies
  — acute for healthcare, legal, HR, financial, and enterprise data. Classify
  data before sending; don't assume prompts are private.
- **Prompt injection**: user input or external content can trick an AI into
  ignoring its instructions, leaking data, or taking unintended actions. Treat
  model input as untrusted, separate instructions from untrusted content,
  constrain what the model is allowed to do, and validate its output before
  acting on it.
- **Guardrails are more than filters**: they're active safety systems around an
  unpredictable model — input validation, prompt constraints, output filtering,
  and *action limits* on what AI-driven workflows can actually do. Design them in,
  don't bolt them on.

## Observability: a deployed system you can't see is operated by guesswork

- **Logging & observability**: capture meaningful logs (what happened, with
  context), choose sensible log levels, and for AI systems log prompts/outputs
  and key metrics — **but** strip or mask sensitive data first (logs are a primary
  leak vector; redact/anonymize before writing). Log the minimum needed to debug.
- **Performance monitoring**: watch how the system behaves under real traffic —
  errors, latency, throughput, failures, infra health, and AI workflow behavior.
  Decide *before* coding what you'd need to detect quickly.
- **Alerting & error notifications**: logs record what happened; alerts tell you
  *when something needs attention*. Without alerting, failures are silent until a
  user reports them. Decide what conditions must page you and route them
  somewhere you'll actually see.
- **Cost observability**: cloud/API/AI costs spike silently and can turn an
  experiment into a budget problem. Track usage, monitor spend, set alerts, and
  treat cost as a design parameter so you can experiment fast without surprises.
- **Auditing**: for systems handling users, data, or consequential decisions, an
  audit trail answers *who did what, when, and why it was allowed* — a design
  concern from the start, not a compliance checkbox, and especially important for
  actions taken by AI agents. (Audit logs follow the same data-minimization and
  redaction rules.)

## Supporting your application

Getting it working is the beginning; supporting it determines whether it succeeds
over time. Build basic support in from the start — logging, monitoring, and error
handling together — so you can observe behavior, get alerted to problems, and fix
issues before users feel them. Reliability is part of product quality.

## Security, data & observability checklist

| Item | Why it matters |
| ---- | -------------- |
| Apply a security-first mindset from planning | Safe ≠ working; can't bolt it on |
| Map where data enters/moves/leaves; minimize what you collect | Less to protect, fewer obligations |
| Plan authentication AND authorization early; enforce server-side | Prevents broad/accidental access |
| Use parameterized queries; never concatenate input into SQL | Prevents injection |
| Keep secrets in env/secrets manager; review generated code for gaps | Prevents credential exposure |
| Classify data before sending to LLMs; defend against prompt injection | Prompts carry regulated data and untrusted instructions |
| Add guardrails incl. limits on AI actions | Models are unpredictable |
| Log meaningfully but redact sensitive data | Observability without leaks |
| Add monitoring, alerting, and cost tracking | Detect failures and spend before users/budget do |
| Add audit trails for consequential/agent actions | Systems must explain themselves later |

Pre-ship question: *"If this were exposed publicly tomorrow, what data would be
at risk — and if it failed tonight, would I be alerted and able to see why?"*
