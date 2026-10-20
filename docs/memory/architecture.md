# Architecture

What this system is: components and their responsibilities, how data flows, and
why it is shaped this way. Keep it short enough to stay true.

## Components

- _(name — single responsibility — what it owns and must not know about)_

## Data flow

- _(in → transform → store → out)_

## Boundaries

- _(what is stable core vs what is expected to change)_

## Production stack coverage

Which of the 13 layers this system needs — decided explicitly, not by omission:
frontend · APIs/backend logic · database & storage · auth & permissions ·
hosting & deployment · cloud & compute · CI/CD & version control · security &
RLS · rate limiting · caching & CDN · load balancing & scaling · error tracking
& logs · availability & recovery.

- _(mark each: now / later / not applicable — with a reason)_
