---
slug: software-that-shares
title: "Software That Shares: A New Way to Build"
authors: [osamah]
tags: [philosophy, vision]
image: /img/blog/software-that-shares.svg
---

![](/img/blog/software-that-shares.svg)

There is a street in my neighborhood where three different utility companies dug up the same stretch of pavement in the same month. First the water company. Then the gas company. Then the internet provider. Each one cut into the ground, laid their pipes, filled it back in. None of them talked to each other. None of them shared a trench.

This is how we build software.

<!-- truncate -->

## The City Where Nothing Connects

Imagine a city where every building has its own electrical standard. Every block generates its own power. Every home speaks a different language. The bakery on the corner keeps its own calendar. The school across the street uses a different one. The hospital down the road invented a third.

You would call this city dysfunctional. You would call it absurd.

And yet this is exactly the world we have built with software.

Your email system does not know your calendar system exists. Your bank cannot talk to your health insurer, even when they need to coordinate on the same event in your life. The volunteer group in your town uses one app to organize, the food bank uses another, and the municipal services office uses a third. They all track the same families, the same needs, the same resources, and none of them can see what the others see.

Every application is its own silo. Its own language. Its own version of reality.

We have spent decades building software that is powerful in isolation and useless in combination. And we have come to accept this as normal, the way a city might come to accept that its streets will always be torn up.

## What If Software Could Share?

The question is not whether we need better apps. We have plenty of good apps. The question is whether apps can coexist, whether they can share a common understanding of the world without being built by the same company, running on the same platform, or locked into the same ecosystem.

There are really only three things that systems need to share to work together.

**Facts, what is true.** Who lives in this neighborhood. What resources are available. How many beds the shelter has. What skills the volunteers bring. Not opinions. Not predictions. Just the current state of things, agreed upon and accessible.

Think of it like a shared phone book for a city. Not one company's phone book, but a common directory that any system can read and contribute to. When the food bank updates its inventory, the volunteer coordinator can see it. When the municipal office registers a new family, the school enrollment system is aware. Not because someone manually copied the information over, but because the fact exists in a shared space.

**Rules, how decisions are made.** Who qualifies for assistance. How resources are prioritized when demand exceeds supply. What happens when a volunteer cancels. These are not technical specifications. They are community agreements, expressed clearly enough that both humans and software can follow them.

Today, these rules are buried in code. They live inside applications, invisible to the people they affect. A family gets denied assistance and has no way to understand why, because the rule that denied them is hidden in a function written by a developer who left the company two years ago.

Rules should be readable. Not just by programmers, by the communities that live under them.

**Events, what happened that others should know.** A new volunteer group formed. Resource levels dropped below a safe threshold. A coordination effort started. A new community service opened. These are the heartbeats of a living system, the signals that allow different parts to respond without being commanded from a central authority.

A community bulletin board works this way. Nobody tells you to read it. But if something important happens, it is posted there, and anyone who cares can respond. Software should work the same way, announcing what matters, letting others decide what to do about it.

## A Community That Coordinates

Let me make this concrete.

Imagine a small city with a community support network. Not a single application, but an ecosystem of systems that have learned to share.

A family moves to the area and registers with the municipal office. That registration is a fact, it enters the shared space. The school enrollment system sees it and knows there are children who need placement. The volunteer welcome committee sees it and dispatches someone to introduce the neighborhood. The food assistance program sees it and checks eligibility based on shared rules.

No one built a master application that does all of this. No single vendor controls the pipeline. Each system was built independently, possibly by different organizations, possibly years apart. But they share a common language for facts, rules, and events.

Now imagine the food bank's supplies run low. An event is emitted, not to any specific system, but to the shared space. The volunteer coordination system picks it up and sends an alert to drivers who can make emergency pickups. The municipal budget system picks it up and flags the shortfall for next month's allocation meeting. The community dashboard picks it up and updates the public display.

Each system responds in its own way, according to its own rules. But they are all responding to the same reality.

This is not integration in the way the software industry usually means it. It is not APIs stitched together with middleware, not data pipelines feeding into a central lake, not a platform play where one company owns the hub. It is coexistence. Systems that can exist side by side, each doing their own work, each understanding the others.

## Why This Does Not Exist Yet

The honest answer is that it has not been profitable to build this way. The business model of modern software rewards silos. If your data is locked in my platform, you cannot leave. If your rules are hidden in my code, you need me to change them. If your events only flow through my infrastructure, I am the gatekeeper.

There is also a genuine technical difficulty. Sharing meaning across systems is harder than sharing data. Two databases can exchange rows and columns. But can they agree on what "eligible" means? Can they share a rule like "prioritize families with children under five" in a way that both a food bank's system and a housing authority's system can execute?

This is the problem that has not been solved. Not the plumbing, we have plenty of plumbing. The language. The shared understanding that lets systems not just exchange information but actually agree on what it means.

## A Protocol for Coexistence

This is what Almadar is building. We call it the Orbital Protocol, though the name matters less than the idea.

The idea is this: software should be born ready to share. Not retrofitted with APIs after the fact, not integrated through expensive middleware, not locked into a platform. Designed from the first line to expose its facts, declare its rules, and emit its events in a language that other systems can understand.

An Orbital is a piece of software built this way. It carries its own behavior, its states, its transitions, its rules for when things can and cannot happen. But it also carries a contract with the outside world: here is what I know, here is how I decide, here is what I announce.

When you build software as Orbitals, something shifts. Systems become replaceable without losing meaning. You can swap out the food bank's tracking system for a better one, and the volunteer coordination system does not break, because it was never coupled to the old system's internals. It was coupled to the shared language.

Communities keep ownership of their knowledge. The facts, rules, and events are not locked inside any vendor's product. They exist in the shared space, described in a format that any system can read. When a vendor goes away, the knowledge stays.

And perhaps most importantly, AI becomes infrastructure rather than authority. In this model, artificial intelligence is a tool that helps translate human knowledge into shared system logic. It helps you express what you already know, how your community works, how resources should flow, how decisions should be made. It does not replace your judgment. It amplifies your ability to encode it.

## This Is Not Science Fiction

I want to be clear about what we are claiming and what we are not.

We are not claiming to have solved interoperability, that ancient dragon of the software industry. We are not claiming that every system in the world will suddenly start speaking the same language tomorrow.

What we are claiming is more modest and more specific: there is a way to build software that is structurally ready to share. Software where the facts, rules, and events are not afterthoughts but the primary architecture. Software where a new system can join an existing ecosystem without a six-month integration project.

We have built this. We have used it to create applications across wildly different domains, strategy games, government inspection systems, fitness trackers, AI learning platforms. The same language, the same structure, the same protocol. Not because these domains are similar, but because the underlying pattern of behavior is universal: something is true, something is allowed, something happened.

The Orbital Protocol is how we make that pattern shareable.

## Building for What Comes After

The software industry is at an inflection point. The AI wave is real, and it will change how we build things. But the deeper question is not whether AI can write code faster. The deeper question is whether the systems we build can coexist, whether the next generation of software will repeat the silo pattern or break it.

If we keep building isolated systems, knowledge concentrates. Communities lose control over the tools they depend on. Local expertise disappears into centralized models that flatten the world into averages.

If we build shared digital reality instead, something different becomes possible. Communities keep ownership of their knowledge. Systems become replaceable without losing meaning. People remain part of the systems that shape their lives.

The three utility companies will keep digging up my street separately. That is the world we have. But it is not the world we have to keep building.

Software that shares. That is the work.
