---
slug: why-we-started-almadar
title: "Why We Started Almadar"
authors: [osamah]
tags: [philosophy, story]
---

I have built the same application at least a dozen times. Different companies, different industries, different logos on the login screen, but underneath, the same patterns over and over again. User management. CRUD forms. Data tables. Dashboards. State handling. The same architecture decisions, the same boilerplate, the same bugs in the same places.

At some point, I stopped and asked myself: why are we still doing this?

<!-- truncate -->

## The Boilerplate Trap

Early in my career, I thought the repetition was just part of the job. You learn a framework, you build an app, you move on to the next project and build essentially the same app again with different field names. Every new project started with weeks of setup: authentication, routing, database models, API endpoints, form validation, error handling. The interesting work, the actual business logic that made each project unique, was maybe 20% of the total effort. The other 80% was plumbing.

I spent years convincing myself this was normal. Everyone does it this way. Frameworks help. Libraries help. But they only help at the edges. The core problem remained: every application I built was roughly 80% identical to the last one, and I was rewriting that 80% from scratch every single time.

The waste was staggering when I actually stopped to calculate it. Not just my time, but the time of entire teams. Designers redesigning the same patterns. QA testers retesting the same flows. Project managers re-estimating the same tasks. We had turned software development into an expensive, manual assembly line where skilled engineers spent most of their time doing work that a machine could do, if only someone gave the machine the right instructions.

## The Scale Problem

The real wake-up call came when I worked on large enterprise systems in Saudi Arabia, including the national e-invoicing platform. These were not side projects or startup MVPs. These were systems that hundreds of thousands of businesses would depend on, systems where a bug in the wrong place could disrupt an entire economy.

At that scale, the fragility of traditional development becomes impossible to ignore. When you have dozens of developers working across hundreds of files, every change becomes a risk. Someone renames a field in the backend but forgets the frontend. Someone adds a new state to a workflow but does not update the validation logic. Someone fixes a bug in one place and introduces two new bugs somewhere else. The codebase grows, the team grows, the coordination overhead grows, and the whole thing becomes slower and more expensive with every passing month.

I watched organizations throw more people at these problems. More developers, more testers, more managers. And it helped, temporarily, the way adding more lanes to a highway temporarily reduces traffic. But the fundamental architecture was the problem, not the headcount.

What struck me most was the contrast between the importance of these systems and the primitive way we were building them. We were constructing critical national infrastructure using the same methods we used to build a to-do app, just with more people and more meetings. There had to be a better way.

## The Realization

The idea did not arrive in a single flash. It was more like a slow accumulation of observations that eventually reached a tipping point.

I had been watching the rise of large language models and thinking about what AI could actually do for software development. Not autocomplete for code, that felt like putting a faster engine on a horse cart. The real opportunity was something deeper: what if AI could generate entire applications, not line by line, but all at once, from a high-level description?

The problem with that idea is that natural language is ambiguous. Tell an AI "build me a task manager" and you will get something, but it will not be what you wanted. The gap between what you say and what you mean is enormous. You need something in between, a structured language that is precise enough for a machine to execute but expressive enough for a human to reason about.

That is when the pieces clicked. What if we created a schema language, a way to describe the complete behavior of an application in a single, declarative document? Not just the data model, but the states, the transitions, the UI patterns, the business rules. Everything an application does, captured in one place.

If you had that language, then a compiler could turn it into a working application. And if you had that compiler, then an AI could generate the schema from a conversation with a human. The human describes what they want, the AI produces the schema, the compiler produces the application. No boilerplate. No repetition. No 80% waste.

## The Orbit

The name came naturally. "Almadar" is Arabic for "The Orbit." In physics, an orbital is not a fixed path but a probability field, a region where an electron is likely to be found, governed by quantum rules. The electron does not need instructions for every movement. The rules of the system define its behavior.

That is exactly how we think about software components. Each piece of an application, a user, an invoice, a task, is an orbital unit. It has a data shape (the entity), a set of behaviors (the traits), and a place in the interface (the pages). These units do not need to know about each other's internal workings. They communicate through events, like particles exchanging energy. The rules are defined once, and the system runs.

This was not just a nice metaphor. It was an architectural principle. Software should not be a monolith that you build from the bottom up, wiring every piece to every other piece. It should be a system of self-contained components orbiting around shared data, interacting through well-defined interfaces. Change one component, and the rest of the system adapts, because the rules are explicit, not buried in thousands of lines of imperative code.

## Two People, Not Twenty

We started Almadar in Ljubljana, Slovenia. Two people, not twenty. That was deliberate.

We had seen what happens when companies try to solve complexity with headcount. You end up with more complexity, not less. More communication overhead, more coordination, more meetings about meetings. The best software I have ever seen was built by small teams with strong opinions and clear constraints.

Our constraint was simple: we had to build something that two people could maintain. That meant the tool itself had to eliminate the work that would normally require a large team. If Almadar could not reduce a ten-person project to a two-person project, then we had no business building it.

Ljubljana turned out to be the perfect place for this kind of work. It is a small, quiet city with fast internet and no distractions. No venture capital circus, no hype cycle, no pressure to hire fifty engineers and figure out the product later. Just two people in a room, solving a hard problem because they believed it mattered.

## The Numbers

We set ourselves a concrete target: 87% cost reduction. Not a vague promise of "increased productivity", an actual, measurable reduction in the time and money it takes to build a business application.

Where does that number come from? We collected real project requirements and broke everything down to the smallest possible feature. Then we compared the effort of building each feature with Almadar versus traditional development assisted by LLMs. When we added it all up across the full scope, the difference came out to roughly 87%. Weeks instead of months. Thousands instead of tens of thousands.

But the cost reduction is only half the story. The other half is ownership. With Almadar, you own everything. The schema is yours. The generated code is yours. There is no vendor lock-in, no monthly subscription to access your own application, no platform that can change its pricing or shut down and take your software with it. You describe what you want, we generate it, and it belongs to you completely.

That matters more than most people realize. I have seen companies held hostage by platforms they depend on. Prices go up, features get removed, APIs change without warning. When you own the source code and the schema that generates it, you are free. You can host it anywhere, modify it anytime, and never worry about a vendor's business decisions affecting yours.

## What We Are Building Toward

Almadar is not finished. We are still early, still refining the schema language, still expanding the pattern library, still improving the compiler. But the core idea is working. We have built real applications for real clients, systems that would have taken months and large teams, delivered in weeks by two people with a schema file and a compiler.

The vision is straightforward: any business application that follows common patterns should take days to build, not months. The people who understand the business should be able to describe what they need, and the system should produce it. Developers should spend their time on genuinely hard problems, the 20% that is unique and interesting, not on the 80% that has been solved a thousand times before.

We started Almadar because we were tired of building the same thing over and over. We kept building it because we realized we were not the only ones.

If any of this resonates with you, we would love to hear from you. Check out our [documentation](/docs), try the [CLI](/docs/downloads/cli), or just reach out and tell us what you are building. The orbit is just getting started.
